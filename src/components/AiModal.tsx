"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BsRobot } from "react-icons/bs";
import { useMutation } from "react-query";
import axios from "axios";
interface Props {
  setOpen: (open: boolean) => void;
  data: any;
}

type MutationInput = {
    prompt: string;
    xaxis: string[];
    yaxis: number[];
  };

const AiModal: React.FC<Props> = ({ setOpen, data }) => {
  const { labels: xaxis, datasets } = data;
    
  const yaxis = datasets[0].data;

  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState(null);

  const { isLoading, isError, mutate } = useMutation(
    (newPrompt: MutationInput) => axios.post("/api/chatgpt", newPrompt),
    {
      onSuccess: (data) => {
        // Reset form fields or perform some action after successful POST request
        setPrompt("");
        setAnswer(data.data.data);
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = () => {
    mutate({ prompt, xaxis, yaxis });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-40"></div>

      <div className=" flex flex-col gap-2 z-10 p-6 m-4 bg-white rounded-lg shadow-lg max-w-lg">
        <div className="flex justify-between min-w-[400px]">
          <h1 className="text-xl font-bold ">PSA AI</h1>
          <p onClick={handleClose}>x</p>
        </div>
        <Input
          value={prompt}
          onChange={handleChange}
          placeholder="Write your prompt..."
        ></Input>
        <Button disabled={isLoading} onClick={handleSubmit}>
          Submit
        </Button>
        {answer && (
          <div className="p-4 bg-white shadow-md rounded-lg">
            <BsRobot size={30} />
            <p className="text-gray-800 mt-2 text-m">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiModal;
