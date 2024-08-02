"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMicrophone,
  faPlus,
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import OpinionShowcase from "./OpinionShowcase";
import ProfileButton from "./profileButton";
import Nav from "./nav";
import Image from "next/image";

interface Topic {
  name: string;
  id: number;
}
const Hero = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  const fetchTopics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/topics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving topics");
      }
      const response = await res.json();
      console.log("data: ", response.data);
      const mappedTopics: Topic[] = response.data.topics.map((topic: any) => ({
        name: topic.name,
        id: topic.topicId,
      }));
      setTopics(mappedTopics);
    } catch (error) {
      console.log("Error Fetching Topics: ", error);
    }
  };

  useEffect(() => {
    // fetchTopics();
    setTopics([{ name: "example topic", id: 1 } as Topic]);
  }, []);

  useEffect(() => {}, [topics]);

  return (
    <section className="w-full bg-black min-h-screen bg-cover bg-center relative">
      <Image
        src="/Images/AdobeStock_756592648.jpeg"
        alt="OD Background"
        fill
        className="absolute w-[100%] h-[100%] object-cover object-center blur-md brightness-50"
      />
      {topics.length > 0 &&
        topics.map((topic) => <OpinionShowcase key={topic.id} topic={topic} />)}
    </section>
  );
};

export default Hero;
