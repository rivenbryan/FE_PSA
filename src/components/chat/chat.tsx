
"use client"
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { io, Socket } from 'socket.io-client';


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

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://localhost:3000/chat'); // Replace with your server URL
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages from the server
    socket.on('recMessage', (message: Chat) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Send a message to the server in the desired format
      socket?.emit('sendMessage', {
        senderEmail: 'test@gmail.com',
        receiverEmail: 'test2@gmail.com',
        messageContent: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
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
