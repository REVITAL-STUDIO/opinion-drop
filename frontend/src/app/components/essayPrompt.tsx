"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confirmation from "./confirmaton";

const EssayPrompt = () => {
  const [confirmation, setConfirmation] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleConfirmation = () => {
    setIsVisible(false);
    setConfirmation(!confirmation);
  };

  const [formData, setFormData] = useState({
    title: "",
    textContent: "",
    backgroundImage: "",
    images: null,
    videos: null,
    documents: null,
    audios: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const createOpinion = async () => {
    const opinionData = {
      ...formData,
      userId: 0,
      topicId: 0,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(opinionData),
        }
      );
      if (!res.ok) {
        throw new Error("Error creating opinion");
      }
    } catch (error) {
      console.log("Error creating opinion: ", error);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="bg-gradient-to-t relative from-stone-500 to-stone-700 w-3/4 p-8 rounded-lg shadow-xl"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-4xl h-[650px] text-white">
            <h2 className="font-bold">Essay Prompt</h2>
            <textarea
              id="description"
              rows={4}
              maxLength={2000}
              className="shadow  placeholder:text-white/75 placeholder:text-xl bg-transparent border-white appearance-none border border-dashed rounded w-full h-[400px] mt-[2%] overflow-y-scroll  py-2 px-3 text-white text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Speak your mind... Let Your Voice Echo"
              onChange={handleChange}
            />
            <div className="w-full flex gap-x-4 mt-4">
              <input
                type="checkbox"
                className="border-gray-300 rounded h-4 w-4"
              />

              <div className="flex flex-col">
                <h1 className="text-white text-xl font-medium leading-none">
                  Media Bias
                </h1>
                <p className="text-xs text-white mt-2 leading-4">
                  I am aware of the subject of media bias and it's impact of
                  public perception.
                </p>
              </div>
            </div>
            <div className="w-full flex gap-x-4 mt-4">
              <input
                type="checkbox"
                className="border-gray-300 rounded h-4 w-4"
              />

              <div className="flex flex-col">
                <h1 className="text-white text-xl font-medium leading-none">
                  Credibility
                </h1>
                <p className="text-xs text-white mt-2 leading-4">
                  I have confirmed that I have cited my sources and provided
                  accurate information to support my claims.
                </p>
              </div>
            </div>
            <button
              onClick={toggleConfirmation}
              className="w-1/4 hover:bg-orange-500 duration-200 ease rounded-full shadow-lg font-bold p-4 text-base flex justify-center items-center my-4 border border-dashed"
            >
              Drop Opinion
            </button>
          </div>
        </motion.div>
      )}
      {confirmation && (
        <>
          <Confirmation />
        </>
      )}
    </AnimatePresence>
  );
};

export default EssayPrompt;
