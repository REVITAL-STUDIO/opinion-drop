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

  const toggleOpenSignUpForm = () => {
    setSignUp((e) => !e);
  };

  const toggleOpenUserPortal = () => {
    setOpenUserPortal((open) => !open);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleNotification = () => {
    setOpenNotifications((prev) => !prev);
    if (firstTimeOpen) {
      setFirstTimeOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenNotifications(false);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (openNotification) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openNotification]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className=" px-2  flex justify-center items-center"
      >
        {currentUser ? (
          <>
            <div className="flex items-center  mr-4  ">
              <button
                onClick={toggleOpenUserPortal}
                className="  w-full flex justify-center mr-2 items-center gap-x-2 hover:scale-95 text-white ease-in-out transition duration-300 rounded-full relative"
              >
                <div className=" xl:w-[3rem] xl:h-[3rem] w-[1.5rem] h-[1.5rem] rounded-full bg-gradient-to-tl from-red-400 via-white to-blue-500"></div>
              </button>
              <button
                ref={menuRef}
                onClick={toggleNotification}
                className={`p-4 rounded-full relative  ease-in-out duration-300 transition ${
                  openNotification
                    ? "bg-gradient-to-tr to-red-400 from-blue-300"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="xl:text-2xl text-xl"
                />
                {!openNotification && firstTimeOpen && (
                  <div className="w-[0.8rem] h-[0.8rem] top-1 right-2 absolute rounded-full bg-purple-400"></div>
                )}
              </button>
            </div>
            {openUserPortal && (
              <UserPortal
                handleLogout={handleLogout}
                toggleOpenUserPortal={toggleOpenUserPortal}
              />
            )}
            {openNotification && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 xl:w-[30%] w-[90%] right-4 absolute top-full rounded-md bg-[#2b2b2b] shadow-md"
              >
                <div className="flex justify-between items-center  ">
                  <h2 className="text-2xl font-bold ml-4 border rounded-full p-4">
                    Notifications
                  </h2>
                </div>
                <div className="max-h-[400px] overflow-y-auto mt-2 p-4">
                  <div className="w-full cursor-pointer flex justify-between items-center hover:bg-purple-500 mb-1 rounded-md ease-in-out duration-200 transition shadow-xl p-4">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full shadow-lg"></div>
                    <p className=" md:text-xs text-[11px]">
                      <span className="font-bold">@anonymous4982</span> has
                      liked your essay
                    </p>
                  </div>
                  <div className="w-full cursor-pointer flex justify-between items-center hover:bg-purple-500 mb-1 rounded-md ease-in-out duration-200 transition shadow-xl p-4">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full shadow-lg"></div>
                    <p className="md:text-xs text-[11px]">
                      <span className="font-bold">@anonymous5047</span> has
                      commented on post
                    </p>
                  </div>
                  <div className="w-full cursor-pointer flex justify-between items-center hover:bg-purple-500 mb-1 rounded-md ease-in-out duration-200 transition shadow-xl p-4">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full shadow-lg"></div>
                    <p className="md:text-xs text-[11px]">
                      <span className="font-bold">@anonymous6035</span>{" "}
                      mentioned you
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            {/* Render UserPortal when openUserPortal is true */}
          </>
        ) : (
          <>
            <button
              onClick={toggleOpenSignUpForm}
              className="p-4 w-full  flex justify-center items-center gap-x-2 hover:scale-95 text-white ease-in-out transition duration-300 rounded-full "
            >
              <div className="xl:w-[3rem] xl:h-[3rem] w-[1.5rem] h-[1.5rem] rounded-full bg-gradient-to-tl from-gray-500 via-white to-purple-500"></div>
              Sign In
            </button>
            {openSignUp && <SignIn />}{" "}
            {/* Render SignIn when openSignUp is true */}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SignInButton;
