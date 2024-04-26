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
            <h1>Booked Containers</h1>
            <div className="container ">
  <div className="row justify-content-center">
    <div className="col-md-10"> {/* This card occupies 10 columns and centered */}
      <div className="card rounded shadow ">
        <div className="card-body text-center">
          <h5 className="card-title">Booked Users</h5>
          <ul className="list-group list-group-flush">
            {bookedUsers.map(user => (
              <li className="list-group-item" key={user.user_id}>
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div>
                <div>Mobile: {user.mobile}</div>
                <div>DOB: {user.dob}</div>
                <div>Gender: {user.gender}</div>
                <div>Country: {user.country}</div>
                <div>Address: {user.address}</div>
                <div>Registration DateTime: {user.registration_datetime}</div>
                <div>Booking Count: {user.booking_count}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    );
}
