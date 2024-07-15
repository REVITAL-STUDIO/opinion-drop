// TextEditor.tsx

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const TextEditor: React.FC = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  const [agreed, setAgreed] = useState({
    respectfulLanguage: false,
    factChecking: false,
    noPersonalAttacks: false,
    originalContent: false,
    constructiveDiscussion: false,
    noPlagiarism: false,
    communityGuidelines: false,
    understandingConsequences: false,
    respectPrivacy: false,
    legalResponsibility: false,
  });

  const handleChangeEssay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAgreed({ ...agreed, [name]: checked });
  };

  const handleEssay = (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(agreed).every(Boolean)) {
      alert(
        "Thank you for agreeing to the terms. You can now submit your opinion."
      );
      // Perform the submission action (e.g., navigate to the essay submission page or show the essay form)
    } else {
      alert("Please agree to all terms before submitting.");
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center gap-x-4">
      <h2 className="my-4 font-bold text-7xl w-1/4">Write Your Essay</h2>
      <div className="bg-white text-black relative  w-full rounded-lg h-5/6 shadow-lg">
        <ReactQuill
          value={editorContent}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder="Start writing your text here..."
          className="text-editor h-1/2"
        />
        <div className="h-2/5 w-full  absolute bottom-0">
          <form
            onSubmit={handleEssay}
            className=" shadow-md rounded-lg p-6 h-full text-sm"
          >
            <h2 className="text-base font-medium mb-4">
              Please agree to the following terms before submitting your
              opinion:
            </h2>

            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="factChecking"
                  checked={agreed.factChecking}
                  onChange={handleChangeEssay}
                  className="mr-2"
                />
                I agree that my post is based on facts and accurate information.
              </label>
            </div>
            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="noPersonalAttacks"
                  checked={agreed.noPersonalAttacks}
                  onChange={handleChangeEssay}
                  className="mr-2"
                />
                I agree not to include personal attacks or hate speech in my
                post.
              </label>
            </div>
            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="originalContent"
                  checked={agreed.originalContent}
                  onChange={handleChangeEssay}
                  className="mr-2"
                />
                I agree that the content I am posting is my own original work.
              </label>
            </div>

            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="noPlagiarism"
                  checked={agreed.noPlagiarism}
                  onChange={handleChangeEssay}
                  className="mr-2"
                />
                I agree not to plagiarize content from other sources.
              </label>
            </div>

            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="understandingConsequences"
                  checked={agreed.understandingConsequences}
                  onChange={handleChangeEssay}
                  className="mr-2"
                />
                I understand that violating these terms may result in the
                removal of my post or account suspension.
              </label>
            </div>

            <button
              type="submit"
              className="px-4 py-2 mt-[5%] bg-gradient-to-bl from-red-500 to-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out hover:scale-95 duration-300"
            >
              Drop Essay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
