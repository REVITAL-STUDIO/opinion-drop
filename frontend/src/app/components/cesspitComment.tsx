"use client";
import {
  faCommentDots,
  faHeart,
  faHeart as faS,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { use, useState, useEffect, useRef } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import ChildComment from "./ChildComment";
import { useAuth } from "../hooks/AuthContext";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { timeAgo, truncateText } from "../utils/commentUtils";
import CesspitChildComment from "./cesspitChildComments";

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
interface CommentProps {
  comment: Comment;
  topicId: number;
}

const CesspitComment: React.FC<CommentProps> = ({ comment, topicId }) => {
  const [openReplyTextBox, setOpenReplyTextBox] = useState(false);
  const [showChildComments, setShowChildComments] = useState(false);
  const [childComments, setChildComments] = useState<Comment[]>([]);
  const [numChildComments, setNumChildComments] = useState(0);
  const [newChildCommentText, setNewChildCommentText] = useState("");
  const [userHasLiked, setUserHasLiked] = useState(false);
  const { currentUser } = useAuth();
  const [textIsExpanded, setTextIsExpanded] = useState(false);
  const textMaxChar = 600;

  const handleChildCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewChildCommentText(e.target.value);
  };

  const toggleExpandedText = () => {
    setTextIsExpanded(!textIsExpanded);
  };

  const toggleChildComments = () => {
    setShowChildComments(!showChildComments);
  };

  const fetchChildComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/cesspit/children/${comment.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving child comments");
      }
      const response = await res.json();
      return response.data.comments;
    } catch (error) {
      console.log("Error Fetching Child Comments: ", error);
    }
  };

  const fetchChildCommentsReplies = async (childCommentId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/cesspit/children/${childCommentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving child comments");
      }
      const response = await res.json();
      console.log("fetchChildCommentsReplies response ");
      return response.data.comments;
    } catch (error) {
      console.log("Error Fetching Child Comments: ", error);
    }
  };

  const getAllChildComments = async () => {
    console.log("comment before fetching: ", comment);
    let childComments: Comment[] = await fetchChildComments();
    let childReplies: Comment[] = [];
    console.log("All child comments: ", childComments);

    for (const childComment of childComments) {
      console.log("in child for loop: ", childComment);
      const replies: Comment[] = await fetchChildCommentsReplies(
        childComment.id
      );
      childReplies = [...childReplies, ...replies];
    }
    console.log("All replies of child comments: ", childReplies);

    childComments = [...childComments, ...childReplies];
    setChildComments(childComments);
    setNumChildComments(childComments.length);
  };

  useEffect(() => {
    const loadLiked = async () => {
      const hasliked: boolean = await hasUserLiked(comment.id);
      console.log("hasliked: ", hasliked);
      setUserHasLiked(hasliked);
    };
    if (comment) {
      getAllChildComments();
      loadLiked();
    }
  }, [comment]);

  const postChildComment = async (
    textcontent: string,
    parentCommentId: number
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/cesspit/${topicId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.uid,
            topicId: topicId,
            content: textcontent,
            parentCommentId: parentCommentId,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Error posting comment");
      }
      const response = await res.json();
      const newChildComment = response.data.comment;
      setChildComments((prevChildComments) => [
        newChildComment,
        ...prevChildComments,
      ]);
      setNewChildCommentText("");
      await getAllChildComments();
      setOpenReplyTextBox(false);
    } catch (error) {
      console.log("Error posting comment: ", error);
    }
  };

  const hasUserLiked = async (commentId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/userLiked/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving has liked");
      }
      const response = await res.json();
      console.log("response hasuserliked: ", response);
      return response.data.userHasLiked;
    } catch (error) {
      console.log("Error retrieving hasliked: ", error);
    }
  };

  const likeComment = async (commentId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/like/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error liking comment");
      }
      const response = await res.json();
    } catch (error) {
      console.log("Error liking comment: ", error);
    }
  };

  const unlikeComment = async (commentId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/unlike/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error unliking comment");
      }
      const response = await res.json();
    } catch (error) {
      console.log("Error unliking comment: ", error);
    }
  };

  const handleLikeComment = async (comment: Comment, userHasLiked: boolean) => {
    if (!userHasLiked) {
      try {
        await likeComment(comment.id);
      } catch (error) {
        console.log("Error liking comment");
      }
      comment.likes++;
      setUserHasLiked(true);
    } else {
      try {
        await unlikeComment(comment.id);
      } catch (error) {
        console.log("Error unliking comment");
      }
      comment.likes--;
      setUserHasLiked(false);
    }
  };

  return (
    <div key={comment.id} className="w-[100%] mx-auto relative text-white">
      <div className="p-4 relative   rounded-xl border-b  border-[#fff]/50 overflow-visible w-[100%]">
        <div className="  flex  gap-4">
          <div className="w-[3rem] h-[3rem] rounded-full bg-gray-300 flex items-center justify-center">
            <img
              src={comment.authorprofileimage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="w-full">
            <h2 className="text-sm  font-normal">{comment.author}</h2>
            <p className="text-xs  font-light">{timeAgo(comment.createdat)}</p>
            <div className=" my-2 flex flex-col items-start gap-2 ">
              <p className={` w-[100%] text-[0.9rem] `}>
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
              <div className="w-full   flex gap-x-4">
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
                <button
                  onClick={() => toggleChildComments()}
                  className={`${
                    numChildComments === 0 ? "hidden" : "flex"
                  } relative  text-white shadow-lg   gap-2 transition ease-in-out duration-150 items-center text-sm   rounded-lg active:bg-blue-900/40`}
                >
                  {numChildComments === 1 && (
                    <>
                      <FontAwesomeIcon
                        icon={showChildComments ? faChevronUp : faChevronDown}
                      />
                      {" 1 reply"}
                    </>
                  )}
                  {numChildComments > 1 && (
                    <>
                      <FontAwesomeIcon
                        icon={showChildComments ? faChevronUp : faChevronDown}
                      />
                      {` ${numChildComments} replies`}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {openReplyTextBox && (
          <div className="relative px-6  border-t ">
            <textarea
              value={newChildCommentText}
              onChange={handleChildCommentChange}
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
                onClick={() =>
                  postChildComment(newChildCommentText, comment.id)
                }
                type="button"
                className="py-2.5 px-4 text-sm font-medium text-center text-white bg-purple-700 rounded-lg shadow-lg ease-in-out duration-300 transition hover:bg-gray-800 active:bg-gray-700"
              >
                Reply
              </button>
            </div>
          </div>
        )}
      </div>
      {showChildComments && (
        <>
          {childComments.map((childComment) => (
            <CesspitChildComment
              key={childComment.id} // Add the key prop here
              comment={childComment}
              postChildComment={postChildComment}
              rootCommentId={comment.id}
              likeComment={likeComment}
              hasUserLiked={hasUserLiked}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CesspitComment;
