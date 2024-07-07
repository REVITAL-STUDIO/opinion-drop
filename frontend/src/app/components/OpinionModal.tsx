"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import SpectrumBar from "./SpectrumBar";
import RebuttalShort from "./RebuttalShort";
import ProgressBar from "progressbar.js";

import SurveyPrompt from "./SurveyPrompt";

interface OpinionModalProps {
  opinionData: {
    id: number;
    author: string;
    title: string;
    textContent: string;
    backgroundImage: string;
    profilePicture?: string;
  };
  closeModal: () => void;
}

const OpinionModal: React.FC<OpinionModalProps> = ({
  opinionData,
  closeModal,
}) => {
  const [selectedOpinion, setSelectedOpinion] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Opinion");
  const [hideOpinion, setHideOpinion] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [textContent, setTextContent] = useState(opinionData.textContent);
  const [highlightEnabled, setHighlightEnabled] = useState(true);

  const handleTextSelect = () => {

    if (!highlightEnabled) return;
    const opinionText = document.querySelector('.opinion-text');

    const selection = window.getSelection();
    const selectedText = selection?.toString();
    if(selection && !opinionText?.contains(selection.anchorNode)) return;
    if (selectedText) {
      const range = selection?.getRangeAt(0);
      const container = document.createElement("span");
      container.style.position = "relative";
      container.style.display = "inline-block";
      container.style.textIndent = "0";

      const highlightedText = document.createElement("span");
      highlightedText.className = "highlightedText";
      highlightedText.textContent = selectedText;
      highlightedText.style.fontSize = "1.2em";

      const closeButton = document.createElement("button");
      closeButton.className = "highlight-close-button";
      closeButton.textContent = "✕";

      // Ensure the close button click event works
      closeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the click from bubbling up to other elements
        const parent = container.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(selectedText), container);
        }
      });

      container.appendChild(highlightedText);
      container.appendChild(closeButton);

      // Remove the selected text and insert the container in its place
      range?.deleteContents();
      range?.insertNode(container);

      // Move the cursor after the inserted container
      range?.setStartAfter(container);
      selection?.removeAllRanges();
      if(range){
      selection?.addRange(range);
      }
    }
  };

  
  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelect);
    return () => {
      document.removeEventListener("mouseup", handleTextSelect);
    };
  }, [highlightEnabled]);

  //Progress bar
  const containerRef = useRef(null);


  return (
    <div className="z-30 absolute right-[1.5%] top-[1.5%] w-[60%] h-[800px] bg-white p-6 shadow-lg rounded-md">
      <div className="border-b-[1px] -mx-6 border-[#C5C5C5] mb-[3%] text-xl font-bold flex items-center px-8 gap-12">
        <IoClose onClick={closeModal} className="cursor-pointer" />
        <a
          className={`cursor-pointer ${selectedTab === "Opinion"
            ? "border-b-[4px] border-[#606060] "
            : "border-b-0"
            }`}
          onClick={() => setSelectedTab("Opinion")}
        >
          Opinion
        </a>
        <a
          className={`cursor-pointer ${selectedTab === "Discussion"
            ? "border-b-[4px] border-[#606060] "
            : "border-b-0"
            }`}
          onClick={() => setSelectedTab("Discussion")}
        >
          Discussion
        </a>
      </div>
      <div className="w-full flex justify-between items-center  p-4">
        {selectedTab == "Discussion" ?

          <button className="flex items-center gap-x-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300">
            Write a Rebuttal
            <IoIosArrowDropdown />
          </button>
          :
          <div className="flex">
            <div className="relative w-[60%] flex">
              <h2 className="text-7xl leading-tight- mb-4 w-5/6 font-black px-4">
                {opinionData.title.toUpperCase()}
              </h2>
            </div>

            <div className="w-[40%] flex justify-center items-center relative">
              <div className="progress">
                <div className="barOverflow">
                  <div className="bar"></div>
                </div>
                <div className="w-full flex flex-col items-center absolute top-1/2">
                  <span className="text-sm font-bold w-1/2">
                    Attention Currency
                  </span>
                  <div className="flex items-center">
                    <span className="text-3xl font-black flex">100</span>%
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        }
      </div>

      <div className="flex-1 max-h-[550px] overflow-y-auto custom-scrollbar">
        {/* Opinion Content */}
        {selectedTab == "Opinion" && (
          <div>
            <div className="relative z-10 mx-4 px-4">
              <p className="opinion-text text-sm indent-3">
                {opinionData.textContent}
              </p>
            </div>

            {/* Survey Container */}
            {/* <div
              className={`absolute inset-x-0 bottom-0 h-[55%] bg-white z-30 flex items-center justify-center shadow-lg rounded-b-md ${
                hideOpinion ? "" : "invisible"
              }`}
            >
              <div className="absolute -top-[5rem] left-0 w-full h-[5rem] bg-gradient-to-t from-white to-transparent z-40"></div>

              <div className="p-6 flex-col items-center">
                <h3 className="text-3xl font-bold mb-4 text-center">
                  Tell Us Your Thoughts Before Reading
                </h3>
                <SurveyPrompt prompt="Life begins at conception, and abortion is morally equivalent to taking an innocent human life." />
                <SurveyPrompt prompt="Some religions grant exceptions for abortion in cases of rape, incest, or when the mothers life is in danger, while others oppose it under any circumstances." />
                <SurveyPrompt prompt="Aortion should be a private matter between a woman and her healthcare provider." />
                <button
                  onClick={() => setHideOpinion(false)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Submit Survey
                </button>
              </div>
            </div> */}
          </div>
        )}
        {/* Discussion Content */}

        {selectedTab == "Discussion" && (
          <div className="flex flex-col items-center gap-8">
            <RebuttalShort />
            <RebuttalShort />
            <RebuttalShort />
            <RebuttalShort />
            <RebuttalShort />
            <RebuttalShort />
          </div>
        )}
      </div>
    </div>
  );
};

export default OpinionModal;
