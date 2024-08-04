import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

const Questions = () => {
  return (
    <section className="w-full flex mx-auto">
      <div className="w-full text-white rounded-xl text-center shadow-white/30 z-10">
        <FontAwesomeIcon icon={faQuestionCircle} className="text-2xl " />
        <p className="  xl:w-1/2 mx-auto md:text-[16px] text-[12px] font-bold">
          How can we conduct an efficient and fair open primary at the
          Democratic Convention in Chicago on August 19th?
        </p>
      </div>
    </section>
  );
};

export default Questions;
