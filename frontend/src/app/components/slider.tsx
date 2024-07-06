"use client";

import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import DetailsModal from "../components/DetailsModal";
import OpinionModal from "../components/OpinionModal";

interface Opinion {
  id: number;
  author: string;
  title: string;
  textContent: string;
  backgroundImage: string;
  profilePicture?: string;
};

function Slider() {

  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [showRepliesModal, setShowRepliesModal] = useState(true);

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

  useEffect(() => {
    fetchOpinions();
  });


  const opinions: Opinion[] = [
    {
      id: 1,
      backgroundImage: "/Images/pexels-itfeelslikefilm-590496.jpg",
      author: "Jessica Wynters",
      title: "Viability As A Time Limit",
      textContent:
        "Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....",
    },
    {
      id: 2,
      author: "David Barnes",
      backgroundImage: "/Images/gun-control.jpg",
      title: "How Many?",
      textContent:
        "Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....",
    },
    {
      id: 3,
      author: "Sarah Lee",
      backgroundImage: "/Images/poverty.webp",
      title: "Born to Chains",
      textContent:
        "Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....",
    },
  ];

  return (
    <section className="flex justify-center items-center  p-4 ">
      <div className="container border-2 border-dashed my-4 rounded-md border-green-500">
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
            slideShadows: false,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {opinions.map((opinion, index) => (
            <SwiperSlide key={index} className="swiper-slide ">
              {/* Ensure SwiperSlide has a defined size */}
              <div className="w-full h-full relative">
                {/* This div acts as a container for absolutely positioned elements */}
                <div className="absolute inset-0 w-full h-full">
                  {/* The actual image, styled to cover its parent container */}
                  <Image
                    src={opinion.backgroundImage} // Make sure info.images is correctly set
                    layout="fill"
                    alt="slider"
                    className="object-cover" // Additional styling as needed
                  />
                </div>
                {/* Other content or overlays can be placed here */}
                <div className="bg-black/40 w-full h-full absolute uppercase shadow-2xl">
                  <div
                    key={index}
                    className="px-4 flex flex-col justify-end h-full"
                  >
                    <h2 className="text-white text-[18px] my-1 px-4 font-bold">
                      {opinion.author}
                    </h2>
                    <h1 className="text-white my-1 text-[20px] px-4 font-black">
                      {opinion.title}
                    </h1>
                    {/* <p className="text-xs text-white">{info.description}</p> */}
                    <div className="flex justify-between items-center">
                      <button onClick={()=>{setSelectedOpinion(opinion)}} className="px-4 py-2 my-4 text-sm text-white rounded-full border border-[#A6E81B] hover:bg-[#a7e81b71]">
                        View
                      </button>
    
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <Icon icon={arrowBackOutline} className="text-white w-6 h-6" />
            </div>
            <div className="swiper-button-next slider-arrow">
              <Icon icon={arrowForwardOutline} className="text-white w-6 h-6" />
            </div>
          </div>
        </Swiper>
      </div>
      <div>
        {selectedOpinion && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={closeModal}
            ></div>
            <DetailsModal opinionData={selectedOpinion} />
            <OpinionModal opinionData={selectedOpinion} closeModal={closeModal} />
          </>
        )}
        {/* {showRepliesModal && (
          <RepliesModal closeModal={closeReplies} />
        )} */}
      </div>
    </section>
  );
}

export default Slider;
