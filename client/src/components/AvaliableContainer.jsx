import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AvaliableContainer() {
  const [showModal, setShowModal] = useState(false);
  const [start_time, setStarttime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [container, setContainer] = useState(null);
  const [containers, setContainers] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // State for controlling notification
  const notify = (message) => toast(message);

  useEffect(() => {
    axios.get('http://localhost:4500/con/containers')
      .then(response => {
        setContainers(response.data);
      })
      .catch(error => {
        console.error('Error fetching containers:', error);
      });
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(container);

    const userId = Cookies.get('user_id');
    const user_id = userId;
    const agent_id = container.ownerid;
    const cont_id = container._id;
    const body = {
      user_id,
      agent_id,
      cont_id,
      start_time,
      end_time
    };

    axios.post("http://localhost:4500/Booking/register", body)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          setShowNotification(true); // Set state to show notification
          notify(response.data.message);
          console.log(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          notify(error.response.data.message);
          console.log(error.response.data.message);
        } else {
          console.error('Registration failed:', error.message);
        }
      });
  }
  const handleclose = (e) => {
    if (e) {
      e.preventDefault();
    }
    setShowModal(false);
  }

  return (
    <div>
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Filter Options</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="dimensionFilter">Dimensions:</label>
          <select class="form-control" id="dimensionFilter">
            <option value="">All</option>
            <option value="10X9X8">10X9X8</option>
            <option value="8X7X9">8X7X9</option>
            <option value="6X8X10">6X8X10</option>
          </select>
        </div>
        <div class="form-group">
          <label for="typeFilter">Type:</label>
          <select class="form-control" id="typeFilter">
            <option value="">All</option>
            <option value="Type-A">Type-A</option>
            <option value="Type-B">Type-B</option>
            <option value="Type-C">Type-C</option>
          </select>
        </div>
        <div class="form-group">
          <label for="startDate">Start Date:</label>
          <input type="date" class="form-control" id="startDate"/>
        </div>
        <div class="form-group">
          <label for="endDate">End Date:</label>
          <input type="date" class="form-control" id="endDate"/>
        </div>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Apply Filters</button>
      </div>
    </div>
  </div>
</div>


      <div>
      <ToastContainer />
      </div>
      <Header />
      <h1>Container List</h1>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button>
      <div className="row no-gutters">
        {containers.map(container => (
          <div className="col-sm-6 mb-4" key={container._id}>
            <div className="card">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src="https://tse4.mm.bing.net/th?id=OIP.6gGESdByWOGl3GEDfT1srwHaFH&pid=Api&P=0&h=180" className="card-img" alt="Container" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h>{container.ownerid}</h>
                    <h5 className="card-title">Owner: {container.owner_name}</h5>
                    <p className="card-text">Type: {container.con_type}.</p>
                    <p>Dimension: {container.con_dimension}</p>
                    <button type="button" className="btn btn-primary" onClick={() => { setShowModal(true); setContainer(container); }}>Book Container</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden={!showModal}
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button
                type="button"
                className="close"
                onClick={handleclose} 
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <label>Booking Time</label>
              <input type="datetime-local"  className="form-control" name="start_time" value={start_time} onChange={(e)=>setStarttime(e.target.value)}  required/>
             <label> End Slot</label>
              <input type="datetime-local" className="form-control" name="end_time" value={end_time} onChange={(e)=>setEndTime(e.target.value)} required/>
            </div>
            <div className="modal-footer">
            
              <button type="submit" className="btn btn-primary" >
                Book
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
