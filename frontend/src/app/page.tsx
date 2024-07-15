import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Cesspit from "./components/theCesspit";

export default function Home() {
  return (
    <main>
      <Hero />
      <Cesspit />
    </main>
  );
}
