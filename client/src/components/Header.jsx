import React from 'react'
import Icon from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Header() {
  const[username,setUsername] = useState("");
  const[role,setRole] = useState("");
  const[ownername,setOwnerName]=useState("")
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const HandleLogout=(e)=>
  {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user_id"); 
    Cookies.remove("username")
    notify("Logout Successfully");
    setTimeout(()=>
    {
      navigate("/")
    },1000)
  }
  useEffect(()=>{
    const token = Cookies.get('token');
    const userId = Cookies.get('user_id');
    const role = Cookies.get('role');
    const username = Cookies.get('username');
    const ownername = Cookies.get('ownername')
    const owner_id = Cookies.get('owner_id')
    setUsername(username);
    setRole(role);
    setOwnerName(ownername);
    console.log("Token:", token);
    console.log("User ID:", userId);
    console.log("Role:", role);
    console.log("owner_name : " ,ownername);
    console.log("owner_id : ",owner_id)
  },[]);
  return (
    <div>
    {role === "user" && (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ToastContainer/>
      <Link className="navbar-brand mr-3" href="#">
    <img src={Icon} width="60" height="60" alt=""/>
  
    </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    <li className="nav-item active mr-3">
        <Link className="nav-link" href="#">{username} <span className="sr-only"></span></Link>
      </li>
      <li className="nav-item active mr-3">
        <Link className="nav-link" to="/dashboard">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item mr-3">
        <Link className="nav-link" to="/avaliablecontainer">Containers Avalible</Link>
      </li>
      <li className="nav-item dropdown mr-3">
        <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/Booking">Bookings</Link>
          <Link className="dropdown-item" href="#">Profile</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" onClick={HandleLogout}>Logout</Link>
        </div>
      </li>      
    </ul>
  </div>
</nav>
)}

  { role==="agent" && (
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
     <ToastContainer/>
     <Link className="navbar-brand mr-3" href="#">
   <img src={Icon} width="60" height="60" alt=""/>
 
   </Link>
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>
 <div className="collapse navbar-collapse" id="navbarNav">
   <ul className="navbar-nav">
   <li className="nav-item active mr-3">
       <Link className="nav-link" href="#">Agent {ownername} <span className="sr-only"></span></Link>
     </li>
     <li className="nav-item active mr-3">
       <Link className="nav-link" to="/dashboard">Home <span className="sr-only">(current)</span></Link>
     </li>
     <li className="nav-item mr-3">
       <Link className="nav-link" to="/conatainer">Containers</Link>
     </li>
     <li className="nav-item dropdown mr-3">
       <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Dropdown
       </Link>
       <div className="dropdown-menu" aria-labelledby="navbarDropdown">
         <Link className="dropdown-item" to="/Booked">Booked Containers</Link>
         <Link className="dropdown-item" href="#">Profile</Link>
         <div className="dropdown-divider"></div>
         <Link className="dropdown-item" onClick={HandleLogout}>Logout</Link>
       </div>
     </li>      
   </ul>
 </div>
</nav>
  )
  }
</div>
  )
}
