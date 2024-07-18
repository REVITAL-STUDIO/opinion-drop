"use client";

import React, { useState } from "react";
import GoogleIcon from "/public/Images/google.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDemocrat,
  faRepublican,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const UserSignIn = () => {
  const [login, setLoginState] = useState(false);
  const [nextMenu, setNextMenu] = useState(false);
  const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>(
    []
  );

  const toggleLoginState = () => {
    setLoginState(!login);
  };

  const toggleNextMenu = () => {
    setNextMenu(!nextMenu);
  };

  const toggleAffiliation = (label: string) => {
    if (selectedAffiliations.includes(label)) {
      setSelectedAffiliations(
        selectedAffiliations.filter((item) => item !== label)
      );
    } else {
      setSelectedAffiliations([...selectedAffiliations, label]);
    }
  };

  const affiliations = [
    { label: "Conservative", icon: faDemocrat },
    { label: "Liberal", icon: faRepublican },
    { label: "Non-Political" },
    { label: "Libertarian" },
    { label: "Progressive" },
    { label: "Independent" },
    { label: "Green Party" },
    { label: "Moderate" },
    { label: "Socialist" },
    { label: "Constitutional Party" },
    { label: "Centrist" },
  ];

  return (
    <section className="bg-white w-full h-screen flex justify-center items-center">
      {login ? (
        //Sign In
        <div className="w-1/3 h-3/4 bg-gradient-to-tr text-white shadow-md from-blue-400 via-red-400 to-white rounded-md flex flex-col  items-center">
          {nextMenu ? (
            <>
              <div className="w-3/4">
                <h2 className="my-4 text-2xl font-semibold">
                  Tell Us About Yourself
                </h2>
                <p className="text-sm my-4">
                  For a more personalized experience identify yourself with the
                  following
                </p>
                <h2 className="text-base my-4 font-normal text-center">
                  Political Party Alignment
                </h2>
                <div className="flex flex-wrap gap-4 my-[5%] mx-auto">
                  {affiliations.map((affiliation, index) => (
                    <button
                      key={index}
                      onClick={() => toggleAffiliation(affiliation.label)}
                      className={`p-4 rounded-full ${
                        selectedAffiliations.includes(affiliation.label)
                          ? "bg-purple-500 text-white"
                          : "bg-[#efefef] text-black"
                      } text-sm items-center hover:shadow-sm  hover:bg-purple-500 hover:text-white hover:scale-110 duration-300 transition ease-in-out gap-x-4 flex`}
                    >
                      {affiliation.label}
                      {affiliation.icon && (
                        <FontAwesomeIcon
                          icon={affiliation.icon}
                          className="ml-2"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <button className="my-4 border p-4 rounded-full hover:bg-white hover:text-black duration-150 ease-in-out transition">
                  Submit
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-3/4">
                <h2 className="my-4 text-2xl font-semibold">Sign In</h2>
                <p className="text-sm my-4">
                  By continuing, you agree to our User Agreement and acknowledge
                  that you understand the Privacy Policy.
                </p>
              </div>
              <div className="w-full flex flex-col justify-center items-center text-sm">
                <button className="py-4 px-2 my-2 border w-3/4 text-sm rounded-full flex items-center justify-center shadow-md">
                  <Image
                    src={GoogleIcon}
                    alt="google icon"
                    className="w-5 mr-4 "
                  />
                  Continue with Google{" "}
                </button>
              </div>
              <div className="p-4 flex items-center justify-center gap-x-4 w-[85%]">
                <div className="w-full border"></div>
                <h2>or</h2>
                <div className="w-full border"></div>
              </div>
              <form className="space-y-2 w-[80%]" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-black placeholder:text-sm rounded-lg focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={toggleNextMenu}
                  type="submit"
                  className="w-full text-white  bg-primary-600 border rounded-full hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium hover:bg-white hover:text-black ease-in-out transition duration-150 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Continue
                </button>
                <p className="text-sm font-light text-white">
                  Don’t have an account yet?{" "}
                  <button
                    onClick={toggleLoginState}
                    className="font-medium text-white hover:underline "
                  >
                    Login
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      ) : (
        //Login
        <div className="w-1/3 h-3/4 bg-gradient-to-tr text-white shadow-md from-blue-400 via-red-400 to-white rounded-md flex flex-col  items-center">
          <div className="w-3/4">
            <h2 className="my-4 text-2xl font-semibold">Login</h2>
            <p className="text-sm my-4">
              By continuing, you agree to our User Agreement and acknowledge
              that you understand the Privacy Policy.
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center text-sm">
            <button className="py-4 px-2 my-2 border w-3/4 text-sm rounded-full flex items-center justify-center shadow-md">
              <Image src={GoogleIcon} alt="google icon" className="w-5 mr-4 " />
              Continue with Google{" "}
            </button>
          </div>
          <div className="p-4 flex items-center justify-center gap-x-4 w-[85%]">
            <div className="w-full border"></div>
            <h2>or</h2>
            <div className="w-full border"></div>
          </div>
          <form className="space-y-2 w-[80%]" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-black placeholder:text-sm rounded-lg focus:ring-none focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-none"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-white dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 border rounded-full hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium hover:bg-white hover:text-black ease-in-out transition duration-150 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-white ">
              Already have an Account?{" "}
              <button
                onClick={toggleLoginState}
                className="font-medium text-white hover:underline "
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      )}
    </section>
  );
};

export default UserSignIn;
