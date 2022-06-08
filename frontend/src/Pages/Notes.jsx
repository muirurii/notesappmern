import {useContext,useEffect} from 'react'
import { GlobalContext } from '../store/GlobalState';
import Note from '../components/Note';
import { useNavigate } from 'react-router-dom';
import fetchNotes from '../custom/fetchNotes';

const Notes = () => {

    const {user,dispatch,notes} = useContext(GlobalContext);

    const setNotes = (payload)=>{
        dispatch({
            type:'setNotes',
            payload
        })
    }
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async(token)=>{
            const data = await fetchNotes(token);
            if(data !== false){
                setNotes(data)
            }else{
                navigate('/')
            }
        }
        fetchData(user.token);
    },[]);
    
  return (
    <div>
        <h2>My Notes ({notes.length})</h2>
    {notes.length ? (
        <div className="notes">
            {notes.map((note,i)=>{
                return <Note key={note._id} index={i} note={note}/>
            })}
        </div>
    ) : <p className="no-notes">You have zero notes</p>}
    </div>
  )
}

export default Notes