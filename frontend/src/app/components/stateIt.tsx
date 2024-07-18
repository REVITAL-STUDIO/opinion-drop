import React, { useState } from "react";
import TextEditor from "./textEditor";
import { Editor, EditorState } from "draft-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const StateIt = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

  const [close, setClose] = useState(false);

  if (close) {
    return null; // Don't render anything if close is true
  }

  return (
    <section className="w-full h-full top-0 left-0 gap-x-4 flex justify-center items-center absolute bg-gradient-to-tr from-purple-500/100 to-blue-500/95 z-40">
      <button
        onClick={() => setClose(true)}
        className="absolute left-8 top-8 flex items-center text-white gap-x-4"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=" text-xl" />
        <span className="text-xl ">Exit</span>
      </button>
      <div className="w-1/2 mx-auto mt-[2%] p-4">
        {" "}
        <h2 className="text-6xl font-bold text-blue-200">State It</h2>
        <p className="mt-4 text-base text-white">
          Welcome to <span className="font-bold text-xl">"State It,"</span> where agreement finds its voice! Here, you can
          align with viewpoints that resonate with you and express your support
          through thoughtful essays. Celebrate the ideas you believe in and
          contribute to the dialogue with your unique perspective. Join us in
          affirming beliefs and amplifying voices that matter in the realm of
          politics!
        </p>
      </div>
      <div className="bg-white text-black mt-[2%] relative  w-1/2 rounded-lg h-2/3 shadow-lg mr-4">
        <div className="text-editor h-1/2 p-4">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Start writing your text here..."
          />
        </div>
        <div className="h-2/5 w-full absolute bottom-0">
          <form
            onSubmit={handleEssay}
            className="shadow-md rounded-lg p-6 h-full text-sm"
          >
            <h2 className="text-base font-medium mb-4">
              Please agree to the following terms before submitting your
              opinion:
            </h2>

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
              className="px-4 py-2 ] bg-gradient-to-bl from-red-500 to-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out hover:scale-95 duration-300"
            >
              Drop Rebuttal
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default StateIt;
