import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/AuthContext";
import ProfilePicUpload from "./ProfilePicUpload";


interface FileExtended extends File {
  url?: string;
}

interface User {
  userId: string;
  username: string;
  email: string;
  profilePicture: string;
  politicalAlignment: string;
  bio: string;
  [key: string]: any;

}

interface SettingsProps {
  closeSettings: () => void;
}

const Settings: React.FC<SettingsProps> = ({ closeSettings }) => {

  const [close, setClose] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<User>({ userId: "", username: "", email: "", profilePicture: "", politicalAlignment: "", bio: "" });
  const [userDataEdit, setUserDataEdit] = useState<User>({ userId: "", username: "", email: "", profilePicture: "", politicalAlignment: "", bio: "" });

  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [noChangeError, setNoChangeError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileExtended>();

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

  const handleFilesSelected = (file: FileExtended | null) => {
    if (file) {
      setSelectedFile(file)
      console.log("uploaded file: ", file);
    };
  }

  const handleCloseSettings = () => {
    closeSettings();
    setUserDataEdit(userData);
    setNewPassword("");
    setNewPasswordConfirm("");
    setNoChangeError(false);
    setPasswordError(false);
  };

  const urlToFile = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = url.substring(url.lastIndexOf("/") + 1);
    const file: FileExtended = new File([blob], filename, { type: blob.type });
    file.url = url;
    return file;
  };

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
      setUserDataEdit(response.data.userData);


    } catch (error) {
      console.log("Error Fetching user info: ", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);


  const saveUserData: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setNoChangeError(false);
    setPasswordError(false);
    if (newPassword == "" && userDataEdit == userData || !selectedFile) {
      setNoChangeError(true);
      throw new Error("No values changed");
    }
    if (newPassword != newPasswordConfirm) {
      setPasswordError(true);
      throw new Error("Passwords do not match");
    }

    const formData = new FormData();
    Object.keys(userDataEdit).forEach(key => {
      formData.append(key, userDataEdit[key]);
    });

    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    }

    try {

      if (userDataEdit.email !== userData.email) {
        await updateUserEmail(userDataEdit.email);
      }

      if (newPassword) {
        await updateUserPassword(newPassword);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/users/${currentUser?.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(
          `Error Saving user information. Status: ${response.status}`
        );
      }
      const newUserData = await response.json();
      console.log("NEW USER DATA: ", newUserData);
      setUserData(newUserData);
      // setOpenMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!close && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute h-screen w-full bg-white/90  flex justify-center items-center"
        >
          <div className="p-4 bg-[#000]/50 xl:w-[30%] md:w-[50%] w-[75%] rounded relative shadow-sm">
            <h1 className=" text-3xl font-medium text-white  my-4">
              Account Settings
            </h1>
            {noChangeError && (
              <div className="text-red-400">No fields changed</div>
            )}
            {passwordError && (
              <div className="text-red-400">Passwords do not match</div>
            )}
            {/* Profile picture */}
            <div className="flex justify-center py-6">
              <div
                className="w-[8rem] h-[8rem] relative rounded-full cursor-pointer overflow-hidden text-black flex justify-center items-center group"
              >
                <ProfilePicUpload onFileSelected={handleFilesSelected} initialPicUrl={userData.profilePicture} />
              </div>
            </div>
            <form className="space-y-2 w-[100%] my-4 mx-auto">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userDataEdit?.username}
                  onChange={(e) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      username: e.target.value,
                    })
                  }
                  className="bg-transparent border border-white/30 rounded-md text-white placeholder:text-sm  focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userDataEdit?.email}
                  onChange={(e) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      email: e.target.value,
                    })
                  }
                  className="bg-transparent border border-white/30 rounded-md text-white placeholder:text-sm  focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="politicalalignment"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Political Alignment
                </label>
                <input
                  type="text"
                  name="politicalalignment"
                  value={userDataEdit?.politicalAlignment}
                  onChange={(e) =>
                    setUserDataEdit({
                      ...userDataEdit,
                      politicalAlignment: e.target.value,
                    })
                  }
                  className="bg-transparent border border-white/30 rounded-md text-white placeholder:text-sm  focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white dark:text-white">Password Change</label>
                <input
                  className={`bg-transparent border border-white/30 rounded-md text-white placeholder:text-sm  focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none ${passwordError ? "border-2 border-red-400" : ""
                    }`}
                  type="password"
                  id="Password"
                  name="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
              </div>
              <div>
                <input
                  className={`bg-transparent border border-white/30 rounded-md text-white placeholder:text-sm  focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none${passwordError ? "border-2 border-red-400" : ""
                    }`}
                  type="password"
                  id="Confirm-Password"
                  name="Confirm Password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  placeholder="Confirm New Password"
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
              onClick={handleCloseSettings}
              className="  hover:scale-110 left-14 hover:bg-red-400/50  mx-auto text-white bg-primary-600 border border-red-500 rounded-full hover:bg-primary-700  focus:outline-none focus:ring-primary-300 font-medium  hover:text-black ease-in-out transition duration-150 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Cancel
            </button>{" "}
          </div>
        </motion.section>
      )}
    </>
  );
};
export default Settings;
