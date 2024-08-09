import React, { useState } from "react";
import ArchivePage from "./ArchivePage";
import { useAuth } from "../hooks/AuthContext";
import { disableScroll, enableScroll } from "../utils/scrollLock";

interface createButtonProps {
  topic: {
    name: string;
    id: number;
  };
}

const Archive = ({ topic }: createButtonProps) => {
  const [showArchive, setArchive] = useState(false);
  const { currentUser } = useAuth();

  const openArchivePage = () => {
    const newState = !showArchive; // Toggle the state
    setArchive(newState); // Update the state
    if (newState) {
      disableScroll(); // Disable scroll if the modal is being opened
    } else {
      enableScroll(); // Enable scroll if the modal is being closed
    }
  };

  const closeArchivePage = () => {
    setArchive(false);
    enableScroll(); // Re-enable scrolling when the modal is closed
  };

  return (
    <>
      {!currentUser ? (
        ""
      ) : (
        <div className="w-fit flex justify-center items-center my-2">
          <button
            onClick={openArchivePage}
            className=" w-fit flex border border-black items-center justify-center mx-auto rounded-full gap-x-2 hover:scale-95 ease-in-out duration-200 transition p-4 relative text-black md:text-base text-xs"
          >
            <div className="w-[1rem] h-[1rem] rounded-full bg-black "></div>
            Catalogue
          </button>
          {showArchive && (
            <ArchivePage
              topic={topic}
              closeArchivePage={closeArchivePage} // Pass the function here
            />
          )}
        </div>
      )}
    </>
  );
};

export default Archive;
