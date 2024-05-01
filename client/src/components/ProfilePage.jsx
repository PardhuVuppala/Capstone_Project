import React from 'react'
import Navbar from './Navbar'
import Cookies from 'js-cookie';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function ProfilePage() {
const [name,setname] = useState("");
const [email,setEmail] = useState("");
const [Gender,setGender] = useState("");
const[phone,setPhone] = useState("");
const[country,setContry] = useState("");
const[Address,setAddress]  = useState("");
const notify = (message) => toast(message);
const handleSubmit=(e)=>{ 
    e.preventDefault();
    const user_id = Cookies.get("user_id");
    const body ={user_id,name,email,Gender,phone,country,Address};
    axios.post("http://localhost:4500/user/Update",body)
    .then(response=>
    {
        notify("Successfully Updated");

    })
    .catch(error=>
    {
        console.error('Error fetching user details:', error);  
    })
}
const [u_id,setId] = useState("");
useEffect(() => {
    const user_id = Cookies.get("user_id");
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    const username = Cookies.get("username");
    setId(user_id);

    if (user_id) {
        const body = {
            id: user_id
        }
        axios.post("http://localhost:4500/user/Profile", body)
            .then(response => {
                console.log('User Details', response.data);
                setname(response.data.username);
                setEmail(response.data.useremail);
                setAddress(response.data.useraddress);
                setContry(response.data.usercountry);
                setGender(response.data.usergender);
                setPhone(response.data.usermobile);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }
}, []);

  return (
    <div>
      <Navbar/>
      <ToastContainer/>
      <h1 className="text-center">Profile Page</h1>
      <section className="py-10 my-auto ">
       
    <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-white">
            <div className="">
                <h1
                    className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                    Profile
                </h1>
                <h2 className="text-grey text-sm mb-4 dark:text-gray-400 text-center">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                   
                        <div
                            className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">

                            
                        </div>     
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                            <label for="" className=" dark:text-gray-300">Name</label>
                            <input type="text"
                                    className="form-control p-4"
                                    placeholder="Name" value={name} onChange={(e)=>setname(e.target.value)}/>
                        </div>
                        <div className="w-full  mb-2">
                            <label for="" className="dark:text-gray-300">Email</label>
                            <input type="email"
                                    className="form-control p-4"
                                    placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full mb-2">
                        <div className="w-full">
                            <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                            <select value={Gender} onChange={(e)=>setGender(e.target.value)}
                                    className="form-control" id="typeFilter" style={{ height: '50px' }}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                            <input type="date"
                                    className="form-control p-4" />
                        </div>
                    </div>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                            <label for="" className=" dark:text-gray-300">Phone Number</label>
                            <input type="phone"
                                    className="form-control p-4"
                                    placeholder="Phone no."  value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        </div>
                        <div className="w-full  mb-2">
                            <label for="" className="dark:text-gray-300">Country</label>
                            <input type="text"
                                    className="form-control p-4"
                                    placeholder="Country"  value={country} onChange={(e)=>setContry(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                            <label for="" className=" dark:text-gray-300">Address</label>
                            <textarea type="text"
                                    className="form-control p-4"
                                    placeholder="Address"  value={Address} onChange={(e)=>setAddress(e.target.value)}/>
                        </div>

                    </div>
                    <div className="w-full rounded-lg bg-green-800 mt-4 text-white text-lg font-semibold">
                        <button type="submit" className="w-full p-2">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</section>
    </div>
  )
}
