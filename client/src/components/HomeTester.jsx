import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import girl from '../images/girl.png';
import courses from "../data/courses.json";
import Personalized from "../images/personalized.png";
import Trusted from "../images/trusted.png";
import Prize from "../images/prize.png";
import man from "../images/man.png";
import Navbar from "./Navbar"
import app from "../images/app.png";
import Profile from "../images/Profile.jpeg";
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
export default function HomeTester() {
  const [Messages,setMessages] = useState([]);
  const [role,setRole] = useState("")
 useEffect(()=>
{
  // Cookies.set('user_id',user_id);
  //       Cookies.set('token',token);
  //       Cookies.set('role',role);
  //       Cookies.set('username',username)  
  const user_id = Cookies.get("user_id");
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const username = Cookies.get("username");
  const owner_id = Cookies.get('owner_id');
  setRole(role);
  if(role==="user")
    { const require_id = user_id; 
      const body= {
        require_id
    } 
      axios.post("http://localhost:4500/Notification/notification",body) 
      .then(response=>
          {   console.log(response.data)
              setMessages(response.data);
          })
      .catch(error => {
             console.error(error);
          });
          
    }
    else if(role==="agent")
    {
      const require_id = owner_id;
      const body= {
        require_id
    } 
      axios.post("http://localhost:4500/Notification/notification",body) 
      .then(response=>
          {   console.log(response.data)
              setMessages(response.data);
          })
      .catch(error => {
             console.log(error);
          });

    }
   
},[]);
const handleEnquireNowClick = () => {
  const isLoggedIn = role && role !== ""; // Check if user is logged in
  if (isLoggedIn) {
    // If user is logged in, redirect to available containers
    window.location.href = "avaliablecontainer"; // Replace with your actual page
  } else {
    // If user is not logged in, redirect to login page
    window.location.href = "Login"; // Replace with your actual login page
  }
};

  return (
    <div>
    <Navbar/>
    {role && (
      <Box sx={{ position: 'fixed', top: '70px', right: '5px', zIndex: '1000' }}>
      <Fab variant="extended" data-toggle="modal" data-target="#exampleModalCenter">
      <NotificationsIcon sx={{ mr: 0 }} />
      </Fab>
      </Box>
    )}
    
    {/* Notification Toogle */}
    
    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog" role="document" style={{ position: 'fixed', top: '110px', right: '20px', margin: '0', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title text-center" id="exampleModalLongTitle">Notification</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {Messages.map(message => (
          <div key={message._id} className="alert alert-primary" role="alert">
            <h5 className="alert-heading">{message.message}</h5>
            <p className="mb-0">Message At: {message.date}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


       <div className=" flex items-center h-[680px] ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row md:flex-row md:justify-between gap-40 items-center h-full">
          <div className="text-white text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">
              Logistics made <br />
              easy through <br />
              Digital Solutions...
            </h1>
            <h2 className="text-xl mb-4">
              Register and you will soon be able to <br />
              manage your logistics online.
            </h2>
            <button onClick={handleEnquireNowClick} className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg text-lg font-bold border">
              Enquire Now
            </button>
          </div>
          <div className="hidden md:block flex-1 h-auto">
            <img className="h-full object-cover" src={girl} alt="Girl" />
          </div>
        </div>
      </div>

     <section id="containers">  
      <div>
      <h1 className="text-center text-5xl mt-4 mb-10 font-bold">
  <span style={{ backgroundColor: 'rgba(128, 40, 40, 0.5)', color: '#ffffff' }} className="p-2 rounded ">Shipping Containers</span>
</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-8 my-8">
  {courses.map((course) => (
    <div key={course.id} className="relative">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
        <img src={course.image} alt={course.title} className="h-80 object-cover" />
      </div>
      <div className="mt-4 text-center">
        <h2 className="font-bold text-2xl text-white">{course.title}</h2>
      </div>
    </div>
  ))}
</div>

      <div className="flex justify-center mt-4">
      <Link to="/avaliablecontainer">
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 mb-8 rounded border border-light">
          View All Containers
        </button>
        </Link>
      </div>
    </div>
    </section> 

     {/* Reasons */}
     <div className="flex flex-col items-center mx-auto py-10 px-4 mb-16 sm:px-6 lg:px-8 bg-[#1b3146]">
  <div className="text-5xl font-bold mb-20 text-center text-white">
    We Offer
  </div>
  <div className="flex flex-col md:flex-row justify-between gap-20 items-center">
    {[
      {
        img: Personalized,
        title: "Customization",
        text: "Select the size, condition and door direction that meet needs. Sen selectiona and checkout through our secure payment portal.",
      },
      {
        img: Trusted,
        title: "Networking",
        text: "We provide container networking service with our vast network which enables us in delivering goods to every corner of the globe.",
      },
      {
        img: Prize,
        title: "Pickup and Drop",
        text: "Our team always strives to make sure that all goods are picked up and delivered at door step, so that you can enjoy hassle-free shipping.",
      },
      {
        img: girl,
        title: "Technical Support",
        text: "We offer beautiful and effective custom applications designed to increase sales and control shipments.",
      },
    ].map((offer, index) => (
      <div key={index} className="flex flex-col justify-between items-center text-center h-full p-6 bg-white rounded-lg shadow-md flex-1">
        <img className="w-full h-48 object-cover mb-4" src={offer.img} alt={offer.title} />
        <h3 className="text-xl font-bold text-[#1b3146]">{offer.title}</h3>
        <p className="text-slate-500 max-w-[250px] mt-4">{offer.text}</p>
      </div>
    ))}
  </div>
</div>


<section id="about">
<div className="flex flex-col items-center" style={{ backgroundColor: 'rgba(128, 128, 128, 0.25)' }}>
  <div className="text-center">
    <h1 className="text-5xl mt-4 mb-10 font-bold">
      <span style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', color: '#ffffff' }} className="p-2 rounded">About Us</span>
    </h1>
  </div>

  <div className="flex items-center justify-center" alignment="justify"> 
    <h2 className="text-lg font-medium mb-6 text-light flex-wrap max-w-2xl mr-4" >
      We're dedicated to modernizing container logistics management. With our expertise, we tackle the complexities of container operations efficiently. Our platform offers tailored solutions for businesses of all sizes. By optimizing processes and providing real-time tracking, we empower you to enhance efficiency and reduce costs. Join us and revolutionize your container management experience with us.
    </h2  >
  
    <img className="rounded-lg w-full h-80 m-4" src={Profile} alt="Client testimonial" />
  </div>
</div>
</section>
<br></br>
<section id="reviews">
<h2 className="text-center text-3xl mt-4 mb-10 font-bold">
  <span style={{ backgroundColor: 'rgba(128, 40, 40, 0.5)', color: '#ffffff' }} className="p-2 rounded ">Customers Review</span>
</h2>   <div class="max-w-screen-xl px-4 py-8 mx-auto m-2 text-center lg:py-16 lg:px-6 bg-dark rounded">
      <figure class="max-w-screen-md mx-auto">
          <svg class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg> 
          <blockquote>
              <p class="text-2xl font-medium text-gray-900 dark:text-white">"Great first experience for shipping containers. Very Impressed."</p>
          </blockquote>
          <figcaption class="flex items-center justify-center mt-6 space-x-3">
              <img class="w-6 h-6 rounded-full" src={man} alt="profile picture" />
              <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div class="pr-3 font-medium text-gray-900 dark:text-white">Nimai</div>
                  {/* <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400"></div> */}
              </div>
          </figcaption>
      </figure>
  </div>
</section>


    <footer className="bg-cyan-800 text-white py-6">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/4 px-4 mb-8">
          <h4 className="text-xl font-bold mb-4">Company</h4>
          <ul className="list-none">
            <li className="mb-2"><a href="#about" className="hover:text-white">About Us</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Services</a></li>
            <li className="mb-2"><a href="#reviews" className="hover:text-white">Reviews</a></li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4 px-4 mb-8">
          <h4 className="text-xl font-bold mb-4">Support</h4>
          <ul className="list-none">
            <li className="mb-2"><a href="#" className="hover:text-white">Help Center</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Safety Center</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Community Guidelines</a></li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4 px-4 mb-8">
          <h4 className="text-xl font-bold mb-4">Legal</h4>
          <ul className="list-none">
            <li className="mb-2"><a href="#" className="hover:text-white">Cookies Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Terms of Service</a></li>
            
          </ul>
        </div>
        <div className="w-full lg:w-1/4 px-4 lg:mt-0 mt-8">
          <h4 className="text-xl font-bold mb-4">Install App</h4>
          <div className="flex ">
            {/* <a href="#">
              <img src="/path/to/google-play-store-logo.png" alt="Google Play Store" className="mr-4" />
            </a>
            <a href="#"> */}
              <img className='w-1/2' src={app} alt="App Store" />
            {/* </a> */}
          </div>
        </div>
      </div>
      <hr className=" border-gray-700" />
      <div className=" mx-auto flex flex-wrap items-center  ">
        <div className="text-center w-full lg:w-1/2 px-4">
          <p className="text-sm text-slate-300 ">@ 2024 Capstone. All rights reserved.</p>
        </div>
        <div className=" flex gap-4  w-full lg:w-1/2 px-4 lg:text-right ">
{/*         
          <a href="#">
            <i className="fab fa-instagram text-2xl text-white-600 mx-2"><FaInstagram/></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter text-2xl text-white-600 mx-2"><FaTwitter/></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube text-2xl text-white-600 mx-2"><FaYoutube/></i>
          </a> */}
        </div>
      </div>
    </footer>


    </div>
  )
}