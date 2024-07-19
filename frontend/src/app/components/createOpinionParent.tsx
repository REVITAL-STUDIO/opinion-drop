import React, { useState, useEffect } from "react";
import OpinionCreate from "./opinionCreate";
import EssayPrompt from "./essayPrompt";
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState,
} from "draft-js";

const ParentComponent: React.FC = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    return savedContent
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(savedContent) as RawDraftContentState)
        )
      : EditorState.createEmpty();
  });

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          title: "",
          textContent: "",
          affiliation: "",
          backgroundImage: "",
          images: null,
          videos: null,
          documents: null,
          audios: null,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  }, [editorState]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <div>
      <OpinionCreate
        editorState={editorState}
        setEditorState={setEditorState}
        formData={formData}
        setFormData={setFormData}
        toggleCreate={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <EssayPrompt
        editorState={editorState}
        setEditorState={setEditorState}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default ParentComponent;
