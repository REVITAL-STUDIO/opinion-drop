"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import ProviderSignIn from "./ProviderSignIn";
import { AnimatePresence, motion } from "framer-motion";

const SignIn: React.FC = () => {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [close, setClose] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAuthAction = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      console.log("Authentication successful");
      setShowSuccessModal(true); // Show success modal

      // Hide the modal and reset the form after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false); // Hide success modal after 3 seconds
        setClose(true); // Close the form/modal
      }, 3000);
    } catch (error) {
      console.error("Authentication failed", error);
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      console.log("Clicked outside, closing modal");
      setClose(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!close && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full min-h-screen fixed top-0 left-0 bg-black/95 z-50"
          >
            {error && <p className="text-red-500 text-sm my-4">{error}</p>}
            <div
              ref={modalRef}
              className="bg-gradient-to-tr text-white shadow-md from-blue-400 via-red-400 to-white p-6 rounded-lg xl:w-96 w-80"
            >
              <h2 className="text-2xl font-semibold mb-4">
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
                className="border border-gray-300 p-2 text-black rounded mb-2 w-full placeholder:text-xs text-xs"
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
                className="border border-gray-300 p-2 text-black rounded mb-4 w-full placeholder:text-xs text-xs"
              />
              <button
                onClick={handleAuthAction}
                className={`bg-blue-500 text-white p-2 rounded my-4 w-full text-sm ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
              <p className="flex text-center gap-x-4 text-sm">
                <span className="text-[#dadada]">
                  {" "}
                  {isSignUp ? "Already have an account?" : "New User?"}
                </span>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className={`font-medium text-white hover:underline text-sm ${
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

      {showSuccessModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full h-screen fixed top-0 left-0 bg-black/95 z-50"
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center rounded-lg sm:p-5">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Success</span>
                </div>
                <p className="mb-4 text-lg font-semibold text-white">
                  {isSignUp ? "Sign Up" : "Sign In"} Successful
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default SignIn;
