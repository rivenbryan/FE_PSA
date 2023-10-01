"use client"
import React, { useEffect, useState, useRef  } from 'react';
import { useRouter } from "next/navigation";
// eslint-disable-next-line
import { RocketIcon } from '@radix-ui/react-icons';
import { io, Socket } from 'socket.io-client';
import { useSearchParams } from 'next/navigation'
import axios from 'axios'; // Import Axios
import './chat.css'; 
import { ScrollArea } from "@/components/ui/scroll-area"


type Chat = {
  senderEmail: string;
  receiverEmail: string;
  messageContent: string;
  timestamp: any;
  id: number;
};

export default function ChatComponent() {
  const router=useRouter();
  const API_URL='http://localhost:3000';
  const query = useSearchParams()
  const senderEmail= query.get('senderEmail');
  const receiverEmail= query.get('receiverEmail');
  const listingId = query.get('listingId')
  const [messages, setMessages] = useState<Chat[]>([]); // Initialize as an empty array
  const [newMessage, setNewMessage] = useState<string>(''); // Initialize as an empty string
  const [socket, setSocket] = useState<Socket | null>(null); // Initialize as null
  const [combinedMessages, setCombinedMessages] = useState<Chat[]>([]); // Combined and sorted messages
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Fetch all chats and list senderEmails in previousChats
    axios.get(`${API_URL}/api/v1/chat?senderEmail=${senderEmail}&receiverEmail=${receiverEmail}&listingId=${listingId}`)
      .then((response) => {
        const chatData = response.data;
        setCombinedMessages(chatData);
      })
      .catch((error) => {
        console.error('Error fetching chat data:', error);
      });
  }, []);
  useEffect(() => {
    if (senderEmail) {
      // Connect to the WebSocket server when userEmail is set
      const newSocket = io(`${API_URL}`, {
        query: { email: senderEmail, listingId: listingId },
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
  }, [senderEmail]);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages from the server
    socket.on('recMessage', (message: Chat) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);
  const handleKeyDown = (e: any) => {
    console.log('enteresd')
    if (e.code === "Enter") {
     
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = {
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
        messageContent: newMessage,
        listingId : listingId,
        timestamp : new Date().toLocaleString()
      };
  
      // Send a message to the server in the desired format
      axios.post(`${API_URL}/api/v1/chat`, messageData)
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


  const scrollToBottom = () => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    console.log('test')
    scrollToBottom();
  }, [combinedMessages, newMessage]);

  return (
    <div className="chat-container">
       <h2>{receiverEmail}</h2>
      <ScrollArea ref={scrollableContainerRef} className="message-container">
      <div className="previous-chats">
        {combinedMessages.map((message: Chat, index: number) => (
          <div
          key={index}
          className={`message-bubble ${message.senderEmail === senderEmail ? 'sender-message' : 'receiver-message'}`}>
            <div className='message-content'>
            {!(message.senderEmail === senderEmail) && (
          <span className='name'>{message.senderEmail} </span>)}
            <div>{message.messageContent}</div>
            <div className="timestamp">{new Date(message.timestamp).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-messages">
        {messages.map((message: Chat, index: number) => (
        <div key={index} className={`message-bubble ${message.senderEmail === senderEmail ? 'sender-message' : 'receiver-message'}`}>
          <div className='message-content'>
          {!(message.senderEmail === senderEmail) && (
          <span className='name'>{message.senderEmail} </span>)}
            <div>{message.messageContent}</div>
            <div className="timestamp">{new Date(message.timestamp).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      </ScrollArea>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage} >
          <i className="fa fa-paper-plane"></i> <RocketIcon/>
        </button>
      </div>
    </div>
  );
}
