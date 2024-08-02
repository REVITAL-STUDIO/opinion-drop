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

interface Opinion {
  id: number;
  author: string;
  title: string;
  textcontent: string;
  backgroundimage: string;
  authorprofileimage?: string;
}
export default function Home() {
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);


  return (
    <main>
      <Hero />
      <Cesspit opinionData={selectedOpinion} />
    </main>
  );
}
