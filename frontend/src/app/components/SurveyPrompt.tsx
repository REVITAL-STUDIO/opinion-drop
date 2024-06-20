'use client'
import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";
import SpectrumBar from "./SpectrumBar";

interface SurveyQuestionProps {
    question?: String
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ question }) => {
    return (
        <div className="mb-8 flex flex-col items-center gap-6">
            <p className="text-center text-xl">
                Life begins at conception, and abortion is morally equivalent to taking an innocent human life.
            </p>
            <SpectrumBar />
        </div>
    );
};

export default SurveyQuestion;