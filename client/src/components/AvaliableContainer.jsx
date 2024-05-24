import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from './Header';
import Navbar from "./Navbar";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


export default function AvailableContainer() {
  const [start_time, setStarttime] = useState('');
  const [State,setState]=useState(true);
  const [end_time, setEndTime] = useState('');
  const [container, setContainer] = useState(null);
  const [containers, setContainers] = useState([]);
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Role,setRole] = useState("");
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [BoolFliter,SetBoolFliter] = useState(false);
  const [FilteredId, setFilteredId] = useState([]);
  const notify = (message) => toast(message);
  const [showAuthenticationModal, setShowAuthenticationModal] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .get("http://localhost:4500/user/is-verify", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
        })
        .catch((error) => {
          console.error(error);
          Navigate("/");
        });
    } else {
      // Handle missing token
      Navigate("/");
    }
  }, [Navigate]);

  const onLogin =() =>{
            notify("Please Login for proceed with the booking");
            setTimeout(()=>
              {
                Navigate("/Login");
              },2000)
         

    }

  const toggleAuthenticationModal = () => {
    setShowAuthenticationModal(!showAuthenticationModal);
  };

  const closeModal = () => {
    setShowAuthenticationModal(false);
  };
   const Refresher=()=>
  {
    window.location.href = "avaliablecontainer";
  }

  useEffect(() => {
    axios.get('http://localhost:4500/con/containers')
      .then(response => {
        setContainers(response.data);
        setFilteredContainers(response.data); // Initially, display all containers
        const role = Cookies.get("role");
        setRole(role);

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
    };

    axios.post('http://localhost:4500/Booking/available', body)
      .then(response => {
        console.log(response.data.containersWithAvailability);
        const availabilityData = response.data.containersWithAvailability;
        const filteredContainers = containers.filter(container => availabilityData[container._id]);
        setFilteredContainers(filteredContainers);
        SetBoolFliter(true)
        setState(false);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const currentDate = new Date().toISOString().slice(0, 16);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const EndDate = tomorrow.toISOString().slice(0, 16);

  const handleSubmit = (e) => {
    console.log(container);
    e.preventDefault();
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
        // console.log(response.data);
        if (response.status === 200) {
          
          notify(response.data.message);
          setShowAuthenticationModal(!showAuthenticationModal);
          // console.log(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          notify(error.response.data.message);
          // console.log(error.response.data.message);
        } else {
          console.error('Registration failed:', error.message);
        }
      });
  }
  
  const paymentHandler = async (e) => {
    e.preventDefault();
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);
    
    const timeDifferenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const timeDifferenceInDays = timeDifferenceInMilliseconds / (1000 * 3600 * 24);
    // 12.2X2.44X2.59 : 40ft
    // 6.1X2.44X2.59 : 20f
    // ownerid

    if(container.con_dimension==="12.2X2.44X2.59 : 40ft")
     { 
     var amount = 50000*timeDifferenceInDays;
     }
     else if(container.con_dimension ==="6.1X2.44X2.59 : 20ft"){
      var amount = 30000*timeDifferenceInDays;
     }
     else
     {
      var amount = 100000*timeDifferenceInDays;
     }

    var currency = "INR";
    var ContainerUniqueID = container.con_uniqueid;
    const username = Cookies.get("username");
    const phone = Cookies.get("phone");
    const email = Cookies.get("user_email")
    const response = await fetch("http://localhost:4500/payment/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: ContainerUniqueID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_VbOIVCIw6g4EGe", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Container Booking Management", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:4500/payment/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes.msg);
        if(jsonRes.msg)
          {   
            const userId = Cookies.get('user_id');

            try {
              const body = {
                  user_id: userId,
                  agent_id: container.ownerid,
                  cont_id: container._id,
                  payment_id: jsonRes.paymentId,
                  order_id: jsonRes.orderId,
                  amount : amount
              };
  
              const response = await axios.post('http://localhost:4500/payment/sent', body);
              // console.log('Transaction saved:', response.data);
              if(response.data.success)
                {
                  handleSubmit(e);
                }
          } catch (error) {
              console.error('Error saving transaction:', error);
          }
          }

      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: username, //your customer's name
        email: email,
        contact: phone, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };


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
                  <select className="form-control" id="dimensionFilter" value={dimension} onChange={(e) => setDimension(e.target.value)} required>
                    <option value="" disabled>Select Dimension Type</option>
                    <option value="18.3X2.44X2.59 : 60ft ">18.3X2.44X2.59 in M</option>
                    <option value="12.2X2.44X2.59 : 40ft">12.2X2.44X2.59 in M</option>
                    <option value="6.1X2.44X2.59 : 20ft">5.9X2.44X2.59 in M</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="typeFilter">Type:</label>
                  <select className="form-control" id="typeFilter" value={type} onChange={(e) => setType(e.target.value)} required>
                   <option value="" disabled>Select Container Type</option>
                   <option value="Dry Storage Container">Dry Storage Container</option>
                    <option value="Refrigerated Container">Refrigerated Container</option>
                    <option value="Cargo Storage Roll Container">Cargo Storage Roll Container</option>
                    <option value="Open Top Container">Open Top Container</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input type="datetime-local" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={currentDate} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input type="datetime-local" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={currentDate} required/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" >Apply Filters</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
      </div>
      <Navbar/>
      
    { !BoolFliter && (<h1 className="text-center text-white">
  Container List Shown Here. You can book for only one day. If you want to book for multiple days, you have to apply the filter.
</h1>)}
    {BoolFliter && (
       <h1 className="text-center text-white">Here, You can book conatiner for any number of days as you applied</h1>
    )}
  
      

{!State && (
 <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
 <Fab variant="extended" data-toggle="modal" onClick={Refresher}>
   <FilterAltOffIcon sx={{ mr: 1 }} />
   UnFilter Container
 </Fab>
</Box>
)}

{State && (

<Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
  <Fab variant="extended" data-toggle="modal" data-target="#exampleModalCenter">
    <FilterAltIcon sx={{ mr: 1 }} />
    Filter Container
  </Fab>
</Box>

)}   
 

      
<div className="row no-gutters" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  {/* {console.log(filteredContainers)} Add this line */}

{Array.isArray(filteredContainers) && filteredContainers.map(container => (
    
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
          <p className="text-xs text-gray-500 font-bold overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '120px' }}>{container.owner_name}</p>
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
          {!BoolFliter && Role && (
  <>
    {container.availability ? (
      <button
        className="block text-white bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        onClick={() => { toggleAuthenticationModal(); setContainer(container); }}
      >
        Book
      </button>
    ) : (
      <button
        className="block text-white bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        disabled
      >
        Booked
      </button>
    )}
  </>
)}

{BoolFliter && Role && (
  <button
    className="block text-white bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    type="button"
    onClick={() => { toggleAuthenticationModal(); setContainer(container); }}
  >
    Book
  </button>
)}

            

        {!Role && (
          <button
          className="block text-white bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
          onClick={onLogin}>
          Book
        </button>
        )}

        


        
      
      </div>
      </div>
    </div>
  </div>
  ))}
</div>
      <div>
      {showAuthenticationModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Book Container
                 </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={closeModal}
                >
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
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" >
                  {!BoolFliter && (
                    <div>
                      <div>
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900">
                         Booking Slot    
                      </label>
                      <input type="datetime-local" className="form-control" name="start_time" value={start_time} onChange={(e) => setStarttime(e.target.value)} min={currentDate} max={EndDate} required/>
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        End Slot
                      </label>
                      <input type="datetime-local" className="form-control" name="end_time" value={end_time} onChange={(e) => setEndTime(e.target.value)} min={currentDate} max ={EndDate} required />
                    </div>
                    </div>
                  )}
                  {BoolFliter &&(
                     <div>
                     <div>
                     <label
                       htmlFor="date"
                       className="block mb-2 text-sm font-medium text-gray-900">
                        Booking Slot    
                     </label>
                     <input type="datetime-local" className="form-control" name="start_time" value={start_time} onChange={(e) => setStarttime(e.target.value)} min={currentDate}  required/>
                   </div>
                   <div>
                     <label
                       htmlFor="date"
                       className="block mb-2 text-sm font-medium text-gray-900"
                     >
                       End Slot
                     </label>
                     <input type="datetime-local" className="form-control" name="end_time" value={end_time} onChange={(e) => setEndTime(e.target.value)} min={currentDate} required />
                   </div>
                   </div>

                  )}
                
                  <button
                    type="submit"
                    className="w-full text-white bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={paymentHandler}
                  >
                    Book
                  </button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
