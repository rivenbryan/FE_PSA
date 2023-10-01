"use client";
import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <a href="#" className="text-black text-lg font-bold">
            <Image alt="test" src="/logo.png" width="200" height="500"></Image>
          </a>
          <div className={`md:flex space-x-4 ${isOpen ? "" : "hidden"}`}>
            <a href="/" className="text-black">
              Home
            </a>
            <a href="/marketplace" className="text-black">
              MarketPlace
            </a>
            <a href="/inbox" className="text-black">
              Inbox
            </a>
            <a href="/inbox" className="text-black">
              Sign Out
            </a>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
