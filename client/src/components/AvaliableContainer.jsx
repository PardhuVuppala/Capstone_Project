import React, { useEffect, useState } from 'react';
// import Header from './Header';
import Navbar from "./Navbar";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function AvailableContainer() {
  const [showModal, setShowModal] = useState(false);
  const [start_time, setStarttime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [container, setContainer] = useState(null);
  const [containers, setContainers] = useState([]);
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const notify = (message) => toast(message);

  useEffect(() => {
    axios.get('http://localhost:4500/con/containers')
      .then(response => {
        setContainers(response.data);
        setFilteredContainers(response.data); // Initially, display all containers
      })
      .catch(error => {
        console.error('Error fetching containers:', error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const body = {
      start_time: startDate,
      end_time: endDate,
      con_type: type,
      con_dimension: dimension
    }
    axios.post('http://localhost:4500/Booking/available', body)
      .then(response => {
        setFilteredContainers(response.data.containersWithAvailability);
      })
      .catch(error => {
        console.error(error);
      });
  }

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
          setShowNotification(true);
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
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Filter Options</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSearch}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="dimensionFilter">Dimensions:</label>
                  <select className="form-control" id="dimensionFilter" value={dimension} onChange={(e) => setDimension(e.target.value)}>
                    <option>All</option>
                    <option value="6X8X10">6X8X10</option>
                    <option value="8X7X9">8X7X9</option>
                    <option value="6X8X10">6X8X10</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="typeFilter">Type:</label>
                  <select className="form-control" id="typeFilter" value={type} onChange={(e) => setType(e.target.value)}>
                    <option>All</option>
                    <option value="type A">Type-A</option>
                    <option value="type B">Type-B</option>
                    <option value="type C">Type-C</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input type="datetime-local" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input type="datetime-local" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Apply Filters</button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <div>
        <ToastContainer />
      </div>
      <Navbar/>
      <h1 className='text-center'>Container List</h1>
      <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
  <Fab variant="extended" data-toggle="modal" data-target="#exampleModalCenter">
    <FilterAltIcon sx={{ mr: 1 }} />
    Filter Container
  </Fab>
</Box>
      <div className="row no-gutters">
  {console.log(filteredContainers)} {/* Add this line */}
{filteredContainers.map(container => (
    
  
    <div className="p-10">
    <div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
      
      <div className="mt-2 flex justify-start bg-white p-2">
        <div className="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 p-1">
        <svg viewBox="0 0 640 512" pointer-events="all" aria-hidden="true" className="etiIcon css-jbc4oa" role="presentation" style={{ fill: 'rgb(102, 102, 102)', height: '12px', width: '20px' }}>
        <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
        </svg>
          <p className="font-normal text-sm ml-1 text-gray-500">Container Booking</p>
        </div>
      </div>
      <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
        <div className="flex flex-row place-items-center p-2">
          <img alt="Qatar Airways" className="w-10 h-10" src="data:image/png;base64,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" style={{ opacity: 1, transformOrigin: '0% 50% 0px', transform: 'none' }} />
          <div className="flex flex-col ml-2">
          <p className="text-xs text-gray-500 font-bold overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '150px' }}>{container.owner_name}</p>
          <p className="text-xs text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '150px' }}>{container.con_type}</p>
          <div className="text-xs text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '150px' }}>{container.con_dimension}</div>
        </div>
        </div>
      </div>
      <div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
        <div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
          <div className="text-sm mx-2 flex flex-col">
            <p>Container ID</p>
            <p className="font-bold">{container.con_uniqueid}</p>
          </div>
          <button className="w-32 h-11 rounded flex border-solid border text-white bg-green-800 mx-2 justify-center place-items-center" onClick={() => { setShowModal(true); setContainer(container); }}><div className="">Book</div></button>
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
                <input type="datetime-local" className="form-control" name="start_time" value={start_time} onChange={(e) => setStarttime(e.target.value)} required />
                <label> End Slot</label>
                <input type="datetime-local" className="form-control" name="end_time" value={end_time} onChange={(e) => setEndTime(e.target.value)} required />
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
