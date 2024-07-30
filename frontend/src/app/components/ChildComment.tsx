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
  createdat: Date;
}

interface ChildCommentProps {
  comment: Comment;
  rootCommentId: number;
  postChildComment: (content: string, parentCommentId: number) => Promise<any>;
  likeComment: (commentId: number, userHasLiked: boolean) => Promise<any>;
  hasUserLiked: (commentId: number) => Promise<any>;

}

const ChildComment = ({ comment, postChildComment, rootCommentId, likeComment, hasUserLiked }: ChildCommentProps) => {
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
      await postChildComment(newChildCommentText, comment.id)
    }
    catch (error) {
      console.error(error);
    }
    setOpenReplyTextBox(false);
  }

  const handleLikeComment = async (comment: Comment, userHasLiked: boolean) => {
    try {
      await likeComment(comment.id, userHasLiked);
    }
    catch (error) {
      console.log("Error liking comment");
    }
    comment.likes++;
    setUserHasLiked(true);

  }

  useEffect(() => {
    const loadLiked = async () => {
      const hasliked: boolean = await hasUserLiked(comment.id);
      setUserHasLiked(hasliked);
    }
    if (comment) {
      loadLiked();
    }


  }, [comment]);

  return (
    <div key={comment.id} className=" min-h-[14rem] border-l-[2px] my-4 rounded-xl border-b-[2px] relative left-16 border-[#fff]/50 overflow-visible w-[75%]">
      <div className=" -ml-[3%]  flex items-center gap-4">
        <div className="w-[3rem] h-[3rem] rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src={comment.authorprofileimage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-sm text-[#fff] font-semibold">{comment.author}</h2>
          <p className="text-xs text-[#fff] font-bold">{timeAgo(comment.createdat)}</p>
        </div>
      </div>
      <div className="ml-[3%] py-[2rem] flex flex-col items-start gap-2">
        <p
          className="w-[100%] text-[0.9rem] text-white"
        >
          <span className="bold text-blue-500">{rootCommentId != comment.parentcommentid && `@${comment.parentcommentauthor}`}</span>
          {textIsExpanded ? comment.textcontent : truncateText(comment.textcontent, textMaxChar)}
        </p>
        {comment.textcontent.length > textMaxChar && (
          <button onClick={toggleExpandedText} className="font-semibold text-sm text-gray-400">
            {textIsExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      <div className="flex gap-x-8 p-4 bottom-[0%] my-4 left-[2%] ">
        <button
          onClick={() => handleLikeComment(comment, userHasLiked)}
          className={`text-white flex gap-x-2 rounded-[10px] w-[3rem] text-sm h-[2.3rem] justify-center items-center`}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`w-5 h-5 ${userHasLiked ? "text-red-500" : "text-white"
              } `}
          />
          <p>{comment.likes}</p>
        </button>
        <button
          onClick={() => setOpenReplyTextBox(true)}
          className="  text-white flex rounded-[10px] w-[3rem] h-[2.3rem] text-sm justify-center items-center gap-x-2">
          <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" /> Reply
        </button>
      </div>
      {openReplyTextBox && (
        <div className="relative px-6 pb-[3rem] mb-[2rem]">
          <textarea
            value={newChildCommentText}
            onChange={(e) => setNewChildCommentText(e.target.value)}
            autoFocus
            id="reply"
            rows={3}
            className="w-full  pb-2 text-md text-white bg-transparent border-b border-gray-300 focus:outline-none focus:border-b-2 focus:bg-gray-900/30  dark:placeholder-gray-400 resize-none h-auto"
            placeholder="Add a reply..."
            required
          ></textarea>
          <div className="absolute bottom-0 right-5 flex items-center gap-3">
            <button
              onClick={() => setOpenReplyTextBox(false)}
              type="button"
              className="py-2.5 px-4 text-sm font-medium text-center text-white bg-transparent rounded-full hover:bg-gray-800/25"
            >
              Cancel
            </button>
            <button
              onClick={handlePostReply}
              type="button"
              className="py-2.5 px-4 text-sm font-medium text-center text-white bg-gray-700 rounded-full hover:bg-gray-800 active:bg-gray-700"
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
