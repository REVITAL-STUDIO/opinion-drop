"use client";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import SpectrumBar from "./SpectrumBar";

interface SurveyQuestionProps {
  question?: String;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ question }) => {
  return (
    <div className="mb-8 flex flex-col items-center gap-6">
      <SpectrumBar />
    </div>
  );
};

export default SurveyQuestion;
