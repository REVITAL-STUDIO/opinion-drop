"use client";
import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { MdArrowForwardIos } from "react-icons/md";
import Ratings from "./ratings";

interface SurveyPromptProps {
  prompt: String;
}

function valuetext(value: number) {
  return `${value}`;
}

const SurveyPrompt: React.FC<SurveyPromptProps> = ({ prompt }) => {
  return (
    <div className="flex flex-col p-4 gap-2 mx-auto">
      <p className="text-center text-lg">{prompt}</p>
      <div className="w-full flex justify-center items-center">
        <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Temperature"
            defaultValue={50}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={10}
            marks
            min={10}
            max={100}
            className="mx-auto"
          />
        </Box>
      </div>
    </div>
  );
};

export default SurveyPrompt;
