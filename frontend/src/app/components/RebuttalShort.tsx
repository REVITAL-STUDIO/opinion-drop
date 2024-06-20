'use client'
import React from 'react';
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
        <div className="flex justify-between items-center px-8 py-4 bg-[#EFEFEF] rounded-3xl w-[80%]">
            <div className="flex items-center gap-8">
                <div className="w-[5rem] h-[5rem] rounded-full bg-gray-300 flex items-center justify-center">
                    <img src="/path/to/profile/pic.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl">
                        Lorem Ipsum
                    </h1>
                    <p><span className="font-semibold">John Doe</span> Published 2 mins ago</p>
                </div>
            </div>
            <MdArrowForwardIos className="w-[2rem] h-[2rem]" />
        </div>
    );
};

export default RebuttalShort;