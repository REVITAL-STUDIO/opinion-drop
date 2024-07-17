import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMicrophone,
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import OpinionShowcase from "./OpinionShowcase";

const Hero = () => {
  return (
    <section className="w-full bg-black min-h-screen bg-cover bg-center p-4">
      <div className="w-[90%] justify-between items-center mx-auto hidden text-white">
        <div className="w-1/2 flex flex-col my-4">
          <div className="flex gap-x-4">
            <button className="p-4 rounded-full border mb-4 w-fit">
              <FontAwesomeIcon icon={faUser} className="w-5" />
            </button>
            <button className="p-4 rounded-full border mb-4 w-fit">
              <FontAwesomeIcon icon={faShoppingCart} className="w-5" />
            </button>
          </div>

          <div className="w-1/2 relative">
            <h2 className="mb-4 text-white text-center font-semibold p-4 rounded-full bg-gradient-to-l from-transparent to-blue-600">
              For Progressives
            </h2>
            <div className="flex w-full rounded-full border-2 justify-evenly items-center">
              <button className="w-8 h-8 flex justify-center items-center  ">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-white w-6 h-6"
                />
              </button>

              <div className="flex items-center justify-center p-2">
                <input
                  type="text"
                  className="w-full p-2  bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring-none focus:none"
                />
              </div>
              <button className="w-8 h-8 flex justify-center items-center  ">
                <FontAwesomeIcon
                  icon={faMicrophone}
                  className="text-white w-6 h-6"
                />
              </button>
            </div>

            <div className="absolute w-72 h-72 rounded-full"></div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-end">
          <div className="flex gap-x-4">
            <button className="p-4 rounded-full border mb-4 w-fit">
              <FontAwesomeIcon icon={faShoppingCart} className="w-5" />
            </button>
            <button className="p-4 rounded-full border mb-4 w-fit">
              <FontAwesomeIcon icon={faUser} className="w-5" />
            </button>
          </div>
          <div className="w-1/2">
            <h2 className="mb-4 text-white text-center font-semibold p-4 rounded-full bg-gradient-to-r from-transparent to-red-600">
              For Conservatives
            </h2>
            <div className="flex w-full rounded-full border-2 justify-evenly items-center">
              <button className="w-8 h-8 flex justify-center items-center  ">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-white w-6 h-6"
                />
              </button>

              <div className="flex items-center justify-center p-2">
                <input
                  type="text"
                  className="w-full p-2  bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring-none focus:none"
                />
              </div>
              <button className="w-8 h-8 flex justify-center items-center  ">
                <FontAwesomeIcon
                  icon={faMicrophone}
                  className="text-white w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <OpinionShowcase topic="abortion"/>
    </section>
  );
};

export default Hero;
