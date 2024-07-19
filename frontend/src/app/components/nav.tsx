"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import CreateButton from "./createButton";

const Nav = () => {
  return (
    <section className="h-[20%]  relative w-full flex justify-between items-center text-white z-10">
      <Link href="/" className="flex  w-fit h-fit justify-center items-center absolute top-2 left-4">
        <Image
          src="/images/opinion-drop-logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="mt-6"
        />
        <div className="px-4 py-2 h-fit  rounded-full border-2 font-semibold text-lg ml-4">Beta</div>
      </Link>
      <CreateButton />
    </section>
  );
};

export default Nav;
