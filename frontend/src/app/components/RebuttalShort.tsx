"use client";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

interface RebuttalShortProps {
  opinion?: {
    id: number;
    title: string;
    details: string;
  };
}

const RebuttalShort: React.FC<RebuttalShortProps> = ({ opinion }) => {
  return (
    <div className="flex justify-between items-center px-8 py-4  shadow-md text-black border border-black rounded-md w-[95%]">
      <div className="flex items-center gap-4">
        <div className="w-[2rem] h-[2rem] rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src="/path/to/profile/pic.jpg"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">Lorem Ipsum</h1>
          <p className="text-lg font-semibold">John Doe</p>
        </div>
      </div>
      <button className=" p-4 rounded-full shadow-xl hover:scale-90 duration-200 ease-in-out transition">
        <MdArrowForwardIos className="w-[1rem] h-[1rem] text-black" />
      </button>
    </div>
  );
};

export default RebuttalShort;
