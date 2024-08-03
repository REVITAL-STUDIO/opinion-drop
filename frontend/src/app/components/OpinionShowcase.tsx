"use client";
import Drop from "./drops";
import CreateButton from "./createButton";
import Questions from "./questions";
import Nav from "./nav";
import Cesspit from "./theCesspit";
import Image from "next/image";
import Archive from "./Archive";

interface OpinionShowcaseProps {
  topic: {
    name: string;
    id: number;
  };
  cesspitData: {
    commentId: number;
    userId: string;
    topicId: number;
    parentCommentId: number | null;
    content: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function OpinionShowcase({
  topic,
  cesspitData,
}: OpinionShowcaseProps) {
  return (
    <div className=" w-full  ">
      <div className="min-h-screen relative">
        <Image
          src="/Images/AdobeStock_756592648.jpeg"
          alt="OD Background"
          fill
          className="absolute w-[100%] h-[100%] object-cover object-center blur-md brightness-50"
        />
        <Nav />
        <Questions />
        <Archive />
        <Drop topic={topic} />
        <CreateButton topic={topic} />
      </div>
      <Cesspit cesspitData={cesspitData} />
    </div>
  );
}
