import {
  faAngleLeft,
  faAngleRight,
  faEye,
  faMicrophoneLines,
  faMicrophoneLinesSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import Image from "next/image";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import OpinionModal from "./OpinionModal";
import MoreButton from "./moreButton";
import OpinionComments from "./OpinionComments";
import DetailsModal from "./DetailsModal";

interface dropsProps {
  topic: {
    name: string;
    id: number;
  };
}

interface Opinion {
  id: number;
  author: string;
  title: string;
  textcontent: string;
  backgroundimage: string;
  authorprofileimage?: string;
  parentopinionid: number | null;
}

const ArchivePage = ({ topic }: dropsProps) => {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  console.log("opinions:", opinions);
  const [rebuttals, setRebuttals] = useState<Opinion[]>([]);
  const [rebuttalledOpinions, setRebuttaledOpinions] = useState<Opinion[]>([]);
  const [favOpinions, setFavOpinions] = useState<Opinion[]>([]);
  const [selectedTab, setSelectedTab] = useState("Summary");
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [stateIt, setStateIt] = useState(false);
  const [debateIt, setDebateIt] = useState(false);
  const [selectedRebuttal, setSelectedRebuttal] = useState<Opinion | null>(
    null
  );
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);

  const [activeButton, setActiveButton] = useState<"like" | "dislike" | null>(
    null
  );
  const [close, setClose] = useState(false);
  const [loading, setLoading] = useState(true); // Step 1: Define loading state

  const fetchOpinions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/topic/${topic.id}`,
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
      setOpinions(response.data.opinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    } finally {
      setLoading(false); // Step 3: Set loading to false after fetch completes
    }
  };

  useEffect(() => {
    fetchOpinions();
  }, []);

  const fetchUserRebuttals = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/rebuttals/user/${topic.id}`,
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
      console.log("response user rebuttals", response);
      setRebuttals(response.data.rebuttals);
      setRebuttaledOpinions(response.data.rebuttaledOpinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  useEffect(() => {
    fetchOpinions();
    fetchUserRebuttals();
    console.log("user opinions state variable", opinions);
  }, []);

  const toggleStateIt = () => {
    setStateIt(!stateIt);
  };

  const toggleDebateIt = () => {
    setDebateIt(!debateIt);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const detailsModalRef = useRef<HTMLDivElement>(null);
  const opinionModalRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      detailsModalRef.current &&
      !detailsModalRef.current.contains(event.target as Node) &&
      opinionModalRef.current &&
      !opinionModalRef.current.contains(event.target as Node) &&
      moreButtonRef.current &&
      !moreButtonRef.current.contains(event.target as Node)
    ) {
      setClose(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenModal = (opinion: Opinion) => {
    setSelectedOpinion(opinion);
    setClose(false); // Reset the close state
  };

  return (
    <>
      {!close && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bg-black/95 top-0 left-0 w-full h-screen flex items-center z-50"
        >
          <div className="carousel-container">
            <div className="my-4 text-5xl text-white">Catalogue</div>
            {loading ? ( // Step 4: Show loading state
              <div
                role="status"
                className="text-center mx-auto flex justify-center items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : opinions.length === 0 ? (
              <div className="col-span-full text-center p-4">
                <p className="lg:text-3xl text-xl font-bold text-gray-700 mb-2">
                  No Opinions Yet
                </p>
                <p className="lg:text-xl text-lg text-gray-300 mb-4">
                  Share your thoughts, join the conversation!
                </p>
              </div>
            ) : (
              <Swiper
                effect={"coverflow"}
                spaceBetween={5}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: true,
                }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
              >
                {opinions.map((info, index) => (
                  <SwiperSlide
                    key={index}
                    className="swiper-slide cursor-pointer "
                  >
                    {/* Ensure SwiperSlide has a defined size */}
                    <div className="w-full h-full relative overflow-hidden">
                      {/* This div acts as a container for absolutely positioned elements */}
                      <div
                        ref={modalRef}
                        className="absolute  inset-0 w-full h-full"
                      >
                        {/* The actual image, styled to cover its parent container */}
                        <Image
                          src={info.backgroundimage} // Make sure info.images is correctly set
                          fill
                          alt={info.title}
                          className="object-cover w-[100%] h-[100%]" // Additional styling as needed
                        />
                      </div>
                      {/* Other content or overlays can be placed here */}
                      <div className="bg-black/50 w-full h-full absolute  uppercase shadow-2xl">
                        <div className="px-4  h-full absolute top-1/2">
                          <h2 className="text-white text-[16px] my-1 font-light">
                            {info.author}
                          </h2>
                          <h1 className="text-white my-1 text-[24px] font-semibold">
                            {info.title}
                          </h1>
                        </div>
                        <div className="flex  justify-between px-2 w-full  gap-y-1 absolute bottom-2 ">
                          <button
                            onClick={() => {
                              handleOpenModal(info);
                            }}
                            className="w-[2rem] h-[2rem] z-40 shadow-lg text-black hover:bg-[#ececec] bg-[#ececec]/90  ease-in-out duration-400 transition hover:text-black  rounded-full text-xs   bottom-2 left-2"
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="text-[10px] "
                            />
                          </button>
                          {/* Likes and Dislikes */}
                          <div className="px-4 py-2 z-40 shadow-lg text-white rounded-full text-xs bg-gradient-to-tl from-purple-200 to-white  bottom-2 right-2 flex justify-between items-center">
                            <div
                              className={`w-[1rem] h-[1rem] bg-white/75 rounded-full flex justify-center items-center ease-in-out transition duration-300 ${
                                activeButton === "like"
                                  ? "scale-125 bg-gradient-to-br from-blue-500 to-red-500 text-white shadow-sm"
                                  : "scale-100 text-black"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={faMicrophoneLines}
                                className="text-xs t"
                              />
                            </div>
                            <span className="mx-2 text-[10px] text-black">
                              {likes}
                            </span>
                            <div
                              className={`w-[1rem] h-[1rem] bg-white/75 rounded-full flex justify-center items-center ease-in-out transition duration-300 ${
                                activeButton === "dislike"
                                  ? "scale-125 text-white bg-gradient-to-br to-blue-200 from-red-800 shadow-sm"
                                  : "scale-100 text-black"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={faMicrophoneLinesSlash}
                                className="text-xs "
                              />
                            </div>
                            <span className="mx-2 text-[10px] text-black">
                              {dislikes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          {selectedOpinion && (
            <>
              {!close && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="fixed inset-0 bg-gradient-to-tr from-blue-500/95 via-white/95 to-red-500/95 text-black bg-opacity-95  w-full h-screen flex justify-center items-center z-20"
                >
                  <div ref={detailsModalRef} className="w-1/2 ">
                    {" "}
                    <DetailsModal opinionData={selectedOpinion} />
                  </div>
                  <div className="w-1/2" ref={opinionModalRef}>
                    <OpinionModal
                      opinionData={selectedOpinion}
                      toggleStateIt={toggleStateIt}
                      toggleDebateIt={toggleDebateIt}
                    />
                  </div>
                  <div ref={moreButtonRef}>
                    <MoreButton
                      toggleComments={toggleComments}
                      showComments={showComments}
                    />
                    {showComments && (
                      <OpinionComments opinionData={selectedOpinion} />
                    )}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.section>
      )}
    </>
  );
};

export default ArchivePage;
