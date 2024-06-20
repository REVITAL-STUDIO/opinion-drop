'use client'
import React from 'react';
import Image from "next/image";
import { useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

interface OpinionModalProps {
    opinionData?: {
        id: number;
        title: string;
        details: string;
    };
}

const DetailsModal: React.FC<OpinionModalProps> = ({ opinionData }) => {
    return (
        <div className="absolute left-[1.5%] top-[1.5%] h-[30rem] w-[30%] bg-black/50 text-white p-4 z-20 shadow-lg">
            <div className='flex justify-between mb-8'>
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    
                    <img src="/path/to/profile/pic.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className='flex flex-col'>
                    <p>Your Rating:</p>
                    <p>The People's Rating:</p>
                </div>
            </div>
            <h2 className="text-lg font-bold mb-4">Jessica Wynters,</h2>
            <h2 className="text-2xl font-bold mb-10">Viability AS TIME LIMIt</h2>

            <p className='text-sm'>
                Korem ipsum dolor sit amet3 consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos.....
            </p>
            <div className='flex w-fit ml-auto mt-10'>
                <BiDownvote className='w-8 h-8'/>
                <BiUpvote className='w-8 h-8'/>
            </div>
        </div>
    );
};

export default DetailsModal;