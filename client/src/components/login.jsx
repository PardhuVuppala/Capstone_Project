import React,{useState} from 'react'
import Cookies from 'js-cookie';
import '../assets/login.css'
import Icon from '../images/logo.svg'
import ILogin from '../images/login.jpg'
import {Link} from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const[userpass, setPassword] = useState("");
  const[useremail, setEmail] = useState("");
  const[type, setType] = useState("")
  const Navigate = useNavigate("");
  const notify = (message) => toast(message);

  const handleSubmit=(e)=>
  { 
    if(type==="user")
    {
    const body ={
      useremail,
      userpass
    }
    e.preventDefault();
    axios.post("http://localhost:4500/user/login",body)
    .then(response =>
      { 
       
        const { token, user_id, role,username } = response.data;
        // console.log(token);
        // console.log(user_id);
        // console.log(role);
        Cookies.set('user_id',user_id);
        Cookies.set('token',token);
        Cookies.set('role',role);
        Cookies.set('username',username)
         notify("Successfully Login");
         setTimeout(()=>
         {
         Navigate("/dashboard");
         },1000)
  

      }
      )
      .catch(error => {
        if(error.response && error.response.status === 401)
        {
          notify(error.response.data.message);
          console.log(error.response.data.message)
        }
        else
        {
          notify(error.message)
          console.log('Login Faild : ', error.message)
        }
      })
    }
    else if(type==="agent") {
        e.preventDefault();
        const owneremail = useremail
        const ownerpass = userpass

        const body = { 
          owneremail,
          ownerpass
        }
        axios.post("http://localhost:4500/owner/login",body)
        .then(response=>
          {  
            console.log(response.data)
            const { token, owner_id, role,ownername } = response.data;
            Cookies.set('owner_id',owner_id);
            Cookies.set('token',token);
            Cookies.set('role',role);
            Cookies.set('ownername',ownername)
            setTimeout(()=>
            {
              Navigate("/dashboard")
            },1000)
          })
          .catch(error =>{
            if(error.response && error.response.status===401)
            {
              notify(error.response.data.message);
              console.log(error.response.data.message);    
            }
            else
            {
              console.log(error.message)
            }
          })

    }
        
  }
  return (
    <div>
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div className="container">
      <ToastContainer/>
      <div className="card login-card">
        <div className="row no-gutters">
          <div className="col-md-5">
            <img src={ILogin} alt="login" className="login-card-img"/>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <div className="brand-wrapper">
                <img src={Icon} alt="logo" className="logo"/>
              </div>
              <p className="login-card-description">Sign into your account</p>
              <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label for="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" className="form-control"value={useremail} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" required/>
                  </div>
                  <div className="form-group mb-4">
                    <label for="password" className="sr-only">Password</label>
                    <input type="password" name="password" id="password" className="form-control" value={userpass} onChange={(e)=>setPassword(e.target.value)} placeholder="***********" required/>
                  </div>
                  <div className="form-group mb-4">
                  <span>Choose Mode Of Login</span>
                  <div class="row">
                  <div class="col">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="user" id="user" value="user" checked={type === "user"} onChange={(e)=>(setType(e.target.value))}/>
                      <span class="form-check-label" for="male">User</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="agent" id="agent" value="agent" checked={type==="agent"} onChange={(e)=>(setType(e.target.value))}/>
                      <span class="form-check-label" for="female">Agent</span>
                    </div>
                  </div>    
                </div>
                  </div>
                  <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Login" />
                </form>
                <a href="#!" className="forgot-password-link">Forgot password?</a>
                <p className="login-card-footer-text">Don't have an account? <Link to="/signup" className="text-reset">User Register here</Link></p>
                <p className="login-card-footer-text">Don't have an account? <Link to="/AgentSignup" className="text-reset">Agent Register here</Link></p>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  </main>
    </div>
  )
}
