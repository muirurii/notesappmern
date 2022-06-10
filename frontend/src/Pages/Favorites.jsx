import {useCallback, useContext,useEffect} from 'react'
import { GlobalContext } from '../store/GlobalState';
import Note from '../components/Note';
import { useNavigate } from 'react-router-dom';
import fetchNotes from '../custom/fetchNotes';

const Favorites = () => {

    const {user,dispatch,notes} = useContext(GlobalContext);
    const favorites = notes.filter(note => note.favorite);
    const navigate = useNavigate();
    const setNotes = useCallback((payload)=>{
        dispatch({
            type:'setNotes',
            payload
        })
    },[dispatch]);
    const showLoader = useCallback((payload)=>{
        dispatch({type:'setLoading',payload});
    },[dispatch]);

    useEffect(()=>{
        showLoader(true);
        const fetchData = async(token)=>{
            const data = await fetchNotes(token);
            if(data !== false){
                setNotes(data)
            }else{
                navigate('/')
            }
        }
        showLoader(false);
        fetchData(user.token);
    },[setNotes,navigate,user.token,showLoader]);

  return (
    <div>
        <h2>My Favorites ({favorites.length})</h2>
    {favorites.length ? (
        <div className="notes">
            {favorites.map((note,i)=>{
                return <Note key={note._id} index={i} note={note}/>
            })}
        </div>
    ) : <p className="no-notes">No favorite notes</p>}
    </div>
  )
}

export default Favorites;