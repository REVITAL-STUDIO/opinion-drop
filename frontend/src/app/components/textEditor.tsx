import React, { useState } from "react";
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

interface FileExtended extends File {
  url?: string;
}

interface TextEditorProps {
  formData: {
    title: string;
    textContent: string;
    affiliation: string;
    backgroundImage: string;
    images: FileList | null;
    videos: FileList | null;
    documents: FileList | null;
    audios: FileList | null;
  };
  selectedFiles: FileExtended[];
  toggleEssay: () => void;
  onTextEditorChange: (textContent: string) => void;

}

const TextEditor: React.FC<TextEditorProps> = ({ formData, selectedFiles, toggleEssay, onTextEditorChange }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [agreed, setAgreed] = useState({
    respectfulLanguage: false,
    factChecking: false,
    noPersonalAttacks: false,
    originalContent: false,
    noPlagiarism: false,
    understandingConsequences: false,
  });

  const handleChangeEssay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
  console.log(agreed);
    setAgreed({ ...agreed, [name]: checked });
  };

  const createOpinion = async (event: React.FormEvent) => {
    event.preventDefault();
  console.log(agreed);
    if (Object.values(agreed).every(Boolean)) {
      const textContent = editorState.getCurrentContent().getPlainText();
      const opinionData = new FormData();
      opinionData.append("userId", "0");
      opinionData.append("topicId", "0");
      opinionData.append("title", formData.title);
      opinionData.append("affiliation", formData.affiliation);
      opinionData.append("textContent", textContent);
  
      if (selectedFiles.length > 0) {
        opinionData.append("backgroundImage", selectedFiles[0]);
      }
  
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions`,
          {
            method: "POST",
            body: opinionData, // FormData does not require Content-Type header
          }
        );
        if (!res.ok) {
          throw new Error("Error creating opinion");
        }
        alert("Opinion submitted successfully.");
        toggleEssay(); // Close the essay prompt
      } catch (error) {
        console.log("Error creating opinion: ", error);
      }
    } else {
      alert("Please agree to all terms before submitting.");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-x-4">
      <h2 className="my-4 font-bold text-7xl w-1/4">Write Your Essay</h2>
      <div className="bg-white text-black relative w-full rounded-lg h-5/6 shadow-lg">
        <div className="text-editor h-1/2 p-4">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Start writing your text here..."
          />
        </div>
        <div className="h-2/5 w-full absolute bottom-0">
          <form
            onSubmit={createOpinion}
            className="shadow-md rounded-lg p-6 h-full text-sm"
          >
            <h2 className="text-base font-medium mb-4">
              Please agree to the following terms before submitting your opinion:
            </h2>

            <div className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="respectfulLanguage"
                  checked={agreed.respectfulLanguage}
                  onChange={handleChangeEssay}
                  className="mr-2"
                />
                I agree to use respectful language in my post.
              </label>
            </div>
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
                I agree not to include personal attacks or hate speech in my post.
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
                I understand that violating these terms may result in the removal of my post or account suspension.
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