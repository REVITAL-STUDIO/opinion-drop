"use client";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Ratings from "./ratings";

interface SurveyPromptProps {
  prompt: String;
}

const SurveyPrompt: React.FC<SurveyPromptProps> = ({ prompt }) => {
  return (
    <div className="flex  p-4 gap-2">
      <p className="text-left p-4 text-base">{prompt}</p>
      <Ratings />
    </div>
  );
};

export default SurveyPrompt;
