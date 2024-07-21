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
        className="w-full mx-auto xl:mt-0 mt-4 flex justify-center items-center"
      >
        {currentUser ? (
          <>
            <button
              onClick={toggleOpenUserPortal}
              className="p-4 lg:w-2/5 w-3/4 flex justify-center items-center gap-x-2 hover:scale-95 text-white ease-in-out transition duration-300 rounded-full mx-auto"
            >
              <div className="w-[3rem] h-[3rem] rounded-full bg-gradient-to-tl from-red-400 via-white to-blue-500"></div>
              Welcome,{" "}
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
              className="p-4 lg:w-2/5 w-3/4 flex justify-center items-center gap-x-2 hover:scale-95 text-white ease-in-out transition duration-300 rounded-full mx-auto"
            >
              <div className="w-[3rem] h-[3rem] rounded-full bg-gradient-to-tl from-gray-500 via-white to-purple-500"></div>
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
