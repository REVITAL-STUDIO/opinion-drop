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


const SurveyPrompt: React.FC<SurveyPromptProps> = ({ prompt, questionId, onChange }) => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue); 
      onChange(questionId, newValue);
    }
  };


  useEffect(() => {
    onChange(questionId, sliderValue);
  }, [questionId, sliderValue]);


  return (
    <div className="flex flex-col p-4 gap-2 mx-auto">
      <p className="text-center text-sm">{prompt}</p>
      <div className="flex justify-center items-center">
        <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Temperature"
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            shiftStep={30}
            step={10}
            marks
            min={0}
            max={100}
            value={sliderValue} 
            onChange={handleChange}
            className="mx-auto mt-4"
          />
        </Box>
      </div>
    </div>
  );
};

export default SurveyPrompt;