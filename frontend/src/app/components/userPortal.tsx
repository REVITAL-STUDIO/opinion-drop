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
  authorprofileimage?: string;
  parentopinionid: number | null;
}

const UserPortal: React.FC<UserPortalProps> = ({
  handleLogout,
  toggleOpenUserPortal,
}) => {
  const { currentUser, loading, logout } = useAuth();

  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [rebuttals, setRebuttals] = useState<Opinion[]>([]);
  const [rebuttalledOpinions, setRebuttaledOpinions] = useState<Opinion[]>([]);
  const [favOpinions, setFavOpinions] = useState<Opinion[]>([]);
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
      setRebuttals(response.data.rebuttals);
      setRebuttaledOpinions(response.data.rebuttaledOpinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  useEffect(() => {
    fetchUserOpinions();
    fetchUserRebuttals();
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

  const detailsModalRef = useRef<HTMLDivElement>(null);
  const opinionModalRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    console.log("Mouse event:", event);
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      console.log("Clicked outside, closing modal");
      setMenuOpen(false);
      setClose(true);
    } else {
      console.log("Clicked inside, not closing modal");
    }
  };

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
            className="fixed top-0 left-0 bg-gradient-to-t via-gray-300  from-red-200 to-blue-200 w-full h-screen flex flex-col xl:flex-row"
          >
            <div className="w-1/6 h-full hidden xl:block border-r">
              <div className="p-4 flex  items-center mt-[15%]">
                <Image
                  src="/Images/opinion-drop-logo.png"
                  alt="opinion drop logo"
                  width={100}
                  height={100}
                  className="px-4 hidden xl:block"
                />
              </div>
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
            <div className="p-4 lg:hidden">
              <button
                onClick={toggleMenu}
                className={`lg:hidden w-12 h-12 flex flex-col relative justify-center items-center rounded-full  
           space-x-reverse `}
              >
                <span
                  className={`block w-3/4 my-0.5 border  rounded-full ${
                    menuOpen
                      ? "rotate-45 transition-transform duration-300 ease-in-out border-[#000]"
                      : "transition-transform duration-300 ease-in-out border-[#000]"
                  }`}
                ></span>
                <span
                  className={`block w-3/4 my-0.5 border  rounded-full ${
                    menuOpen
                      ? "-rotate-45 w-3/4 absolute top-2/5 transition-transform duration-300 ease-in-out border-[#000]"
                      : "transition-transform duration-300 ease-in-out border-[#000]"
                  }`}
                ></span>
              </button>
              <>
                {menuOpen && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: "easeInOut", duration: 0.5 }}
                      className="md:hidden absolute top-0 left-0 bottom-0 flex justify-center items-center bg-black/90 w-full h-screen bg-mist z-50"
                    >
                      <motion.div
                        ref={modalRef}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                        className="lg:hidden absolute top-0 left-0 bottom-0 w-[75%] min-h-screen bg-gradient-to-b to-red-500 via-purple-300 from-blue-300 p-4 gap-y-8"
                      >
                        {/* Explore */}
                        <section className="p-4  rounded-md  justify-center items-center mt-[25%] ">
                          <div className="flex flex-col justify-center w-full">
                            <ul className="flex flex-col gap-y-4 p-4 text-2xl font-medium text-black font-cheapSignage ">
                              <h2 className="font-dmSans my-4">Explore</h2>
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
                                <FontAwesomeIcon
                                  icon={faArrowRightFromBracket}
                                />{" "}
                                Log Out
                              </button>
                            </ul>
                          </div>
                        </section>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </>
            </div>
            <div className="lg::w-5/6 w-full h-full text-white px-2 mt-[2%]">
              {/* UserName */}

              <div className=" text-black text-lg flex  items-center gap-x-8 ml-4 p-4">
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

              <div>
                {selectedTab == "Summary" && (
                  <div className="border-t mt-4">
                    {/* User Summary */}
                    <div className="  w-full rounded-3xl  p-4">
                      <div className=" max-h-[700px] overflow-y-auto overflow-scroll flex flex-col gap-[3rem] p-4 ">
                        <div className="bg-white p-4 rounded-2xl shadow-md">
                          <h1 className="text-4xl font-light p-4 rounded-full text-black  w-fit">
                            Opinions
                          </h1>
                          <div className="my-4 grid xl:grid-cols-3 grid-cols-2 gap-2 mx-auto">
                            {opinions.length === 0 ? (
                              <div className="col-span-full text-center p-4">
                                <p className="lg:text-3xl text-xl font-bold text-gray-700 mb-2">
                                  No Opinions Yet
                                </p>
                                <p className="lg:text-xl text-lg text-gray-300 mb-4">
                                  Share your thoughts, join the conversation!
                                </p>
                                <button
                                  onClick={closeMenuFunction}
                                  className="mt-[1%] bg-indigo-300 text-white text-lg font-normal py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                                >
                                  Explore Carousels
                                </button>
                              </div>
                            ) : (
                              opinions.map((slide, index) => (
                                <div
                                  key={index}
                                  className="relative group xl:p-[15%] p-[50%] border rounded-2xl overflow-hidden shadow-md"
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
                          <h1 className="text-4xl font-light p-4 rounded-full text-black  w-fit">
                            Rebuttals
                          </h1>
                          <div className="my-4 grid xl:grid-cols-3 grid-cols-2 gap-2 mx-auto">
                            {rebuttalledOpinions.length === 0 ? (
                              <div className="col-span-full text-center p-4">
                                <p className="lg:text-3xl text-xl font-bold text-gray-700 mb-2">
                                  No Rebuttals Yet
                                </p>
                                <p className=" text-base text-gray-300 mb-4">
                                  Directly Respond to the viewpoints of others!
                                </p>
                                <button
                                  onClick={closeMenuFunction}
                                  className="mt-[1%] bg-indigo-300 text-white text-lg font-normal py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                                >
                                  Explore Carousels
                                </button>
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
                                        onClick={() =>
                                          setSelectedOpinion(slide)
                                        }
                                      >
                                        View Opinion
                                      </button>
                                      <button
                                        className="text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-400 transition-colors duration-300"
                                        onClick={() =>
                                          getSelectedRebuttal(slide)
                                        }
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
                            Favorites
                          </h1>
                          <div className="my-4 grid xl:grid-cols-3 grid-cols-2 gap-2 mx-auto">
                            {favOpinions.length === 0 ? (
                              <div className="col-span-full text-center p-4">
                                <p className="lg:text-3xl text-xl font-bold text-gray-700 mb-2">
                                  No Favorites
                                </p>
                                <p className="text-base text-gray-300 mb-4">
                                  Explore the views of the people!
                                </p>
                                <button
                                  onClick={closeMenuFunction}
                                  className="mt-[1%] bg-indigo-300 text-white text-lg font-normal py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                                >
                                  Explore Carousels
                                </button>
                              </div>
                            ) : (
                              favOpinions.map((slide, index) => (
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
                                        onClick={() =>
                                          setSelectedOpinion(slide)
                                        }
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
                    </div>
                  </div>
                )}

                {selectedTab == "Notifications" && <div></div>}
              </div>
            </div>
            {openSettings && <Settings closeSettings={closeSettingsModal} />}
          </motion.section>

          {selectedOpinion && (
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
