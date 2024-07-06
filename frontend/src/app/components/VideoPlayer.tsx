"use client";
import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handlePlay = () => {
      // Pause all other videos
      document.querySelectorAll("video").forEach((video) => {
        if (video !== videoRef.current) {
          (video as HTMLVideoElement).pause();
        }
      });

      // Toggle play/pause for the current video
      if (videoRef.current) {
        const videoElement = videoRef.current;
        if (videoElement.paused || videoElement.ended) {
          videoElement.play().catch((error) => {
            // Handle play error if needed
            console.error("Video playback failed:", error);
          });
          setIsPlaying(true);
        } else {
          videoElement.pause();
          setIsPlaying(false);
        }
      }
    };

    // Add click event listener to the video element
    if (videoRef.current) {
      videoRef.current.addEventListener("click", handlePlay);
    }

    return () => {
      // Clean up event listener on unmount
      if (videoRef.current) {
        videoRef.current.removeEventListener("click", handlePlay);
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
          autoPlay
          muted
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
