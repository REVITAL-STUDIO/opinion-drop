import { faCommentDots, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SubComments = () => {
  const [readMore, setReadMore] = useState(false);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false); // State to track if the current user has liked the post

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

  return (
    <section className=" min-h-[14rem] border-l-[2px] my-4 rounded-xl border-b-[2px] relative left-16 border-[#fff]/50 overflow-visible w-[75%]">
      <div className=" -ml-[3%]  flex items-center gap-4">
        <div className="w-[3rem] h-[3rem] rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src="/Images/free-photo-of-person-sitting-with-legs-crossed-on-top-of-mountain.jpeg"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-[0.8rem] text-[#fff] font-semibold">@johnnyBoyDoe</h2>
          <p className="text-sm text-[#fff] font-bold">14 hr ago</p>
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
          className=" ml-[3%] w-[100%] text-[0.9rem] text-white"
        >
          <span className="font-bold">@sarahSmilez0v0</span> Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
        <button
          onClick={() => toggleReadMore()}
          className="text-white p-4 absolute  text-sm bottom-4 right-0 "
        >
          {readMore ? "Read Less" : "Read More"}
        </button>
      </div>
      <div className="flex gap-x-8 p-4 bottom-[0%] my-4 left-[2%] ">
        <button
          onClick={() => clickLikes()}
          className={`text-white flex gap-x-2 rounded-[10px] w-[3rem] text-sm h-[2.3rem] justify-center items-center`}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`w-5 h-5 ${
              likes ? "text-white" : "group-hover:text-white"
            } `}
          />
          <p>{likes}</p>
        </button>
        <button className="  text-white flex rounded-[10px] w-[3rem] h-[2.3rem] text-sm justify-center items-center gap-x-2">
          <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" /> Reply
        </button>
      </div>
    </section>
  );
};

export default SubComments;
