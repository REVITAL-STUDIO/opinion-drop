"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";

function Slider() {
  const cardInfo = [
    {
      images: "/Images/pexels-itfeelslikefilm-590496.jpg",
      name: "Jessica Wynters",
      title: "Viability As A Time Limit",
      description:
        "Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....",
    },
    {
      name: "David Barnes",
      images: "/Images/gun-control.jpg",
      title: "How Many?",
      description:
        "Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....",
    },
    {
      name: "Sarah Lee",
      images: "/Images/poverty.webp",
      title: "Born to Chains",
      description:
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
          {cardInfo.map((info, index) => (
            <SwiperSlide key={index} className="swiper-slide ">
              {/* Ensure SwiperSlide has a defined size */}
              <div className="w-full h-full relative">
                {/* This div acts as a container for absolutely positioned elements */}
                <div className="absolute inset-0 w-full h-full">
                  {/* The actual image, styled to cover its parent container */}
                  <Image
                    src={info.images} // Make sure info.images is correctly set
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
                      {info.name}
                    </h2>
                    <h1 className="text-white my-1 text-[20px] px-4 font-black">
                      {info.title}
                    </h1>
                    {/* <p className="text-xs text-white">{info.description}</p> */}
                    <div className="flex justify-between items-center">
                      <button className="px-4 py-2 my-4 text-sm text-white rounded-full border border-[#A6E81B]">
                        Join the Conversation
                      </button>
                      {/* <div className="w-fit flex gap-x-4">
                        <button className="w-8 h-8">
                          <Icon
                            icon="ph:arrow-fat-up-light"
                            className="text-white w-6 h-6 hover:bg-white duration-300 ease-in-out"
                          />
                        </button>
                        <button className="w-8 h-8">
                          <Icon
                            icon="ph:arrow-fat-up-light"
                            className="text-white w-6 h-6 rotate-180"
                          />
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="w-fit top-4 left-4 rounded-full p-4 bg-[#FFFFF0] absolute"></div> */}
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
    </section>
  );
}

export default Slider;
