import {
  faQuestion,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Topic = () => {
  return (
    <section className="p-4 w-full">
      <div className="w-full  rounded-xl text-center ">
        <FontAwesomeIcon
          icon={faQuestion}
          className="text-sm text-white w-[1rem] h-[1rem] p-4 rounded-full shadow-md bg-gradient-to-tr from-gray-300 via-slate-500 to-gray-200"
        />
        <p className="  xl:w-1/2 mx-auto lg:text-xl text-base text-white font-bold">
          How can we conduct an efficient and fair open primary at the
          Democratic Convention in Chicago on August 19th?
        </p>
      </div>
    </section>
  );
};

export default Topic;
