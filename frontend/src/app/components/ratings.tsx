import React from "react";

const Ratings = () => {
  return (
    <section className="w-full ">
      <div className="text-center">
        <div className="mt-2 flex justify-center items-center">
          <button
            type="button"
            className="size-16 inline-flex justify-center items-center text-5xl rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          >
            😔
          </button>
          <button
            type="button"
            className="size-16 inline-flex justify-center items-center text-5xl rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          >
            😐️
          </button>
          <button
            type="button"
            className="size-16 inline-flex justify-center items-center text-5xl rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          >
            🤩
          </button>
        </div>
      </div>
    </section>
  );
};

export default Ratings;
