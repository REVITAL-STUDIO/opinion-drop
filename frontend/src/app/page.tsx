import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Promo1 from "./components/promo1";
import Promo2 from "./components/VideoPlayer";

export default function Home() {
  return (
    <main className="bg-[#2b2b2b]">
      <section className="w-full xl:bg-[url('/Images/OD-Mic-Background.jpg')] bg-[url('/Images/Artboard-1.jpg')] min-h-[850px] bg-cover bg-center h-screen p-4 flex flex-col items-center justify-end">
        <h1 className=" text-[#fffff0] xl:text-6xl text-3xl w-3/4 text-center  p-4 font-bold">
          NOT YOUR AVERAGE PUBLIC AFFAIR.
        </h1>
        <h3 className="text-white text-center text-xl font-semibold ">
          A civic blog platform that gains insight on political perspective.
        </h3>
      </section>
      <Promo1 />
      <Drop />
    </main>
  );
}
