import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface fileUploadProps {
  onFilesSelected: (files: FileExtended[]) => void;
  initialFiles?: File[];
}

interface FileExtended extends File {
  url?: string;
}

const FileUpload: React.FC<fileUploadProps> = ({
  onFilesSelected,
  initialFiles,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>(
    initialFiles || []
  );
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (fileName: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  // Notify the parent component about the selected files
  React.useEffect(() => {
    onFilesSelected(selectedFiles);
  }, [onFilesSelected, selectedFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });

  return (
    <div className="w-full h-full">
      <div
        {...getRootProps()}
        className="h-full border-2 border-dashed rounded cursor-pointer flex flex-col items-center justify-center gap-2 relative"
      >
        <input {...getInputProps()} />

        <button className="w-32 h-32 flex justify-center items-center rounded-full border-2 text-5xl  border-white border-dashed shadow-lg text-white">
          +
        </button>
        {selectedFiles.map((file) => (
          <div
            key={file.name}
            className=" absolute  w-[100%] h-[100%] group transition-transform duration-300 hover:scale-105"
          >
            {" "}
            {/* Use key for optimization */}
            <img
              src={URL.createObjectURL(file)} // Use createObjectURL to generate a preview URL
              alt={file.name}
              className="w-[100%] h-[100%] object-cover hover:shadow-2xl absolute " // Set image width to full and auto height
            />
            <button
              onClick={() => removeFile(file.name)}
              className="absolute -top-[4%] -left-[2%]  hover:cursor-pointer opacity-0 transition-opacity duration-800 group-hover:opacity-100 "
            >
              {/* Close button */}
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:brightness-75 active:brightness-100"
              >
                <circle cx="13.5" cy="14.5" r="12.5" fill="#FF7979" />
                <path
                  d="M11.375 11.375L17.625 17.625M17.625 11.375L11.375 17.625M27 14.5C27 16.1415 26.6767 17.767 26.0485 19.2835C25.4203 20.8001 24.4996 22.1781 23.3388 23.3388C22.1781 24.4996 20.8001 25.4203 19.2835 26.0485C17.767 26.6767 16.1415 27 14.5 27C12.8585 27 11.233 26.6767 9.71646 26.0485C8.19989 25.4203 6.8219 24.4996 5.66116 23.3388C4.50043 22.1781 3.57969 20.8001 2.95151 19.2835C2.32332 17.767 2 16.1415 2 14.5C2 11.1848 3.31696 8.00537 5.66116 5.66117C8.00537 3.31696 11.1848 2 14.5 2C17.8152 2 20.9946 3.31696 23.3388 5.66117C25.683 8.00537 27 11.1848 27 14.5Z"
                  stroke="#B80000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
