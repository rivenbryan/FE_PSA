import React from 'react';
import { CgProfile } from 'react-icons/cg';
import Image from 'next/image';

type Props = {
  chat?: any;
  setChatID: any;
  setPollState?: any;
};

export default function ChatInboxCard({ chat, setChatID, setPollState }: Props) {
  const handleClick = () => {
    setPollState((prev: boolean) => {return !prev;});
    const chatID = {
      listingID: chat.listingId,
      receiverID: chat.senderEmail,
    };
    console.log(chatID);
    setChatID(chatID);
  };

  return (
    <div className="border-t border-gray-300 p-4 hover:bg-gray-100 cursor-pointer">
      <div
        className="flex gap-2 items-center"
        onClick={handleClick}
      >
        <CgProfile size={30} />
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-gray-800">{chat.senderEmail}</h1>
          <p className="text-sm text-gray-600">{chat.listingDetails?.account}</p>
          <div className="flex gap-1 text-sm text-gray-600">
            <span>{chat.listingDetails?.containerType}</span>
            <span>|</span>
            <span>{chat.listingDetails?.destPort}</span>
          </div>
        </div>
        <div className="relative w-24 h-16 ml-auto">
          <Image
            src="/listingImages/7.jpg"
            layout="fill"
            objectFit="cover"
            alt="test"
          />
        </div>
      </div>
    </div>
  );
}
