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

  //Progress bar
  const containerRef = useRef(null);

  return (
    <div className="z-30 absolute right-[1.5%] top-[1.5%] w-[60%] min-h-[900px] bg-white p-6 shadow-lg rounded-md">
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
      <div className="w-full flex justify-evenly items-center  p-4">
        <div className="relative w-[60%] flex">
          <h2 className="text-7xl leading-tight- mb-4 w-5/6 font-black px-4">
            VIABILITY AS THE LIMIT
          </h2>
          <button className="absolute bottom-6  left-1/2 flex items-center gap-x-2">
            Reply
            <IoIosArrowDropdown />
          </button>
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

      <div className="flex-1 max-h-[700px] overflow-y-auto custom-scrollbar">
        {/* Opinion Content */}
        {selectedTab == "Opinion" && (
          <div>
            <div className="relative z-10 mx-4 px-4">
              <p className="text-sm indent-3">
                Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus. Maecenas eget condimentum velit,
                sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Praesent
                auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
                urna. Curabitur vel bibendum lorem. Morbi convallis convallis
                diam sit amet lacinia. Aliquam in elementum tellus. Curabitur
                tempor quis eros tempus lacinia. Nam bibendum pellentesque quam
                a convallis. <br></br>
                <br></br> Sed ut vulputate nisi. Integer in felis sed leo
                vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat
                ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus
                lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit
                amet magna non ligula vestibulum eleifend. Nulla varius volutpat
                turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed
                nec ante dictum sem condimentum ullamcorper quis venenatis nisi.
                Proin vitae facilisis nisi, ac posuere leo. Nam pulvinar blandit
                velit, id condimentum diam faucibus at. Aliquam lacus nisi,
                sollicitudin at nisi nec, fermentum congue felis. Quisque mauris
                dolor, fringilla sed tincidunt ac, finibus non odio. <br></br>
                <br></br> Sed vitae mauris nec ante pretium finibus. Donec nisl
                neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam
                dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin
                felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis
                nisi, consequat dictum risus dapibus a. Duis felis ante, varius
                in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida
                sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra
                consequat. Mauris id mi ut arcu feugiat maximus. Mauris
                consequat tellus id tempus aliquet. Vestibulum dictum ultrices
                elit a luctus. Sed in ante ut leo congue posuere at sit amet
                ligula. Pellentesque eget augue nec nisl sodales blandit sed et
                sem. Aenean quis finibus arcu, in hendrerit purus. Praesent ac
                aliquet lorem. Morbi feugiat aliquam ligula, et vestibulum
                ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor sit
                amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla
                volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia
                sed elit id, sagittis rhoncus odio. Pellentesque sapien libero,
                lobortis a placerat et, malesuada sit amet dui. Nam sem sapien,
                congue eu rutrum nec, pellentesque eget ligula. Nunc tempor
                interdum ex, sed cursus nunc egestas aliquet. Pellentesque
                interdum vulputate elementum. Donec erat diam, pharetra nec enim
                ut, bibendum pretium tellus. Vestibulum et turpis nibh. Cras vel
                ornare velit, ac pretium arcu. Cras justo augue, finibus id
                sollicitudin et, rutrum eget metus. Suspendisse ut mauris eu
                massa pulvinar sollicitudin vel sed enim. Pellentesque viverra
                arcu et dignissim vehicula. <br></br>
                <br></br> Donec a velit ac dolor dapibus pellentesque sit amet
                at erat. Phasellus porttitor, justo eu ultrices vulputate, nisi
                mi placerat lectus, sed rutrum tellus est id urna. Aliquam
                pellentesque odio metus, sit amet imperdiet nisl sodales eu.
                Quisque viverra nunc nec vestibulum dapibus. Integer nec diam a
                libero tincidunt varius sed vel odio. Donec rutrum dapibus
                massa, vel tempor nulla porta id. Suspendisse vulputate
                fermentum sem sollicitudin facilisis. Aliquam vehicula sapien
                nec ante auctor, quis mollis leo tincidunt.
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
