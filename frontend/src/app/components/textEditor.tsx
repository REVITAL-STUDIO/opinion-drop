import React, { useState, useEffect } from "react";
import { convertToRaw, convertFromRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useAuth } from "../hooks/AuthContext";

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
    parentOpinionId: number | null;
    backgroundImage: string;
    images: FileList | null;
    videos: FileList | null;
    documents: FileList | null;
    audios: FileList | null;
  };
  selectedFiles: FileExtended[];
  toggleEssay: () => void;
  onTextEditorChange: (textContent: string) => void;
  toggleConfirmation: () => void; // Add toggleConfirmation to props
}

const TextEditor: React.FC<TextEditorProps> = ({
  formData,
  selectedFiles,
  toggleEssay,
  onTextEditorChange,
  toggleConfirmation, // Add toggleConfirmation to destructuring
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

  const { currentUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const createOpinion = async (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.values(agreed).every(Boolean)) {
      const textContent = editorState.getCurrentContent().getPlainText();
      const opinionData = new FormData();

      if (currentUser) {
        opinionData.append("userId", currentUser.uid);
      }
      console.log("topic id from formdata: ", formData.topicId);
      opinionData.append("topicId", String(formData.topicId));
      opinionData.append("title", formData.title);
      opinionData.append("affiliation", formData.affiliation);
      opinionData.append("textContent", textContent);
      if (selectedFiles.length > 0) {
        opinionData.append("backgroundImage", selectedFiles[0]);
      }

      console.log("FormData contents:");
      opinionData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

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
        toggleConfirmation(); // Call your function to show the page
      } catch (error) {
        console.log("Error creating opinion: ", error);
        setError("Failed to submit opinion. Please try again.");
      }
    } else {
      alert("Please agree to all terms before submitting.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center gap-x-4">
      <h2 className="mx-auto font-bold text-5xl hidden xl:block text-white ">
        Write Your Essay
      </h2>
      <div className="bg-white text-black relative xl:w-2/3 w-[90%] xl:h-5/6 h-1/2 rounded-lg  xl:mr-4 border shadow-lg p-4 ">
        <div className=" h-full flex flex-col justify-between">
          <div className="max-h-[400px] overflow-y-auto ">
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Write your essay..."
            />
          </div>
          <form onSubmit={createOpinion} className="border-t p-4">
            <h3 className="text-sm font-bold mb-2">
              Please agree to the following:
            </h3>
            <div className="flex flex-col gap-y-1 w-full text-sm">
              <label>
                <input
                  type="checkbox"
                  name="respectfulLanguage"
                  checked={agreed.respectfulLanguage}
                  onChange={handleChangeEssay}
                />
                <span className="ml-1">Respectful Language</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="factChecking"
                  checked={agreed.factChecking}
                  onChange={handleChangeEssay}
                />
                <span className="ml-1">Fact Checked</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="noPersonalAttacks"
                  checked={agreed.noPersonalAttacks}
                  onChange={handleChangeEssay}
                />
                <span className="ml-1">No Personal Attacks</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="originalContent"
                  checked={agreed.originalContent}
                  onChange={handleChangeEssay}
                />
                <span className="ml-1">Original Content</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="noPlagiarism"
                  checked={agreed.noPlagiarism}
                  onChange={handleChangeEssay}
                />
                <span className="ml-1">No Plagiarism</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="understandingConsequences"
                  checked={agreed.understandingConsequences}
                  onChange={handleChangeEssay}
                />
                <span className="ml-1">Understanding Consequences</span>
              </label>
            </div>
            {error && (
              <div className="mt-4 p-2 bg-red-200 text-red-800 border border-red-400 rounded">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="relative inline-flex mt-4 w-[100%] shadow-xl items-center justify-center py-6  overflow-hidden font-medium text-white bg-gradient-to-tl from-purple-300 to-blue-500  transition duration-300 ease-out rounded-full group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-tl to-purple-300 from-red-500 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
                Submit
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
