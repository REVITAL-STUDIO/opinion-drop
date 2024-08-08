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
      <div className="relative min-h-screen bg-gradient-to-br from-white via-red-200 to-blue-200 bg-cover bg-center">
        <div className="absolute inset-0  opacity-85 blur-lg z-10"></div>
        <div className="relative w-full z-20">
          <Nav />
          <Topic />
          <Drop topic={topic} />
          <div className="flex  justify-center items-center">
            <CreateButton topic={topic} />
            <Archive topic={topic} />
          </div>
        </div>
      </div>
      <Cesspit topic={topic} />
    </div>
  );
}
