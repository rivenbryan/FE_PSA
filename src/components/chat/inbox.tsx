"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";
import ChatInboxCard from "./ChatInboxCard";
require("dotenv").config();

type Chat = {
  senderEmail: string;
  receiverEmail: string;
  messageContent: string;
  timestamp: any;
  id: number;
  listingId: number;
};

export default function Inbox() {
  const { data: chatData } = useQuery({
    queryKey: ["chatUsers"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(
        "http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/chat/list?Email=test@gmail.com"
      );
      return data;
    },
  });

  console.log(chatData);
  return (
    <div className="flex gap-2">
      <div>
        <h1>Inbox</h1>
        <div className="flex flex-col gap-10 max-h-[800px] overflow-y-auto">
          {chatData?.map((chat) => (
            <ChatInboxCard chat={chat} />
          ))}
          <ChatInboxCard />
          <ChatInboxCard />
        </div>
      </div>
      <div className="flex-grow">
        <h1>Chat</h1>
      </div>
    </div>
    // <div className="user-list">
    //   <h2>Inbox</h2>
    //   <input
    //     type="text"
    //     placeholder="Enter your email"
    //     value={userEmail}
    //     onChange={(e) => setUserEmail(e.target.value)}
    //   />
    //   <ul>
    //     {chats.map((chat) => (
    //       <li key={chat.id}>
    //         <div>
    //         <Link
    //         href={{
    //             pathname: '/chat',
    //             query: {
    //             receiverEmail: chat.senderEmail,
    //             senderEmail: userEmail,
    //             listingId: chat.listingId
    //             },
    //         }}
    //         >
    //         <strong>{chat.listingId}</strong>
    //         <strong>{chat.senderEmail}:</strong>
    //         <div>
    //           <small>{new Date(chat.timestamp).toLocaleString()}</small>
    //         </div>
    //         </Link>
    //         </div>

    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
