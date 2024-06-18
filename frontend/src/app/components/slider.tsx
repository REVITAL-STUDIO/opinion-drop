"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

function Slider() {
  const cardInfo = [
    {
      images: "/Images/pexels-itfeelslikefilm-590496.jpg",
    },
    {
      images: "/Images/pexels-daniel-reche-718241-1556652.jpg",
    },
    {
      images: "/Images/pexels-kelvinocta16-1973270.jpg",
    },
  ];

  return (
    <section className="flex justify-center items-center  p-4 ">
      <div className="container border-2 border-dashed rounded-md border-green-500">
        <Swiper
          effect={"coverflow"}
          spaceBetween={1}
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
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {cardInfo.map((info, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <Image
                src={info.images}
                layout="fill"
                alt="slider"
                className="absolute"
                style={{ objectFit: "fill" }}
              />
            </SwiperSlide>
          ))}

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

export default Slider;
