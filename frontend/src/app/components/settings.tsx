import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/AuthContext";

interface FileUploadProps {
  onFilesSelected: (files: FileExtended[]) => void;
  initialFiles?: File[];
}

interface FileExtended extends File {
  url?: string;
}

interface User {
  userId: string;
  username: string;
  email: string;
  profilePicture: string;
  politicalAlignment: string;
}


const Settings = ({
}) => {
  // const [selectedFiles, setSelectedFiles] =
  //   useState<FileExtended[]>(initialFiles);

  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   if (acceptedFiles.length > 0) {
  //     setSelectedFiles([acceptedFiles[0] as FileExtended]);
  //   }
  // }, []);

  // const removeFile = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   setSelectedFiles([]);
  // };

  // useEffect(() => {
  //   if (typeof onFilesSelected === "function") {
  //     onFilesSelected(selectedFiles);
  //   }
  // }, [onFilesSelected, selectedFiles]);

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: {
  //     "image/jpeg": [],
  //     "image/png": [],
  //     "image/jpg": [],
  //   },
  //   maxFiles: 1,
  // });

  const [close, setClose] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<User | null>(
    null
  );
  const { currentUser, loading, logout } = useAuth();
  
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setClose(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/users/${currentUser?.uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving user info");
      }
      const response = await res.json();
      console.log("resp user data: ", response.data.userData);
      setUserData(response.data.userData);
    } catch (error) {
      console.log("Error Fetching user info: ", error);
    }
  };
  
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      {!close && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute h-screen w-full bg-white/90  flex justify-center items-center"
        >
          <div
            ref={modalRef}
            className="p-4 bg-[#000]/50 xl:w-[30%] md:w-[50%] w-[75%] rounded relative shadow-sm"
          >
            <h1 className=" text-3xl font-medium text-white  my-4">
              Account Settings
            </h1>
            <div className="flex gap-x-2">
              {/* <div
                {...getRootProps()}
                className="w-[3rem] h-[3rem] relative rounded-full cursor-pointer overflow-hidden bg-white text-black flex justify-center items-center group"
              >
                +
                <input {...getInputProps()} />
                {selectedFiles.length > 0 && (
                  <>
                    <Image
                      src={URL.createObjectURL(selectedFiles[0])}
                      alt={selectedFiles[0].name}
                      fill
                      className="w-[100%] h-[100%] object-cover hover:shadow-2xl absolute"
                    />
                    <button
                      onClick={removeFile}
                      className="absolute -top-[4%] -left-[2%] hover:cursor-pointer opacity-0 transition-opacity duration-800 group-hover:opacity-100"
                    >
                      X
                    </button>
                  </>
                )}
              </div> */}
              <h4 className=" rounded-full text-white w-fit flex justify-center  text-sm items-center">
                Change Profile Picture
              </h4>
            </div>
            <form className="space-y-2 w-[100%] my-4 mx-auto">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Username
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-transparent border border-white/30 rounded-md text-white placeholder:text-sm  focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-transparent border border-white/30 rounded-md text-white placeholder:text-sm  focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-transparent border border-white/30 rounded-md text-white placeholder:text-sm  focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-bl hover:scale-95 to-red-300 from-blue-500 border rounded-full hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium   ease-in-out transition duration-150 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Save Changes
              </button>
            </form>
            <button
              type="submit"
              className="  hover:scale-110 left-14 hover:bg-red-600  mx-auto text-white bg-primary-600 border border-red-500 rounded-full hover:bg-primary-700  focus:outline-none focus:ring-primary-300 font-medium  hover:text-black ease-in-out transition duration-150 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Delete Account
            </button>{" "}
          </div>
        </motion.section>
      )}
    </>
  );
};

export default Settings;
