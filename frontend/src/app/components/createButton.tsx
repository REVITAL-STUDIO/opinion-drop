"use client";

import { useState, useEffect } from "react";
import OpinionCreate from "./opinionCreate";

interface CreateButtonProps {
  topic: {
      name: string,
      id: number
    }
  }

const CreateButton = ({topic}: CreateButtonProps) => {
  const [openCreateOpinion, setOpenCreateOpinion] = useState(false);

  const toggleCreate = () => {
    console.log("topic: ", topic);
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
    <div className="my-4 absolute right-24 top-0">
      <button
        onClick={toggleCreate}
        className="w-32 p-4 text-black bg-white shadow-lg float-right relative rounded-full text-sm border-black"
      >
        create +
      </button>
      {openCreateOpinion && <OpinionCreate toggleCreate={toggleCreate} />}
    </div>
  );
};

export default CreateButton;
