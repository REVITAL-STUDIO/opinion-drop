"use client";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Cesspit from "./components/theCesspit";
import { useEffect, useState } from "react";

interface dropsProps {
  topic: {
    name: string;
    id: number;
  };
}

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
