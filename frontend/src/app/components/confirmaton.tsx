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
        className="p-4  w-1/4 flex flex-col justify-center border border-dashed text-white bg-gradient-to-t relative from-stone-500 to-stone-700 items-center rounded-lg"
      >
        <h2 className=" text-center text-2xl p-4">Thanks for your Opinion.</h2>
        <div className="w-32 h-32 my-8">
          <FontAwesomeIcon className="w-32 h-32" icon={faScaleBalanced} />{" "}
        </div>
        <p className="text-center p-4">
          If approved, your response will be reviewed and posted within 24
          hours.
        </p>
      </motion.section>
    </AnimatePresence>
  );
};

export default Confirmation;
