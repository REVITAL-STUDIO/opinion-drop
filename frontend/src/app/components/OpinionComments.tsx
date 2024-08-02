"use client";
import React, {
  useState,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";
import { IoEyeOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { MdFlag } from "react-icons/md";

import CommentContainer from "./comment";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/AuthContext";

interface OpinionCommentsProps {
  opinionData: {
    id: number;
    author: string;
    title: string;
    textcontent: string;
    backgroundimage: string;
    authorprofileimage?: string;
  };
}

interface Comment {
  id: number;
  author: string;
  textcontent: string;
  parentcommentid: number | null;
  parentcommentauthor: string | null;
  authorprofileimage?: string;
  likes: number;
  createdat: string;
}

const OpinionComments: React.FC<OpinionCommentsProps> = ({ opinionData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const { currentUser } = useAuth();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(e.target.value);
  };

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

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/opinion/${opinionData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving comments");
      }
      const response = await res.json();
      console.log("response", response)
      setComments(response.data.comments);
    } catch (error) {
      console.log("Error Fetching Comments: ", error);
    }
  };

  const postComment = async () => {
    console.log("in post comments");
    console.log("comments opinionid ", opinionData);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/opinion/${opinionData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.uid,
            opinionId: opinionData.id,
            content: newCommentText,
            parentCommentId: null,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Error posting comment");
      }
      const response = await res.json();
      const newComment = response.data.comment;
      setComments((prevComments) => [newComment, ...prevComments]);
      setNewCommentText("");
      await fetchComments();
    } catch (error) {
      console.log("Error posting comment: ", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{ duration: 0.2, ease: "easeInOut" }} // Added transition property
        className="z-40 absolute top-0 left-0 right-0 bg-black/95 text-white px-4 shadow-lg transition-transform"
      >
        <div className="mt-[4%] px-[4rem] w-full flex gap-[8%] min-h-screen">
          <div className="w-[25%] mt-[5%]">
            <div className="flex flex-col gap-8">
              <div className="flex gap-[3rem] items-center">
                <IoEyeOutline className="w-[3.5rem] h-[3.5rem]" />
                <p className="text-sm">1.2 million views</p>
              </div>
              <div className="flex gap-[3rem] items-center">
                <GoGraph className="w-[3.5rem] h-[3.5rem]" />
                <p className="text-sm">800k Ratings</p>
              </div>
              <div className="flex gap-[3rem] items-center">
                <BiLike className="w-[3.5rem] h-[3.5rem]" />
                <p className="text-sm">400 Likes</p>
              </div>
              <div className="flex gap-[3rem] items-center">
                <MdFlag className="w-[3.5rem] h-[3.5rem] text-[#E81B23]" />
                <p className="text-sm">1.2k FLAGGED AS MISINFORMATION</p>
              </div>
            </div>
          </div>
          <div className="w-[80%]  overflow-x-visible">
            <h2 className="text-2xl font-normal mb-[4%] relative ">
              Discussion
            </h2>
            {/* Comments */}
            <div className="w-[100%] h-[650px] overflow-y-auto ">
              <div className="relative flex flex-col gap-8  overflow-visible w-full  border-[#676767] ">
                {comments.map((comment) => (
                  <CommentContainer
                    key={comment.id}
                    comment={comment}
                    opinionId={opinionData.id}
                  />
                ))}
              </div>
            </div>
            <div className="relative mt-2">
              <textarea
                value={newCommentText}
                onChange={handleCommentChange}
                className="w-full h-[80px] p-2 border border-[#676767] rounded-md bg-transparent text-white placeholder-white"
                placeholder="Write your comment here..."
              />
              <button
                onClick={postComment}
                className="absolute top-6 right-6 text-white bg-transparent border-none cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-[#333] p-2 rounded-md"
              >
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OpinionComments;
