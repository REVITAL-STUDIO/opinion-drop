"use client";
import {
  faCommentDots,
  faHeart,
  faHeart as faS,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { use, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import SubComments from "./subComments";

interface CommentProps {
  comment?: {
    id: number;
    text: string;
    author: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [readMore, setReadMore] = useState(false);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false); // State to track if the current user has liked the post
  const [openReplies, setOpenReplies] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const clickLikes = () => {
    if (!liked) {
      setLikes((prevLikes) => prevLikes + 1); // Increment likes if user hasn't liked before
      setLiked(true); // Set liked to true to indicate user has liked the post
    } else {
      setLikes((prevLikes) => prevLikes - 1); // Decrement likes if user has already liked
      setLiked(false); // Set liked to false to indicate user has unliked the post
    }
  };

  const paragraphStyles = {
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const toggleOpenReplies = () => {
    setOpenReplies(!openReplies);
  };

  const toggleComments = () => {
    setOpenComments(!openComments);
  };

  return (
    <section className="w-full relative ">
      <div className="min-h-[14rem] relative border-l-[3px] border-b-[3px] rounded-xl  border-[#fff]/50 overflow-visible w-[90%]">
        <div className=" -ml-[3%] flex items-center gap-4">
          <div className="w-[3rem] h-[3rem] rounded-full bg-gray-300 flex items-center justify-center">
            <img
              src="/Images/pexels-photo-22702202.webp"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-[0.8rem] text-[#fff] font-semibold">
              @sarahSmilez0v0
            </h2>
            <p className="text-sm text-[#fff] font-bold">3 Days ago</p>
          </div>
        </div>
        <div className="flex">
          <p
            style={
              readMore
                ? undefined
                : {
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    display: "-webkit-box",
                  }
            }
            className=" ml-[3%]  w-[100%] text-[0.9rem] text-white"
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
        </div>

        <div className="flex justify-between items-center  p-4 bottom-[0%] my-4 left-[2%] ">
          <div className="w-1/2 flex gap-x-8">
            <button
              onClick={() => clickLikes()}
              className={`text-white flex gap-x-2 rounded-[10px] w-[3rem] text-sm h-[2.3rem] justify-center items-center`}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={`w-5 h-5 ${likes ? "text-red-500" : "text-white"} `}
              />
              <p>{likes}</p>
            </button>
            <button
              onClick={() => toggleOpenReplies()}
              className="  text-white flex rounded-[10px] w-[3rem] h-[2.3rem] justify-center text-sm items-center gap-x-2"
            >
              <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" /> Reply
            </button>
          </div>
          <button
            onClick={() => toggleReadMore()}
            className="text-white p-4  bottom-4 right-0 text-sm"
          >
            {readMore ? "Read Less" : "Read More"}
          </button>
        </div>
        <button
          onClick={() => toggleComments()}
          className="absolute -left-3 bg-white shadow-lg flex justify-center text-black  bottom-1/2 items-center w-6 h-6 rounded-full transition ease-in-out duration-150"
        >
          {openComments ? "-" : "+"}
        </button>
        {openReplies && (
          <section className="my-4">
            <form className="p-4">
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows={2}
                    className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                  >
                    Post comment
                  </button>
                  <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                    <button
                      type="button"
                      className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                        />
                      </svg>
                      <span className="sr-only">Attach file</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      <span className="sr-only">Set location</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                      <span className="sr-only">Upload image</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        )}
      </div>
      {openComments && (
        <>
          <SubComments />
        </>
      )}
    </section>
  );
};

export default Comment;
