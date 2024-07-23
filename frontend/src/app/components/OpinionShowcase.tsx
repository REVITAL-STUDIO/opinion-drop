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
    <div className="relative w-full">
      <Questions />
      <Drop topic={topic} />
      <div className="relative right-[5%]">
      <CreateButton topic={topic} />
      </div>
    </div>
  );
}
