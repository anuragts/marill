"use client";

import React, { useContext, useState } from "react";
import { chatwithOpenAI } from "@/app/action";
import { FileContext } from "../context/FileContext";
import Upload from "./Upload";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ type: string; text: string }[]>(
    []
  );
  const file = useContext(FileContext);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setMessages([...messages, { type: "question", text: question }]);
    const ai_response = await chatwithOpenAI(file?.file, question);
    setMessages([
      ...messages,
      { type: "question", text: question },
      { type: "answer", text: ai_response || "No response from AI" },
    ]);
    setQuestion("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <h1 className="text-center text-2xl m-4 text-slate-500"> Marill - <span>chat with notes (pdf)</span> </h1>
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg my-2 ${
              message.type === "question" ? "bg-blue-300" : "bg-green-300"
            }`}
          >
            {message.type === "answer" && (
              <h2 className="font-bold text-lg mb-1">From AI</h2>
            )}
            {message.type === "question" && (
              <h2 className="font-bold text-lg mb-1">My Question</h2>
            )}
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className=" p-3 bg-white">
        <div className="flex">
          <div className="flex-grow">
            <Upload />
          </div>
          <div className="flex-grow">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg p-2 mt-2 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
