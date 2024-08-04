"use client";
import Drop from "./drops";
import CreateButton from "./createButton";
import Questions from "./questions";
import Image from "next/image";
import Archive from "./ArchiveButton";
import Engagement from "./engagement";
import Nav from "./nav";
import SignIn from "./signInButton";
import SignInButton from "./signInButton";
import Cesspit from "./theCesspit";

interface OpinionShowcaseProps {
  topic: {
    name: string;
    id: number;
  };
}

export default function OpinionShowcase({ topic }: OpinionShowcaseProps) {
  return (
    <div className=" w-full  ">
      <div className="min-h-screen relative gap-y-2 flex flex-col">
        <Image
          src="/Images/AdobeStock_756592648.jpeg"
          alt="OD Background"
          fill
          className="absolute w-[100%] h-[100%] object-cover object-center blur-md brightness-50 "
        />
        <Nav />
        <Questions />
        <Drop topic={topic} />
        <Archive topic={topic} />
        <CreateButton topic={topic} />
      </div>
      <Cesspit topic={topic} />
    </div>
  );
}
