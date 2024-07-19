import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

const Questions = () => {
  return (
    <section className="w-full  flex mx-auto ">
      <div className="w-full text-white xl:mt-0  p-4  rounded-xl text-center shadow-white/30">
        <FontAwesomeIcon icon={faQuestionCircle} className="text-2xl my-4"/>
        <p className=" md:text-[20px] text-[14px] font-bold">
          How can we conduct an efficient and fair open primary at the
          Democratic Convention in Chicago on August 19th?
        </p>
      </div>
    </section>
  );
};

export default Questions;
