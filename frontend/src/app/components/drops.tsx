"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faArrowUpFromBracket,
  faEye,
  faMicrophoneLines,
  faMicrophoneLinesSlash,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Questions from "./questions";
import DetailsModal from "./DetailsModal";
import OpinionModal from "./OpinionModal";
import StateIt from "./stateIt";
import DebateIt from "./debateIt";
import MoreButton from "./moreButton";
import { motion } from "framer-motion";
import OpinionComments from "./OpinionComments";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../hooks/AuthContext";

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
  textcontent: string;
  backgroundimage: string;
  authorprofileimage?: string;
}

interface SurveyQuestion {
  questionId: number;
  questionText: string;
}

export interface Survey {
  surveyId: number;
  questions: SurveyQuestion[];
}

const Drop = ({ topic }: dropsProps) => {
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [showRepliesModal, setShowRepliesModal] = useState(true);
  const [stateIt, setStateIt] = useState(false);
  const [debateIt, setDebateIt] = useState(false);
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState(false); // Flag to track if the user has liked
  const [hasDisliked, setHasDisliked] = useState(false);
  const [activeButton, setActiveButton] = useState<"like" | "dislike" | null>(
    null
  );
  const { currentUser } = useAuth();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [survey, setSurvey] = useState<Survey | null>(null);


  //logic for Society Percentage


  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleStateIt = () => {
    setStateIt(!stateIt);
  };

  const toggleDebateIt = () => {
    setDebateIt(!debateIt);
  };

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
      setOpinions(response.data.opinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  useEffect(() => {
    fetchOpinions();
  }, []);

  useEffect(() => { }, [opinions]);

  const [currdeg, setCurrdeg] = useState(0);
  const rotate = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrdeg((prev) => prev - 60);
    } else if (direction === "prev") {
      setCurrdeg((prev) => prev + 60);
    }
  };

  const toggleIncrease = () => {
    // If the user has not liked, add the like
    setLikes((prevLikes) => prevLikes + 1);
    setHasLiked(true);
    setActiveButton("like"); // Set 'like' button as active
  };

  const toggleDecrease = () => {
    if (likes > 0 && !hasDisliked) {
      setLikes((prevLikes) => prevLikes - 1);
      setHasDisliked(false);
    }
    setActiveButton("dislike"); // Set 'dislike' button as active
  };

  const hasSubmittedSurvey = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/surveys/userSubmitted/${survey?.surveyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid })
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving has submitted");
      }

      const response = await res.json();
      return response.data.userHasSubmitted;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const fetchSurvey = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/surveys/topic/${topic.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving survey");
      }

      const response = await res.json();
      console.log("survey received", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  useEffect(() => {
    const loadSurvey = async () => {
      if (!survey) {
        const surveyData = await fetchSurvey();
        console.log("surveyData: ", surveyData);
        setSurvey(surveyData);
      }
    };
  
    const checkSurvey = async () => {
      if (survey) {
        const submitted = await hasSubmittedSurvey();
        console.log("hasSubmittedSurvey: ", submitted);
        setHasSubmitted(submitted);
        console.log("state survey: ", survey);
      }
    };
  
    loadSurvey();
    checkSurvey();
  }, [survey]); 

  return (
    <section className=" flex  justify-center items-center my-6">
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
                    className="absolute w-[100%] h-[100%] object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black opacity-30"></div>

                  <div className="text-white text-[15px] font-medium absolute bottom-[4rem] left-4 text-left line-clamp-3 leading-tight flex flex-col gap-2">
                    <p className="text-[12px]">{slide.author}</p>

                    <p className="text-[18px] font-bold">{slide.title}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOpinion(slide);
                    }}
                    className="px-4 py-2 z-40 shadow-lg text-white hover:bg-[#ececec] bg-[#000]/70 border ease-in-out duration-200 transition hover:text-black  rounded-full text-xs  absolute bottom-2 left-2"
                  >
                    View{" "}
                    <FontAwesomeIcon icon={faEye} className="text-xs ml-1" />
                  </button>
                  {/* Likes and Dislikes */}
                  <div className="px-4 py-2 z-40 shadow-lg text-white rounded-full text-xs bg-purple-600 absolute bottom-2 right-2 flex justify-between items-center">
                    <button
                      className={`w-[1rem] h-[1rem] bg-white/75 rounded-full flex justify-center items-center ease-in-out transition duration-300 ${activeButton === "like"
                        ? "scale-125 bg-gradient-to-br from-blue-500 to-red-500 text-white shadow-sm"
                        : "scale-100 text-black"
                        }`}
                      onClick={toggleIncrease}
                    >
                      <FontAwesomeIcon
                        icon={faMicrophoneLines}
                        className="text-xs t"
                      />
                    </button>
                    <span className="mx-2 text-xs">{likes}</span>
                    <button
                      className={`w-[1rem] h-[1rem] bg-white/75 rounded-full flex justify-center items-center ease-in-out transition duration-300 ${activeButton === "dislike"
                        ? "scale-125 text-white bg-gradient-to-br to-blue-200 from-red-800 shadow-sm"
                        : "scale-100 text-black"
                        }`}
                      onClick={toggleDecrease}
                    >
                      <FontAwesomeIcon
                        icon={faMicrophoneLinesSlash}
                        className="text-xs "
                      />
                    </button>
                  </div>
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
        {selectedOpinion && survey && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed inset-0 bg-gradient-to-tr from-blue-500/95 via-white/95 to-red-500/95  bg-opacity-95 z-20 w-full h-screen flex justify-center items-center"
            >
              <button
                onClick={closeModal}
                className="w-12 h-12 shadow-lg flex justify-center bg-[#000]/20 hover:scale-90 duration-200 ease-in-out transition items-center rounded-full absolute top-4 left-4"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className=" text-xl text-white"
                />
              </button>{" "}
              <div className="w-1/2 ">
                {" "}
                <DetailsModal opinionData={selectedOpinion} />
              </div>
              <OpinionModal
                opinionData={selectedOpinion}
                closeModal={closeModal}
                toggleStateIt={toggleStateIt}
                toggleDebateIt={toggleDebateIt}
                hasSubmittedSurvey={hasSubmitted}
                survey={survey}
              />
              {stateIt && (
                <StateIt
                  opinionData={selectedOpinion}
                  topic={topic}
                  toggleStateIt={toggleStateIt}
                />
              )}
              {debateIt && (
                <DebateIt
                  opinionData={selectedOpinion}
                  topic={topic}
                  toggleDebateIt={toggleDebateIt}
                />
              )}
              <MoreButton
                toggleComments={toggleComments}
                showComments={showComments}
              />
              {showComments && (
                <OpinionComments
                  closeModal={toggleComments}
                  opinionData={selectedOpinion}
                />
              )}{" "}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Drop;
