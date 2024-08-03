"use client";
import Drop from "./drops";
import CreateButton from "./createButton";
import Questions from "./questions";
import Image from "next/image";
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
    <div className="relative w-full min-h-screen ">
      <Nav />
      <Questions />
      <Drop topic={topic} />
      <CreateButton topic={topic} />
      <Cesspit topic={topic} />
    </div>
  );
}
