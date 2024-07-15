"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confirmation from "./confirmaton";
import TextEditor from "./textEditor";

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
          className="bg-gradient-to-t relative w-3/4 p-8 rounded-lg shadow-xl "
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-4xl h-screen w-full text-white mx-auto">
            <TextEditor />
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
