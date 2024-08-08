"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEye,
  faMicrophoneLines,
  faMicrophoneLinesSlash,
  faPenFancy,
} from "@fortawesome/free-solid-svg-icons";
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
  authorprofileimage: string;
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
  const [dislikes, setDislikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState(false); // Flag to track if the user has liked
  const [hasDisliked, setHasDisliked] = useState(false);
  const [activeButton, setActiveButton] = useState<"like" | "dislike" | null>(
    null
  );
  const { currentUser } = useAuth();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [survey, setSurvey] = useState<Survey | null>(null);
  console.log("survey", survey);

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

  useEffect(() => {}, [opinions]);

  const [currdeg, setCurrdeg] = useState(0);
  const rotate = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrdeg((prev) => prev - 60);
    } else if (direction === "prev") {
      setCurrdeg((prev) => prev + 60);
    }
  };

  const [close, setClose] = useState(false);
  const detailsModalRef = useRef<HTMLDivElement>(null);
  const opinionModalRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      detailsModalRef.current &&
      !detailsModalRef.current.contains(event.target as Node) &&
      opinionModalRef.current &&
      !opinionModalRef.current.contains(event.target as Node) &&
      moreButtonRef.current &&
      !moreButtonRef.current.contains(event.target as Node)
    ) {
      setClose(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenModal = (opinion: Opinion) => {
    setSelectedOpinion(opinion);
    setClose(false); // Reset the close state
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
          body: JSON.stringify({ userId: currentUser?.uid }),
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

  const [numLikes, setNumLikes] = useState<number>(0);
  const [numDislikes, setNumDislikes] = useState<number>(0);
  console.log("likes:", numLikes);
  console.log("dislikes:", numDislikes);

  const getNumOpinionLikes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/numlikes/${topic.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving opinion like count");
      }
      const response = await res.json();
      console.log("likes", response);

      setNumLikes(response.data.numLikes);
    } catch (error) {
      console.log("Error Fetching Opinion like count: ", error);
    }
  };

  const getNumDislikes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/numDislikes/${topic.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving opinion dislike count");
      }
      const response = await res.json();
      console.log("Dislikes", response);
      setNumDislikes(response.data.numDislikes);
    } catch (error) {
      console.log("Error Fetching Opinion dislike count: ", error);
    }
  };

  useEffect(() => {
    getNumDislikes();
    getNumOpinionLikes();
  }, []);

  return (
    <section className=" flex  justify-center items-center">
      <div className="container ">
        <div
          className="carousel"
          style={{
            transform: `rotateY(${currdeg}deg)`,
          }}
        >
          {currentUser ? (
            opinions.length === 0 ? (
              <div className="item relative shadow-lg bg-gradient-to-br to-white from-gray-600 shadow-white/100">
                <button className="border w-[6rem] h-[6rem] shadow-md rounded-full flex justify-center items-center text-black">
                  <FontAwesomeIcon
                    icon={faPenFancy}
                    className="text-3xl text-[#2b2b2b]/75"
                  />
                </button>
                <p className="text-sm mt-2 p-4 text-[#2b2b2b]/75">
                  Be the First to Drop your Essay!
                  <br></br>
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-white bg-black opacity-40"></div>
                    <div className="text-white font-medium absolute top-1/2 left-4 text-left line-clamp-3 leading-tight flex flex-col gap-2">
                      <p className="text-[12px]">{slide.author}</p>
                      <p className="text-[18px] font-bold">{slide.title}</p>
                    </div>
                    <div className="flex justify-between px-2 w-full gap-y-1 absolute bottom-2">
                      <button
                        onClick={() => handleOpenModal(slide)}
                        className="w-[2rem] h-[2rem] z-40 shadow-lg text-black hover:bg-[#ececec] bg-[#ececec]/90 ease-in-out duration-400 transition hover:text-black rounded-full text-xs bottom-2 left-2"
                      >
                        <FontAwesomeIcon icon={faEye} className="text-[10px]" />
                      </button>
                      <div className="px-4 py-2 z-40 shadow-lg text-white rounded-full text-xs bg-gradient-to-tl from-purple-200 to-white bottom-2 right-2 flex justify-between items-center">
                        <button
                          className={`w-[1rem] h-[1rem] bg-white/75 rounded-full flex justify-center items-center ease-in-out transition duration-300 ${
                            activeButton === "like"
                              ? "scale-125 bg-gradient-to-br from-blue-500 to-red-500 text-white shadow-sm"
                              : "scale-100 text-black"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faMicrophoneLines}
                            className="text-xs"
                          />
                        </button>

                        <span className="mx-2 text-[10px] text-black">
                          {numLikes}
                        </span>
                        <button
                          className={`w-[1rem] h-[1rem] bg-white/75 rounded-full flex justify-center items-center ease-in-out transition duration-300 ${
                            activeButton === "dislike"
                              ? "scale-125 text-white bg-gradient-to-br to-blue-200 from-red-800 shadow-sm"
                              : "scale-100 text-black"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faMicrophoneLinesSlash}
                            className="text-xs"
                          />
                        </button>
                        <span className="mx-2 text-[10px] text-black">
                          {numDislikes}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null
              )
            )
          ) : (
            <div className="item relative shadow-lg bg-gradient-to-br from-white to-gray-600 shadow-white/100">
              <button className="border w-[6rem] h-[6rem] shadow-md rounded-full flex justify-center items-center text-black">
                <FontAwesomeIcon
                  icon={faPenFancy}
                  className="text-3xl text-[#2b2b2b]/75"
                />
              </button>
              <p className="text-sm mt-2 p-4 text-[#2b2b2b]/75">
                <br></br> Sign Up to get started
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="prev shadow-lg" onClick={() => rotate("prev")}>
        <FontAwesomeIcon icon={faAngleLeft} className="w-5 h-5" />{" "}
      </div>
      <div className="next shadow-lg" onClick={() => rotate("next")}>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />{" "}
      </div>
      <div>
        {selectedOpinion && survey && (
          <>
            {!close && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed inset-0 bg-gradient-to-tr from-blue-500/95 via-white/95 to-red-500/95 text-black bg-opacity-95  w-full h-screen flex justify-center items-center z-20"
              >
                <div ref={detailsModalRef} className="w-1/2 ">
                  {" "}
                  <DetailsModal opinionData={selectedOpinion} />
                </div>
                <div className="w-1/2" ref={opinionModalRef}>
                  <OpinionModal
                    opinionData={selectedOpinion}
                    toggleStateIt={toggleStateIt}
                    toggleDebateIt={toggleDebateIt}
                    hasSubmittedSurvey={hasSubmitted}
                    survey={survey}
                  />
                </div>
                <div ref={moreButtonRef}>
                  <MoreButton
                    toggleComments={toggleComments}
                    showComments={showComments}
                  />
                  {showComments && (
                    <OpinionComments opinionData={selectedOpinion} />
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Drop;
