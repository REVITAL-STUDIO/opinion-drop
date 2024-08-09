"use client";

import {
  faArrowRightFromBracket,
  faEye,
  faGears,
  faSquareH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Settings from "./settings";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../hooks/AuthContext";
import DetailsModal from "./DetailsModal";
import OpinionModal from "./OpinionModal";
import StateIt from "./stateIt";
import DebateIt from "./debateIt";
import MoreButton from "./moreButton";
import OpinionComments from "./OpinionComments";
import RebuttalModal from "./RebuttalModal";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { disableScroll, enableScroll } from "../utils/scrollLock";

interface UserPortalProps {
  handleLogout: () => void;
  toggleOpenUserPortal: () => void;
}

interface Opinion {
  id: number;
  author: string;
  title: string;
  textcontent: string;
  backgroundimage: string;
  authorprofileimage: string;
  parentopinionid: number | null;
}

const UserPortal: React.FC<UserPortalProps> = ({
  handleLogout,
  toggleOpenUserPortal,
}) => {
  const { currentUser, loading, logout } = useAuth();

  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [rebuttals, setRebuttals] = useState<Opinion[]>([]);
  console.log("Rebuttals", rebuttals);
  const [rebuttalledOpinions, setRebuttaledOpinions] = useState<Opinion[]>([]);
  console.log("Rebuttalled Opinion", rebuttalledOpinions);
  const [savedOpinions, setSavedOpinions] = useState<Opinion[]>([]);
  const [selectedTab, setSelectedTab] = useState("Summary");
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [stateIt, setStateIt] = useState(false);
  const [debateIt, setDebateIt] = useState(false);
  const [selectedRebuttal, setSelectedRebuttal] = useState<Opinion | null>(
    null
  );

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleStateIt = () => {
    setStateIt(!stateIt);
  };

  const toggleDebateIt = () => {
    setDebateIt(!debateIt);
  };

  const closeRebuttal = () => {
    setSelectedRebuttal(null);
  };

  const [openSettings, setOpenSettings] = useState(false);

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  };

  const [menuOpen, setMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const closeMenuFunction = () => {
    console.log("clicked");
    setIsMenuOpen(false);
  };

  const fetchUserOpinions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/user/${currentUser?.uid}`,
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

  const fetchUserRebuttals = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/rebuttals/user/${currentUser?.uid}`,
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
      console.log("User", response);
      setRebuttals(response.data.rebuttals);
      setRebuttaledOpinions(response.data.rebuttaledOpinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  const fetchSavedOpinions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/favorites/${currentUser?.uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving saved opinions");
      }
      const response = await res.json();
      setSavedOpinions(response.data.opinions);
    } catch (error) {
      console.log("Error Fetching Saved Opinions: ", error);
    }
  };

  useEffect(() => {
    fetchUserOpinions();
    fetchUserRebuttals();
    fetchSavedOpinions();
    console.log("user opinions state variable", opinions);
  }, []);

  const getSelectedRebuttal = async (rebuttaledOpinion: Opinion) => {
    for (const rebuttal of rebuttals) {
      if (rebuttal.parentopinionid == rebuttaledOpinion.id) {
        setSelectedRebuttal(rebuttal);
        return;
      }
    }
  };

  const [close, setClose] = useState(false);

  const handleOpenModal = (opinion: Opinion) => {
    const newState = !close; // Toggle the state based on the current `close` value
    setSelectedOpinion(opinion); // Set the selected opinion
    setClose(newState); // Update the state to open or close the modal

    if (newState) {
      disableScroll(); // Disable scrolling if the modal is being opened
    } else {
      enableScroll(); // Enable scrolling if the modal is being closed
    }
  };

  const closeModal = () => {
    setClose(true); // Close the modal
    setSelectedOpinion(null); // Clear the selected opinion
    enableScroll(); // Re-enable scrolling when the modal is closed
  };

  const closeSettingsModal = () => {
    setOpenSettings(false);
  };

  return (
    <>
      {isMenuOpen && (
        <AnimatePresence>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="fixed top-0 left-0 bg-gradient-to-bl via-red-100  from-white to-blue-100 w-full min-h-screen flex flex-col xl:flex-row"
          >
            <div className="w-1/6 h-full hidden xl:block border-r">
              <div className="flex xl:flex-col font-light flex-row text-black gap-y-4 p-4">
                <div className="p-4 mt-[4%] rounded-full w-fit flex items-center gap-x-4">
                  <div className="w-[4rem] h-[4rem] rounded-full shadow-md bg-white"></div>
                </div>
                <button
                  onClick={closeMenuFunction}
                  className="p-4 w-fit text-base text-left   hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition  flex items-center gap-x-4"
                >
                  <FontAwesomeIcon icon={faSquareH} /> Home
                </button>

                <button
                  onClick={toggleSettings}
                  className="p-4 w-fit text-base text-left  hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition flex items-center gap-x-4"
                >
                  <FontAwesomeIcon icon={faGears} className="" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="p-4 w-fit text-base text-left  text-black hover:text-red-600 duration-150 ease-in-out transition rounded-3xl flex items-center gap-x-4"
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
                </button>
              </div>
            </div>{" "}
            {/* Mobile Menu */}
            <div className="p-4 lg:hidden relative">
              <button
                onClick={toggleMenu}
                className={`lg:hidden w-12 h-12 flex flex-col bg-white  relative justify-center items-center rounded-2xl shadow-md z-50
           space-x-reverse `}
              >
                <span
                  className={`block w-1/2 my-0.5 border  rounded-full ${
                    menuOpen
                      ? "rotate-45 transition-transform duration-300 ease-in-out border-[#000]"
                      : "transition-transform duration-300 ease-in-out border-[#000]"
                  }`}
                ></span>
                <span
                  className={`block w-1/2 my-0.5 border  rounded-full ${
                    menuOpen
                      ? "-rotate-45 w-1/2 absolute top-2/5 transition-transform duration-300 ease-in-out border-[#000]"
                      : "transition-transform duration-300 ease-in-out border-[#000]"
                  }`}
                ></span>
              </button>
              <>
                {menuOpen && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ ease: "easeInOut", duration: 0.5 }}
                      className="lg:hidden absolute top-full left-4 w-[75%] max-h-[300px] shadow-lg rounded-lg p-4 gap-y-2 bg-white z-40"
                    >
                      {/* Explore */}
                      <section className="p-4  rounded-md  justify-center items-center  ">
                        <div className="flex flex-col justify-center w-full">
                          <ul className="flex flex-col  text-lg font-light text-black ">
                            <button
                              onClick={closeMenuFunction}
                              className="p-2 w-fit text-base text-left   hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition  flex items-center gap-x-4"
                            >
                              <FontAwesomeIcon icon={faSquareH} /> Home
                            </button>

                            <button
                              onClick={toggleSettings}
                              className="p-2 w-fit text-base text-left   hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition  flex items-center gap-x-4"
                            >
                              <FontAwesomeIcon icon={faGears} className="" />
                              Settings
                            </button>
                            <button
                              onClick={handleLogout}
                              className="p-2 w-fit text-base text-left  text-black hover:text-red-600 duration-150 ease-in-out transition rounded-3xl flex items-center gap-x-4"
                            >
                              <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                              Log Out
                            </button>
                          </ul>
                        </div>
                      </section>
                    </motion.div>
                  </AnimatePresence>
                )}
              </>
            </div>
            <div className=" text-white px-2 ">
              {/* UserName */}

              <div className=" text-black text-lg flex mt-4 items-center gap-x-8 ml-4 p-4">
                <a
                  className={`cursor-pointer ${
                    selectedTab === "Summary"
                      ? "border-b-[1px] border-black "
                      : "border-b-0"
                  }`}
                  onClick={() => setSelectedTab("Summary")}
                >
                  Summary
                </a>
                <a
                  className={`cursor-pointer ${
                    selectedTab === "Notifications"
                      ? "border-b-[2px] border-white "
                      : "border-b-0"
                  }`}
                  onClick={() => setSelectedTab("Notifications")}
                >
                  Notifications
                </a>
              </div>

              <div className="w-full">
                {selectedTab == "Summary" && (
                  <div className=" mt-4 w-full grid md:grid-cols-2 grid-cols-1 gap-[2rem] p-4">
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                      <h1 className="xl:text-2xl text-xl font-light p-4 rounded-full text-black  w-fit">
                        Opinions
                      </h1>
                      <div className="my-4 grid xl:grid-cols-3 grid-cols-2 gap-2 mx-auto">
                        {opinions.length === 0 ? (
                          <div className="col-span-full text-center p-4">
                            <p className=" lg:text-lg text-base text-gray-700 ">
                              No Opinions Yet
                            </p>
                            <button
                              onClick={closeMenuFunction}
                              className="mt-[1%] bg-[#2b2b2b] shadow text-white text-sm font-normal py-2 px-4 rounded-full transition-colors duration-300"
                            >
                              Explore Carousels
                            </button>
                            <p className="lg:text-xl text-lg text-gray-300 ">
                              Share your thoughts, join the conversation!
                            </p>
                          </div>
                        ) : (
                          opinions.map((slide, index) => (
                            <div
                              key={index}
                              className="relative group   p-[40%] border rounded-2xl overflow-hidden shadow-md"
                            >
                              <Image
                                src={slide.backgroundimage}
                                alt={slide.author}
                                fill
                                className="w-[100%] h-[100%] object-cover text-black object-center brightness-75"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                                <div className="flex items-center justify-center h-full w-full px-4 py-2">
                                  <button
                                    className="text-white w-[2rem] h-[2rem] rounded-full shadow-md border transition-colors duration-300"
                                    onClick={() => handleOpenModal(slide)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="text-base"
                                    />
                                  </button>
                                </div>
                              </div>
                              <h2 className="font-semibold absolute bottom-4 left-4 mx-auto xl:text-base text-sm text-left text-white">
                                {slide.title}
                              </h2>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                      <h1 className="xl:text-2xl text-xl font-light p-4 rounded-full text-black  w-fit">
                        Rebuttals
                      </h1>
                      <div className="my-4 grid xl:grid-cols-3 grid-cols-2 gap-2 mx-auto">
                        {rebuttalledOpinions.length === 0 ? (
                          <div className="col-span-full text-center p-4">
                            <p className="lg:text-lg text-base  text-gray-700 ">
                              No Rebuttals Yet
                            </p>

                            <button
                              onClick={closeMenuFunction}
                              className="my-[4%] bg-[#2b2b2b] shadow text-white text-sm font-normal py-2 px-4 rounded-full transition-colors duration-300"
                            >
                              Explore Carousels
                            </button>
                            <p className=" text-base text-gray-300 mb-4">
                              Directly Respond to the viewpoints of others!
                            </p>
                          </div>
                        ) : (
                          rebuttalledOpinions.map((slide, index) => (
                            <div
                              key={index}
                              className="relative group xl:p-[25%] p-[50%] border rounded-2xl overflow-hidden shadow-md"
                            >
                              <Image
                                src={slide.backgroundimage}
                                alt={slide.author}
                                fill
                                className="w-[100%] h-[100%] object-cover object-center brightness-75"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                                <div className="flex items-center justify-between h-full w-full px-4 py-2">
                                  <button
                                    className="text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-400 transition-colors duration-300"
                                    onClick={() => setSelectedOpinion(slide)}
                                  >
                                    View Opinion
                                  </button>
                                  <button
                                    className="text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-400 transition-colors duration-300"
                                    onClick={() => getSelectedRebuttal(slide)}
                                  >
                                    View Your Rebuttal
                                  </button>
                                </div>
                              </div>
                              <h2 className="font-semibold absolute bottom-4 left-4 mx-auto xl:text-base text-sm text-left text-white">
                                {slide.title}
                              </h2>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                      <h1 className="text-4xl font-light p-4 rounded-full text-black  w-fit">
                        Saved
                      </h1>
                      <div className="my-4 grid xl:grid-cols-3 grid-cols-2 gap-2 mx-auto">
                        {savedOpinions.length === 0 ? (
                          <div className="col-span-full text-center p-4">
                            <p className="lg:text-lg text-base  text-gray-700 ">
                              None Saved
                            </p>
                            <button
                              onClick={closeMenuFunction}
                              className="my-[4%] bg-[#2b2b2b] shadow text-white text-sm font-normal py-2 px-4 rounded-full transition-colors duration-300"
                            >
                              Explore Carousels
                            </button>
                            <p className=" text-base text-gray-300 mb-4">
                              Explore the views of the people!
                            </p>
                          </div>
                        ) : (
                          savedOpinions.map((slide, index) => (
                            <div
                              key={index}
                              className="relative group xl:p-[25%] p-[50%] border rounded-2xl overflow-hidden shadow-md"
                            >
                              <Image
                                src={slide.backgroundimage}
                                alt={slide.author}
                                fill
                                className="w-[100%] h-[100%] object-cover object-center brightness-75"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                                <div className="flex items-center justify-between h-full w-full px-4 py-2">
                                  <button
                                    className="text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-400 transition-colors duration-300"
                                    onClick={() => setSelectedOpinion(slide)}
                                  >
                                    View Opinion
                                  </button>
                                  <div className="text-white mt-4">
                                    <p className="text-lg font-semibold">
                                      Likes: 12
                                    </p>
                                    <p className="text-lg font-semibold">
                                      Society Rating: 70%
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <h2 className="font-semibold absolute bottom-4 left-4 mx-auto xl:text-base text-sm text-left text-white">
                                {slide.title}
                              </h2>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab == "Notifications" && <div></div>}
              </div>
            </div>
            {openSettings && <Settings closeSettings={closeSettingsModal} />}
          </motion.section>

          {selectedOpinion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed inset-0 bg-gradient-to-tr from-blue-500/95 via-white/95 to-red-500/95 text-black bg-opacity-95  w-full h-screen flex justify-center items-center z-20"
            >
              <button
                onClick={closeModal}
                className="absolute top-0 left-0 p-4"
              >
                <FontAwesomeIcon icon={faX} className="text-lg" />
              </button>
              <div className="w-1/2 ">
                {" "}
                <DetailsModal opinionData={selectedOpinion} />
              </div>
              <div className="w-1/2">
                <OpinionModal
                  opinionData={selectedOpinion}
                  toggleStateIt={toggleStateIt}
                  toggleDebateIt={toggleDebateIt}
                />
              </div>
              <div>
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
          {selectedRebuttal && (
            <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 ">
              <RebuttalModal rebuttal={selectedRebuttal} />
              <button
                onClick={closeRebuttal}
                className="w-10 h-10 bg-white shadow-lg flex justify-center items-center rounded-full absolute top-4 left-4 p-4"
              >
                <FontAwesomeIcon icon={faX} className="w-6 h-6" />
              </button>
            </div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default UserPortal;
