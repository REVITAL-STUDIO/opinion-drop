"use client";

import { faAnglesDown, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import RepliesModal from "./RepliesModal";

const MoreButton = () => {
  const [showRepliesModal, setShowRepliesModal] = useState(false);

  const closeModal = () => {
    setShowRepliesModal(!showRepliesModal);
  };

  return (
    <div>
      <button
        onClick={closeModal}
        className="absolute rounded-full bottom-4 shadow-md left-4 border w-[4rem] h-[4rem] flex justify-center items-center hover:scale-95 ease-in-out duration-200 transition bg-white  z-50"
      >
        <div className="absolute w-[1rem] h-[1rem] bg-purple-500 rounded-full right-0 top-0 shadow-xl"></div>
        {showRepliesModal ? (
          <FontAwesomeIcon icon={faAnglesDown} className="text-2xl" />
        ) : (
          <FontAwesomeIcon icon={faLayerGroup} className="text-3xl" />
        )}
      </button>
      {showRepliesModal && <RepliesModal closeModal={closeModal} />}
    </div>
  );
};

export default MoreButton;
