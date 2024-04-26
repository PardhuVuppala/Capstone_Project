import React,{useEffect,useState} from 'react'
import Navbar from "./Navbar";
import axios from 'axios'
import Cookies from 'js-cookie';
export default function Booking() {
    const [containers, setContainers] = useState([]);
  useEffect(()=>
  {   
    const user_id = Cookies.get('user_id');
    
   const body= {
        user_id
    }  
    axios.post("http://localhost:4500/Booking/user/booked-containers",body) 
    .then(response=>
        { console.log(response.data.containers)
            setContainers(response.data.containers);
        })
    .catch(error => {
           console.error('Error fetching containers:', error);
        });
  },[])
  return (
    <div>
        <Navbar/>
        <div className='mt-5'>
      <div className="row no-gutters d-flex justify-content-center">
  {containers.map(container => (
    <div className="col-sm-5 m-2" key={container._id}>
      <div className="card">
      <div className="row no-gutters ">
          <img src="https://tse4.mm.bing.net/th?id=OIP.6gGESdByWOGl3GEDfT1srwHaFH&pid=Api&P=0&h=180" className="card-img img-fluid col-md-4" alt="Container" />
          <div className="col-md-8">
            <div className="card-body">
              {/* <h5 className="card-title">Owner ID: {container.ownerid}</h5> */}
              {/* {container.ownerid} */}
              <h5 className="card-title">Owner Name: {container.owner_name}</h5>
              <p><strong>Container Type:</strong> {container.con_type}</p>
              <p><strong>Container Dimensions:</strong> {container.con_dimension}</p>
              <p><strong>Container Unique ID:</strong> {container.con_uniqueid}</p>
              <p><strong>Container Booking Start Time:</strong> {container.start_time}</p>
              <p><strong>Container Returning Time:</strong> {container.end_time}</p>
              <p><strong>Conatiner Booking Id :</strong> {container.bookingId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
     
    </div>
  )
}
