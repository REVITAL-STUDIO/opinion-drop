import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Cesspit from "./components/theCesspit";
import AdminPortal from "./components/adminPortal";

export default function Home() {
  return (
    <main>
      <AdminPortal />
      <Hero />
      <Cesspit />
    </main>
  );
}
