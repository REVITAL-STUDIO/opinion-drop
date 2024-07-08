import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";


export default function Home() {
  return (
    <main className="bg-[#2b2b2b]">
      <Hero />
      <Drop />
    </main>
  );
}
