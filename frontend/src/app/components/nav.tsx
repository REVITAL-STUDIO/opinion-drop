"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "./signInButton";

const Nav = () => {
  return (
    <section
      className="
     relative w-full flex justify-between items-center text-white z-10"
    >
      <Link
        href="/"
        className="flex ml-4 w-fit h-fit justify-center items-center "
      >
        <Image
          src="/images/opinion-drop-logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="mt-6"
        />
        <div className="px-4 py-2 h-fit  rounded-full border-2 font-semibold text-lg ml-4">
          Beta
        </div>
      </Link>
      <SignInButton />
    </section>
  );
};

export default Nav;
