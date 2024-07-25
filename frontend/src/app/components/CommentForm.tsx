"use client";

import React, { useState } from "react";
import Action from "./Action";

interface Comment {
  id: number;
  name: string;
  items: Comment[];
}

interface CommentFormProps {
  commentForm: Comment;
}

const CommentForm: React.FC<CommentFormProps> = ({ commentForm }) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    console.log("Comment added:", input);
    setInput("");
  };

  if (!commentForm) {
    return null;
  }

  return (
    <section>
      <div
        className={commentForm.id === 1 ? "inputContainer" : "commentContainer"}
      >
        {commentForm.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />
            <Action
              className="reply comment"
              type="COMMENT"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <span style={{ wordWrap: "break-word" }}>{commentForm.name}</span>

            <div className="flex mt-[5px]">
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={() => {}}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type="REPLY"
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="reply"
                    type="DELETE"
                    handleClick={() => {}}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className={`${expand ? "block" : "n"}  pl-[25%] `}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <Action className="reply" type="REPLY" />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
              }}
            />
          </div>
        )}
        {commentForm?.items?.map((cmnt) => {
          return <CommentForm key={cmnt.id} commentForm={cmnt} />;
        })}
      </div>
    </section>
  );
};

export default CommentForm;
