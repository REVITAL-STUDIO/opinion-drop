import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PhotoDrop from "../public/photo-drop.svg";
import Delete from "../../../public/images/delete.svg";
import Image from "next/image";

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
                className="h-full border-2 border-dashed rounded cursor-pointer flex flex-col items-center justify-center gap-2"
            >
                <input {...getInputProps()} />
        {/* <Image src={PhotoDrop} alt="photo-drop" className="w-20 h-20 " />
        <p className="text-center text-sm text-white">
          Drag and drop your images here
        </p>
        <p className="text-white">or</p>
        <button className="bg-[#B3B3B3] p-4 rounded-lg text-xs hover:opacity-50 active:opacity-100">
          Browse Files
        </button> */}
                <button className="w-32 h-32 flex justify-center items-center rounded-full border-2 text-5xl  border-white border-dashed shadow-lg text-white">
                    +
                </button>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-2 py-4 max-h-[8.5rem] overflow-y-auto px-2">
                    {" "}
                    {/* Grid container with 3 columns and gap */}
                    {selectedFiles.map((file) => (
                        <div
                            key={file.name}
                            className="relative  w-[90%] h-[6rem] group transition-transform duration-300 hover:scale-110"
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
                                className="absolute -top-[12%] -right-[12%]  hover:cursor-pointer opacity-0 transition-opacity duration-800 group-hover:opacity-100 "
                            >
                                <Image
                                    src={Delete}
                                    alt="delete"
                                    className="hover:brightness-75 active:brightness-100"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
