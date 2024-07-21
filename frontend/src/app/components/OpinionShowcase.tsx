"use client";
import Drop from "./drops";
import CreateButton from "./createButton";
import Questions from "./questions";
import Image from "next/image";
import Engagement from "./engagement";
import Nav from "./nav";
import SignIn from "./signInButton";
import SignInButton from "./signInButton";

interface OpinionShowcaseProps {
  topic: {
    name: string;
    id: number;
  };
}

export default function OpinionShowcase({ topic }: OpinionShowcaseProps) {
  return (
    <div className="relative w-full border-red-500 min-h-screen flex flex-col justify-center items-center">
      <CreateButton topic={topic} />
      <Questions />
      <Drop topic={topic} />
      <SignInButton />
      {/* <Engagement/> */}
    </div>
  );
}
