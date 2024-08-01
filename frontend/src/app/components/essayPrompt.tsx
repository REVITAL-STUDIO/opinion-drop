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
  closeEssayPrompt: () => void;
  handleToggleConfirmation: () => void;
  confirmation: boolean;
}

const EssayPrompt: React.FC<EssayPromptProps> = ({
  formData,
  selectedFiles,
  toggleEssay,
  handleToggleConfirmation,
  confirmation,
  closeEssayPrompt
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleTextEditorChange = (textContent: string) => {
    console.log("Text changed:", textContent);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 500 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="relative w-full flex justify-center items-center rounded-lg shadow-xl h-screen"
        >
          {confirmation ? (
            <Confirmation />
          ) : (
            <>
              <button
                onClick={closeEssayPrompt}
                className="p-8 absolute top-0 left-8 flex gap-x-8 z-10"
              >
                <div className="arrow">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
              <TextEditor
                formData={formData}
                selectedFiles={selectedFiles}
                toggleEssay={toggleEssay}
                onTextEditorChange={handleTextEditorChange}
                handleToggleConfirmation={handleToggleConfirmation} // Pass handleSubmit to TextEditor
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EssayPrompt;
