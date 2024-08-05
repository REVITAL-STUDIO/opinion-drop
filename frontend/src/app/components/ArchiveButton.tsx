import React, { useState } from "react";
import ArchivePage from "./ArchivePage";
import { useAuth } from "../hooks/AuthContext";

interface createButtonProps {
  topic: {
    name: string;
    id: number;
  };
}

const Archive = ({ topic }: createButtonProps) => {
  const [showArchive, setArchive] = useState(false);
  const { currentUser } = useAuth();

  const toggleArchivePage = () => {
    setArchive((e) => !e);
  };

  return (
    <>
      {!currentUser ? (
        ""
      ) : (
        <div className="w-full flex justify-center items-center my-2">
          <button
            onClick={toggleArchivePage}
            className=" w-fit flex  items-center justify-center mx-auto rounded-full gap-x-2 hover:scale-95 ease-in-out duration-200 transition p-4 relative text-white md:text-base text-xs"
          >
            <div className="w-[1rem] h-[1rem] rounded-full bg-white "></div>
            Catalogue
          </button>
          {showArchive && <ArchivePage topic={topic} />}
        </div>
      )}
    </>
  );
};

export default Archive;
