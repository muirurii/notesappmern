import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../store/GlobalState";
import {CgLogIn} from 'react-icons/cg';

const Signup = () => {
    const navigate = useNavigate();
    const{dispatch} = useContext(GlobalContext);
    const [signupData,setSignupdata] = useState({
        username:'',
        email: '',
        password:'',
        repeatPassword:''
    });
    
    const showLoader = (payload)=>{
        dispatch({
            type:'setLoading',
            payload
        });
    };
    const changeSignupdata = (value)=>{
        setSignupdata({...signupData,...value});
    }

    const [formMessage,setFormMessage] = useState({type:'',message:''});
    const showMessage = (type,message)=>{
        setFormMessage({type,message});
        setTimeout(()=>setFormMessage({type:'',message:''}),3000)
    }

    const setUser = (payload)=>{
        dispatch({
            type:'setUser',
            payload
        })
    }

    const handleSignup = async(e)=>{
        e.preventDefault();
        if(!signupData.password.length || !signupData.username.length || !signupData.email.length || !signupData.repeatPassword.length){
           return  showMessage('error','Please fill in all fields');
        }
        showLoader(true);
        try {
            const res = await fetch('http://localhost:5000/users/register',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accepts':'application/json'
                },
                body:JSON.stringify(signupData)
            });

            const data = await res.json();
            
            if(res.status === 201){ 
                showMessage('success','Registered');
                setUser({name:data.username,email:data.email,token:data.accessToken})
                navigate('/notes');
               return showLoader(false);
            }
           showLoader(false);
           showMessage('error',data.message);
        } catch (error) {
            showMessage('error','Unable to connect');
            showLoader(false);
        }
    }

    return (
      <div>
          <h2 className="center"><span>Sign up</span> <CgLogIn /></h2>
              <div className="form-layout">
              {formMessage.message && <div className={`notification ${formMessage.type}`}>
                    {formMessage.message}</div>}
                  <form method="post" onSubmit={handleSignup}>
                      <div className="fields">
                          <label htmlFor="_username">username</label>
                          <input type="text" id="_username" 
                            onChange={(e)=> changeSignupdata({username:e.target.value})}                          
                           />
                      </div>
                      <div className="fields">
                          <label htmlFor="_email">email</label>
                          <input type="text" id="_email" 
                            onChange={(e)=> changeSignupdata({email:e.target.value})}
                          />
                      </div>
                      <div className="fields">
                          <label htmlFor="_password">password</label>
                          <input type="password" id="_password"
                            onChange={(e)=> changeSignupdata({password:e.target.value})}
                          />
                      </div>
                      <div className="fields">
                          <label htmlFor="confirm_password">confirm password</label>
                          <input type="password" id="confirm_password"
                            onChange={(e)=> changeSignupdata({repeatPassword:e.target.value})}
                          />
                      </div>
                      <button className="Signup btn">Signup</button>
                  </form>
              </div>
      </div>
    )
  }
  
  export default Signup;