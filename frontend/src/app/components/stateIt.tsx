import React, { useState } from "react";
import TextEditor from "./textEditor";
import { Editor, EditorState } from "draft-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/AuthContext";

interface StateItProps {
  opinionData: {
    id: number;
    author: string;
    title: string;
    textcontent: string;
    backgroundimage: string;
    authorprofileimage?: string;
  }; 
   topic: {
    name: string;
    id: number;
  };
  toggleStateIt: () => void;

}

const StateIt = ({opinionData, topic, toggleStateIt}: StateItProps) => {
  const [rebuttalTitle, setRebuttalTitle] = useState("");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [agreed, setAgreed] = useState({
    noPersonalAttacks: false,
    originalContent: false,
    noPlagiarism: false,
    understandingConsequences: false,
  });

  const handleChangeEssay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAgreed({ ...agreed, [name]: checked });
  };


  const [close, setClose] = useState(false);

  
  const { currentUser } = useAuth();

  const createRebuttal = async (event: React.FormEvent) => {

    event.preventDefault();

    if (Object.values(agreed).every(Boolean)) {

      const textContent = editorState.getCurrentContent().getPlainText();
      const rebuttalData = new FormData();

      if (currentUser) {
        rebuttalData.append("userId", currentUser.uid);
      }

      console.log("topic id from formdata: ", topic.id);
      rebuttalData.append("topicId", String(topic.id));
      rebuttalData.append("title", rebuttalTitle);
      rebuttalData.append("textContent", textContent);
      rebuttalData.append("parentOpinionId", String(opinionData.id));

      

      console.log("FormData contents:");
      rebuttalData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/rebuttal`,
          {
            method: "POST",
            body: rebuttalData,
          }
        );
        if (!res.ok) {
          throw new Error("Error creating opinion");
        }
        alert("Opinion submitted successfully.");
      } catch (error) {
        console.log("Error creating opinion: ", error);
      }
    } else {
      alert("Please agree to all terms before submitting.");
    }
  };

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
          Welcome to{" "}
          <span className="font-bold text-xl">&quot;State It,&quot;</span> where
          agreement finds its voice! Here, you can align with viewpoints that
          resonate with you and express your support through thoughtful essays.
          Celebrate the ideas you believe in and contribute to the dialogue with
          your unique perspective. Join us in affirming beliefs and amplifying
          voices that matter in the realm of politics!
        </p>
      </div>
      <div className="bg-white text-black mt-[2%] relative  w-1/2 rounded-lg h-2/3 shadow-lg mr-4">
        <div className="mb-4">
          <label htmlFor="rebuttalTitle" className="block mb-2 font-medium">
            Rebuttal Title:
          </label>
          <input
            type="text"
            id="rebuttalTitle"
            name="rebuttalTitle"
            value={rebuttalTitle}
            onChange={(e) => setRebuttalTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a title for your rebuttal"
          />
        </div>
        <div className="text-editor h-1/2 p-4">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Start writing your text here..."
          />
        </div>
        <div className="h-2/5 w-full absolute bottom-0">
          <form
            onSubmit={createRebuttal}
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
