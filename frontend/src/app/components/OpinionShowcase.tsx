"use client";
import Drop from "./drops";
import CreateButton from "./createButton";
import Questions from "./questions";
import Image from "next/image";
import Engagement from "./engagement";
import Nav from "./nav";

interface OpinionShowcaseProps {
  topic: string;
}

export default function OpinionShowcase({ topic }: OpinionShowcaseProps) {
  return (
    <div className="w-full min-h-screen mx-auto relative ">
      <Image
        src="/Images/AdobeStock_756592648.jpeg"
        fill
        alt="Opinion Drop"
        className="w-[100%] h-[100%] object-cover brightness-50 object-center absolute blur-sm"
      />
      <Nav />
      <div className="relative  xl:mt-0  min-h-[100vh] md:mt-[10%] flex flex-col justify-center items-center">
        <Questions />
        <Drop topic={topic} />
        {/* <Engagement/> */}
      </div>
      
    </div>
  );
}
