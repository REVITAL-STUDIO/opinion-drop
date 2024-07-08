"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown, IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
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

interface OpinionModalProps {
  opinionData?: {
    id: number;
    title: string;
    content: string;
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
    </div>
  );
};

export default OpinionModal;
