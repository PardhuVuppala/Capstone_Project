import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import '../assets/Navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { useEffect,useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";

const Navbar = () => {
    const[username,setUsername] = useState("");
    const[role,setRole] = useState("");
    const[ownername,setOwnerName]=useState("")
    const navigate = useNavigate();
    const notify = (message) => toast(message);
    const [Email,setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOwner,SetisOwner] = useState(false);
    const [isotpModelOpen,setOtpMOdelOPen] = useState(false)
    const[isOwnerOTP,setOwnerOtp] = useState(false);
    const[otp,setotp] = useState("");
    const[recivedOtp,setrecivedOTP] = useState("");
    const[r_Role,set_Role] = useState("");
    const[rtoken,setrtoken] = useState("");
    const[ruserid,setruserid] =useState("");
    const[rusername,setrusername] = useState("");


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setEmail("");
      };

      const OwnerModal= ()=>
        {
              SetisOwner(!isOwner);
              setEmail("");
        }
const HandleLogout=(e)=>
{
      e.preventDefault();
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("user_id"); 
      Cookies.remove("username");
      Cookies.remove("owner_id");
      Cookies.remove("ownername")
      notify("Logout Successfully");
      setTimeout(()=>
      {
        window.location.href = '/';
      },1000)
}



const OTPModal = () =>
    {
       setOtpMOdelOPen(!isotpModelOpen);
       setotp("");
       setEmail("");
    }

const OwnerOtpMOdel =()=>
    {
        setOwnerOtp(!isOwnerOTP);
        setotp("");
        setEmail("");
    }





const FormSubmit = async(e)=>
{
  
        e.preventDefault();
        const body = {Email}
        axios.post("http://localhost:4500/user/otp",body)
        .then(Response=>
        {
           console.log(Response.data);
           notify("OTP is sent to registered email address");
           setrecivedOTP(Response.data.otp);
           setIsModalOpen(false);
           setOtpMOdelOPen(!isotpModelOpen);
           set_Role(Response.data.role);
           setrtoken(Response.data.token);
           setruserid(Response.data.user_id);
           setrusername(Response.data.username);
           setTimeout(() => {
           },1000)
        })
        .catch(error=>{
            notify("Email is not Present")
            console.log(error)
        })

}

const FormOwnerSubmit = async(e)=>
{
    e.preventDefault();
    const body = {Email}
    axios.post("http://localhost:4500/owner/otp",body)
    .then(Response=>
        {
           console.log(Response.data);
           notify("OTP is sent to registered email address");
           setrecivedOTP(Response.data.otp);
           set_Role(Response.data.role);
           setrtoken(Response.data.token);
           setruserid(Response.data.owner_id);
           SetisOwner(false);
           setrusername(Response.data.ownername);
           setTimeout(() => {
            setOwnerOtp(!isOwnerOTP);
           },1000)
        })
        .catch(error=>{
            notify("Email is not Present")
            console.log(error)
        })
}


const OTPSubmit = async(e)=>
    { 
        e.preventDefault();
        if(otp===recivedOtp)
        { 
          notify("OTP Verified");
          Cookies.set('user_id',ruserid);
          Cookies.set('token',rtoken);
          Cookies.set('role',r_Role);
          Cookies.set('username',rusername)
          setOtpMOdelOPen(false);
          setruserid("");
          set_Role("");
          setrtoken("");
          setrusername("");
          setTimeout(() => {
            window.location.href = '/';
        },1000)
        }
        else
        {
          notify("OTP Entered by you is incorrect");
        }
}


const OwnerOtpSubmit = async(e)=>
    {
        e.preventDefault();
        if(otp===recivedOtp)
        { 
          notify("OTP Verified");
          Cookies.set('owner_id',ruserid);
          Cookies.set('token',rtoken);
          Cookies.set('role',r_Role);
          Cookies.set('ownername',rusername)
          setOwnerOtp(false);
          setruserid("");
          set_Role("");
          setrtoken("");
          setrusername("");
          setTimeout(() => {
            window.location.href = '/';
        },1000)
        }
        else
        {
          notify("OTP Entered by you is incorrect");
        }
    }
