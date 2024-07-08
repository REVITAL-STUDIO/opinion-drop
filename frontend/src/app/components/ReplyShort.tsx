"use client";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { PiSmileySadBold } from "react-icons/pi";
import ShowReplies from "./showReplies";

interface ReplyShortProps {
  reply?: {
    id: number;
    content: string;
  };
}

const ReplyShort: React.FC<ReplyShortProps> = ({ reply }) => {
  const [openReplies, setOpenReplies] = useState(false);

  const openReplyModal = () => {
    setOpenReplies(!openReplies);
  };

  return (
    <>
      <div className="relative flex justify-between items-center px-8 py-4 bg-white text-black rounded-xl w-[100%] ">
        <div className="flex items-center gap-8">
          <div className="w-[2rem] h-[2rem] rounded-full bg-gray-300 flex items-center justify-center drop-shadow-lg">
            <img
              src="/path/to/profile/pic.jpg"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl">John Doe</h1>
            <p className="truncate text-sm max-w-[20rem]">
              I don&apos;t know whether to believe this or
            </p>
          </div>
        </div>
        <div className="flex absolute top-4 right-4">
          <h2 className="text-sm">123+ reactions</h2>
          <div className="z-20 relative left-[12px] w-[2rem] h-[2rem] bg-[#5E8310] border-[3px] border-[#A6E81B] rounded-full flex justify-center items-center">
            <BiLike className="w-[1.2rem] h-[1.2rem] text-white" />
          </div>
          <div className="z-10 relative left-[6px] w-[2rem] h-[2rem] bg-[#70009F] border-[3px] border-[#E7ADFF] rounded-full flex justify-center items-center">
            <FaHeart className="w-[1.1rem] h-[1.1rem] text-[#D7B4E5]" />
          </div>
          <div className="z-0 w-[2rem] h-[2rem] bg-[#0000FF] border-[3px] border-[#6262FB] rounded-full flex justify-center items-center">
            <PiSmileySadBold className="w-[1.4rem] h-[1.4rem] text-[#9191FF]" />
          </div>
        </div>
        <button
          onClick={openReplyModal}
          className="absolute -bottom-4 -right-4 w-[3rem] font-semibold h-[3rem] bg-[#F2F2F2] shadow-xl hover:scale-95 duration-150 ease-in-out rounded-full flex justify-center items-center"
        >
          100
        </button>
      </div>
      {openReplies && <ShowReplies />}
    </>
  );
};

export default ReplyShort;
