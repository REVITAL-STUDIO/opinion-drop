import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Cesspit from "./components/theCesspit";
import UserPortal from "./components/userPortal";
import UserSignIn from "./components/userSignIn";

export default function Home() {
  return (
    <main>
      {/* <UserSignIn />
      <UserPortal /> */}
      <Hero />
      {/* <Cesspit />  */}
    </main>
  );
}
