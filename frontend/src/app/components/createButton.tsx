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
    console.log("topic in create button: ", topic);
    setOpenCreateOpinion((open) => !open);
  };

  // useEffect(() => {
  //   if (typeof document !== 'undefined') {
  //     if (openCreateOpinion) {
  //       document.body.style.overflow = 'hidden';
  //     } else {
  //       document.body.style.overflow = 'auto';
  //     }

  //     return () => {
  //       document.body.style.overflow = 'auto';
  //     };
  //   }
  // }, [openCreateOpinion]);

  return (
    <div className="my-4 mr-4">
      <button
        onClick={toggleCreate}
        className="p-4 text-white hover:scale-95 ease-in-out duration-200 transition bg-gradient-to-tl from-red-400 font-bold to-blue-500 shadow-lg float-right relative rounded-full md:text-sm text-xs"
      >
        Drop Opinion +
      </button>
      {openCreateOpinion && (
        <OpinionCreate topic={topic} toggleCreate={toggleCreate} />
      )}
    </div>
  );
};

export default CreateButton;
