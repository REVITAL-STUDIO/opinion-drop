import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching, faCommentDots } from "@fortawesome/free-solid-svg-icons";

interface InteractionModalProps {
  highlightedText: string;
  onClose: () => void;
  onAddEmoji: (emoji: string) => void;
  onAddComment: (comment: string) => void;
}

const InteractionModal: React.FC<InteractionModalProps> = ({
  highlightedText,
  onClose,
  onAddEmoji,
  onAddComment,
}) => {
  const [interactionType, setInteractionType] = useState<
    "emoji" | "comment" | null
  >(null);
  const [emoji, setEmoji] = useState("");
  const [comment, setComment] = useState("");

  const handleEmojiSelect = (emojiObject: any) => {
    onAddEmoji(emojiObject.native);
    setInteractionType(null); // Reset interaction type after submission
    onClose(); // Close modal after submission
  };

  const handleAddComment = () => {
    onAddComment(comment);
    setInteractionType(null); // Reset interaction type after submission
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-90">
      <div className="relative bg-[#2b2b2b] w-1/3 text-white p-8 rounded-lg">
        <button className="absolute top-0 left-0 m-2 p-2" onClick={onClose}>
          <IoClose className=" text-lg text-white" />
        </button>
        <h2 className="text-2xl font-bold my-4">Send a Reaction</h2>
        <p className="mb-4 max-w-[40rem] text-sm ">&quot;{highlightedText}&quot;</p>
        {!interactionType ? (
          <div className="flex flex-col gap-y-4 justify-between">
            <button
              className="py-2 px-4 border bg-[#ececec] text-black rounded-md text-base flex justify-center items-center gap-x-4 text-center "
              onClick={() => setInteractionType("emoji")}
            >
              Add Emojis
              <FontAwesomeIcon icon={faChildReaching} className=" text-xl" />
            </button>
            <button
              className="py-2 px-4 border bg-[#ececec] text-black rounded-md text-base flex justify-center items-center gap-x-4 text-center "
              onClick={() => setInteractionType("comment")}
            >
              Add Comment
              <FontAwesomeIcon icon={faCommentDots} />
            </button>
          </div>
        ) : interactionType === "emoji" ? (
          <div className="">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            <div className="flex justify-between mt-4">
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setInteractionType(null)}
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter comment"
              className="border p-2 mb-4 w-full rounded-md text-black"
            />
            <div className="flex justify-between">
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setInteractionType(null)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 border text-white rounded-md hover:bg-[#ececec] hover:text-black"
                onClick={handleAddComment}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionModal;
