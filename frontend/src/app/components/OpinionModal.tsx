"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown, IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoClose, IoPencil } from "react-icons/io5";
import RebuttalShort from "./RebuttalShort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPaperPlane, FaFlag } from "react-icons/fa6";
import ProgressBar from "progressbar.js";
import SurveyPrompt from "./SurveyPrompt";
import {
  faFlag,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import InteractionModal from "./InteractionModal";

interface OpinionModalProps {
  opinionData?: {
    id: number;
    title: string;
    content: string;
  };
  closeModal: () => void;
}

interface Highlight {
  id: string;
  container: HTMLElement;
  text: string;
}

const OpinionModal: React.FC<OpinionModalProps> = ({
  opinionData,
  closeModal,
}) => {
  const [selectedTab, setSelectedTab] = useState("Opinion");
  const [hideOpinion, setHideOpinion] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [replyMenu, setReplyMenu] = useState(false);

  const handleButtonClick = () => {
    setHideOpinion(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  };

  const openReplies = () => {
    setReplyMenu((e) => !e);
  };

  //Progress bar
  const containerRef = useRef(null);

  const [highlightedText, setHighlightedText] = useState("");
  const [highlightContainer, setHighlightContainer] = useState<HTMLElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [interactionType, setInteractionType] = useState<"emoji" | "comment" | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [currentHighlightId, setCurrentHighlightId] = useState<string | null>(null);

  const generateHighlightId = () => `highlight-${Math.random().toString(36).substr(2, 9)}`;

  const closeInteractionModal = () => {
    setShowInteractionModal(false);
  }
  const addEmojiToHighlight = (emoji: string) => {
    if (currentHighlightId) {
      setHighlights((prevHighlights) =>
        prevHighlights.map((highlight) =>
          highlight.id === currentHighlightId ? { ...highlight, container: updateHighlightContainer(highlight.container, emoji, "emoji") } : highlight
        )
      );
      setShowInteractionModal(false);
    }
  };

  const addCommentToHighlight = (comment: string) => {
    if (currentHighlightId) {
      setHighlights((prevHighlights) =>
        prevHighlights.map((highlight) =>
          highlight.id === currentHighlightId ? { ...highlight, container: updateHighlightContainer(highlight.container, comment, "comment") } : highlight
        )
      );
      setShowInteractionModal(false);
    }
  };

  const updateHighlightContainer = (container: HTMLElement, content: string, type: "emoji" | "comment") => {
    const existingEmoji = container.querySelector('.emoji');
    const existingComment = container.querySelector('.comment');
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
    const opinionText = document.querySelector('.opinion-text');
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

      closeButton.addEventListener('click', (event) => {
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
      editButton.addEventListener('click', (event) => {
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
      setHighlights((prev) => [...prev, { id: highlightId, container, text: selectedText }]);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelect);
    return () => {
      document.removeEventListener("mouseup", handleTextSelect);
    };
  }, [highlightEnabled]);

  return (
    <div className="z-10 absolute right-[1.5%] top-[1.5%] w-[60%] min-h-[900px] bg-white p-6 shadow-lg rounded-md">
      <div className="border-b-[1px] -mx-6 border-[#C5C5C5] mb-[3%] text-xl font-bold flex items-center px-8 gap-12">
        <IoClose onClick={closeModal} className="cursor-pointer" />
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
            selectedTab === "Discussion"
              ? "border-b-[4px] border-[#606060] "
              : "border-b-0"
          }`}
          onClick={() => setSelectedTab("Discussion")}
        >
          Discussion
        </a>
      </div>
      {/* Survey Container */}
      <div
        className={`absolute inset-x-0 top-16 left-0 h-full bg-[#2b2b2b] z-30 flex justify-center shadow-lg rounded-b-md ${
          hideOpinion ? "" : "invisible"
        }`}
      >
        <div className="absolute -top-[5rem] left-0 w-full h-[5rem] bg-gradient-to-t from-[#2b2b2b] to-transparent z-40"></div>

        <div className="p-6 flex-col text-white ">
          <h3 className="text-6xl w-1/2 font-black my-4 p-4">Tell Us..</h3>
          <SurveyPrompt prompt="Life begins at conception, and abortion is morally equivalent to taking an innocent human life." />
          <SurveyPrompt prompt="Some religions grant exceptions for abortion in cases of rape, incest, or when the mothers life is in danger, while others oppose it under any circumstances." />
          <SurveyPrompt prompt="Abortion should be a private matter between a woman and her healthcare provider." />
          <button
            onClick={handleButtonClick}
            className="shadow-lg rounded-full my-4 text-white w-20 h-20 hover:scale-95 ease-in-out duration-200 bg-green-500 bottom-4 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="w-8 h-8" />
          </button>
        </div>
      </div>
      {showConfirmation && (
        <div className="absolute w-full h-[100%] z-50 inset-0 bg-gradient-to-t from-stone-500 to-white/50 bg-opacity-95 flex items-center justify-center">
          <div className="p-4 rounded shadow-lg text-black bg-white">
            Your response has been recorded!

      <div className="flex-1 max-h-[550px] overflow-y-auto custom-scrollbar">
        {/* Opinion Content */}
        {selectedTab == "Opinion" && (
          <div>
            <div className="relative z-10 mx-4 px-4 mt-6">
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
        </div>
      )}

      <div className="w-full  overflow-y-auto ">
        <div className="w-full flex justify-evenly relative items-center  p-4">
          <div className="relative w-[60%] flex">
            <h2 className="text-7xl leadin`g-tight- mb-4 w-5/6 font-black px-4">
              VIABILITY AS THE LIMIT
            </h2>
            <button
              onClick={openReplies}
              className="absolute bottom-6 font-bold px-4 py-2 border border-black rounded-full text-black left-1/2 flex items-center gap-x-2"
            >
              Reply
              <IoIosArrowDropdown />
            </button>
            {replyMenu && (
              <section className="absolute top-full left-1/3 gap-y-4 w-1/2 max-h-40 z-10 bg-[#2b2b2b] shadow-lg text-white ">
                <button className="w-full p-4 text-left hover:bg-white hover:text-black ease-in-out   duration-200 transition border-b">
                  Rebuttal
                  <p className="text-gray-500  text-xs">
                    Give them a fierce second opinion
                  </p>
                </button>
                <button className="w-full p-4 text-left hover:bg-white hover:text-black ease-in-out   duration-200 transition border-b">
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
            </div>{" "}
          </div>

          <div className=" mx-4 flex absolute top-2 right-24 gap-x-4 mt-4">
            <button className="p-4 rounded-full border-red-500 border hover:bg-red-600 text-red-600 hover:text-white ease-in-out transition duration-200">
              <FontAwesomeIcon icon={faFlag} className="w-6 h-6  " />
            </button>
            <button className="p-4 rounded-full border-gray-700 hover:bg-[#2b2b2b] ease-in-out transition duration-200 hover:text-white border">
              <FontAwesomeIcon icon={faThumbsUp} className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 max-h-[350px] custom-scrollbar">
          {/* Opinion Content */}
          {selectedTab == "Opinion" && (
            <div>
              <div className="relative mx-4 px-4">
                <p className="text-sm indent-3">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                  Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
                  ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                  bibendum lorem. Morbi convallis convallis diam sit amet
                  lacinia. Aliquam in elementum tellus. Curabitur tempor quis
                  eros tempus lacinia. Nam bibendum pellentesque quam a
                  convallis. <br></br>
                  <br></br> Sed ut vulputate nisi. Integer in felis sed leo
                  vestibulum venenatis. Suspendisse quis arcu sem. Aenean
                  feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna.
                  Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh.
                  Mauris sit amet magna non ligula vestibulum eleifend. Nulla
                  varius volutpat turpis sed lacinia. Nam eget mi in purus
                  lobortis eleifend. Sed nec ante dictum sem condimentum
                  ullamcorper quis venenatis nisi. Proin vitae facilisis nisi,
                  ac posuere leo. Nam pulvinar blandit velit, id condimentum
                  diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi
                  nec, fermentum congue felis. Quisque mauris dolor, fringilla
                  sed tincidunt ac, finibus non odio. <br></br>
                  <br></br> Sed vitae mauris nec ante pretium finibus. Donec
                  nisl neque, pharetra ac elit eu, faucibus aliquam ligula.
                  Nullam dictum, tellus tincidunt tempor laoreet, nibh elit
                  sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean
                  gravida turpis nisi, consequat dictum risus dapibus a. Duis
                  felis ante, varius in neque eu, tempor suscipit sem. Maecenas
                  ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus
                  vitae justo pharetra consequat. Mauris id mi ut arcu feugiat
                  maximus. Mauris consequat tellus id tempus aliquet. Vestibulum
                  dictum ultrices elit a luctus. Sed in ante ut leo congue
                  posuere at sit amet ligula. Pellentesque eget augue nec nisl
                  sodales blandit sed et sem. Aenean quis finibus arcu, in
                  hendrerit purus. Praesent ac aliquet lorem. Morbi feugiat
                  aliquam ligula, et vestibulum ligula hendrerit vitae. Sed ex
                  lorem, pulvinar sed auctor sit amet, molestie a nibh. Ut
                  euismod nisl arcu, sed placerat nulla volutpat aliquet. Ut id
                  convallis nisl. Ut mauris leo, lacinia sed elit id, sagittis
                  rhoncus odio. Pellentesque sapien libero, lobortis a placerat
                  et, malesuada sit amet dui. Nam sem sapien, congue eu rutrum
                  nec, pellentesque eget ligula. Nunc tempor interdum ex, sed
                  cursus nunc egestas aliquet. Pellentesque interdum vulputate
                  elementum. Donec erat diam, pharetra nec enim ut, bibendum
                  pretium tellus. Vestibulum et turpis nibh. Cras vel ornare
                  velit, ac pretium arcu. Cras justo augue, finibus id
                  sollicitudin et, rutrum eget metus. Suspendisse ut mauris eu
                  massa pulvinar sollicitudin vel sed enim. Pellentesque viverra
                  arcu et dignissim vehicula. <br></br>
                  <br></br> Donec a velit ac dolor dapibus pellentesque sit amet
                  at erat. Phasellus porttitor, justo eu ultrices vulputate,
                  nisi mi placerat lectus, sed rutrum tellus est id urna.
                  Aliquam pellentesque odio metus, sit amet imperdiet nisl
                  sodales eu. Quisque viverra nunc nec vestibulum dapibus.
                  Integer nec diam a libero tincidunt varius sed vel odio. Donec
                  rutrum dapibus massa, vel tempor nulla porta id. Suspendisse
                  vulputate fermentum sem sollicitudin facilisis. Aliquam
                  vehicula sapien nec ante auctor, quis mollis leo tincidunt.
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Discussion Content */}

        {selectedTab == "Discussion" && (
          <div className="flex flex-col items-center gap-y-2 max-h-96 overflow-y-auto">
            <RebuttalShort />
            <RebuttalShort />
            <RebuttalShort />
            <RebuttalShort />
            <RebuttalShort />
            <RebuttalShort />
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
