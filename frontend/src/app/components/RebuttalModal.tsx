import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown, IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import RebuttalShort from "./RebuttalShort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPaperPlane, FaFlag, FaX } from "react-icons/fa6";
import ProgressBar from "progressbar.js";
import InteractionModal from "./InteractionModal";

import SurveyPrompt from "./SurveyPrompt";
import {
  faFlag,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface Highlight {
  id: string;
  container: HTMLElement;
  text: string;
}

interface RebuttalModalProps {
  rebuttal: {
    id: number;
    author: string;
    title: string;
    textcontent: string;
    profilePicture?: string;
    parentopinionid: number | null;
  };
  closeModal?: () => void;
}

const RebuttalModal: React.FC<RebuttalModalProps> = ({
  rebuttal,
  closeModal,
}) => {
  const [selectedOpinion, setSelectedOpinion] = useState<any>(null); // Replace 'any' with the correct type if needed
  const [selectedTab, setSelectedTab] = useState("Opinion");
  const [hideOpinion, setHideOpinion] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [replyMenu, setReplyMenu] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");
  const [highlightContainer, setHighlightContainer] =
    useState<HTMLElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [interactionType, setInteractionType] = useState<
    "emoji" | "comment" | null
  >(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [currentHighlightId, setCurrentHighlightId] = useState<string | null>(
    null
  );
  const [openDiscussion, setOpenDiscussion] = useState(false);

  const openDiscussionModal = () => {
    setOpenDiscussion(true);
  };

  const closeDiscussionModal = () => {
    setOpenDiscussion(false);
  };

  const handleButtonClick = () => {
    setHideOpinion(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  };

  const openReplies = () => {
    setReplyMenu((prevState) => !prevState);
  };

  // Progress bar
  const containerRef = useRef<HTMLDivElement>(null);

  const generateHighlightId = () =>
    `highlight-${Math.random().toString(36).substr(2, 9)}`;

  const closeInteractionModal = () => {
    setShowInteractionModal(false);
  };

  const addEmojiToHighlight = (emoji: string) => {
    if (currentHighlightId) {
      setHighlights((prevHighlights) =>
        prevHighlights.map((highlight) =>
          highlight.id === currentHighlightId
            ? {
                ...highlight,
                container: updateHighlightContainer(
                  highlight.container,
                  emoji,
                  "emoji"
                ),
              }
            : highlight
        )
      );
      setShowInteractionModal(false);
    }
  };

  const addCommentToHighlight = (comment: string) => {
    if (currentHighlightId) {
      setHighlights((prevHighlights) =>
        prevHighlights.map((highlight) =>
          highlight.id === currentHighlightId
            ? {
                ...highlight,
                container: updateHighlightContainer(
                  highlight.container,
                  comment,
                  "comment"
                ),
              }
            : highlight
        )
      );
      setShowInteractionModal(false);
    }
  };

  const updateHighlightContainer = (
    container: HTMLElement,
    content: string,
    type: "emoji" | "comment"
  ) => {
    const existingEmoji = container.querySelector(".emoji");
    const existingComment = container.querySelector(".comment");
    if (existingComment) existingComment.remove();
    if (existingEmoji) existingEmoji.remove();

    const newElement = document.createElement("span");
    newElement.className = type;
    newElement.textContent = content;
    container.appendChild(newElement);

    return container;
  };

  // const handleTextSelect = () => {
  //   if (!highlightEnabled) return;
  //   const opinionText = document.querySelector(".opinion-text");
  //   const selection = window.getSelection();
  //   const selectedText = selection?.toString();
  //   if (selection && !opinionText?.contains(selection.anchorNode)) return;
  //   if (selectedText) {
  //     setShowInteractionModal(true);
  //     setHighlightedText(selectedText);
  //     const range = selection?.getRangeAt(0);
  //     const container = document.createElement("span");
  //     container.style.position = "relative";
  //     container.style.display = "inline-block";
  //     container.style.textIndent = "0";
  
  //     const highlightedText = document.createElement("span");
  //     highlightedText.className = "highlightedText";
  //     highlightedText.textContent = selectedText;
  //     highlightedText.style.fontSize = "1.2em";
  
  //     const closeButton = document.createElement("button");
  //     closeButton.className = "highlight-close-button";
  //     closeButton.textContent = "✕";
  //     closeButton.addEventListener("click", (event) => {
  //       event.stopPropagation();
  //       setShowInteractionModal(false);
  //       setHighlightContainer(null);
  //       const parent = container.parentNode;
  //       if (parent) {
  //         parent.replaceChild(document.createTextNode(selectedText), container);
  //       }
  //     });
  
  //     const editButton = document.createElement("button");
  //     editButton.className = "highlight-edit-button";
  //     editButton.innerHTML = `
  //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
  //         <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
  //       </svg>
  //     `;
  //     editButton.addEventListener("click", (event) => {
  //       event.stopPropagation();
  //       setCurrentHighlightId(highlightId);
  //       setShowInteractionModal(true);
  //     });
  
  //     container.appendChild(highlightedText);
  //     container.appendChild(closeButton);
  //     container.appendChild(editButton);
  //     setHighlightContainer(container);
  
  //     range?.deleteContents();
  //     range?.insertNode(container);
  
  //     range?.setStartAfter(container);
  //     selection?.removeAllRanges();
  //     if (range) {
  //       selection?.addRange(range);
  //     }
  
  //     const highlightId = generateHighlightId();
  //     setCurrentHighlightId(highlightId);
  //     setHighlights((prev) => [
  //       ...prev,
  //       { id: highlightId, container, text: selectedText },
  //     ]);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mouseup", handleTextSelect);
  //   return () => {
  //     document.removeEventListener("mouseup", handleTextSelect);
  //   };
  // }, [highlightEnabled]);

  

  return (
    <div className="z-30  w-[60%] h-[750px] bg-white p-6 shadow-lg rounded-md">
      <div className="w-full">
        <div className="w-full flex justify-evenly relative items-center p-4">
          <div className="relative w-[100%] flex">
            <h2 className="text-7xl leading-tight- mb-4 w-5/6 font-black px-4">
              {rebuttal.title}{" "}
            </h2>
          </div>
          <div className="mx-4 flex absolute top-4 right-24 gap-x-4 mt-4">
            <button className="p-4 rounded-full border-red-500 border hover:bg-red-600 text-red-600 hover:text-white ease-in-out transition duration-200">
              <FontAwesomeIcon icon={faFlag} className="w-6 h-6" />
            </button>
            <button className="p-4 rounded-full border-gray-700 hover:bg-[#2b2b2b] ease-in-out transition duration-200 hover:text-white border">
              <FontAwesomeIcon icon={faThumbsUp} className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 max-h-[400px] custom-scrollbar">
          {/* Opinion Content */}
          <div>
            <div className="relative mx-4 px-4">
              <p className="opinion-text text-lg font-bold indent-3">
                {rebuttal.author}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[400px] my-4 p-8 text-sm overflow-y-auto">
          <p>
           {rebuttal.textcontent}
          </p>
        </div>
      </div>

      {/* {showInteractionModal && (
        <InteractionModal
          onClose={closeInteractionModal}
          addEmojiToHighlight={addEmojiToHighlight}
          addCommentToHighlight={addCommentToHighlight}
        />
      )} */}
    </div>
  );
};

export default RebuttalModal;
