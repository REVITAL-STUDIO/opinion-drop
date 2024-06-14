import React from "react";
import Slider from "./slider";

const Drop = () => {
  return (
    <section className="min-h-screen ">
      <div className="w-full p-[2%] ">
        <button className="px-4 py-2 text-black float-right relative rounded-full text-lg border border-black">
          create +
        </button>
      </div>
      <div className="py-4 mt-8 w-full text-black uppercase overflow-x-hidden text-8xl list-none flex font-extrabold whitespace-nowrap">
        <li className="mx-4">Abortion</li>
        <li className="mx-4">Abortion</li>
        <li className="mx-4">Abortion</li>
      </div>
      <Slider />
    </section>
  );
};

export default Drop;
