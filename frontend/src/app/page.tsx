import Image from "next/image";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Drop from "./components/drops";
import Cesspit from "./components/theCesspit";
import UserPortal from "./components/userPortal";
import UserSignIn from "./components/userSignIn";
import CommentForm from "./components/CommentForm";
import CommentMainFile from "./components/commentMainFIle";
import Comment from "./components/comment";

export default function Home() {
  const dummyComment: Comment = {
    id: 1,
    author: "Author Name",
    textcontent: "This is a comment.",
    parentcommentid: null,
    parentcommentauthor: null,
    authorprofileimage: "https://via.placeholder.com/150",
    likes: 0,
    createdat: new Date().toISOString(),
  };

  const opinionId = 123; // Example opinionId

  return (
    <main>
      <Hero />
      <Cesspit comment={dummyComment} opinionId={opinionId} />
    </main>
  );
}
