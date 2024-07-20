import React, { useState, useEffect } from "react";
import { convertToRaw, convertFromRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

interface FileExtended extends File {
  url?: string;
}

interface TextEditorProps {
  formData: {
    title: string;
    textContent: string;
    affiliation: string;
    userId: number | null;
    topicId: number | null;
    parentOpinionId: number | null,
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

const TextEditor: React.FC<TextEditorProps> = ({
  formData,
  selectedFiles,
  toggleEssay,
  onTextEditorChange,
}) => {

  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      try {
        const rawContent = JSON.parse(savedContent);
        return EditorState.createWithContent(convertFromRaw(rawContent));
      } catch (error) {
        console.error("Failed to parse saved editor content:", error);
      }
    }
    return EditorState.createEmpty();
  });

  const [agreed, setAgreed] = useState({
    respectfulLanguage: false,
    factChecking: false,
    noPersonalAttacks: false,
    originalContent: false,
    noPlagiarism: false,
    understandingConsequences: false,
  });

  // Save editor content to localStorage on changes
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
    onTextEditorChange(contentState.getPlainText());
  }, [editorState]);


  // Load saved state from localStorage when the component mounts
  useEffect(() => {
    const savedAgreed = JSON.parse(localStorage.getItem("agreed") || "{}");
    setAgreed(savedAgreed);

    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      );
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("agreed", JSON.stringify(agreed));
  }, [agreed]);

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
    onTextEditorChange(contentState.getPlainText());
  }, [editorState]);

  // Save data on beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      localStorage.setItem("editorContent", JSON.stringify(rawContent));
      localStorage.setItem("agreed", JSON.stringify(agreed));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [editorState, agreed]);

  const handleChangeEssay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAgreed({ ...agreed, [name]: checked });
  };

  const createOpinion = async (event: React.FormEvent) => {
    event.preventDefault();
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
            body: opinionData, 
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
    <div className="w-full h-full flex flex-col justify-center items-center gap-x-4">
      <h2 className="my-4 font-bold text-5xl w-1/2 hidden">Write Your Essay</h2>
      <div className="bg-white text-black relative xl:w-3/4 w-[100%] rounded-lg h-5/6 shadow-lg">
        <div className="text-editor  h-1/2  p-4">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Start writing your text here..."
          />
        </div>
        <div className=" h-1/2  border-t  w-full  bottom-0">
          <form
            onSubmit={createOpinion}
            className="shadow-md rounded-lg p-6 h-full xl:text-sm text-xs"
          >
            <h2 className="text-sm font-medium mb-4">
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
              className="px-4 py-2 mt-[2%] bg-gradient-to-bl from-red-500 to-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out hover:scale-95 duration-300"
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
