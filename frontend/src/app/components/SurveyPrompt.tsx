'use client'
import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";
import SpectrumBar from "./SpectrumBar";

interface SurveyPromptProps {
    prompt: String
}

const SurveyPrompt: React.FC<SurveyPromptProps> = ({ prompt }) => {
    return (
        <div className="mb-8 flex flex-col items-center gap-6">
            <p className="text-center text-xl">
                {prompt}
            </p>
            <SpectrumBar />
        </div>
    );
};

export default SurveyPrompt;