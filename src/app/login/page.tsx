"use client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/db";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const options = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      toast.error(error.message, options);
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center container items-center gap-5 h-[80vh]">
      <h1 className="text-2xl font-semibold tracking-tight">
        Sign in with your account
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter your email below to login your account
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[25%]">
        <Input onChange={(e) => setEmail(e.target.value)} />
        <Input onChange={(e) => setPassword(e.target.value)} />
        <Button variant="default">Login with Email</Button>
        <ToastContainer />
      </form>
    </div>
  );
}
