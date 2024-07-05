import React from "react";
import VideoPlayer from "./VideoPlayer";
const Promo1 = () => {
  return (
    <section className="w-full bg-black flex items-center justify-center">
      <div className="w-full">
        <VideoPlayer src="https://www.dropbox.com/scl/fi/3nhyk5wtdhaglasjqt89v/opiniondrop_welcome.mp4?rlkey=0sd0u1h5h410swr6ik9tbterm&st=ilmtzgt5&dl=1"/>
        <VideoPlayer src="https://www.dropbox.com/scl/fi/9thkllmlgooldikhlvz3o/opiniondrop_v3_final.mp4?rlkey=jlroqic35z1ear1n7esu9lmj8&st=8go2q00o&dl=1"/>
        <VideoPlayer src="https://www.dropbox.com/scl/fi/pax09hflkwl2qinaynq7i/demo.mov?rlkey=5cbfiim080k95xuk55nzmr2ic&st=ezhdr4er&dl=1"/>
      </div>
    </section>
  );
};

export default Promo1;