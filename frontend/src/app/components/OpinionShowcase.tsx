'use client'
import Drop from "./drops";
import CreateButton from "./createButton";
import Questions from "./questions";
import Engagement from "./engagement";

interface OpinionShowcaseProps {
    topic: {
        name: string,
        id: number
      }
    }

export default function OpinionShowcase({ topic }: OpinionShowcaseProps) {
    return (
        <div className="w-full relative  mx-auto">
            <CreateButton topic={topic}/>
            <Questions/>
            <Drop topic={topic} />
            {/* <Engagement/> */}
        </div>
    );
}