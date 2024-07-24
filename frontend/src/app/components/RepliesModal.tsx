"use client";
import React, {
  useState,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { MdFlag } from "react-icons/md";
import ReplyShort from "./ReplyShort";
import { IoClose } from "react-icons/io5";
import SurveyPrompt from "./SurveyPrompt";
import Comment from "./comment";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface RepliesModalProps {
  closeModal: () => void;
}

const RepliesModal: React.FC<RepliesModalProps> = ({ closeModal }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const newHeight = startY - e.clientY;
        setCurrentHeight(newHeight > 0 ? newHeight : 0);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, startY]);

  const startDragging = (e: ReactMouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY + currentHeight);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 500 }}
        transition={{ duration: 0.5, ease: "easeInOut" }} // Added transition property
        className="z-40 absolute top-0 left-0 right-0 bg-black/95 text-white px-4 shadow-lg transition-transform"
      >
        <div className="mt-[4%] px-[4rem] w-full flex gap-[8%] min-h-screen">
          <div className="w-[25%] mt-[5%]">
            <div className="flex flex-col gap-8">
              <div className="flex gap-[3rem] items-center">
                <IoEyeOutline className="w-[3.5rem] h-[3.5rem]" />
                <p className="text-lg">1.2 million views</p>
              </div>
              <div className="flex gap-[3rem] items-center">
                <GoGraph className="w-[3.5rem] h-[3.5rem]" />
                <p className="text-lg">800k Ratings</p>
              </div>
              <div className="flex gap-[3rem] items-center">
                <BiLike className="w-[3.5rem] h-[3.5rem]" />
                <p className="text-lg">400 Likes</p>
              </div>
              <div className="flex gap-[3rem] items-center">
                <MdFlag className="w-[3.5rem] h-[3.5rem] text-[#E81B23]" />
                <p className="text-lg">1.2k FLAGGED AS MISINFORMATION</p>
              </div>
            </div>
          </div>
          <div className="w-[80%]  overflow-x-visible">
            <h2 className="text-4xl font-bold mb-[2%] relative ">DISCUSSION</h2>
            {/* Replies shorts */}
            <div className="w-[1000px] h-[420px] overflow-auto pt-[1rem] pb-[3rem] pl-[3rem]">
              <div className="relative flex flex-col gap-8  overflow-visible w-full border-l-[2px] border-[#676767] ">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
              </div>
            </div>
            <div className="relative mt-2">
              <textarea
                className="w-full h-[80px] p-2 border border-[#676767] rounded-md bg-transparent text-white placeholder-white"
                placeholder="Write your comment here..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute top-6 right-6 text-white size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RepliesModal;
