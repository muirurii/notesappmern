import {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalState';

const NewNote = () => {
  const navigate = useNavigate();
  const {user,dispatch} = useContext(GlobalContext);

  const showLoader = (payload)=>{
    dispatch({
        type:'setLoading',
        payload
    }); 
  };
  const[note,setNote] = useState({title:'',body:''});
  const [formMessage,setFormMessage] = useState({type:'',message:''});

  const showMessage = (type,message)=>{
    setFormMessage({type,message});
    setTimeout(()=> setFormMessage({type:'',message:''}),3000);
}

  const addNote = (e)=>{
    e.preventDefault();
    if(!note.title.length || !note.body.length){
       return showMessage('error','Please fill in all fields');
    }
    showLoader(true);
    handleAddNote();
  }

  const handleAddNote = async()=>{
    try {
        const res = await fetch('/notes',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accepts':'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body:JSON.stringify(note)
        });

        const data = await res.json(); 
        if(res.status !== 201){
           return showMessage('error',data.message);
        }
        showMessage('success','Note added');
        navigate('/notes');
        showLoader(false);
    } catch (error) {
        showMessage('error','Unable to connect');
        showLoader(false);
    }
}

  return (
    <div className='new-note'>
        <h2>New note</h2>
        <div className="form-layout">
        {formMessage.message && <div className={`notification ${formMessage.type}`}>
                    {formMessage.message}</div>}
          <form onSubmit ={addNote}>
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
            <button type='submit' className='btn'>Add</button>
        </form>
        </div>
    </div>
  )
}

export default NewNote