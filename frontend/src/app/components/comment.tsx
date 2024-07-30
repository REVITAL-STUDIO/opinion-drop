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
  opinionId: number;
}

const Comment: React.FC<CommentProps> = ({ comment, opinionId }) => {
  const [openReplyTextBox, setOpenReplyTextBox] = useState(false);
  const [showChildComments, setShowChildComments] = useState(false);
  const [childComments, setChildComments] = useState<Comment[]>([]);
  const [numChildComments, setNumChildComments] = useState(0);
  const [newChildCommentText, setNewChildCommentText] = useState("");
  const [userHasLiked, setUserHasLiked] = useState(false);
  const { currentUser } = useAuth();
  const [textIsExpanded, setTextIsExpanded] = useState(false);
  const textMaxChar = 600;

  const handleChildCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/children/${comment.id}`,
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
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/children/${childCommentId}`,
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
      console.log("fetchChildCommentsReplies response ")
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
      const replies: Comment[] = await fetchChildCommentsReplies(childComment.id)
      childReplies = [...childReplies, ...replies];
    }
    console.log("All replies of child comments: ", childReplies)

    childComments = [...childComments, ...childReplies];
    setChildComments(childComments);
    setNumChildComments(childComments.length);
  }

  useEffect(() => {
    const loadLiked = async () => {
      const hasliked: boolean = await hasUserLiked(comment.id);
      console.log("hasliked: ", hasliked);
      setUserHasLiked(hasliked);
    }
    if (comment) {
      getAllChildComments();
      loadLiked();
    }


  }, [comment]);


  const postChildComment = async (textcontent: string, parentCommentId: number) => {

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/opinion/${opinionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.uid,
            opinionId: opinionId,
            content: textcontent,
            parentCommentId: parentCommentId,
          })
        }
      );
      if (!res.ok) {
        throw new Error("Error posting comment");
      }
      const response = await res.json();
      const newChildComment = response.data.comment
      setChildComments((prevChildComments) => [newChildComment, ...prevChildComments]);
      setNewChildCommentText("");
      await getAllChildComments();
      setOpenReplyTextBox(false)
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
          body: JSON.stringify({ userId: currentUser?.uid })
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
  }

  const likeComment = async (commentId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/like/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid })
        }
      );
      if (!res.ok) {
        throw new Error("Error liking comment");
      }
      const response = await res.json();

    } catch (error) {
      console.log("Error liking comment: ", error);
    }
  }

  const unlikeComment = async (commentId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/comments/unlike/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid })
        }
      );
      if (!res.ok) {
        throw new Error("Error unliking comment");
      }
      const response = await res.json();

    } catch (error) {
      console.log("Error unliking comment: ", error);
    }
  }

  const handleLikeComment = async (comment: Comment, userHasLiked: boolean) => {
    if (!userHasLiked) {
      try {
        await likeComment(comment.id);
      }
      catch (error) {
        console.log("Error liking comment");
      }
      comment.likes++;
      setUserHasLiked(true);
    }
    else {
      try {
        await unlikeComment(comment.id);
      }
      catch (error) {
        console.log("Error unliking comment");
      }
      comment.likes--;
      setUserHasLiked(false);
    }
  }

  return (
    <div key={comment.id} className="w-full relative ">
      <div className="min-h-[12rem] relative border-l-[3px] border-b-[3px] rounded-xl  border-[#fff]/50 overflow-visible w-[100%]">
        <div className=" -ml-[3%] flex items-center gap-4">
          <div className="w-[3rem] h-[3rem] rounded-full bg-gray-300 flex items-center justify-center">
            <img
              src={comment.authorprofileimage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm text-[#fff] font-semibold">
              {comment.author}
            </h2>
            <p className="text-xs text-[#fff] font-bold">{timeAgo(comment.createdat)}</p>
          </div>
        </div>
        <div className="ml-[3%] py-[2rem] flex flex-col items-start gap-2">
          <p
            className={` w-[100%] text-[0.9rem] text-white`}
          >
            {textIsExpanded ? comment.textcontent : truncateText(comment.textcontent, textMaxChar)}
          </p>
          {comment.textcontent.length > textMaxChar && (
            <button onClick={toggleExpandedText} className="font-semibold text-sm text-gray-400">
              {textIsExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        <div className="flex justify-between items-center  p-4 bottom-[0%] my-4 left-[2%] ">
          <div className="w-1/2 flex gap-x-8">
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
              className="  text-white flex rounded-[10px] w-[3rem] h-[2.3rem] justify-center text-sm items-center gap-x-2"
            >
              <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" /> Reply
            </button>
          </div>
        </div>
        {openReplyTextBox && (
          <div className="relative px-6 pb-[3rem] mb-[2rem]">
            <textarea
              value={newChildCommentText}
              onChange={handleChildCommentChange}
              autoFocus
              id="reply"
              rows={3}
              className="w-full  pb-2 text-md text-white bg-transparent border-b border-gray-300 focus:outline-none focus:border-b-2 focus:bg-gray-900/30  dark:placeholder-gray-400 resize-none"
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
                onClick={() => postChildComment(newChildCommentText, comment.id)}
                type="button"
                className="py-2.5 px-4 text-sm font-medium text-center text-white bg-gray-700 rounded-full hover:bg-gray-800 active:bg-gray-700"
              >
                Reply
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => toggleChildComments()}
          className="relative left-5 bottom-3 text-blue-600 shadow-lg flex justify-center items-center gap-2 transition ease-in-out duration-150 px-3 py-1 hover:bg-blue-500/40 rounded-full active:bg-blue-900/40"
        >
          {numChildComments === 1 && (
            <>
              <FontAwesomeIcon icon={showChildComments ? faChevronUp : faChevronDown} />
              {" 1 reply"}
            </>
          )}
          {numChildComments > 1 && (
            <>
              <FontAwesomeIcon icon={showChildComments ? faChevronUp : faChevronDown} />
              {` ${numChildComments} replies`}
            </>
          )}
        </button>
      </div>
      {showChildComments && (
        <>
          {childComments.map((childComment) => (
            <ChildComment
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

export default Comment;
