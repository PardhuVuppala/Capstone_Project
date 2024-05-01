import React, { useEffect } from 'react'
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

export default function HomeTester() {
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
  const owner_id = Cookies.get('owner_id')

})

  return (
    <div>
      <Navbar/>
       <div className=" flex items-center h-[680px] ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row md:flex-row md:justify-between gap-40 items-center h-full">
          <div className="text-white text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">
              Start learning <br />
              from the world's <br />
              best learning institutions
            </h1>
            <h2 className="text-xl mb-4">
              Build skills with Courses, Certificates, and degrees <br />
              Online from the World-class Universities.
            </h2>
            <button className="bg-white text-teal-800 py-2 px-4 rounded-lg text-lg font-bold hover:bg-teal-700 hover:text-white">
              Register
            </button>
          </div>
          <div className="hidden md:block flex-1 h-auto">
            <img className="h-full object-cover" src={girl} alt="Girl" />
          </div>
        </div>
      </div>

      {/* Course Cards */}
        
      <div>
      <h1 className="text-center text-5xl mt-4 mb-10 font-bold text-blue-900">Explore Top Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-8 my-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-48 object-fill" />
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{course.title.slice(0,25) + '...'}</h2>
              <p className="text-gray-700 text-base">{course.description.slice(0,100) + "..."}</p>
              <ul className="mt-2 text-sm text-gray-600">
                <li>Duration: {course.duration}</li>
                <li>Level: {course.level}</li>
              </ul>
              <a href={course.video} className="mt-4 block text-center bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Watch Now</a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 mb-8 rounded">
          View All Courses
        </button>
      </div>
    </div>

     {/* Reasons */}
     <div className=" flex flex-col items-center mx-auto py-10 px-4 mb-16 sm:px-6 lg:px-8 bg-[#1b3146]">
      <div className="text-5xl font-bold mb-20 text-center text-white">
        Why E-Learning Academy Works
      </div>
      <div className="flex flex-col md:flex-row  justify-between gap-20 items-center ">
        <div className="flex flex-col justify-center items-center md:mr-16 pt-14 ">
          <img
            className="w-40 "
            src={Personalized}
            alt="Personalized learning"
          />
          <h3 className="text-xl font-bold mt-8 mb-4 text-white ">
            Personalized Learning
          </h3>
          <p className="text-slate-500 text-center max-w-[250px] ">
            Challenge yourself and change your career with an 10-13.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center md:mx-8 pt-7">
          <img
            className="w-40"
            src={Trusted}
            alt=""
          />
          <h3 className="text-xl font-bold mt-8 mb-4 text-white ">
            Trusted content
          </h3>
          <p className="text-slate-500 text-center max-w-[250px] ">
            Challenge yourself and change your career with an 10-13.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center md:ml-16  pt-3">
          <img
            className="w-40 "
            src={Prize}
            alt=""
          />
          <h3 className="text-xl font-bold mt-8 mb-4 text-white ">
            Tools to empower teachers
          </h3>
          <p className="text-slate-500 text-center max-w-[250px] ">
            Challenge yourself and change your career with an 10-13.
          </p>
        </div>
      </div>
    </div>

    {/* CLient Testimonial */}
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-4">
          What Our Clients Say About Us
        </h2>
        <h3 className="text-lg font-medium mb-6 flex-wrap max-w-lg">
          Build skills with courses, certificates, and degrees online from
          world-class universities. Graduate. This short quiz will sort.
        </h3>
      </div>

      <div className="flex my-8 max-w-auto">
        <div className="flex justify-center items-center flex-grow gap-28 ml-8">
          <div className="flex-none w-1/3 ">
            <img className="rounded-lg w-60 h-50" src={Profile} alt="Client testimonial" />
          </div>

          <div className="text-2xl font-medium flex-wrap  max-w-sm ">
            "I started with their free courses but quickly became a customer
            once I saw how useful the lessons were."
            <h4 className="text-base font-bold mt-20">
              Cameron Wilson,
            </h4>
              <h5> The Disney Company</h5>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-cyan-800 text-white py-6">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/4 px-4 mb-8">
          <h4 className="text-xl font-bold mb-4">Company</h4>
          <ul className="list-none">
            <li className="mb-2"><a href="#">About Us</a></li>
            <li className="mb-2"><a href="#">Blog</a></li>
            <li className="mb-2"><a href="#">Careers</a></li>
            <li className="mb-2"><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4 px-4 mb-8">
          <h4 className="text-xl font-bold mb-4">Support</h4>
          <ul className="list-none">
            <li className="mb-2"><a href="#">Help Center</a></li>
            <li className="mb-2"><a href="#">Safety Center</a></li>
            <li className="mb-2"><a href="#">Community Guidelines</a></li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4 px-4 mb-8">
          <h4 className="text-xl font-bold mb-4">Legal</h4>
          <ul className="list-none">
            <li className="mb-2"><a href="#">Cookies Policy</a></li>
            <li className="mb-2"><a href="#">Privacy Policy</a></li>
            <li className="mb-2"><a href="#">Terms of Service</a></li>
            <li className="mb-2"><a href="#">Law Enforcement</a></li>
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
          <p className="text-sm text-slate-300 ">@ 2020 Bravaa. All rights reserved.</p>
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
