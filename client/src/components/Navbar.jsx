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
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import '../assets/Navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { useEffect,useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from 'react-router-dom';

import Cookies from 'js-cookie';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

const Navbar = () => {
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
                         <ListItemText primary={<Link to="/Home">Home</Link>} />
                     </ListItemButton>
                 </ListItem>
                 <ListItem disablePadding>
                     <ListItemButton>
                         <ListItemIcon>
                             <PersonIcon/>
                         </ListItemIcon>
                         <ListItemText primary={"Profile"} />
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
                    <ListItemText primary={<Link to="/Home">Home</Link>} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Profile"} />
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
        </Box>
          
    );


    return (
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
    )
}

export default Navbar