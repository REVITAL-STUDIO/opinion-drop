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
    <div
      className="z-50 fixed bottom-0 left-0 right-0 bg-black text-white p-4 shadow-lg transition-transform"
      style={{ height: `${currentHeight + 50}px`, maxHeight: `90vh` }}
    >
      <button
        className="top-0 w-fit h-fit  cursor-pointer flex items-center justify-center gap-x-2 font-semibold"
        onMouseDown={startDragging}
      >
        <IoIosArrowUp className="text-white w-8 h-8 " />
        More
      </button>
      <div className="mt-[4%] px-[4rem] w-full flex justify-between min-h-screen">
        <div className="w-[40%] border-r-[1px] border-white">
          <h2 className="text-2xl font-normal mb-[4rem]">Analytics</h2>
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
        <div className="w-[55%]">
          <h2 className="text-2xl font-normal mb-[4rem]">Replies</h2>
          {/* Replies shorts */}
          <div className="flex flex-col gap-8 max-h-[80%] overflow-y-auto custom-scrollbar p-4">
            <ReplyShort />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepliesModal;
