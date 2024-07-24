import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import RebuttalModal from "./RebuttalModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface RebuttalShortProps {
  rebuttal: {
    id: number;
    author: string;
    title: string;
    textcontent: string;
    parentOpinionId: number;
  };
}

const RebuttalShort: React.FC<RebuttalShortProps> = ({
  rebuttal,
}) => {
  const [openRebuttal, setopenRebuttal] = useState(false);

  const openRebuttalModal = () => {
    setopenRebuttal(true);
  };

  const closeRebuttal = () => {
    setopenRebuttal(false);
  };
  

  return (
        <div
          className="flex justify-between items-center px-8 py-4 shadow-md text-black  w-[100%] my-4"
        >
          <div className="flex w-3/4 items-center gap-4">
            <div className="w-[3rem] h-[3rem] rounded-full bg-gray-300 flex items-center justify-center">
              <img
                src="/path/to/profile/pic.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-semibold">{rebuttal.title}</h1>
              <p className="text-sm font-normal">{rebuttal.author}</p>
            </div>
          </div>
          <div className="w-1/4 flex gap-x-4 items-center justify-center ">

            <button
              onClick={openRebuttalModal}
              className="px-4 py-2 rounded-full bg-black text-white text-sm shadow-xl flex items-center justify-center gap-x-4 hover:scale-90 duration-200 ease-in-out transition"
            >
              Read
              <MdArrowForwardIos className="w-[1rem] h-[1rem] text-white" />
            </button>
          </div>
          {openRebuttal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
              <RebuttalModal rebuttal={rebuttal}/>

              <button
                onClick={closeRebuttal}
                className="w-10 h-10 bg-white shadow-lg flex justify-center items-center rounded-full absolute top-4 left-4 p-4"
              >
                <FontAwesomeIcon icon={faX} className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
  );
};

export default RebuttalShort;

