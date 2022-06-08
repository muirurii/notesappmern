import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {GlobalContext} from "../store/GlobalState";
import {BiLogIn} from 'react-icons/bi';


const Login = () => {

    const {dispatch}= useContext(GlobalContext);
    const setUser = (payload)=>{
        dispatch({
            type:'setUser',
            payload
        })
    }

    const navigate = useNavigate();

    const[loginData,setLogindata] = useState({
        username:'',
        password:''
    });

    const [formMessage,setFormMessage] = useState({
        type:'',
        message:''
    });

    const changeLogindata = (value)=>{
        setLogindata({
            ...loginData,
            ...value
        });
    }

    const showMessage = (type,message)=>{
        setFormMessage({
            type,
            message
        });

        setTimeout(()=>{
            setFormMessage({
                type:'',
                message:''
            })
        },3000)
    }

    const handleLogin = async(e)=>{
        e.preventDefault();
        if(!loginData.password.length || !loginData.username){
           return  showMessage('error','Please fill in all fields');
        }

        try {
            const res = await fetch('http://localhost:5000/users/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accepts':'application/json'
                },
                body:JSON.stringify(loginData)
            });

            const data = await res.json();
            
            if(res.status === 400){
               return showMessage('error',data.message);
            }
            showMessage('success','Logged in');
            setUser({name:data.username,token: data.accessToken})
            setTimeout(()=> navigate('/notes'), 1000)

        } catch (error) {
            showMessage('error','Unable to connect');
        }
    }

  return (
    <div>
        <h2>Log In <BiLogIn /></h2>
            <div className="form-layout">
                {formMessage.message && <div className={`notification ${formMessage.type}`}>
                    {formMessage.message}</div>}
                <form method="post" onSubmit={handleLogin}>
                    <div className="fields">
                        <label htmlFor="username">username</label>
                        <input type="text" id="username" 
                            value={loginData.username}
                            onChange={(e)=> changeLogindata({username:e.target.value})}
                        />
                    </div>
                    <div className="fields">
                        <label htmlFor="password">password</label>
                        <input type="password" id="password"
                            value={loginData.password}
                            onChange={(e)=> changeLogindata({password: e.target.value})}
                        />
                    </div>
                    <button className="login btn">Login</button>
                </form>
            </div>
    </div>
  )
}

export default Login;