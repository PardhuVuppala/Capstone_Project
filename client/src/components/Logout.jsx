import React,{useEffect} from 'react'
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import 'react-toastify/dist/ReactToastify.css'
export default function Logout() {
    const notify = (message) => toast(message);
    const Navigate = useNavigate();
  useEffect(()=>
  {  
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user_id"); 
    Cookies.remove("username");
    Cookies.remove("owner_id")
    notify("Successfully Logout")
    setTimeout(()=>{
        Navigate("/");
    },1000)
     
  })
  return (
    <div>
      <ToastContainer/>
    </div>
  )
}
