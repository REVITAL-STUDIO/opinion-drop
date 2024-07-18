import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confirmation from "./confirmaton";
import TextEditor from "./textEditor";

interface FileExtended extends File {
  url?: string;
}

interface EssayPromptProps {
  formData: {
    title: string;
    textContent: string;
    affiliation: string;
    backgroundImage: string;
    images: FileList | null;
    videos: FileList | null;
    documents: FileList | null;
    audios: FileList | null;
  };
  selectedFiles: FileExtended[];
  toggleEssay: () => void;
}

const EssayPrompt: React.FC<EssayPromptProps> = ({ formData, selectedFiles, toggleEssay }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleConfirmation = () => {
    setIsVisible(false);
    setConfirmation(!confirmation);
  };

  // Function to handle text changes from the TextEditor component
  const handleTextEditorChange = (textContent: string) => {
    console.log("Text changed:", textContent);
    // Handle the text content update, e.g., update state or perform some action
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="bg-gradient-to-t relative w-3/4 p-8 rounded-lg shadow-xl"
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-4xl h-screen w-full text-white mx-auto">
            <TextEditor
              formData={formData}
              selectedFiles={selectedFiles}
              toggleEssay={toggleEssay}
              onTextEditorChange={handleTextEditorChange} // Pass the callback function here
            />
          </div>
        </motion.div>
      )}
      {confirmation && (
        <>
          <Confirmation />
        </>
      )}
    </AnimatePresence>
  );
};

export default EssayPrompt;