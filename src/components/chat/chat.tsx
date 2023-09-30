'use-client'
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { io, Socket } from 'socket.io-client';

import axios from 'axios'; // Import Axios


type Chat = {
  senderEmail: string;
  receiverEmail: string;
  messageContent: string;
  timestamp: any;
  id: number;
};

export default function ChatComponent() {
  const [messages, setMessages] = useState<Chat[]>([]); // Initialize as an empty array
  const [newMessage, setNewMessage] = useState<string>(''); // Initialize as an empty string
  const [socket, setSocket] = useState<Socket | null>(null); // Initialize as null
  const [userEmail, setUserEmail] = useState<string>('')
  const [receiverEmail, setReceiverEmail] = useState<string>('')
  useEffect(() => {
    if (userEmail) {
      // Connect to the WebSocket server when userEmail is set
      const newSocket = io('http://localhost:3000', {
        query: { email: userEmail },
      });

      newSocket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
      });

      newSocket.on('connect', () => {
        console.log('WebSocket connected');
      });

      setSocket(newSocket);

      // Clean up the socket connection when the component unmounts
      return () => {
        newSocket.disconnect();
      };
    }
  }, [userEmail]);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages from the server
    socket.on('recMessage', (message: Chat) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = {
        senderEmail: userEmail,
        receiverEmail: receiverEmail,
        messageContent: newMessage,
      };
  
      // Send a message to the server in the desired format
      axios.post('http://localhost:3000/api/v1/chat', messageData)
      .then((response) => {
        // Handle the response from the server if needed
        console.log('Message sent successfully', response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error sending message', error);
      });
      socket?.emit('sendMessage', messageData);
  
      setNewMessage('');
    }
  }

  return (
    <div className="chat-container">
        <div className="chat-email-input">
        <input
          type="text"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)} // Update userEmail state
        />
      </div>
      <div className="chat-email-input">
        <input
          type="text"
          placeholder="Enter your reveiver email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)} // Update userEmail state
        />
      </div>
      <div className="chat-messages">
        {messages.map((message: Chat, index: number) => (
          <div key={index} className="message">
            <span>{message.senderEmail}: </span>
            <span>{message.messageContent}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
