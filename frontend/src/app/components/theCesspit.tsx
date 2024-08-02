"use client";
import React, {
  useState,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";
import CommentContainer from "./comment";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/AuthContext";

interface OpinionCesspitCommentProps {
  opinionData: {
    id: number;
    author: string;
    title: string;
    textcontent: string;
    backgroundimage: string;
    authorprofileimage?: string;
  };
}

interface CommentCesspit {
  id: number;
  author: string;
  textcontent: string;
  parentcommentid: number | null;
  parentcommentauthor: string | null;
  authorprofileimage?: string;
  likes: number;
  createdat: string;
}

const Cesspit: React.FC<OpinionCesspitCommentProps> = ({ opinionData }) => {
  const [comments, setComments] = useState<CommentCesspit[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const { currentUser } = useAuth();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(e.target.value);
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
      <motion.div className="z-40  right-0 bg-black/95 text-white  shadow-lg transition-transform">
        <div className=" px-[4rem] w-full flex gap-[8%] min-h-screen">
          <div className="w-[100%]  overflow-x-visible">
            <h2 className="text-2xl font-normal mt-[5%] relative p-4">
              Cesspit
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

export default Cesspit;
