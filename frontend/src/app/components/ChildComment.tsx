import { faCommentDots, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { timeAgo, truncateText } from "../utils/commentUtils";

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

interface ChildCommentProps {
  comment: Comment;
  rootCommentId: number;
  postChildComment: (content: string, parentCommentId: number) => Promise<any>;
  likeComment: (commentId: number, userHasLiked: boolean) => Promise<any>;
  hasUserLiked: (commentId: number) => Promise<any>;
}

const ChildComment = ({
  comment,
  postChildComment,
  rootCommentId,
  likeComment,
  hasUserLiked,
}: ChildCommentProps) => {
  const [openReplyTextBox, setOpenReplyTextBox] = useState(false);
  const [newChildCommentText, setNewChildCommentText] = useState("");
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [textIsExpanded, setTextIsExpanded] = useState(false);
  const textMaxChar = 600;

  const toggleExpandedText = () => {
    setTextIsExpanded(!textIsExpanded);
  };

  const handlePostReply = async () => {
    try {
      await postChildComment(newChildCommentText, comment.id);
    } catch (error) {
      console.error(error);
    }
    setOpenReplyTextBox(false);
  };

  const handleLikeComment = async (comment: Comment, userHasLiked: boolean) => {
    try {
      await likeComment(comment.id, userHasLiked);
    } catch (error) {
      console.log("Error liking comment");
    }
    comment.likes++;
    setUserHasLiked(true);
  };

  useEffect(() => {
    const loadLiked = async () => {
      const hasliked: boolean = await hasUserLiked(comment.id);
      setUserHasLiked(hasliked);
    };
    if (comment) {
      loadLiked();
    }
  }, [comment]);

  return (
    <div
      key={comment.id}
      className=" p-4  my-4 rounded-xl   relative text-white border-l border-b left-16 border-[#fff]/50 overflow-visible w-[90%]"
    >
      <div className="  flex  gap-4">
        <div className="w-[3rem] h-[3rem] rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src={comment.authorprofileimage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="">
          <h2 className="text-sm  font-normal">{comment.author}</h2>
          <p className="text-xs  font-light">{timeAgo(comment.createdat)}</p>
          <div className=" my-2 flex flex-col items-start gap-2 ">
            <p className={` w-[100%] text-[0.9rem] `}>
              {rootCommentId != comment.parentcommentid &&
                <span className="bold text-blue-500 mr-2">
                  @{comment.parentcommentauthor}
                </span>
              }
              {textIsExpanded
                ? comment.textcontent
                : truncateText(comment.textcontent, textMaxChar)}
            </p>
            {comment.textcontent.length > textMaxChar && (
              <button
                onClick={toggleExpandedText}
                className="font-semibold text-sm text-gray-400"
              >
                {textIsExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
          <div className="flex justify-between items-center  ">
            <div className="w-1/2   flex gap-x-8">
              <button
                onClick={() => handleLikeComment(comment, userHasLiked)}
                className={` flex gap-x-2 rounded-[10px] w-[3rem] text-sm h-[2.3rem] justify-center items-center`}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`w-5 h-5 ${userHasLiked ? "text-red-500" : ""} `}
                />
                <p>{comment.likes}</p>
              </button>
              <button
                onClick={() => setOpenReplyTextBox(true)}
                className="   flex rounded-[10px] w-[3rem] h-[2.3rem] justify-center text-sm items-center gap-x-2"
              >
                <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" />{" "}
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
      {openReplyTextBox && (
        <div className="relative px-6  border-t ">
          <textarea
            value={newChildCommentText}
            onChange={(e) => setNewChildCommentText(e.target.value)}
            autoFocus
            id="reply"
            rows={3}
            className="w-full  pb-2 text-md mt-4 text-black  border border-gray-300 focus:outline-none focus:border-b-2 p-4 rounded-lg bg-[#ececec] dark:placeholder-gray-400 resize-none"
            placeholder="Add a reply..."
            required
          ></textarea>
          <div className=" my-4 flex items-center gap-x-4">
            <button
              onClick={() => setOpenReplyTextBox(false)}
              type="button"
              className="py-2.5 px-4 text-sm font-medium text-center border border-black hover:border-none ease-in-out duration-300 transition shadow-lg text-white  rounded-lg bg-gray-800/50"
            >
              Cancel
            </button>
            <button
              onClick={handlePostReply}
              type="button"
              className="py-2.5 px-4 text-sm font-medium text-center text-white bg-purple-700 rounded-lg shadow-lg ease-in-out duration-300 transition hover:bg-gray-800 active:bg-gray-700"
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildComment;
