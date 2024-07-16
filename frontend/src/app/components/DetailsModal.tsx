"use client";
import React from "react";
import { Icon } from "@iconify/react";

import Image from "next/image";
import { useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

interface OpinionModalProps {
  opinionData: {
    id: number;
    author: string;
    title: string;
    textContent: string;
    backgroundImage: string;
  };
}

const DetailsModal: React.FC<OpinionModalProps> = ({ opinionData }) => {
  return (
    <div className="z-30 absolute left-[1.5%] top-[1.5%] h-[30rem] w-[25%] bg-black/50 text-white p-4 shadow-lg rounded-md">
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src={opinionData.backgroundImage}
          layout="fill"
          alt="slider"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="flex justify-between mb-8 relative">
        <div className="w-fit h-fit rounded-full p-4 bg-[#FFFFF0] "></div>
        <div className="flex flex-col text-sm font-semibold right-0">
          <p>You Rated: 80%</p>
          <p>Society Rating: 36%</p>
        </div>
      </div>
      <div className="h-2/3 w-full flex flex-col justify-center text-left">
        <h2 className="text-xl font-bold mb-2">{opinionData.author},</h2>
        <h2 className="text-2xl font-bold mb-10 uppercase">
          {opinionData.title.toUpperCase()}
        </h2>

        <p className="text-xs">
          Korem ipsum dolor sit amet3 consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos<br></br>
        </p>
      </div>
    </div>
  );
};

export default DetailsModal;