useEffect(()=>
{
    const token = Cookies.get('token');
    const userId = Cookies.get('user_id');
    const role = Cookies.get('role');
    const username = Cookies.get('username');
    const ownername = Cookies.get('ownername')
    const owner_id = Cookies.get('owner_id')
    setUsername(username);
    setRole(role);
    setOwnerName(ownername);
})

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

   
    const list = (anchor) => (
     
        
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
               {role === "user" && (
                <div>
                 <List>
                 {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                     <ListItem key={text} disablePadding>
                         <ListItemButton>
                             <ListItemIcon>
                                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                             </ListItemIcon>
                             <ListItemText primary={text} />
                         </ListItemButton>
                     </ListItem>
                 ))} */}
            
                 
           
 
                 <ListItem disablePadding>
                     <ListItemButton >
                         <ListItemIcon>
                             <HomeIcon />
                         </ListItemIcon>
                         <ListItemText primary={<Link to="/">Home</Link>} />
                     </ListItemButton>
                 </ListItem>
                 <ListItem disablePadding>
                     <ListItemButton>
                         <ListItemIcon>
                             <PersonIcon/>
                         </ListItemIcon>
                         <ListItemText primary={<Link to="/Profile">Profile</Link>} />
                     </ListItemButton>
                 </ListItem>
                 <ListItem disablePadding>
                     <ListItemButton>
                         <ListItemIcon>
                             <CheckCircleIcon />
                         </ListItemIcon>
                         <ListItemText primary={<Link to="/avaliablecontainer">Available Container</Link>} />
                     </ListItemButton>
                 </ListItem>
             </List>
             <Divider />
             <List>
                 <ListItem disablePadding>
                     <ListItemButton>
                         <ListItemIcon>
                             <EventIcon />
                         </ListItemIcon>
                         <ListItemText primary={<Link to="/Booking">Bookings</Link>} />
                     </ListItemButton>
                 </ListItem>
                 
                 <ListItem disablePadding>
                     <ListItemButton>
                         <ListItemIcon>
                             <InboxIcon />
                         </ListItemIcon>
                         <ListItemText primary={"inbox"} />
                     </ListItemButton>
                 </ListItem>

                 <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link onClick={HandleLogout}>Logout</Link>} />
                </ListItemButton>
            </ListItem>
             </List>
             </div>
        )} 
        {role==="agent" && (
            <div>
            <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))} */}
       
            
      

            <ListItem disablePadding>
                <ListItemButton >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/">Home</Link>} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/Profile">Profile</Link>} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/conatainer">Containers</Link>} />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/Booked">Booked Containers</Link>} />
                </ListItemButton>
            </ListItem>
      
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"inbox"} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link onClick={HandleLogout}>Logout</Link>} />
                </ListItemButton>
            </ListItem>
        </List>
        </div>
        )}



