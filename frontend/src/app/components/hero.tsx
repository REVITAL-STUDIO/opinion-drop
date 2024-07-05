import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMicrophone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full bg-[url('/Images/OD-Mic-Background.jpg')] min-h-[850px] bg-cover h-screen p-4 flex items-center justify-center">
      <h1 className=" text-white text-6xl w-2/5 text-center p-4 font-bold"></h1>
      {/* <div className="w-full flex justify-between items-center text-white">
        <ul className="flex justify-center font-black items-center gap-x-12">
          <button className="">
            <FontAwesomeIcon icon={faUser} className="w-8" />
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
        </ul> */}
      {/* <Link href="/">
          <Image
            src="/images/opinion-drop-logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </Link> */}
      {/* <ul className="flex justify-center items-center gap-x-12">
          <Link
            href="/"
            className="px-4 py-2 border bg-[#2b2b2b]/50 border-white rounded-full"
          >
            Chat
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border bg-[#2b2b2b]/50 border-white rounded-full"
          >
            Drop <span>+</span>
          </Link>
          <button className="">
            <FontAwesomeIcon icon={faUser} className="w-8" />
          </button>
        </ul>
      </div> */}
      {/* <div className="w-full py-[20%]  flex justify-around">
        <div className="relative">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute fa fa-search text-gray-300 w-8 top-5 left-4"
          />
          <input
            type="text"
            className="bg-transparent border text-white h-14 w-full px-12  rounded-full focus:outline-none hover:cursor-pointer"
            name=""
          ></input>
          <span className="absolute top-4 right-5 border-l pl-4">
            <FotAwesomeIcon
              icon={nfaMicrophone}
              className=" text-gray-400 w-8 hover:text-green-500 hover:cursor-pointer"
            />
          </span>
        </div>
        <div className="relative">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute fa fa-search text-gray-300 top-5 left-4"
          />
          <input
            type="text"
            className="bg-transparent border  h-14 w-full px-12 text-black rounded-full focus:outline-none hover:cursor-pointer"
            name=""
          ></input>
          <span className="absolute top-4 right-5 border-l pl-4">
            <FontAwesomeIcon
              icon={faMicrophone}
              className=" text-gray-400 hover:text-green-500 hover:cursor-pointer"
            />
          </span>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
