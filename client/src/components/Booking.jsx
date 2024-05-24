import React,{useEffect,useState} from 'react'
import Navbar from "./Navbar";
import axios from 'axios'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
    const [containers, setContainers] = useState([]);
    const navigate = useNavigate();
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
          navigate("/");
        });
    } else {
      // Handle missing token
      navigate("/");
    }
  }, [navigate]);


 

  return (
    <div>
        <Navbar/>
    <div className="p-5">
    {containers.map(container => {
        const startTime = new Date(container.start_time);
        const endTime = new Date(container.end_time);
        const day = startTime.getDate();
        const month = startTime.toLocaleString('default', { month: 'long' });
        const year = startTime.getFullYear();
        const endDay = endTime.getDate();
        const endMonth = endTime.toLocaleString('default', { month: 'long' });
        const endYear = endTime.getFullYear();
        const formattedStartTime = `${day}, ${month} ${year}`;
        const formattedEndTime = `${endDay}, ${endMonth} ${endYear}`;

        return (
          <div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg mb-2" key={container._id}>
            <div className="mt-2 flex justify-start bg-white p-2">
              <div className="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 p-1">
                <svg viewBox="0 0 640 512" pointer-events="all" aria-hidden="true" className="etiIcon css-jbc4oa" role="presentation" style={{ fill: 'rgb(102, 102, 102)', height: '12px', width: '20px' }}>
                  <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                </svg>
              </div>
            </div>
            <div className="mt-2 mb-6 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
              <div className="flex flex-row place-items-center p-2">
                <img alt="Qatar Airways" className="w-10 h-10" src="data:image/png;base64,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" style={{ opacity: 1, transformOrigin: '0% 50% 0px', transform: 'none' }}/>
                <div className="flex flex-col ml-2">
                  <p className="text-xs text-gray-500 font-bold">{container.owner_name}</p>
                  <p className="text-xs text-gray-500">{container.con_type}</p>
                  <div className="text-xs text-gray-500">{container.con_dimension}</div>
                </div>
              </div>

              <div className="flex flex-col p-2">
                {/* Display the formatted start time */}
                <p className="font-bold">Start Date</p>
                <p className="text-gray-500 font-bold">{formattedStartTime}</p>
                <p className="font-bold">Container Id</p>
                <p className="text-gray-500"><span className="font-bold"></span>{container.con_uniqueid}</p>
              </div>
              <div className="flex flex-col flex-wrap p-2">
              <p className="font-bold">End Date</p>
              <p className="text-gray-500 font-bold">{formattedEndTime}</p>
              <p className="font-bold">Container Id</p>
              <p className="text-gray-500"><span className="font-bold"></span>{container.bookingId}</p>
              </div>
            </div>
          </div>
        );
      })}
</div>
</div>
  )
}
