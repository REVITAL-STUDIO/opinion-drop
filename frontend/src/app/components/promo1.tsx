import React from "react";
import VideoPlayer from "./VideoPlayer";
const Promo1 = () => {
  return (
    <section className="w-full bg-black flex items-center justify-center">
      <div className="w-full">
        <div className="flex flex-col xl:flex-row justify-center text-center xl:text-left min-h-screen items-center bg-[url('/Images/pexels-ketchumcommunity-1464232.jpg')] bg-cover">
          <div className="p-4 ">
            <h1 className="text-blue-800 xl:text-8xl text-5xl font-bold">
              UPCOMING...
            </h1>
            <h3 className="text-white  text-3xl font-semibold">
              Original essays and discussion threads invested in societal
              engagement.{" "}
            </h3>
          </div>
          <VideoPlayer src="https://www.dropbox.com/scl/fi/3nhyk5wtdhaglasjqt89v/opiniondrop_welcome.mp4?rlkey=0sd0u1h5h410swr6ik9tbterm&st=ilmtzgt5&dl=1" />
        </div>
        <div className="flex flex-col xl:flex-row justify-center min-h-screen items-center  bg-[url('/Images/pexels-photo-1464212.jpeg')] bg-cover">
          <VideoPlayer src="https://www.dropbox.com/scl/fi/9thkllmlgooldikhlvz3o/opiniondrop_v3_final.mp4?rlkey=jlroqic35z1ear1n7esu9lmj8&st=8go2q00o&dl=1" />
          <div className="p-4 text-center xl:text-left">
            <h1 className="text-red-800 xl:text-8xl text-5xl font-bold">
              MAJORITY RULES
            </h1>
            <h3 className="text-white  text-3xl font-semibold">
              AI integrated algorithm that organizes your feed based on most
              voted likes and dislikes.
            </h3>
          </div>
        </div>
        <div className="bg-[url('/Images/pexels-photo-1550337.webp')]  bg-cover">
          <VideoPlayer src="https://www.dropbox.com/scl/fi/pax09hflkwl2qinaynq7i/demo.mov?rlkey=5cbfiim080k95xuk55nzmr2ic&st=ezhdr4er&dl=1" />
        </div>
      </div>
    </section>
  );
};

export default Promo1;
