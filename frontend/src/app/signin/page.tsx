"use client";
import React, { useEffect } from "react";
import SignIn from "../components/CredentialsSignIn";
import { useAuth } from "../hooks/AuthContext";
import UserSignIn from "../components/userSignIn";
import { Sign } from "crypto";

const AuthPage: React.FC = () => {
  const { currentUser, loading, logout } = useAuth();

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {currentUser ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {currentUser.username}!
          </h1>
          <p className="text-gray-600 mb-4">
            User ID: <span className="font-semibold">{currentUser.uid}</span>
          </p>
          <p className="text-gray-600 mb-4">
            Email: <span className="font-semibold">{currentUser.email}</span>
          </p>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default AuthPage;
