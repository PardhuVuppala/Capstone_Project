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
const [phone,setPhone] = useState("");
const [country,setContry] = useState("");
const [Address,setAddress]  = useState("");
const [role,setRole]  =useState("");
const [company,setCompany] = useState("");
const [userDOB, setUserDOB] = useState(new Date());
const notify = (message) => toast(message);

const handleSubmitOwner=(e)=>{ 
    e.preventDefault();
    const owner_id = Cookies.get("owner_id");
    const body ={owner_id,name,email,Gender,phone,country,Address,company};
    axios.post("http://localhost:4500/owner/Update",body)
    .then(response=>
    {
        notify("Successfully Updated");

    })
    .catch(error=>
    {
        console.error('Error updating owner details:', error);  
    })
}


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
    const owner_id = Cookies.get('owner_id')
    console.log(owner_id);
    setId(owner_id);
    setRole(role);

    if (role==="user" && user_id) {
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
        if(role==="agent" && owner_id)
        {
            const body = {
                id: owner_id
            }
            axios.post("http://localhost:4500/owner/Profile", body)
            .then(response=>
            {
                console.log(response.data);
                setname(response.data.owner_name);
                setEmail(response.data.owner_email);
                setAddress(response.data.owner_address);
                setGender(response.data.owner_gender);
                setPhone(response.data.owner_mobile);
                setCompany(response.data.owner_company);
                setContry(response.data.owner_country)

            })
            .catch(error=>{
                console.error('Error fetching user details:', error);  
            })

        }
}, []);

  return (
    <div>
      <Navbar/>
      <ToastContainer/>
      {/* <h1 className="text-center">Profile Page</h1> */}
      {role==="user" && (
      <section className="py-10 my-auto ">
       
    <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-white">
            <div className="">
                <h1
                    className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                    Profile
                </h1>
                <h2 className="text-grey text-sm mb-4 dark:text-gray-600 text-center">Edit Profile</h2>
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
                                    placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
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
                        <h3 className="dark:text-gray-300 mb-2">Phone</h3>
                                   <input type="phone"
                                    className="form-control p-4"
                                    placeholder="Phone no."  value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        </div>
                    
                    </div>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
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
)}

{role==="agent" && (
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
                <form onSubmit={handleSubmitOwner}>
                   
                        <div
                            className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://www.pngkey.com/png/detail/121-1219231_no-image-png.png')] bg-cover bg-center bg-no-repeat mb-3">

                            
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
                                    placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
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
                            <label for="" className=" dark:text-gray-300">Company</label>
                            <input type="text"
                                    className="form-control p-4"
                                    placeholder="Company"  value={company} onChange={(e)=>setCompany(e.target.value)}/>
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
)}
    </div>
  )
}
