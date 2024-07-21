"use client";
import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import SignIn from "./CredentialsSignIn";
import UserPortal from "./userPortal";

const SignInButton: React.FC = () => {
  const [openSignUp, setSignUp] = useState(false);
  const { currentUser, loading, logout } = useAuth();
  const [openUserPortal, setOpenUserPortal] = useState(false);

  const toggleOpenSignUpForm = () => {
    setSignUp(!openSignUp);
  };

  const toggleOpenUserPortal = () => {
    setOpenUserPortal(!openUserPortal);
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
    <div className="w-full mx-auto xl:mt-0 mt-4 flex justify-center items-center">
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
          <UserPortal
            handleLogout={handleLogout}
            toggleOpenUserPortal={toggleOpenUserPortal}
          />{" "}
          {/* Render UserPortal when openUserPortal is true */}
        </>
      ) : (
        <>
          <button
            onClick={toggleOpenSignUpForm}
            className="p-4 lg:w-1/5 w-1/2 bg-gradient-to-tl from-black via-[#2b2b2b] to-white hover:from-blue-600 hover:via-white font-medium hover:to-red-600 text-white hover:text-black shadow-lg hover:scale-95 ease-in-out transition duration-300 rounded-full mx-auto"
          >
            Sign In
          </button>
          {openSignUp && <SignIn />}{" "}
          {/* Render SignIn when openSignUp is true */}
        </>
      )}
    </div>
  );
};

export default SignInButton;
