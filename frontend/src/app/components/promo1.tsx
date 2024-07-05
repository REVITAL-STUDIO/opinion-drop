import React from "react";
import VideoPlayer from "./VideoPlayer";
const Promo1 = () => {
  return (
    <section className="w-full bg-black flex items-center justify-center">
      <div className="w-full">
        <VideoPlayer src="/videos/opiniondrop_welcome.mp4"/>
        <VideoPlayer src="/videos/opiniondrop_v3_final.mp4"/>
        <VideoPlayer src="/videos/demo.mov"/>
      </div>
    </section>
  );
};

export default Promo1;