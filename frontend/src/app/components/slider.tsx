"use client";

import React, { useState } from "react";
import Image from "next/image";

const Slider = () => {
  return (
    <section className="news">
      <div className="container">
        <input
          className="border "
          type="radio"
          name="slider"
          id="item-1"
          checked
        />
        <input type="radio" name="slider" id="item-2" />
        <input type="radio" name="slider" id="item-3" />
        <input type="radio" name="slider" id="item-4" />
        <input type="radio" name="slider" id="item-5" />
        <div className="cards">
          <label className="card" htmlFor="item-1" id="song-1">
            <input type="checkbox" />
            <video
              autoPlay
              muted
              loop
              className="picture video-filter"
              src="/videos/mag.mp4"
              playsInline
            />
          </label>
          <label className="card" htmlFor="item-2" id="song-2">
            <Image
              alt="song"
              className="picture"
              height="400"
              width="400"
              src="/images/softxlaunch-instagram.jpg"
            />
          </label>
          <label className="card" htmlFor="item-3" id="song-3">
            <Image
              alt="song"
              className="picture"
              height="400"
              width="400"
              src="/images/how not to gate keep 101.png"
            />
          </label>
          <label className="card" htmlFor="item-4" id="song-4">
            <video
              autoPlay
              muted
              loop
              className="picture"
              src="/videos/trnsprnc.mp4"
              playsInline
            />
          </label>
          <label className="card" htmlFor="item-5" id="song-5">
            <Image
              alt="song"
              className="picture"
              height="400"
              width="400"
              src="/images/revitalxtrnsprnc.png"
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default Slider;
