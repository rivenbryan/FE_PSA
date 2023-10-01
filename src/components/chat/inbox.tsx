"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";
import ChatInboxCard from "./ChatInboxCard";
import ChatComponent from "./chat";
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
  
  const [chatID, setChatID] = useState<{listingID: string, receiverID: string}>({listingID: "", receiverID: ""});

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

 
  return (
    <div className="flex gap-10">
      <div>
        <h1 className="font-bold text-lg">Inbox</h1>
        <div className="flex flex-col gap-10 max-h-[800px] overflow-y-auto">
          {chatData?.map((chat) => (
            <ChatInboxCard chat={chat} setChatID={setChatID}/>
          ))}
        </div>
      </div>
      <div className="flex-grow">
            {chatID.listingID !== "" && <ChatComponent senderEmail={"test@gmail.com"} receiverEmail={chatID.receiverID} listingId={chatID.listingID} />}
       
      </div>
    </div>
  );
}
