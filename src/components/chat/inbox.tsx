
"use client"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Inbox() {
  const [userIDs, setUserIDs] = useState([]);
  const userEmail='test@gmail.com'
  useEffect(() => {
    // Fetch the list of user IDs from your backend API 
    axios.get(`http://localhost:3000/api/v1/chat/list?Email=${userEmail}`)
      .then((response) => {
        const data = response.data;
        setUserIDs(data); // Assuming the data is an array of user IDs
      })
      .catch((error) => {
        console.error('Error fetching user IDs:', error);
      });
  }, []);

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {userIDs.map((userID) => (
          <li key={userID}>
            <Link to={`/chat/${userID}?userEmail=YOUR_EMAIL_HERE`} className="user-link">
              {userID}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
