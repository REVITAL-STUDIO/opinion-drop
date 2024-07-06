"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Nav = () => {
  return (
    <section className="h-auto hidden">
      <div className="w-full flex justify-between items-center text-white">
        <ul className="flex justify-center items-center gap-x-12">
          <button className="">
            <FontAwesomeIcon icon={faUser} className="w-8" />
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-white  rounded-full"
          >
            Menu
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border border-white  rounded-full"
          >
            Founder Podcast
          </Link>
        </ul>
        <Link href="/">
          <Image
            src="/images/opinion-drop-logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>
        <ul className="flex justify-center items-center gap-x-12">
          <Link href="/" className="px-4 py-2 border border-white rounded-full">
            Chat
          </Link>
          <Link href="/" className="px-4 py-2 border border-white rounded-full">
            Drop <span>+</span>
          </Link>
          <button className="">
            <FontAwesomeIcon icon={faUser} className="w-8" />
          </button>
        </ul>
      </div>
    </section>
  );
};

export default Nav;
