import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown, IoIosSend } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import SurveyPrompt from "./SurveyPrompt";
import InteractionModal from "./InteractionModal";

interface Highlight {
  id: string;
  container: HTMLElement;
  text: string;
}

interface OpenRebuttalProps {
  opinionData?: {
    id: number;
    author: string;
    title: string;
    textContent: string;
    backgroundImage: string;
    profilePicture?: string;
  };
  closeModal?: () => void;
}

const OpenRebuttal: React.FC<OpenRebuttalProps> = ({
  opinionData,
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

  const handleTextSelect = () => {
    if (!highlightEnabled) return;
    const opinionText = document.querySelector(".opinion-text");
    const selection = window.getSelection();
    const selectedText = selection?.toString();
    if (selection && !opinionText?.contains(selection.anchorNode)) return;
    if (selectedText) {
      setShowInteractionModal(true);
      setHighlightedText(selectedText);
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
      closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setShowInteractionModal(false);
        setHighlightContainer(null);
        const parent = container.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(selectedText), container);
        }
      });

      const editButton = document.createElement("button");
      editButton.className = "highlight-edit-button";
      editButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
        </svg>
      `;
      editButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setCurrentHighlightId(highlightId);
        setShowInteractionModal(true);
      });

      container.appendChild(highlightedText);
      container.appendChild(closeButton);
      container.appendChild(editButton);
      setHighlightContainer(container);

      range?.deleteContents();
      range?.insertNode(container);

      range?.setStartAfter(container);
      selection?.removeAllRanges();
      if (range) {
        selection?.addRange(range);
      }

      const highlightId = generateHighlightId();
      setCurrentHighlightId(highlightId);
      setHighlights((prev) => [
        ...prev,
        { id: highlightId, container, text: selectedText },
      ]);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelect);
    return () => {
      document.removeEventListener("mouseup", handleTextSelect);
    };
  }, [highlightEnabled]);

  

  return (
    <div className="z-30  w-[60%] h-[800px] bg-white p-6 shadow-lg rounded-md">
      {/* Survey Container */}

      <div className="w-full">
        <div className="w-full flex justify-evenly relative items-center p-4">
          <div className="relative w-[60%] flex">
            <h2 className="text-7xl leading-tight- mb-4 w-5/6 font-black px-4">
              Pro-Choice Perspectives on Abortion{" "}
            </h2>
            <button
              onClick={openReplies}
              className="absolute bottom-6  font-bold px-4 py-2 border border-black rounded-full text-black left-3/4 flex items-center gap-x-2"
            >
              Reply
              <IoIosArrowDropdown />
            </button>
            {replyMenu && (
              <section className="absolute top-full left-1/3 gap-y-4 w-1/2 max-h-40 z-10 bg-[#2b2b2b] shadow-lg text-white">
                <button className="w-full p-4 text-left hover:bg-white hover:text-black ease-in-out duration-200 transition border-b">
                  Rebuttal
                  <p className="text-gray-500 text-xs">
                    Give them a fierce second opinion
                  </p>
                </button>
                <button className="w-full p-4 text-left hover:bg-white hover:text-black ease-in-out duration-200 transition border-b">
                  Engage
                  <p className="text-gray-500 text-xs">
                    Support this Claim.. Better yet, add on
                  </p>
                </button>
              </section>
            )}
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
            </div>
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
                Alice Johnson{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[300px] my-4 p-8 text-sm overflow-y-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. <br></br>
            <br></br>"Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?"<br></br>
            <br></br>"Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?"
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

export default OpenRebuttal;
