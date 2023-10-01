"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
require('dotenv').config();


type Chat = {
  senderEmail: string;
  receiverEmail: string;
  messageContent: string;
  timestamp: any;
  id: number;
  listingId: number
};

export default function Inbox() {
  const API_URL='http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000';
  const [chats, setChats] = useState<Chat[]>([]);
  const [userEmail, setUserEmail] = useState<string>('');
  // Function to fetch chat data
  const fetchChatData = () => {
    axios
      .get(`${API_URL}/api/v1/chat/list?Email=${userEmail}`)
      .then((response) => {
        const data = response.data;
        setChats(data); // Assuming the data is an array of chat messages
      })
      .catch((error) => {
        console.error('Error fetching chat data:', error);
      });
  };

  // Use useEffect to fetch data initially and set up polling
  useEffect(() => {
    // Fetch data initially
    fetchChatData();

    // Set up polling every 5 seconds
    const pollInterval = 5000; // 5 seconds
    const pollTimer = setInterval(fetchChatData, pollInterval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(pollTimer);
    };
  }, [userEmail]);

  return (
    <div className="user-list">
      <h2>Inbox</h2>
      <input
        type="text"
        placeholder="Enter your email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <div>
            <Link
            href={{
                pathname: '/chat',
                query: {
                receiverEmail: chat.senderEmail,
                senderEmail: userEmail,
                listingId: chat.listingId
                },
            }}
            >
            <strong>{chat.listingId}</strong>
            <strong>{chat.senderEmail}:</strong> 
            <div>
              <small>{new Date(chat.timestamp).toLocaleString()}</small>
            </div>
            </Link>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}
