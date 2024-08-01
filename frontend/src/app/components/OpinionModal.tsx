"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown, IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import RebuttalShort from "./RebuttalShort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPaperPlane, FaFlag, FaX } from "react-icons/fa6";
import ProgressBar from "progressbar.js";
import InteractionModal from "./InteractionModal";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { motion } from "framer-motion";

import SurveyPrompt from "./SurveyPrompt";
import {
  faFlag,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import OpenRebuttal from "./RebuttalModal";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import StateIt from "./stateIt";

function valuetext(value: number) {
  return `${value}`;
}

interface OpinionModalProps {
  opinionData: {
    id: number;
    author: string;
    title: string;
    textcontent: string;
    backgroundimage: string;
    authorprofileimage?: string;
  };
  closeModal: () => void;
  toggleStateIt: () => void;
  toggleDebateIt: () => void;
}

interface Rebuttal {
  id: number;
  author: string;
  title: string;
  textcontent: string;
  authorprofileimage?: string;
  parentopinionid: number;
}

interface Highlight {
  id: string;
  container: HTMLElement;
  text: string;
}

const OpinionModal: React.FC<OpinionModalProps> = ({
  opinionData,
  closeModal,
  toggleStateIt,
  toggleDebateIt,
}) => {
  const [selectedTab, setSelectedTab] = useState("Opinion");
  const [hideOpinion, setHideOpinion] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [replyMenu, setReplyMenu] = useState(false);
  const [rebuttals, setRebuttals] = useState<Rebuttal[]>([]);

  const [highlightedText, setHighlightedText] = useState("");
  const [highlightContainer, setHighlightContainer] =
    useState<HTMLElement | null>(null);
  const [showEmojiPicker, setShowEmorjiPicker] = useState(false);
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
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const openDiscussionModal = () => {
    setOpenDiscussion(true);
  };

  const closeDiscussion = () => {
    setOpenDiscussion(false);
  };

  const handleButtonClick = () => {
    setHideOpinion(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const openReplies = () => {
    setReplyMenu((e) => !e);
  };

  //Progress bar
  const containerRef = useRef(null);

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

      // Remove the selected text and insert the container in its place
      range?.deleteContents();
      range?.insertNode(container);

      // Move the cursor after the inserted container
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
    if (typeof document !== "undefined") {
      document.addEventListener("mouseup", handleTextSelect);
      return () => {
        document.removeEventListener("mouseup", handleTextSelect);
      };
    }
  }, [highlightEnabled]);

  const fetchRebuttals = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinion/rebuttals/${opinionData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving opinions");
      }
      const response = await res.json();
      setRebuttals(response.data.opinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  useEffect(() => {
    fetchRebuttals();
  }, []);

  const demoRebuttals = [
    {
      id: 1,
      title: "Pro-Choice Perspectives on Abortion",
      author: "Alice Johnson",
      textcontent: "rebutall text...........",
      parentOpinionId: 1,
    },
    {
      id: 1,
      title: "Pro-Life Arguments Against Abortion",
      author: "Bob Smith",
      textcontent: "rebutall text...........",
      parentOpinionId: 1,
    },
    {
      id: 1,
      title: "Legal Aspects of Abortion Rights",
      author: "Catherine Lee",
      textcontent: "rebutall text...........",
      parentOpinionId: 1,
    },
    {
      id: 1,
      title: "Ethical Considerations in Abortion Debates",
      author: "David Brown",
      textcontent: "rebutall text...........",
      parentOpinionId: 1,
    },
    {
      id: 1,
      title: "Medical Implications of Abortion Procedures",
      author: "Eva Green",
      textcontent: "rebutall text...........",
      parentOpinionId: 1,
    },
  ];

  return (
    <div className="z-30  w-[45%] h-[750px] bg-white p-6 shadow-lg relative rounded-md">
      <div className="border-b-[1px] -mx-6 border-[#C5C5C5] mb-[3%] text-xl font-bold flex items-center px-8 gap-12">
        <IoClose onClick={closeModal} className="cursor-pointer z-100" />
        <a
          className={`cursor-pointer ${
            selectedTab === "Opinion"
              ? "border-b-[4px] border-[#606060] "
              : "border-b-0"
          }`}
          onClick={() => setSelectedTab("Opinion")}
        >
          Opinion
        </a>
        <a
          className={`cursor-pointer ${
            selectedTab === "Rebuttal"
              ? "border-b-[4px] border-[#606060] "
              : "border-b-0"
          }`}
          onClick={() => setSelectedTab("Rebuttal")}
        >
          Rebuttal
        </a>
      </div>
      {/* Survey Container */}
      <div
        className={`absolute inset-x-0 bottom-0 left-0 h-[90%]     bg-[#fff] z-30 flex justify-center shadow-lg rounded-b-md ${
          hideOpinion ? "" : "invisible"
        }`}
      >
        <div className="absolute -top-[5rem] left-0 w-full h-[5rem]  bg-[#fff]  z-40"></div>

        <div className="p-4 flex-col text-black relative">
          <h3 className="text-6xl w-1/2 font-black  p-4">Tell Us..</h3>
          <SurveyPrompt prompt="Life begins at conception, and abortion is morally equivalent to taking an innocent human life." />
          <SurveyPrompt prompt="Some religions grant exceptions for abortion in cases of rape, incest, or when the mothers life is in danger, while others oppose it under any circumstances." />
          <SurveyPrompt prompt="Abortion should be a private matter between a woman and her healthcare provider." />
          <button
            onClick={handleButtonClick}
            className="shadow-lg rounded-full absolute bottom-8 text-white w-20 h-20 hover:scale-95 ease-in-out duration-200 bg-green-500 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
          </button>
        </div>
      </div>
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute w-full h-[100%] z-50 inset-0 bg-gradient-to-t from-white to-white/95 bg-opacity-100 flex items-center justify-center"
        >
          <div className="px-4 py-[10%]  flex flex-col ">
            <div className="p-4  mx-auto my-4 border-4 border-green-300 bg-green-300 rounded-full flex justify-center items-center">
              <FontAwesomeIcon icon={faCheck} className="text-3xl text-white" />
            </div>
            <span className="mx-auto text-4xl my-2 font-black">Response Recorded</span>
            <span className="mx-auto">Your response has been recorded!</span>
          </div>
        </motion.div>
      )}

      <div className="w-full  overflow-y-auto">
        <div className="w-full flex justify-evenly relative items-center  p-4">
          <div className="relative w-[100%] flex">
            <h2 className="text-5xl leading-tight mb-4 w-4/6 font-black px-4">
              {opinionData.title.toUpperCase()}
            </h2>
            <button
              onClick={openReplies}
              className={`font-bold w-1/4 h-10 mt-2 border shadow-md rounded-full text-white flex items-center justify-center gap-x-2 bg-[#000] `}
            >
              Reply
              <IoIosArrowDropdown
                className={`${
                  replyMenu ? "rotate-0" : "-rotate-180"
                } transition ease-in-out duration-150`}
              />
            </button>
            {replyMenu && (
              <section
                className={`absolute top-full right-4 gap-y-4 w-2/5 overflow-hidden transition-opacity ${
                  replyMenu ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }  transition-all ease-in-out duration-150 z-10 bg-[#fafafa] rounded-lg shadow-lg text-white `}
              >
                <button
                  onClick={toggleStateIt}
                  className="w-full p-4 text-left hover:bg-white text-black ease-in-out   duration-200 transition rounded-tl-lg hover:scale-110 rounded-tr-lg border-b  "
                >
                  <span className="font-semibold">State It</span>
                  <p className="  text-xs">
                    Support this Claim.. Better yet, add on
                  </p>
                </button>
                <button
                  onClick={toggleDebateIt}
                  className="w-full p-4 text-left text-black ease-in-out rounded-bl-lg rounded-br-lg hover:scale-110 duration-200 transition "
                >
                  <span className="font-semibold">Debate It</span>
                  <p className=" text-xs">Give them a fierce second opinion</p>
                </button>
              </section>
            )}
          </div>
        </div>

        <div className="flex-1 max-h-[500px] overflow-y-auto custom-scrollbar ">
          {/* Opinion Content */}
          {selectedTab == "Opinion" && (
            <div>
              <div className="relative mx-4 px-4">
                <p className="opinion-text text-sm indent-3">
                  {opinionData.textcontent}
                </p>
              </div>
              {/* Rate it */}
              <div className="w-[90%] mx-auto  p-4 rounded-xl text-black">
                <div className="w-full my-4">
                  <h1 className=" text-center font-semibold">
                    Does this essay belong in this topic?
                  </h1>
                  <div className="p-4 mx-auto mt-[2%] rounded-full w-[50%] flex justify-evenly items-center">
                    <button className="w-20 h-20 rounded-full hover:scale-105 ease-in-out duration-200 transition bg-white text-3xl shadow-lg">
                      👍
                    </button>
                    <button className="w-20 h-20 rounded-full hover:scale-105 ease-in-out duration-200 transition  bg-white text-3xl shadow-lg">
                      👎
                    </button>
                  </div>
                </div>
                <div className="w-full mx-auto">
                  <h2 className="my-4 text-center font-semibold">
                    How much do you agree with this Essay?
                  </h2>
                  <div className="w-full flex justify-center items-center">
                    <Box sx={{ width: 300 }}>
                      <Slider
                        aria-label="Temperature"
                        defaultValue={50}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={100}
                        className="mx-auto "
                      />
                    </Box>
                  </div>
                  <p className="text-center text-3xl font-bold mb">
                    {valuetext(sliderValue)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Rebuttals */}

        {selectedTab == "Rebuttal" && (
          <div className="flex flex-col items-center gap-y-2 max-h-[500px] overflow-y-auto relative">
            <div className="w-[90%]">
              {rebuttals.map((rebuttalData) => (
                <RebuttalShort rebuttal={rebuttalData} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Interaction Modal */}
      {showInteractionModal && (
        <InteractionModal
          highlightedText={highlightedText}
          onClose={closeInteractionModal}
          onAddEmoji={addEmojiToHighlight}
          onAddComment={addCommentToHighlight}
        />
      )}
    </div>
  );
};

export default OpinionModal;
