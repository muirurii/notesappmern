import {useState,useContext} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalState';

const UpdateNote = () => {
  const navigate = useNavigate();
  const {user,notes} = useContext(GlobalContext);
  const {id} = useParams()
  const initial = notes.find(note=> note._id === id);

  const[note,setNote] = useState({title:initial.title,body:initial.body});
  const [formMessage,setFormMessage] = useState({
    type:'',
    message:''
  });

  const showMessage = (type,message)=>{
    setFormMessage({type,message});
    setTimeout(()=>{
        setFormMessage({type:'',message:''})
    },3000)
}

  const updateNote =  async (e)=>{
    e.preventDefault();
    if(!note.title.length || !note.body.length){
       return showMessage('error','Please fill in all fields');
    }

    try {
        const res = await fetch(`http://localhost:5000/notes/${initial._id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Accepts':'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body:JSON.stringify(note)
        });

        const data = await res.json();
        if(res.status !== 200){
           return showMessage('error',data.message);
        }
        showMessage('success','Note Updated');
        setTimeout(()=>navigate('/notes'),500)
    } catch (error) {
        showMessage('error','Unable to connect');
    }
}

  return (
    <div className='new-note'>
        <h2>Update note</h2>
        <div className="form-layout">
        {formMessage.message && <div className={`notification ${formMessage.type}`}>
                    {formMessage.message}</div>}
          <form onSubmit ={updateNote}>
            <div className="fields">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={note.title}
                  onChange={(e)=> setNote({...note,title:e.target.value})}                          
                />
            </div>
            <div className="fields">
                <label htmlFor="body">Body</label>
                <textarea id="body" cols={30} rows={10} value={note.body}
                   onChange={(e)=> setNote({...note,body:e.target.value})}                          
                ></textarea>
            </div>
            <button type='submit' className='btn'>Add note</button>
        </form>
        </div>
    </div>
  )
}

export default UpdateNote