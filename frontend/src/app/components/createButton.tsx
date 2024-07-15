"use client";

import { useState, useEffect } from "react";
import OpinionCreate from "./opinionCreate";

const CreateButton = () => {
  const [openCreateOpinion, setOpenCreateOpinion] = useState(false);

  const toggleCreate = () => {
    setOpenCreateOpinion((open) => !open);
  };

  useEffect(() => {
    // If propertyInfo is open, prevent scrolling by adding a class to the body
    if (openCreateOpinion) {
      document.body.style.overflow = "hidden";
    } else {
      // If propertyInfo is closed, allow scrolling by removing the class
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCreateOpinion]);

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
