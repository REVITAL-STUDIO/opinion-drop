import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Settings = () => {
  const [close, setClose] = useState(false);

  if (close) {
    return null; // Don't render anything if close is true
  }

  return (
    <section className="absolute h-screen w-full bg-white/90 flex justify-center items-center">
      <button
        onClick={() => setClose(true)}
        className="absolute left-8 top-8 flex items-center text-black gap-x-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=" text-xl" />
        <span className="text-xl ">Exit</span>
      </button>
      <div className="w-2/6 h-4/6 bg-gradient-to-br from-purple-500 to-[#2b2b2b] rounded relative">
        <h1 className="p-4 text-3xl font-medium text-white ml-10">
          Account Settings
        </h1>
        <h4 className="px-4 py-2 bg-white rounded-full text-black border w-fit ml-12">
          General Settings
        </h4>
        <form className="space-y-2 w-[80%] my-4 mx-auto">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Username
            </label>
            <input
              type="email"
              name="email"
              className="bg-transparent border border-gray-300 text-black placeholder:text-sm rounded-sm focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="bg-transparent border border-gray-300 text-gray-900 rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="bg-transparent border border-gray-300 text-gray-900 rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start"></div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-bl hover:scale-95 to-red-300 from-blue-500 border rounded-full hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium   ease-in-out transition duration-150 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Save Changes
          </button>
        </form>
        <button
          type="submit"
          className=" absolute bottom-4 hover:scale-110 left-14 hover:bg-red-600  mx-auto text-white bg-primary-600 border border-red-500 rounded-full hover:bg-primary-700  focus:outline-none focus:ring-primary-300 font-medium  hover:text-black ease-in-out transition duration-150 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Delete Account
        </button>{" "}
      </div>
    </section>
  );
};

export default Settings;
