"use client";

import { useState, useEffect } from "react";
import OpinionCreate from "./opinionCreate";

const CreateButton = () => {
  const [openCreateOpinion, setOpenCreateOpinion] = useState(false);

  const toggleCreate = () => {
    setOpenCreateOpinion((open) => !open);
  };

  return (
    <div className="p-[4%] mb-[4%]">
      <button
        onClick={toggleCreate}
        className="w-[14rem] px-8 py-4 text-black bg-white shadow-lg float-right relative rounded-full text-lg border border-black"
      >
        create +
      </button>
      {openCreateOpinion && <OpinionCreate toggleCreate={toggleCreate} />}
    </div>
  );
};

export default CreateButton;
