"use client";

import React, { useRef } from "react";
import Slider from "./slider";
import gsap from "gsap";
import { useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

const Drop = () => {
  const slider = useRef(null); // Define the slider ref

  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);
  const fourthText = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-=300px",
    });
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.1 * direction;
    requestAnimationFrame(animation);
  };

  return (
    <section className="min-h-screen ">
      <div className="w-full p-[4%] mb-[4%]">
        <button className="px-4 py-2 text-black bg-white shadow-lg float-right relative rounded-full text-lg border border-black">
          create +
        </button>
      </div>
      <div
        className=" w-full text-white uppercase
       overflow-hidden relative text-[240px] font-bold list-none flex gap-x-12"
      >
        <h1 ref={firstText} className="m-0 ">
          Abortion
        </h1>
        <h1 ref={secondText} className="absolute left-[100%]">
          Abortion
        </h1>
        <h1 ref={thirdText} className="absolute left-[200%]">
          Abortion
        </h1>
        <h1 ref={fourthText} className="absolute left-[300%]">
          Abortion
        </h1>
      </div>
      <Slider />
    </section>
  );
};

export default Drop;
