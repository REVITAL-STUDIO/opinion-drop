import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

interface RebuttalShortProps {
  opinion?: {
    id: number;
    title: string;
    details: string;
  };
  openDiscussionModal: () => void; // Function to open discussion modal
}

const RebuttalShort: React.FC<RebuttalShortProps> = ({
  opinion,
  openDiscussionModal,
}) => {
  const rebuttal = [
    {
      title: "Pro-Choice Perspectives on Abortion",
      name: "Alice Johnson",
      button: "Rebuttal",
    },
    {
      title: "Pro-Life Arguments Against Abortion",
      name: "Bob Smith",
      button: "Engage",
    },
    {
      title: "Legal Aspects of Abortion Rights",
      name: "Catherine Lee",
      button: "Rebuttal",
    },
    {
      title: "Ethical Considerations in Abortion Debates",
      name: "David Brown",
      button: "Engage",
    },
    {
      title: "Medical Implications of Abortion Procedures",
      name: "Eva Green",
      button: "Rebuttal",
    },
  ];

  return (
    <div className="w-[90%]">
      {rebuttal.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center px-8 py-4 shadow-md text-black border-b border-black w-[95%] my-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-[3rem] h-[3rem] rounded-full bg-gray-300 flex items-center justify-center">
              <img
                src="/path/to/profile/pic.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{item.title}</h1>
              <p className="text-sm font-normal">{item.name}</p>
            </div>
          </div>
          <div className="w-1/3 flex gap-x-4 items-center ">
            <div
              className={
                item.button === "Rebuttal"
                  ? "border border-red-500 text-red-500  text-sm rounded-full px-4 py-2"
                  : "border border-blue-500 text-blue-500  text-sm rounded-full px-4 py-2"
              }
            >
              {item.button}
            </div>
            <button
              onClick={openDiscussionModal}
              className="px-4 py-2 rounded-full bg-black text-white text-sm shadow-xl flex items-center justify-center gap-x-4 hover:scale-90 duration-200 ease-in-out transition"
            >
              Read
              <MdArrowForwardIos className="w-[1rem] h-[1rem] text-white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RebuttalShort;

