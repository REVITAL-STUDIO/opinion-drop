import React, { useState } from "react";
import UserSignIn from "./userSignIn";
import CreditialSignIn from "./CredentialsSignIn";

const SignIn = () => {
  const [openSignUp, setSignUp] = useState(false);

  const toggleOpenSignUpForm = () => {
    setSignUp(!openSignUp);
  };

  return (
    <div className="w-full mx-auto my-4 flex justify-center items-center">
      <button
        onClick={toggleOpenSignUpForm}
        className="p-4 lg:w-1/5 w-1/2 bg-gradient-to-tl from-black via-[#2b2b2b] to-white hover:from-blue-600 hover:via-white font-medium hover:to-red-600 text-white hover:text-black shadow-lg hover:scale-95 ease-in-out transition duration-300  rounded-full mx-auto"
      >
        Sign In
      </button>

      {openSignUp && <CreditialSignIn/>}
    </div>
  );
};

export default SignIn;
