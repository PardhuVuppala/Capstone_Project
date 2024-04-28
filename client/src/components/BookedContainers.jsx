import React, { useState, useEffect } from 'react';
// import Header from './Header';
import axios from 'axios';
import Navbar from "./Navbar";
import Cookies from 'js-cookie';

export default function BookedContainers() {
    const [bookedUsers, setBookedUsers] = useState([]);

    useEffect(() => {
        const fetchBookedUsers = async () => {
            try {
                const response = await axios.post('http://localhost:4500/Booking/agent/booked-users', { agent_id: Cookies.get('owner_id') });

                if (!response.data) {
                    throw new Error('Failed to fetch booked users');
                }
                console.log(response.data.users)
                setBookedUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching booked users:', error);
            }
        };

        fetchBookedUsers();
    }, []);

    return (
        <div>
            <Navbar/>
<h1 className='text-center'>Booked Containers</h1>
<div class="p-10">
{bookedUsers.map(user => (
  <div class="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg" key={user.user_id}>
    <div class="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
    </div>
    <div class="mt-2 flex justify-start bg-white p-2">
      <div class="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 p-1">
      <svg viewBox="0 0 640 512" pointer-events="all" aria-hidden="true" className="etiIcon css-jbc4oa" role="presentation" style={{ fill: 'rgb(102, 102, 102)', height: '12px', width: '20px' }}>
        <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
      </svg>
      </div>
    </div>
    <div class="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
      <div class="flex flex-row place-items-center p-2">
        <div class="flex flex-col ml-2">
          <p class="text-xs text-gray-500 font-bold">{user.name}</p>
          <p class="text-xs text-gray-500">{user.email}</p>
          <div class="text-xs text-gray-500">{user.mobile}</div>
        </div>
      </div>

      <div class="flex flex-col p-2">
        <p class="text-gray-500">Gender : {user.gender}</p>
        <p class="text-gray-500"><span class="font-bold"></span> Country : {user.country}</p>
        <p class="text-gray-500">Address : {user.address}</p>
      </div>
      <div class="flex flex-col flex-wrap p-2">
        <p class="text-gray-500"><span class="font-bold"></span>Booking Count</p>
        <p class="text-gray-500">{user.booking_count}</p>
      </div>
    </div>
    <div class="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
    </div>
    <div class="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
    </div>
  </div>
))}
</div>

        </div>
    );
}
