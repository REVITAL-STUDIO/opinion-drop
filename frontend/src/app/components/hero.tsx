import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <section className="min-h-[700px] g-gradient-to-r from-blue-500 to-red-500">
      <div className="w-full py-[20%]  flex justify-around">
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
            <FontAwesomeIcon
              icon={faMicrophone}
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
      </div>
    </section>
  );
};

export default Hero;
