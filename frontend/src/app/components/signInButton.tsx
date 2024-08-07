"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/AuthContext";
import SignIn from "./CredentialsSignIn";
import UserPortal from "./userPortal";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const SignInButton: React.FC = () => {
  const [openSignUp, setSignUp] = useState(false);
  const { currentUser, loading, logout } = useAuth();
  const [openUserPortal, setOpenUserPortal] = useState(false);
  const [openNotification, setOpenNotifications] = useState(false);
  const [firstTimeOpen, setFirstTimeOpen] = useState(true);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [close, setClose] = useState(true);

  const handleOpenModal = () => {
    setClose(false); // Reset the close state
  };

  const toggleOpenSignUpForm = () => {
    setSignUp(!openSignUp);
  };

  const toggleOpenUserPortal = () => {
    setOpenUserPortal(!openUserPortal);
  };

  useEffect(() => {
    // Handle logic when currentUser changes
    if (currentUser) {
      setOpenUserPortal(false); // Reset UserPortal visibility when user changes
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      setOpenUserPortal(false); // Close UserPortal on logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // const toggleNotification = () => {
  //   setOpenNotifications((prev) => !prev);
  //   if (firstTimeOpen) {
  //     setFirstTimeOpen(false);
  //   }
  // };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenNotifications(false);
    }
  };

  // useEffect(() => {
  //   if (openNotification) {
  //     document.addEventListener("click", handleClickOutside);
  //   } else {
  //     document.removeEventListener("click", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [openNotification]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="px-2 flex justify-center items-center"
      >
        {currentUser ? (
          <>
            <div className="flex items-center mr-4">
              <button
                onClick={toggleOpenUserPortal}
                className="w-full flex justify-center mr-2 items-center gap-x-2 hover:scale-95 text-white ease-in-out transition duration-300 rounded-full relative"
              >
                <div className="xl:w-[3rem] xl:h-[3rem] w-[1.5rem] h-[1.5rem] rounded-full bg-gradient-to-tl from-red-400 via-white to-blue-500"></div>
                <span className="font-light">{currentUser.username}</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={toggleOpenSignUpForm}
              className="p-4 w-full flex justify-center items-center gap-x-2 hover:scale-95 text-white ease-in-out transition duration-300 rounded-full"
            >
              <div className="xl:w-[3rem] xl:h-[3rem] w-[1.5rem] h-[1.5rem] rounded-full bg-gradient-to-tl from-gray-500 via-white to-gray-300"></div>
              Sign In
            </button>
            {openSignUp && <SignIn />}
          </>
        )}
      </motion.div>
      <>
        {openUserPortal && (
          <UserPortal
            handleLogout={handleLogout}
            toggleOpenUserPortal={toggleOpenUserPortal}
          />
        )}
      </>
    </AnimatePresence>
  );
};

export default SignInButton;
