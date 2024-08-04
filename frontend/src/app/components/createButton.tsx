"use client";

import { useState, useEffect } from "react";
import OpinionCreate from "./opinionCreate";

interface createButtonProps {
  topic: {
    name: string;
    id: number;
  };
}

const CreateButton = ({ topic }: createButtonProps) => {
  const [openCreateOpinion, setOpenCreateOpinion] = useState(false);

  const toggleCreate = () => {
    setOpenCreateOpinion((prevOpen) => {
      console.log("Current state:", prevOpen);
      return !prevOpen;
    });
    console.log("Button clicked, openCreateOpinion:", openCreateOpinion);
  };

  return (
    <div className="">
      <button
        onClick={toggleCreate}
        className="p-4 text-white mt-0 mr-4 hover:scale-95 ease-in-out duration-200 transition bg-gradient-to-tl from-red-400 font-bold to-blue-500 shadow-lg float-right relative rounded-full md:text-sm text-xs"
      >
        Drop Opinion +
      </button>
      {openCreateOpinion && (
        <OpinionCreate
          key={topic.id}
          topic={topic}
          toggleCreate={toggleCreate}
        />
      )}
    </div>
  );
};

export default CreateButton;
