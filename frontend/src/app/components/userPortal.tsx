"use client";

import {
  faArrowRightFromBracket,
  faArrowRightLong,
  faGears,
  faHeart,
  faPenFancy,
  faSquareH,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import Settings from "./settings";

const UserPortal = () => {
  const slides = [
    {
      id: 1,
      backgroundImage: "/Images/pexels-itfeelslikefilm-590496.jpg",
      author: "Jessica Wynters",
      title: "Viability As A Time Limit",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
        adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
        adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
        `,
    },
    {
      id: 2,
      author: "David Barnes",
      backgroundImage: "/Images/gun-control.jpg",
      title: "How Many?",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
      `,
    },
    {
      id: 3,
      author: "Sarah Lee",
      backgroundImage: "/Images/poverty.webp",
      title: "Born to Chains",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
      `,
    },
    {
      id: 4,
      author: "Zach Levi",
      backgroundImage: "/Images/pexels-photo-26700261.webp",
      title: "America, the Land of Free?",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
      `,
    },
    {
      id: 5,
      author: "Zhang Lee",
      backgroundImage: "/Images/pexels-photo-270220.webp",
      title: "Cops to King Pin",
      textContent: `Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos
      adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....
      `,
    },
  ];

  const [openSettings, setOpenSettings] = useState(false);

  const toggleSettings = () => {
    setOpenSettings(!openSettings)
  }

  return (
    <section className="bg-gradient-to-t via-blue-500 from-red-300 to-gray-200 w-full h-screen flex relative">
      <div className="w-1/6 h-full ">
        <div className="p-4 flex  items-center mt-[15%]">
          <Image
            src="/Images/opinion-drop-logo.png"
            alt="opinion drop logo"
            width={100}
            height={100}
            className="px-4"
          />
        </div>
        <div className="flex flex-col  text-black gap-y-4 p-4">
          <button className="p-4 w-fit text-base text-left font-semibold  hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition  flex items-center gap-x-4">
            <FontAwesomeIcon icon={faSquareH} /> Home
          </button>

          <button onClick={toggleSettings} className="p-4 w-fit text-base text-left font-semibold hover:border-l-4 hover:border-purple-600 hover:text-white  duration-300 ease-in-out transition flex items-center gap-x-4">
            <FontAwesomeIcon icon={faGears} className="" />
            Settings
          </button>
          <button className="p-4 w-fit text-base text-left font-semibold text-black hover:text-red-600 duration-150 ease-in-out transition rounded-3xl flex items-center gap-x-4">
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
          </button>
        </div>
      </div>{" "}
      <div className="w-5/6 h-full text-white">
        {/* UserName */}
        <div className="p-4 mt-[4%] rounded-full w-fit flex items-center gap-x-4">
          <div className="w-[4rem] h-[4rem] rounded-full shadow-md bg-white"></div>
          <h1 className="text-3xl text-black ">
            Welcome, <span className="font-bold">User</span>
          </h1>
        </div>
        {/* Performance */}
        <div className="p-4  my-[4%] ">
          <h2 className="text-lg w-fit font-semibold  text-black bg-white shadow-lg p-4 rounded-full">
            Performance
          </h2>
          <div className="w-full flex gap-x-4 text-white mt-4">
            <div className="p-4 shadow-lg rounded-xl flex flex-col items-center justify-center  bg-purple-400">
              <span className="font-semibold text-xl">14k</span>
              Total Views
            </div>
            <div className="p-4 shadow-lg rounded-xl flex flex-col items-center justify-center bg-purple-400">
              <span className="font-semibold text-xl">103</span>
              Shares
            </div>
            <div className="p-4 shadow-lg rounded-xl flex flex-col items-center justify-center bg-purple-400">
              <span className="font-semibold text-xl">5</span> # times ranked
            </div>
            <div className="p-4 shadow-lg rounded-xl flex flex-col items-center justify-center bg-purple-400">
              <span className="font-semibold text-xl">345</span>
              Total Likes
            </div>
          </div>
        </div>
        {/* Essay Submission */}
        <div className="mt-[4%]  w-full rounded-3xl text-white p-4">
          <h2 className="text-lg w-fit font-semibold  text-black  bg-white shadow-lg p-4 rounded-full">
            Essays Submitted
          </h2>
          <div className="my-4 grid grid-cols-3 gap-2">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="p-[15%] border rounded-2xl relative overflow-hidden shadow-md"
              >
                <Image
                  src={slide.backgroundImage}
                  alt={slide.author}
                  fill
                  className=" w-[100%] h-[100%] object-cover object-center brightness-75"
                />
                <h2 className="font-semibold absolute mx-auto text-base text-center">
                  {slide.title}
                </h2>
              </div>
            ))}
            <button className="p-[15%] bg-white rounded-2xl text-black hover:scale-95 transition ease-in-out duration-150 shadow-xl flex items-center gap-x-4">
              <h2 className="text-base font-semibold">Archive</h2>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </div>
        </div>
      </div>
      {openSettings && <Settings />}
    </section>
  );
};

export default UserPortal;
