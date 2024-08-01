import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const Confirmation = () => {
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-4  w-fit flex flex-col justify-center border border-dashed shadow-md bg-white items-center rounded-lg"
      >
        <div className="w-32 h-32 my-8 bg-gradient-to-tl from-blue-400 via-purple-300 to-red-500 rounded-lg shadow-lg flex justify-center items-center">
          <FontAwesomeIcon className="text-5xl text-white" icon={faScaleBalanced} />{" "}
        </div>
        <h2 className=" text-center text-base p-4 text-black">
          Great, Thanks for your Opinion!
        </h2>
        <p className="text-center text-sm p-4 text-gray-400">
          Your response will be posted and viewable immediately
        </p>
      </motion.section>
    </AnimatePresence>
  );
};

export default Confirmation;
