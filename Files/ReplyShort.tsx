'use client'
import React from 'react';
import { FaHeart } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { PiSmileySadBold } from "react-icons/pi";

interface ReplyShortProps {
    reply?: {
        id: number;
        content: string;
    };
}

const ReplyShort: React.FC<ReplyShortProps> = ({ reply }) => {
    return (
        <div className="relative flex justify-between items-center px-8 py-4 bg-white text-black rounded-xl w-[80%] h-[8rem]">
            <div className="flex items-center gap-8">
                <div className="w-[5rem] h-[5rem] rounded-full bg-gray-300 flex items-center justify-center drop-shadow-lg">
                    <img src="/path/to/profile/pic.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">
                        John Doe
                    </h1>
                    <p className="truncate max-w-[20rem]">I don't know whether to believe this or</p>
                </div>
            </div>
            <div className='flex absolute top-4 right-4'>
                <div className='z-20 relative left-[12px] w-[2rem] h-[2rem] bg-[#5E8310] border-[3px] border-[#A6E81B] rounded-full flex justify-center items-center'>
                    <BiLike className='w-[1.2rem] h-[1.2rem] text-white' />
                </div>
                <div className='z-10 relative left-[6px] w-[2rem] h-[2rem] bg-[#70009F] border-[3px] border-[#E7ADFF] rounded-full flex justify-center items-center'>
                    <FaHeart className='w-[1.1rem] h-[1.1rem] text-[#D7B4E5]' />
                </div>
                <div className='z-0 w-[2rem] h-[2rem] bg-[#0000FF] border-[3px] border-[#6262FB] rounded-full flex justify-center items-center'>
                    <PiSmileySadBold className='w-[1.4rem] h-[1.4rem] text-[#9191FF]' />
                </div>
            </div>
            <div className='absolute -bottom-4 -right-4 w-[8rem] h-[2.6rem] bg-[#F2F2F2] rounded-full flex justify-center items-center'>
                <p className='font-semibold text-[0.8rem]'>100 REPLIES</p>
            </div>
        </div>
    );
};

export default ReplyShort;