import { GlobalContext } from "../store/GlobalState"
import { useContext,useState } from "react";
import { BiChevronsDown, BiChevronsUp, BiTrash, BiUserCircle} from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const {dispatch,user,notes} = useContext(GlobalContext);
  const [menu,setMenu] = useState(false);
  const [details,setDetails] = useState({
    newUsername:user.name,
    newEmail:user.email
  });

  const resetUser = ()=>{
    dispatch({
      type:'setUser',
      payload:{}
    })
  }

  const deleteAccount = async ()=>{
    try {
      const res = await fetch(`http://localhost:5000/users/${user.name}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Accepts':'application/json',
            'Authorization': `Bearer ${user.token}`
        }      
    });

    if(res.status === 204){
        resetUser()
        navigate('/');
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const setUser = (payload)=>{
    dispatch({
        type:'setUser',
        payload
    });
}
  const [formMessage,setFormMessage] = useState({type:'', message:''});

  const showMessage = (type,message)=>{
        setFormMessage({type,message});
        setTimeout(()=>{
            setFormMessage({type:'', message:''})
        },3000)
    }
  const updateUser = async (e)=>{
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/users/${user.name}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Accepts':'application/json',
            'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(details)
    });

    const data = await res.json()
    if(res.status === 409){
      return showMessage('error', data.message)
    }
    if(res.status === 200){
      setUser({name:data.username,email:data.email,token: data.accessToken})
      return showMessage('success', 'updated')
    }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="text">
          <BiUserCircle className="profile-pic" />
          <p>username : @{user.name.toLowerCase()}</p>
          <p>email: {user.email.toLowerCase()}</p>
          <h4>{notes.length} notes</h4>
          <div className="menu">
            <button className="update center" onClick={()=> setMenu(!menu)}>update profile
            {menu ? <BiChevronsDown /> : <BiChevronsUp /> } 
            </button>
            <button onClick={deleteAccount}>delete account<BiTrash /></button>
          </div>
        </div>
        <form className={`update-form ${menu ? 'show' : null}`} onSubmit={updateUser}>
          <div className="form-layout">
          <p className={`notification ${formMessage.type}`}>{formMessage.message}</p>
          <div className="fields">
            <label htmlFor="user">username</label>
            <input type="text" id="user" placeholder="username" value={details.newUsername}
            onChange={(e)=> setDetails({...details,newUsername:e.target.value})}
            />
          </div>
          <div className="fields">
            <label htmlFor="email">email</label> 
            <input type="text" placeholder="email" value={details.newEmail}
            onChange={(e)=> setDetails({...details,newEmail:e.target.value})}
          />
          </div>
          <button type="submit" className="update btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile