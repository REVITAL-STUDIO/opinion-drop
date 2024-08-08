"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "./signInButton";

const Nav = () => {
  return (
    <section
      className="
     relative w-full flex justify-center items-center text-white  rounded-full z-10"
    >
      <div className="w-[90%] h-fit my-2  rounded-full flex justify-between items-center ">
        <Link
          href="/"
          className="flex  w-fit h-fit justify-center items-center "
        >
          <Image
            src="/Images/Final-Stacked.png"
            alt="Logo"
            width={125}
            height={125}
            className=""
          />
        </Link>
        <SignInButton />
      </div>
    </section>
  );
};

export default Nav;
