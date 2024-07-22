"use client";
import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import ProviderSignIn from "./ProviderSignIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const SignIn: React.FC = () => {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthAction = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [isSignInOpen, setIsSignInOpen] = useState(true);

  const closeMenuFunction = () => {
    console.log("clicked");
    setIsSignInOpen(false);
  };

  return (
    <>
      {isSignInOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full min-h-screen fixed top-0 left-0 bg-black/90 z-50"
          >
            <button
              onClick={closeMenuFunction}
              className="absolute left-4 top-4 z-10 w-12 h-12 "
            >
              <FontAwesomeIcon icon={faXmark} className="w-8 h-8 text-white" />
            </button>
            {error && <p className="text-red-500 text-sm my-4">{error}</p>}
            <div className="bg-gradient-to-tr text-white shadow-md from-blue-400 via-red-400 to-white p-6 rounded-lg xl:w-96 w-80">
              <h2 className="text-2xl font-semibold  mb-4">
                {isSignUp ? "Sign Up" : "Sign In"}
              </h2>
              <ProviderSignIn />
              <div className="p-4 flex items-center justify-center gap-x-4 w-[100%]">
                <div className="w-full border"></div>
                <h2>or</h2>
                <div className="w-full border"></div>
              </div>
              <label
                htmlFor="email"
                className="block my-2 text-sm font-medium text-white dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border border-gray-300 p-2 text-black rounded mb-2 w-full"
              />
              <label
                htmlFor="password"
                className="block my-2 text-sm font-medium text-white dark:text-white"
              >
                Password{" "}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border border-gray-300 p-2 text-black rounded mb-4 w-full"
              />
              <button
                onClick={handleAuthAction}
                disabled={loading}
                className={`bg-blue-500 text-white p-2 rounded my-4 w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
              </button>
              <p className="flex text-center gap-x-4">
                <span className="text-[#dadada]">
                  {" "}
                  {isSignUp ? "Already have a account?" : "New User?"}
                </span>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={loading}
                  className={`font-medium text-white hover:underline ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default SignIn;
