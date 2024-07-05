import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Promo1 from "./components/promo1";
import Promo2 from "./components/VideoPlayer";
import Promo3 from "./components/promo3";

export default function Home() {
  return (
    <main className="bg-[#2b2b2b]">
      <Nav />
      <Hero />
      <Promo1 />
      <Drop />
    </main>
  );
}
