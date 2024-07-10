"use client";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

interface CommentProps {
    comment?: {
        id: number;
        text: string;
        author: string;
    };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div className="h-[14rem] relative border-b-[3px]  border-[#676767] overflow-visible w-[85%]">
            <div className=" -ml-[4%] flex items-center gap-4">
                <div className="w-[4rem] h-[4rem] rounded-full bg-gray-300 flex items-center justify-center">
                    <img
                        src="/path/to/profile/pic.jpg"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-[1.3rem] text-[#804399]">John Doe</h2>
                    <p className="text-sm text-[#B2B2B2]">3 Days ago</p>
                </div>
            </div>
            <p className="absolute bottom-[20%] ml-[3%] w-[90%] text-[0.9rem]">
                I completely agree with your viewpoint. It&apos;s refreshing to see someone articulate
                the nuances of this issue so well. However, I think it&apos;s also important to consider
                the historical context and how it has shaped the current situation. For instance,
                if we look back at the legislative changes over...
            </p>

            <div className="flex gap-6 absolute -bottom-[8%] left-[3%]">
                <button className="border-[2px] border-[#7F4399] bg-black text-white flex rounded-[10px] w-[5rem] h-[2.3rem] justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#70009F]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    Like
                </button>
                <button className="border-[2px] border-[#7F4399] bg-black text-white flex rounded-[10px] w-[5.3rem] h-[2.3rem] justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#70009F]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    Reply
                </button>
            </div>
            <div className="absolute right-0 top-[13%] flex gap-4 text-[#B2B2B2] text-[0.8rem]">
                <p><span className="font-bold text-white">20</span> Likes</p>
                <p><span className="font-bold text-white">3</span> Replies</p>
            </div>
        </div>
    );
};

export default Comment;
