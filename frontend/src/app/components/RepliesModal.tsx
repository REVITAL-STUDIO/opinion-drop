"use client";
import React, { useState, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { MdFlag } from "react-icons/md";
import ReplyShort from "./ReplyShort";
import { IoClose } from "react-icons/io5";

interface RepliesModalProps {
    closeModal: () => void;
}

const RepliesModal: React.FC<RepliesModalProps> = ({ closeModal }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);

    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (e: MouseEvent) => {
                const newHeight = startY - e.clientY;
                setCurrentHeight(newHeight > 0 ? newHeight : 0);
            };

            const handleMouseUp = () => {
                setIsDragging(false);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging, startY]);

    const startDragging = (e: ReactMouseEvent) => {
        setIsDragging(true);
        setStartY(e.clientY + currentHeight);
    };

    return (
        <div
            className="z-50 fixed bottom-0 left-0 right-0 bg-black text-white p-4 shadow-lg transition-transform"
            style={{ height: `${currentHeight + 100}px`, maxHeight: `100vh` }}
        >
            <div
                className="absolute top-0 w-full h-[4rem] bg-black cursor-pointer flex justify-center mb-[3%]"
                onMouseDown={startDragging}
            >
                <IoIosArrowUp className="absolute left-[38.5%] w-[3rem] h-[3rem] " />
            </div>
            <div className="mt-[4%] px-[4rem] w-full flex justify-between" style={{ maxHeight: "calc(100vh - 100px)" }}>
                <div className="w-[40%] border-r-[1px] border-white">
                    <h2 className="text-5xl font-bold mb-[4rem]">Analytics</h2>
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-[3rem] items-center">
                            <IoEyeOutline className="w-[3.5rem] h-[3.5rem]" />
                            <p className="text-lg">1.2 million views</p>
                        </div>
                        <div className="flex gap-[3rem] items-center">
                            <GoGraph className="w-[3.5rem] h-[3.5rem]" />
                            <p className="text-lg">800k Ratings</p>
                        </div>
                        <div className="flex gap-[3rem] items-center">
                            <BiLike className="w-[3.5rem] h-[3.5rem]" />
                            <p className="text-lg">400 Likes</p>
                        </div>
                        <div className="flex gap-[3rem] items-center">
                            <MdFlag className="w-[3.5rem] h-[3.5rem] text-[#E81B23]" />
                            <p className="text-lg">1.2k FLAGGED AS MISINFORMATION</p>
                        </div>
                    </div>
                </div>
                <div className="w-[55%]">
                    <h2 className="text-5xl font-bold mb-[4rem]">Replies</h2>
                    {/* Replies shorts */}
                    <div className="flex flex-col gap-8 max-h-[80%] overflow-y-auto custom-scrollbar">
                        <ReplyShort />
                        <ReplyShort />
                        <ReplyShort />
                        <ReplyShort />
                        <ReplyShort />
                    </div>
                </div>
            </div>
            <button className="absolute top-4 right-4" onClick={closeModal}><IoClose className="w-[2rem] h-[2rem]"/></button>
        </div>
    );
};

export default RepliesModal;
