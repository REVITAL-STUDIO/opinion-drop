"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";

interface Comment {
  id: number;
  name: string;
  items: Comment[];
}

const comments: {
  id: number;
  items: Comment[];
  name: string; // Ensure 'name' is always a string
} = {
  id: 1,
  items: [
    {
      id: 1677252427307,
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      items: [
        {
          id: 1677252434572,
          name: "hello world",
          items: [
            {
              id: 1677252559713,
              name: "hello world 123",
              items: [],
            },
          ],
        },
      ],
    },
    {
      id: 1677252457839,
      name: "react js",
      items: [
        {
          id: 1677252468098,
          name: "javascript",
          items: [],
        },
      ],
    },
  ],
  name: "Comments", // Provide a default or meaningful name
};

const CommentMainFile = () => {
  const [commentsData, setCommentData] = useState(comments);

  return (
    <div className="App bg-black text-white">
      <CommentForm commentForm={commentsData} />
    </div>
  );
};

export default CommentMainFile;
