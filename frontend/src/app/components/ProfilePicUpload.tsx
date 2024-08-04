import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
    onFileSelected: (files: FileExtended | null) => void;
    initialFile?: File;
}

interface FileExtended extends File {
    url?: string;
}

const ProfilePicUpload: React.FC<FileUploadProps> = ({ onFileSelected, initialFile }) => {
    const [selectedFile, setSelectedFile] = useState<FileExtended | null>(initialFile || null);

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
                ) :
                
                (
                    <img
                        src={"https://opiniondrop-storage.s3.us-east-2.amazonaws.com/images/opinion-backgrounds/1722524537729_trumpvsharris.jpg"}
                        alt={"profilepic"}
                        className="w-full h-full object-cover"
                    />
                )
                }

                <div className="absolute inset-0 flex justify-center items-center text-white text-base font-semibold bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-center">
                    Change Profile Pic
                </div>
            </div>
        </div>
    );
};

export default ProfilePicUpload;
