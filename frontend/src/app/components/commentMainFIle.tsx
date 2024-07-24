"use client"
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
      name: "hello",
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
    <div className="App">
      <CommentForm commentForm={commentsData} />
    </div>
  );
};

export default CommentMainFile;
