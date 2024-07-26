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
    userId: number | null;
    topicId: number | null;
    parentOpinionId: number | null;
    backgroundImage: string;
    images: FileList | null;
    videos: FileList | null;
    documents: FileList | null;
    audios: FileList | null;
  };
  selectedFiles: FileExtended[];
  toggleEssay: () => void;
}

const EssayPrompt: React.FC<EssayPromptProps> = ({
  formData,
  selectedFiles,
  toggleEssay,
}) => {
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
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 500 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="bg-gradient-to-t relative w-full p-8 rounded-lg shadow-xl"
        >
          <div className="text-base h-screen w-full text-white mx-auto">
            <TextEditor
              formData={formData}
              selectedFiles={selectedFiles}
              toggleEssay={toggleEssay}
              onTextEditorChange={handleTextEditorChange} // Pass the callback function here
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EssayPrompt;
