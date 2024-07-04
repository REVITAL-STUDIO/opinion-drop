"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EssayPrompt = () => {
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
      <motion.div
        className="bg-gradient-to-t relative from-stone-500 to-stone-700 w-3/4 p-8 rounded-lg shadow-xl"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-4xl h-[650px] text-white">
          <h2 className="font-bold">Essay Prompt</h2>
          <textarea
            id="description"
            rows={4}
            maxLength={2000}
            className="shadow my-4 placeholder:text-white/75 placeholder:text-xl bg-transparent border-white appearance-none border rounded w-full h-[450px] my-4 overflow-y-scroll  py-2 px-3 text-white text-sm leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Speak your mind... Let Your Voice Echo"
            onChange={handleChange}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EssayPrompt;
