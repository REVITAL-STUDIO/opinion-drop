"use client";
import Drop from "./drops";
import CreateButton from "./createButton";
import Image from "next/image";
import Archive from "./ArchiveButton";
import Nav from "./nav";

import Cesspit from "./theCesspit";
import Topic from "./Topic";

interface OpinionShowcaseProps {
  topic: {
    name: string;
    id: number;
  };
}

export default function OpinionShowcase({ topic }: OpinionShowcaseProps) {
  return (
    <div className="w-full">
      <div className="min-h-screen relative bg-[url('/Images/AdobeStock_756592648.jpeg')] bg-cover bg-center gap-y-2">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="absolute w-full z-10">
          <Nav />
          <Topic />
          <Archive topic={topic} />
          <Drop topic={topic} />
          <CreateButton topic={topic} />
        </div>
      </div>
      <Cesspit topic={topic} />
    </div>
  );
}
