import React, { useState } from 'react'
import Icon from '../images/logo.svg';
import Login from '../images/login.jpg';
import { Link,Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AgentSignup() {
 const[owner_company, setOwnerCompany] = useState("");
 const[owner_name,setOwnerName] = useState("");
 const[owner_email,setOwnerEmail] = useState("");
 const[owner_mobile,setOwnerMobile] = useState("");
 const[owner_dob,setOwnerdob] = useState("");
 const[owner_pass,setOwnerPass] = useState("");
 const[owner_gender,setOwnerGender] = useState("");
 const[owner_country,setOwnerCountry] = useState("");
 const[owner_address,setOwnerAddress] =useState(""); 
 const Navigate = useNavigate();
 const notify = (message) => toast(message);

 const HandleSubmit=(e)=>
 {
    e.preventDefault();
    const body={
      owner_company,
      owner_name,
      owner_email,
      owner_mobile,
      owner_dob,
      owner_pass,
      owner_gender,
      owner_country,
      owner_address
    }
    axios.post("http://localhost:4500/owner/register",body)
    .then(response =>
      {
        console.log(response.data);
        notify("Successfully Registered");
        setTimeout(()=>
        {
          Navigate("/");
        },1000)
      })
      .catch(error => {
        if(error.response && error.response.status === 400)
        { 
          notify(error.response.data.message);
          console.log(error.response.data.message);
        }
        else
        {
          console.log('Login Faild : ', error.message)
        }
      })
 }
  return (
    <div>
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <ToastContainer/>
    <div className="container">
      <div className="card login-card">
        <div className="row no-gutters">
          <div className="col-md-5">
            <img src={Login} alt="login" className="login-card-img"/>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <div className="brand-wrapper">
                <img src={Icon} alt="logo" className="logo"/>
              </div>
              <p className="login-card-description">Create your account</p>
              <form onSubmit={HandleSubmit}>
              <div className="form-group">
                    <label for="Name" className="sr-only">Name</label>
                    <input type="text" name="name"  className="form-control"  placeholder="Company Name" value={owner_company} onChange={(e)=>setOwnerCompany(e.target.value)} required/>
                  </div>
                 <div className="form-group">
                    <label for="Name" className="sr-only">Name</label>
                    <input type="text" name="name" id="name" className="form-control"  placeholder="Name" value={owner_name} onChange={(e)=>setOwnerName(e.target.value)}required/>
                  </div>
                  <div className="form-group">
                    <label for="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" className="form-control"  placeholder="Email address" value={owner_email} onChange={(e)=>setOwnerEmail(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                    <label for="phone" className="sr-only">Mobile No.</label>
                    <input type="phone" name="name" id="tel" className="form-control"  placeholder="Mobile No." value={owner_mobile} onChange={(e)=>setOwnerMobile(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                    <label for="gender" className="sr-only">Gender</label>
                    <input type="text" name="gender" id="gender" className="form-control"  placeholder="Gender" value={owner_gender} onChange={(e)=>setOwnerGender(e.target.value)} required/>
                  </div>
                  <div className="form-group mb-4">
                    <label for="password" className="sr-only">Password</label>
                    <input type="password" name="password" id="password" className="form-control" value={owner_pass} onChange={(e)=>setOwnerPass(e.target.value)} placeholder="***********" required/>
                  </div>
                  <div className="form-group">
                    <label for="country" className="sr-only">Country</label>
                    <input type="text" name="country" id="country" className="form-control" value={owner_country} onChange={(e)=>setOwnerCountry(e.target.value)}  required/>
                  </div>
                  <div className="form-group">
                    <label for="dob" className="sr-only">Date of Birth</label>
                    <input type="text" name="country" id="dob" className="form-control" value={owner_dob} onChange={(e)=>setOwnerdob(e.target.value)}  required/>
                  </div>
                  <div className="form-group">
                    <label for="address" className="sr-only">Address</label>
                    <input type="text" name="address" id="address" className="form-control" placeholder="Address" value={owner_address} onChange={(e)=>setOwnerAddress(e.target.value)} required/>
                  </div>
                  <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Sign Up"/>
                </form>
                <p className="login-card-footer-text">Do you have an account? <Link to="/" className="text-reset">click here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>  
    </div>
  )
}
