"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { MdArrowForwardIos } from "react-icons/md";
import Ratings from "./ratings";

interface SurveyPromptProps {
  prompt: String;
  questionId: number;
  onChange: (questionId: number, value: number) => void;
}

function valuetext(value: number) {
  return `${value}`;
}

const SurveyPrompt: React.FC<SurveyPromptProps> = ({
  prompt,
  questionId,
  onChange,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      onChange(questionId, newValue);
    }
  };

  useEffect(() => {
    onChange(questionId, sliderValue);
  }, [questionId, sliderValue]);

  return (
    <div className="flex flex-col  mx-auto">
      <p className="text-center text-sm">{prompt}</p>
      <div className="flex justify-center items-center">
        <Box sx={{ width: 300 }}>
          <Slider
            value={sliderValue}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            shiftStep={30}
            step={10}
            marks
            min={0}
            max={100}
            onChange={handleChange}
            className="mx-auto mt-4"
          />
        </Box>
      </div>
    </div>
  );
};

export default SurveyPrompt;
