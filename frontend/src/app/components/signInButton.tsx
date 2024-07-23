"use client";
import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import SignIn from "./CredentialsSignIn";
import UserPortal from "./userPortal";
import { AnimatePresence, motion } from "framer-motion";

const SignInButton: React.FC = () => {
  const [openSignUp, setSignUp] = useState(false);
  const { currentUser, loading, logout } = useAuth();
  const [openUserPortal, setOpenUserPortal] = useState(false);

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
            <button
              onClick={toggleOpenUserPortal}
              className="  w-full flex justify-center items-center gap-x-2 hover:scale-95 text-white ease-in-out transition duration-300 rounded-full "
            >
              <div className="mr-3 xl:w-[3rem] xl:h-[3rem] w-[1.5rem] h-[1.5rem] rounded-full bg-gradient-to-tl from-red-400 via-white to-blue-500"></div>
              <span className="font-semibold uppercase">
                {currentUser.username}
              </span>
            </button>

            {openUserPortal && (
              <UserPortal
                handleLogout={handleLogout}
                toggleOpenUserPortal={toggleOpenUserPortal}
              />
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
