"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowUpFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Questions from "./questions";
import DetailsModal from "./DetailsModal";
import OpinionModal from "./OpinionModal";
import RepliesModal from "./RepliesModal";
import Engagement from "./engagement";
import StateIt from "./stateIt";
import Debate from "./debateIt";

interface dropsProps {
  topic: {
    name: string,
    id: number
  }
}

interface Opinion {
  id: number;
  author: string;
  title: string;
  textContent: string;
  backgroundImage: string;
  profilePicture?: string;
}

const Drop = ({ topic }: dropsProps) => {
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [showRepliesModal, setShowRepliesModal] = useState(true);
  const [stateIt, setStateIt] = useState(false);
  const [debateIt, setDebateIt] = useState(false);

  const [Opinions, setOpinions] = useState<Opinion[] | null>(null);

  const toggleStateIt = () => {
    setStateIt(!stateIt);
  };

  const toggleDebateIt = () => {
    setDebateIt(!debateIt);
  };

  console.log("Clicked:", toggleStateIt);

  const closeModal = () => {
    setSelectedOpinion(null);
  };

  const closeReplies = () => {
    setShowRepliesModal(false);
  };

  const fetchOpinions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving opinions");
      }
      const response = await res.json();
      console.log("data: ", response.data);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  const [currdeg, setCurrdeg] = useState(0);
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
  const rotate = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrdeg((prev) => prev - 60);
    } else if (direction === "prev") {
      setCurrdeg((prev) => prev + 60);
    }
  };

  return (
    <section className=" flex  justify-center items-center ">
      <div className="container ">
        <div
          className="carousel"
          style={{
            transform: `rotateY(${currdeg}deg)`,
          }}
        >
          {slides.map((slide, index) =>
             slide ? (
               <div className="item ">
                 <button className="border w-[6rem] h-[6rem] rounded-full  shadow-md flex justify-center items-center text-black">
                   <FontAwesomeIcon
                     icon={faPlus}
                     className="w-[2rem] h-[2rem] text-white"
                   />
                 </button>
                 <p className="text-sm mt-2 w-2/3 p-4">
                   Be the first to share your opinion!
                 </p>
               </div>
             ) : (
              <div
                key={index}
                className={`item ${slide.id} relative shadow-lg shadow-white/50 `}
                style={{
                  transform: `rotateY(${index * 60}deg) translateZ(250px)`,
                }}
              >
                <Image
                  src={slide.backgroundImage}
                  alt={slide.author}
                  fill
                  className="absolute w-[100%] h-[100%] object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div className="text-white text-[15px] font-black absolute bottom-[4rem] left-2 text-left line-clamp-3 leading-tight flex flex-col gap-2">
                  <p className="text-[12px]">{slide.author}</p>
                  <p className="text-[24px]">{slide.title}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedOpinion(slide);
                  }}
                  className="px-4 py-2 z-40 border shadow-lg bg-black text-white rounded-full text-xs absolute bottom-2 left-4 "
                >
                  View
                </button>
              </div>
             )
          )}
        </div>
      </div>
      <div className="prev" onClick={() => rotate("prev")}>
        <FontAwesomeIcon icon={faAngleLeft} className="w-5 h-5" />{" "}
      </div>
      <div className="next" onClick={() => rotate("next")}>
        <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />{" "}
      </div>
      <div>
        {selectedOpinion && (
          <>
            <div className="fixed inset-0 bg-gradient-to-tr from-blue-500/95 via-red-500/95 to-white/90  bg-opacity-95 z-20">
              <div className="w-1/2 h-full flex justify-center items-center">
                <DetailsModal opinionData={selectedOpinion} />
              </div>
              <OpinionModal
                opinionData={selectedOpinion}
                closeModal={closeModal}
                toggleStateIt={toggleStateIt}
                toggleDebateIt={toggleDebateIt}
              />
              {stateIt && <StateIt />}
              {debateIt && <Debate />}
            </div>

            {/* State It */}
            {showRepliesModal && <RepliesModal closeModal={closeReplies} />}
          </>
        )}
      </div>
    </section>
  );
};

export default Drop;
