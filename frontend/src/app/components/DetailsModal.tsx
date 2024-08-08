"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface OpinionModalProps {
  opinionData: {
    id: number;
    author: string;
    title: string;
    textcontent: string;
    backgroundimage: string;
    authorprofileimage: string;
  };
}

const DetailsModal: React.FC<OpinionModalProps> = ({ opinionData }) => {

  return (
    <div className="z-30 py-[15%] w-[50%] mx-auto bg-black/50 relative text-white p-4 shadow-lg rounded">
      <div className="absolute inset-0 w-full h-full -z-10 rounded">
        <Image
          src={opinionData.backgroundimage}
          fill
          alt="slider"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="flex justify-between mb-8 ">
        <div className="absolute top-8 left-4 w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden">
          <img
            src={opinionData.authorprofileimage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* <div className="flex flex-col text-sm font-semibold right-0">
          <p>You Rated: 80%</p>
          <p>Society Rating: 36%</p>
        </div> */}
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
