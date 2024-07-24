"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowUpFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Questions from "./questions";
import DetailsModal from "./DetailsModal";
import OpinionModal from "./OpinionModal";
import RepliesModal from "./RepliesModal";
import StateIt from "./stateIt";
import Debate from "./debateIt";
import MoreButton from "./moreButton";

interface dropsProps {
  topic: {
    name: string;
    id: number;
  };
}

interface Opinion {
  id: number;
  author: string;
  title: string;
  text: string;
  backgroundimage: string;
  authorprofileimage?: string;
}

const Drop = ({ topic }: dropsProps) => {
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [showRepliesModal, setShowRepliesModal] = useState(true);
  const [stateIt, setStateIt] = useState(false);
  const [debateIt, setDebateIt] = useState(false);

  const [opinions, setOpinions] = useState<Opinion[]>([]);

  const toggleStateIt = () => {
    setStateIt(!stateIt);
  };

  const toggleDebateIt = () => {
    setDebateIt(!debateIt);
  };

  console.log("Clicked:", toggleStateIt);

  const closeModal = () => {
    setSelectedOpinion(null);
  };

  
  const fetchOpinions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/topic/${topic.id}`,
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
      console.log("data: ", response.data);
      console.log("More Data:", response.data.opinions);
      setOpinions(response.data.opinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  useEffect(() => {
    fetchOpinions();
    console.log("opinions state variable", opinions);
  }, []);

  useEffect(() => {
    console.log("opinions state variable", opinions);
  }, [opinions]);

  const [currdeg, setCurrdeg] = useState(0);
  const rotate = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrdeg((prev) => prev - 60);
    } else if (direction === "prev") {
      setCurrdeg((prev) => prev + 60);
    }
  };

  return (
    <section className=" flex  justify-center items-center mt-6">
      <div className="container ">
        <div
          className="carousel"
          style={{
            transform: `rotateY(${currdeg}deg)`,
          }}
        >
          {opinions.length === 0 ? (
            <div className="item relative shadow-lg shadow-white/50">
              <button className="border w-[6rem] h-[6rem] rounded-full shadow-md flex justify-center items-center text-black">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="w-[2rem] h-[2rem] text-white"
                />
              </button>
              <p className="text-sm mt-2 w-2/3 p-4">
                Be the first to share your opinion!
              </p>
            </div>
          ) : (
            opinions.map((slide, index) =>
              slide ? (
                <div
                  key={index}
                  className={`item ${slide.id} relative shadow-lg shadow-white/50`}
                  style={{
                    transform: `rotateY(${index * 60}deg) translateZ(250px)`,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={slide.backgroundimage}
                    alt={slide.author}
                    fill
                    className="absolute w-[100%] h-[100%] object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black opacity-30"></div>

                  <div className="text-white text-[15px] font-black absolute bottom-[4rem] left-2 text-left line-clamp-3 leading-tight flex flex-col gap-2">
                    <p className="text-[12px]">{slide.author}</p>

                    <p className="text-[24px]">{slide.title}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOpinion(slide);
                    }}
                    className="px-4 py-2 z-40 border shadow-lg bg-black text-white rounded-full text-xs absolute bottom-2 left-4"
                  >
                    View
                  </button>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
      <div className="prev" onClick={() => rotate("prev")}>
        <FontAwesomeIcon icon={faAngleLeft} className="w-5 h-5" />{" "}
      </div>
      <div className="next" onClick={() => rotate("next")}>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />{" "}
      </div>
      <div>
        {selectedOpinion && (
          <>
            <div className="fixed inset-0 bg-gradient-to-tr from-blue-500/95 via-white/90 to-red-500/95  bg-opacity-95 z-20 w-full h-screen flex justify-center items-center">
              <div className="w-1/2 ">
                {" "}
                <DetailsModal opinionData={selectedOpinion} />
              </div>
              <OpinionModal
                opinionData={selectedOpinion}
                closeModal={closeModal}
                toggleStateIt={toggleStateIt}
                toggleDebateIt={toggleDebateIt}
              />
              {stateIt && <StateIt />}
              {debateIt && <Debate />}
              <MoreButton />
            </div>

            {/* State It */}
           

          </>
        )}
      </div>
    </section>
  );
};

export default Drop;
