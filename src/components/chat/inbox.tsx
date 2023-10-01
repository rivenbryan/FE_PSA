"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import ChatInboxCard from "./ChatInboxCard";
import ChatComponent from "./chat";
import { error } from "console";
import { supabase } from "@/lib/db";
import { User } from "@supabase/supabase-js";
require("dotenv").config();

type Chat = {
  senderEmail: string;
  receiverEmail: string;
  messageContent: string;
  timestamp: any;
  id: number;
  listingId: any;
};

export default function Inbox() {
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    console.log("fetching user");
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    }
    fetchUser().catch(console.error)
  },[])
  
  const [chatID, setChatID] = useState<{listingID: any, receiverID: string}>({listingID: "", receiverID: ""});
  const [pollState, setPollState] = useState(false);
  const url = "http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/chat/list?Email="+currentUser.email;
  console.log(url);
  const { data: chatData } = useQuery({
    queryKey: ["chatUsers", currentUser.email],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(
        url
      );
      return data;
    },
  });

  return (
    <div className="flex gap-10">
      <div>
        <h1 className="font-bold text-lg">Inbox</h1>
        <div className="flex flex-col gap-10 max-h-[800px] overflow-y-auto">
          
          {chatData?.map((chat:any) => (
            <ChatInboxCard key={chat} setPollState={setPollState} chat={chat} setChatID={setChatID}/>
          ))}
        </div>
      </div>
      <div className="flex-grow">
            {chatID.listingID !== "" && <ChatComponent pollState={pollState} senderEmail={currentUser.email} receiverEmail={chatID.receiverID} listingId={chatID.listingID} />}
      </div>
    </div>
  );
}
