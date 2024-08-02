"use client";

import { faAnglesDown, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import RepliesModal from "./OpinionComments";

interface MoreButtonProps {
  toggleComments: () => void;
  showComments: boolean;
}

const MoreButton = ({ toggleComments, showComments }: MoreButtonProps) => {
  return (
    <div>
      <button
        onClick={toggleComments}
        className="absolute rounded-full bottom-4 shadow-md left-4 border w-[4rem] h-[4rem] flex justify-center items-center hover:scale-95 ease-in-out duration-200 transition bg-white  z-50"
      >
        <div className="relative flex justify-center items-center w-12 h-12">
          <FontAwesomeIcon
            icon={faAnglesDown}
            className={`absolute transition-opacity transform duration-500 ${
              showComments ? "opacity-100 scale-100" : "opacity-0 scale-75"
            } text-2xl`}
          />
          <FontAwesomeIcon
            icon={faLayerGroup}
            className={`absolute transition-opacity transform duration-500 ${
              showComments ? "opacity-0 scale-75" : "opacity-100 scale-100"
            } text-3xl`}
          />
        </div>
      </button>
    </div>
  );
};

export default MoreButton;