{!role && (
            <div>
            <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))} */}
       
            
      

            <ListItem disablePadding>
                <ListItemButton >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/Login">Login</Link>} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary={<Link onClick={toggleModal}>User OTP Login</Link>} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link onClick={OwnerModal}>Agent OTP Login</Link>} />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/signup">User Registration</Link>} />
                </ListItemButton>
            </ListItem>
      
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/AgentSignup">Agent Registration</Link>} />
                </ListItemButton>
            </ListItem>
        </List>
        </div>
        )}
        </Box>
          
    );


    return (
        <div>
  {/* Agent */}
         
  {isOwner && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto  bg-opacity-80 flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-xl">
            <div className="relative flex flex-col md:flex-row space-y-8 md:space-y-0 shadow-2xl rounded-2xl">
              <div className="p-4 md:p-10 flex-grow bg-white shadow-2xl rounded-2xl">
                <button
                  onClick={OwnerModal}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"                  >
                <div className="flex items-center">
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1L3 7l6 6"
                        />
                    </svg>
                    <span className="ml-1.5">back</span>
                </div>

                </button>
                <div class="relative">
                <form class="space-y-4 mt-4" onSubmit={FormOwnerSubmit}>
                    <div>
                    <span className='mb-2 text-md'>Agent Email</span>
                    <input type="email" name="email" id="email" className="form-control"    value={Email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <button type="submit" >Get OTP</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    </div>
                </form>
            </div>
             </div>
             
            </div>
          </div>
        </div>
      )}

{isOwnerOTP && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-textbg flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-xl ">
            <div className="relative flex flex-col md:flex-row space-y-8 md:space-y-0 shadow-2xl rounded-2xl">
              <div className="p-4 md:p-10 flex-grow bg-white shadow-2xl rounded-2xl">
                <button
                onClick={OwnerOtpMOdel}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" >
                   <div className="flex items-center">
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1L3 7l6 6"
                        />
                    </svg>
                    <span className="ml-1.5">back</span>
                </div>

                </button>

              
                <div class="relative">
                <form class="space-y-4 mt-10" onSubmit={OwnerOtpSubmit}>
                    <div>
                    <span className='mb-2 text-md'>Email</span>
                    <input type="email" name="email" id="email"  className="form-control"    value={Email} onChange={(e)=>setEmail(e.target.value)} required />
                    </div>
                    <div>
                    <span className='mb-2 text-md'>OTP</span>
                    <input type="text" name="otp" id="otp" className="form-control"   value={otp} onChange={(e)=>setotp(e.target.value)} required />
                    </div>
                    <button type="submit" className="">Verify OTP</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    </div>
                </form>
              </div>
             </div>
            </div>
          </div>
        </div>
      )}























            {/* User */}

            {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto  bg-opacity-80 flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-xl">
            <div className="relative flex flex-col md:flex-row space-y-8 md:space-y-0 shadow-2xl rounded-2xl">
              <div className="p-4 md:p-10 flex-grow bg-white shadow-2xl rounded-2xl">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"                  >
                <div className="flex items-center">
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1L3 7l6 6"
                        />
                    </svg>
                    <span className="ml-1.5">back</span>
                </div>

                </button>
                <div class="relative">
                <form class="space-y-4 mt-4" onSubmit={FormSubmit}>
                    <div>
                    <span className='mb-2 text-md'>Email</span>
                    <input type="email" name="email" id="email" className="form-control"    value={Email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <button type="submit" >Get OTP</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    </div>
                </form>
            </div>
             </div>
             
            </div>
          </div>
        </div>
      )}
       {isotpModelOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-textbg flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-xl ">
            <div className="relative flex flex-col md:flex-row space-y-8 md:space-y-0 shadow-2xl rounded-2xl">
              <div className="p-4 md:p-10 flex-grow bg-white shadow-2xl rounded-2xl">
                <button
                onClick={OTPModal}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" >
                   <div className="flex items-center">
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1L3 7l6 6"
                        />
                    </svg>
                    <span className="ml-1.5">back</span>
                </div>

                </button>

              
                <div class="relative">
                <form class="space-y-4 mt-10" onSubmit={OTPSubmit}>
                    <div>
                    <span className='mb-2 text-md'>Email</span>
                    <input type="email" name="email" id="email"  className="form-control"    value={Email} onChange={(e)=>setEmail(e.target.value)} required />
                    </div>
                    <div>
                    <span className='mb-2 text-md'>OTP</span>
                    <input type="text" name="otp" id="otp" className="form-control"   value={otp} onChange={(e)=>setotp(e.target.value)} required />
                    </div>
                    <button type="submit" className="">Verify OTP</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    </div>
                </form>
              </div>
             </div>
            </div>
          </div>
        </div>
      )}
        <div className='Navbar' >
            <ToastContainer/>
            {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))} */}



            <MenuIcon className='height:25px'
                onClick={
                    toggleDrawer("left", true)
                }
            />

            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>

        </div>
        </div>
    )
}

export default Navbar