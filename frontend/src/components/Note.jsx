import {FaPen, FaTrash,FaHeart} from 'react-icons/fa';
import { useContext } from 'react';
import { GlobalContext } from '../store/GlobalState';
import { Link } from 'react-router-dom';

const Note = ({note,index}) => {
    const {dispatch,user} = useContext(GlobalContext);
    const showLoader = (payload)=>{
        dispatch({type:'setLoading',payload});
    };
    const deleteFromState = (payload)=>{
        dispatch({type:'removeNote',payload});
    }

    const handleDelete = async ()=>{
        showLoader(true);
        try {
            const res = await fetch(`/notes/${note._id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Accepts':'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const data = await res.json();
            deleteFromState(data);
            showLoader(false);
        } catch (error) {
            console.error(error);
            showLoader(false);
        }
    }

   const handleLike = async(update)=>{
        try {
            const res = await fetch(`/notes/${note._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Accepts':'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({title:note.title,body:note.body,favorite: !note.favorite})
            });

            const data = await res.json()
            if(res.status === 200){
                dispatch({
                    type:'updateLiked',
                    payload:data._id
                })
            }
        } catch (error) {
            console.error(error);          
        }
   }
  return (
    <div className="note"> 
        <button data-tool-tip="delete" className="delete note-btn" onClick={handleDelete}><FaTrash /></button>
        <Link data-tool-tip="edit" className="edit note-btn" to={`/update/${note._id}`}><FaPen /></Link>
        <button data-tool-tip={`${note.favorite ? 'unlike' : 'like'}`} className={`favorite note-btn ${note.favorite ? 'liked' : null}`} onClick={handleLike}><FaHeart /></button>
        <h3><span className="count">{index + 1}.</span> {note.title}</h3> 
        <p>{[...note.body].map((l,i)=> l === '.' ? <span key={i}>. <br /></span> : <span key={i}>{l}</span>)}</p>
        <span className="time">{new Date(note.createdAt).toLocaleString('en-US')}</span>
    </div>
  )
}

export default Note;