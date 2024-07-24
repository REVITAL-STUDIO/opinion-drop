"use client";

import {
  faArrowRightFromBracket,
  faGears,
  faSquareH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Settings from "./settings";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../hooks/AuthContext";

interface UserPortalProps {
  handleLogout: () => void;
  toggleOpenUserPortal: () => void;
}

interface Opinion {
  id: number;
  author: string;
  title: string;
  text: string;
  backgroundimage: string;
  authorprofileimage?: string;
}

const UserPortal: React.FC<UserPortalProps> = ({
  handleLogout,
  toggleOpenUserPortal,
}) => {
  const { currentUser, loading, logout } = useAuth();

  const [opinions, setOpinions] = useState<Opinion[]>([]);

  const slides = [
    {
      id: 1,
      backgroundImage: "/Images/pexels-itfeelslikefilm-590496.jpg",
      author: "Jessica Wynters",
      title: "Viability As A Time Limit",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
        adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
        adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
        `,
    },
    {
      id: 2,
      author: "David Barnes",
      backgroundImage: "/Images/gun-control.jpg",
      title: "How Many?",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
      `,
    },
    {
      id: 3,
      author: "Sarah Lee",
      backgroundImage: "/Images/poverty.webp",
      title: "Born to Chains",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
      `,
    },
    {
      id: 4,
      author: "Zach Levi",
      backgroundImage: "/Images/pexels-photo-26700261.webp",
      title: "America, the Land of Free?",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
      `,
    },
    {
      id: 5,
      author: "Zhang Lee",
      backgroundImage: "/Images/pexels-photo-270220.webp",
      title: "Cops to King Pin",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
      `,
    },
  ];

  const [openSettings, setOpenSettings] = useState(false);

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  };

  const [menuOpen, setMenuOpen] = useState(false);
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
      console.log("data: ", response.data);
      console.log("More Data:", response.data.opinions);
      setOpinions(response.data.opinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  useEffect(() => {
    fetchUserOpinions();
    console.log("opinions state variable", opinions);
  }, []);

  useEffect(() => {
    console.log("opinions state variable", opinions);
  }, [opinions]);

  return (
    <>
      {isMenuOpen && (
        <AnimatePresence>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="fixed top-0 left-0 bg-gradient-to-t via-blue-500 z-50 from-red-300 to-gray-200 w-full h-screen flex flex-col xl:flex-row"
          >
            <div className="w-1/6 h-full hidden xl:block">
              <div className="p-4 flex  items-center mt-[15%]">
                <Image
                  src="/Images/opinion-drop-logo.png"
                  alt="opinion drop logo"
                  width={100}
                  height={100}
                  className="px-4 hidden xl:block"
                />
              </div>
              <div className="flex xl:flex-col  flex-row text-black gap-y-4 p-4">
                <button
                  onClick={closeMenuFunction}
                  className="p-4 w-fit text-base text-left font-semibold  hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition  flex items-center gap-x-4"
                >
                  <FontAwesomeIcon icon={faSquareH} /> Home
                </button>

                <button
                  onClick={toggleSettings}
                  className="p-4 w-fit text-base text-left font-semibold hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition flex items-center gap-x-4"
                >
                  <FontAwesomeIcon icon={faGears} className="" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="p-4 w-fit text-base text-left font-semibold text-black hover:text-red-600 duration-150 ease-in-out transition rounded-3xl flex items-center gap-x-4"
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
                </button>
              </div>
            </div>{" "}
            {/* Mobile Menu */}
            <div className="p-4">
              <button
                onClick={toggleMenu}
                className={`lg:hidden w-12 h-12 flex flex-col relative justify-center items-center rounded-full z-50 
           space-x-reverse `}
              >
                <span
                  className={`block w-3/4 my-0.5 border-4  rounded-full ${
                    menuOpen
                      ? "rotate-45 transition-transform duration-300 ease-in-out border-[#000]"
                      : "transition-transform duration-300 ease-in-out border-[#000]"
                  }`}
                ></span>
                <span
                  className={`block w-3/4 my-0.5 border-4  rounded-full ${
                    menuOpen
                      ? "-rotate-45 w-3/4 absolute top-2/5 transition-transform duration-300 ease-in-out border-[#000]"
                      : "transition-transform duration-300 ease-in-out border-[#000]"
                  }`}
                ></span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                    className="md:hidden absolute top-0 left-0 bottom-0 flex justify-center items-center bg-black/90 w-full h-screen bg-mist z-40"
                  >
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ ease: "easeInOut", duration: 0.5 }}
                      className="lg:hidden absolute top-0 left-0 bottom-0 w-full min-h-screen bg-gradient-to-b to-red-500 via-purple-300 from-blue-300 p-4 gap-y-8"
                    >
                      {/* Explore */}
                      <section className="p-4  rounded-md  justify-center items-center mt-[25%]">
                        <div className="flex flex-col justify-center w-full">
                          <ul className="flex flex-col gap-y-4 p-4 text-2xl font-medium text-black font-cheapSignage ">
                            <h2 className="font-dmSans my-4">Explore</h2>
                            <button
                              onClick={closeMenuFunction}
                              className="p-4 w-fit  text-left font-semibold  hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition  flex items-center gap-x-4"
                            >
                              <FontAwesomeIcon icon={faSquareH} /> Home
                            </button>

                            <button
                              onClick={toggleSettings}
                              className="p-4 w-fit  text-left font-semibold hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition flex items-center gap-x-4"
                            >
                              <FontAwesomeIcon icon={faGears} className="" />
                              Settings
                            </button>
                            <button
                              onClick={handleLogout}
                              className="p-4 w-fit  text-left font-semibold text-black duration-150 ease-in-out transition rounded-3xl flex items-center gap-x-4"
                            >
                              <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                              Log Out
                            </button>
                          </ul>
                        </div>
                      </section>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="lg::w-5/6 w-full h-full text-white">
              {/* UserName */}
              <div className="p-4 mt-[4%] rounded-full w-fit flex items-center gap-x-4">
                <div className="w-[4rem] h-[4rem] rounded-full shadow-md bg-white"></div>
                <h1 className="lg:text-3xl text-lg text-black ">
                  Welcome,{" "}
                  <span className="font-bold">{currentUser?.username}</span>!
                </h1>
              </div>
              {/* Performance */}

              {/* Essay Submission */}
              <div className="mt-[4%]  w-full rounded-3xl text-white p-4">
                <h2 className="xl:text-lg text-base w-fit font-semibold  text-black   p-4 rounded-full">
                  Your Summary
                </h2>
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
                      <button
                        key={index}
                        className="xl:p-[25%] p-[50%] border rounded-2xl relative overflow-hidden shadow-md"
                      >
                        <Image
                          src={slide.backgroundimage}
                          alt={slide.author}
                          fill
                          className="w-[100%] h-[100%] object-cover object-center brightness-75"
                        />
                        <h2 className="font-semibold left-4 absolute mx-auto xl:text-base text-sm text-left">
                          {slide.title}
                        </h2>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
            {openSettings && <Settings />}
          </motion.section>
        </AnimatePresence>
      )}
    </>
  );
};

export default UserPortal;
