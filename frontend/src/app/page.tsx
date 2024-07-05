import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Promo1 from "./components/promo1";
import Promo2 from "./promo2";
import Promo3 from "./components/promo3";

export default function Home() {
  return (
    <main className="bg-[#2b2b2b]">
      <Nav />
      <Hero />
      {/* <Promo1 />
      <Promo2 />
      <Promo3 /> */}
      <Drop />
    </main>
  );
}
