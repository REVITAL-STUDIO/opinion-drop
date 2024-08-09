"use client";

import { useState, useEffect } from "react";
import OpinionCreate from "./opinionCreate";
import { disableScroll, enableScroll } from "../utils/scrollLock";

interface createButtonProps {
  topic: {
    name: string;
    id: number;
  };
}

const CreateButton = ({ topic }: createButtonProps) => {
  const [openCreateOpinion, setOpenCreateOpinion] = useState(false);

  const openCreate = () => {
    const newState = !openCreateOpinion; // Toggle the state
    setOpenCreateOpinion(newState); // Update the state

    if (newState) {
      disableScroll(); // Disable scroll if the modal is being opened
    } else {
      enableScroll(); // Enable scroll if the modal is being closed
    }
  };

  const closeCreate = () => {
    setOpenCreateOpinion(false);
    enableScroll(); // Re-enable scrolling when the modal is closed
  };

  return (
    <div className="w-fit flex justify-center items-center my-2 p-4">
      <button
        onClick={openCreate}
        className="p-4 text-white mt-0 w-[%] font-normal hover:scale-95 ease-in-out duration-200 transition bg-[#2b2b2b] shadow-lg  relative rounded-full md:text-sm text-xs"
      >
        Drop Opinion +
      </button>
      {openCreateOpinion && (
        <OpinionCreate
          key={topic.id}
          topic={topic}
          closeCreate={closeCreate} // Pass the close function here
        />
      )}
    </div>
  );
};

export default CreateButton;
