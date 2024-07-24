import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Cesspit from "./components/theCesspit";
import UserPortal from "./components/userPortal";
import UserSignIn from "./components/userSignIn";
import CommentForm from "./components/CommentForm";
import CommentMainFile from "./components/commentMainFIle";

export default function Home() {
  return (
    <main>
      <CommentMainFile />
      <Hero />
    </main>
  );
}
