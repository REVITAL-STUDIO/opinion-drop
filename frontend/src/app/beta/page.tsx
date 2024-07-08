"use client";
import Image from "next/image";
import Nav from "../components/nav";
import Hero from "../components/hero";
import Drop from "../components/drops";

export default function Beta() {
  return (
    <main className="bg-[#2b2b2b]">
      <Nav />
      <Hero />
      <Drop />
    </main>
  );
}
