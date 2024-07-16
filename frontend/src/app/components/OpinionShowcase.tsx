'use client'
import Drop from "./drops";
import CreateButton from "./createButton";
import Questions from "./questions";
import Engagement from "./engagement";

export default function OpinionShowcase() {
    return (
        <div className="w-full relative mx-auto">
            <CreateButton />
            <Questions />
            <Drop />
            <Engagement />
        </div>
    );
}
