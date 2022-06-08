import {useContext,useEffect} from 'react'
import { GlobalContext } from '../store/GlobalState';
import Note from '../components/Note';
import { useNavigate } from 'react-router-dom';
import fetchNotes from '../custom/fetchNotes';

const Favorites = () => {

    const {user,dispatch,notes} = useContext(GlobalContext);
    const favorites = notes.filter(note => note.favorite);
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