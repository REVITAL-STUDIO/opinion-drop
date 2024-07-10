import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMicrophone,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full bg-[url('/Images/OD-Mic-Background.jpg')] min-h-[850px] bg-cover p-4">
      <div className="w-full flex justify-between items-center text-white">
        <ul className="flex justify-center font-black items-center gap-x-12">
          <button className="">
            <FontAwesomeIcon icon={faUser} className="w-5" />
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-white bg-[#2b2b2b]/50 rounded-full"
          >
            Menu
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border border-white bg-[#2b2b2b]/50 rounded-full"
          >
            Founder Podcast
          </Link>
        </ul>
        {/* <Link href="/">
          <Image
            src="/images/opinion-drop-logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </Link> */}
        <ul className="flex justify-center font-black items-center gap-x-12">
          <Link
            href="/"
            className="px-4 py-2 border border-white bg-[#2b2b2b]/50 rounded-full"
          >
            Chat
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border border-white bg-[#2b2b2b]/50 rounded-full"
          >
            Drop <span>+</span>
          </Link>
          <button className="">
            <FontAwesomeIcon icon={faUser} className="w-5" />
          </button>
        </ul>
      </div>
      <div className="w-full py-[20%]  flex justify-around">
        <div className="w-1/4 relative">
          <div className="flex w-full rounded-full border-2 justify-evenly items-center">
            <button className="w-8 h-8 flex justify-center items-center  ">
              <FontAwesomeIcon icon={faSearch} className="text-white w-6 h-6" />
            </button>

            <div className="flex items-center justify-center p-4">
              <input
                type="text"
                className="w-full p-2 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring-none focus:none"
              />
            </div>
            <button className="w-8 h-8 flex justify-center items-center  ">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-white w-6 h-6"
              />
            </button>
          </div>
          <h2 className="mt-4 text-white text-center font-semibold p-4 rounded-full bg-gradient-to-l from-transparent to-blue-600">
            For Progressives
          </h2>
          <div className="absolute w-72 h-72 rounded-full"></div>
        </div>
        <div className="w-1/4">
          <div className="flex w-full rounded-full border-2 justify-evenly items-center">
            <button className="w-8 h-8 flex justify-center items-center  ">
              <FontAwesomeIcon icon={faSearch} className="text-white w-6 h-6" />
            </button>

            <div className="flex items-center justify-center p-4">
              <input
                type="text"
                className="w-full p-2 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring-none focus:none"
              />
            </div>
            <button className="w-8 h-8 flex justify-center items-center  ">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-white w-6 h-6"
              />
            </button>
          </div>
          <h2 className="mt-4 text-white text-center font-semibold p-4 rounded-full bg-gradient-to-r from-transparent to-red-600">
            For Conservatives
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;
