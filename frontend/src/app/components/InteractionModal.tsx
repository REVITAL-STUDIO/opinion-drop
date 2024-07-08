import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import  Picker  from "@emoji-mart/react";
import data from '@emoji-mart/data';

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
  const [interactionType, setInteractionType] = useState<"emoji" | "comment" | null>(null);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg">
        <button className="absolute top-0 right-0 m-2 p-2" onClick={onClose}>
          <IoClose className="text-gray-500" />
        </button>
        <h2 className="text-xl font-bold mb-4">Interact with Highlighted Text</h2>
        <p className="mb-4">{highlightedText}</p>
        {!interactionType ? (
          <div className="flex justify-end">
            <button
              className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => setInteractionType("emoji")}
            >
              Add Emoji
            </button>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={() => setInteractionType("comment")}
            >
              Add Comment
            </button>
          </div>
        ) : interactionType === "emoji" ? (
          <div>
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
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setInteractionType(null)}
              >
                Back
              </button>
              <button
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={handleAddComment}
              >
                Submit Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionModal;