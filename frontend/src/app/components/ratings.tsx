import React, { useState } from "react";

const Ratings = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const toggleActiveButton = (select: string) => {
    setActiveButton(select);
  };

  return (
    <section className="w-full ">
      <div className="text-center">
        <div className="mt-2 flex justify-center items-center">
          <button
            onClick={() => toggleActiveButton("sad")}
            type="button"
            className={`size-16 inline-flex justify-center items-center text-5xl rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
              activeButton === "sad" ? "bg-gray-100" : ""
            }`}
          >
            😔
          </button>
          <button
            onClick={() => toggleActiveButton("neutral")}
            type="button"
            className={`size-16 inline-flex justify-center items-center text-5xl rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
              activeButton === "neutral" ? "bg-gray-100" : ""
            }`}
          >
            😐️
          </button>
          <button
            onClick={() => toggleActiveButton("happy")}
            type="button"
            className={`size-16 inline-flex justify-center items-center text-5xl rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${
              activeButton === "happy" ? "bg-gray-100" : ""
            }`}
          >
            🤩
          </button>
        </div>
      </div>
    </section>
  );
};

export default Ratings;
