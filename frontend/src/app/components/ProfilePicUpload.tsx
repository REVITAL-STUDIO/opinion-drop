import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

interface FileUploadProps {
  onFileSelected: (files: FileExtended | null) => void;
  initialPicUrl: string;
}

interface FileExtended extends File {
  url?: string;
}

const ProfilePicUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  initialPicUrl,
}) => {
  const [selectedFile, setSelectedFile] = useState<FileExtended | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Only allow one file
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0] as FileExtended);
    }
  }, []);

  // Notify the parent component about the selected files
  React.useEffect(() => {
    onFileSelected(selectedFile);
  }, [onFileSelected, selectedFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1, // Restrict to only one file
  });

  return (
    <div className="relative w-full h-full">
      <div
        {...getRootProps()}
        className="relative w-full h-full border-2 border-dashed rounded-full cursor-pointer overflow-hidden flex justify-center items-center group"
      >
        <input {...getInputProps()} />

        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt={selectedFile.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={initialPicUrl} className="w-full h-full object-cover" />
        )}

        <div className="absolute inset-0 flex justify-center items-center flex-col text-white text-xs  bg-black bg-opacity-50 transition-opacity duration-300 font-light text-center">
          <FontAwesomeIcon icon={faUserPlus} className="text-2xl" />
          <br></br>
          <h1>Change Photo</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicUpload;
