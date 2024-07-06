"use client";
import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handlePlay = () => {
      // Pause all other videos
      document.querySelectorAll("video").forEach((video) => {
        if (video !== videoRef.current) {
          (video as HTMLVideoElement).pause();
        }
      });
    };

    // Add play event listener to the video element
    if (videoRef.current) {
      videoRef.current.addEventListener("play", handlePlay);
    }

    return () => {
      // Clean up event listener on unmount
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", handlePlay);
      }
    };
  }, [src]);

  return (
    <section className="w-full h-auto flex justify-center items-center relative pb-[56.25%]">
      <div className="absolute top-[10%] w-5/6 h-5/6">
        <video
          ref={videoRef}
          className="m-auto"
          width="100%"
          height="auto"
          // autoPlay
          // muted
          controls
          loop
          preload="auto"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideoPlayer;