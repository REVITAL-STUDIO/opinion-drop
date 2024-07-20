"use client";

import {
  faArrowRightFromBracket,
  faArrowRightLong,
  faGears,
  faHeart,
  faPenFancy,
  faSquareH,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Settings from "./settings";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const UserPortal = () => {
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

  return (
    <section className="bg-gradient-to-t via-blue-500 from-red-300 to-gray-200 w-full h-screen flex flex-col xl:flex-row relative">
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
          <button className="p-4 w-fit text-base text-left font-semibold  hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition  flex items-center gap-x-4">
            <FontAwesomeIcon icon={faSquareH} /> Home
          </button>

          <button
            onClick={toggleSettings}
            className="p-4 w-fit text-base text-left font-semibold hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition flex items-center gap-x-4"
          >
            <FontAwesomeIcon icon={faGears} className="" />
            Settings
          </button>
          <button className="p-4 w-fit text-base text-left font-semibold text-black hover:text-red-600 duration-150 ease-in-out transition rounded-3xl flex items-center gap-x-4">
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
                className="lg:hidden absolute top-0 left-0 bottom-0 w-2/3 min-h-screen bg-gradient-to-b to-red-500 via-purple-300 from-blue-300 p-4 gap-y-8"
              >
                {/* Explore */}
                <section className="p-4  rounded-md  justify-center items-center mt-[25%]">
                  <div className="flex flex-col justify-center w-full">
                    <ul className="flex flex-col gap-y-4 p-4 text-2xl font-medium text-white font-cheapSignage ">
                      <h2 className="font-dmSans">Explore</h2>
                      <Link
                        href="/"
                        className="p-4 w-fit text-base text-left font-semibold  hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition  flex items-center gap-x-4"
                      >
                        <FontAwesomeIcon icon={faSquareH} /> Home
                      </Link>

                      <button
                        onClick={toggleSettings}
                        className="p-4 w-fit text-base text-left font-semibold hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition flex items-center gap-x-4"
                      >
                        <FontAwesomeIcon icon={faGears} className="" />
                        Settings
                      </button>
                      <button className="p-4 w-fit text-base text-left font-semibold text-red-500 hover:text-red-600 duration-150 ease-in-out transition rounded-3xl flex items-center gap-x-4">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log
                        Out
                      </button>
                    </ul>
                  </div>
                </section>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-5/6 h-full text-white">
        {/* UserName */}
        <div className="p-4 mt-[4%] rounded-full w-fit flex items-center gap-x-4">
          <div className="w-[4rem] h-[4rem] rounded-full shadow-md bg-white"></div>
          <h1 className="text-3xl text-black ">
            Welcome, <span className="font-bold">User</span>
          </h1>
        </div>
        {/* Performance */}

        {/* Essay Submission */}
        <div className="mt-[4%]  w-full rounded-3xl text-white p-4">
          <h2 className="xl:text-lg text-base w-fit font-semibold  text-black  bg-white shadow-lg p-4 rounded-full">
            Essays Submitted
          </h2>
          <div className="my-4 grid xl:grid-cols-3 grid-cols-2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                className="xl:p-[25%] p-[50%] border rounded-2xl relative overflow-hidden shadow-md"
              >
                <Image
                  src={slide.backgroundImage}
                  alt={slide.author}
                  fill
                  className=" w-[100%] h-[100%] object-cover object-center brightness-75"
                />
                <h2 className="font-semibold left-4  absolute mx-auto xl:text-base text-sm text-left">
                  {slide.title}
                </h2>
              </button>
            ))}
          </div>
        </div>
      </div>
      {openSettings && <Settings />}
    </section>
  );
};

export default UserPortal;
