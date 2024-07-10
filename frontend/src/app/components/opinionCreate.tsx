import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDemocrat, faRepublican } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";
import EssayPrompt from "./essayPrompt";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "./FileUpload";

interface OpinionCreateProps {
  toggleCreate: () => void;
}

interface FileExtended extends File {
  url?: string;
}

const OpinionCreate: React.FC<OpinionCreateProps> = ({ toggleCreate }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const [formData, setFormData] = useState({
    title: "",
    textContent: "",
    backgroundImage: "",
    images: null,
    videos: null,
    documents: null,
    audios: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const createOpinion = async () => {
    const opinionData = {
      ...formData,
      userId: 0,
      topicId: 0,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(opinionData),
        }
      );
      if (!res.ok) {
        throw new Error("Error creating opinion");
      }
    } catch (error) {
      console.log("Error creating opinion: ", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOpinion();
  };

  const [essay, openEssay] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const openEssayPrompt = () => {
    openEssay(!essay);
    setIsVisible(false);
  };

  const closeEssayPrompt = () => {
    openEssay(false);
    setIsVisible(true);
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50">
      <button
        onClick={toggleCreate}
        className="w-20 h-20 bg-white shadow-lg flex justify-center items-center rounded-full absolute top-4 left-4 p-4"
      >
        <Icon icon="mingcute:back-fill" className="w-10 h-10" />
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-t relative from-stone-500 to-stone-700 border w-3/4 p-8 rounded-lg shadow-xl"
          >
            <div className="flex  gap-x-4 justify-between items-center z-10 text-white">
              <div className="gap-x-4 flex my-4">
                <h1 className="text-3xl font-semibold text-white">
                  Voice An Opinion
                </h1>
                <Icon icon="noto:fountain-pen" className="w-8 h-8" />
              </div>
            </div>
            <div className="flex gap-x-12 w-full ">
              <div className="w-1/2 mx-auto my-[2%] z-40">
                <label className="text-white">Drop Your Cover Here</label>
                <div className="w-full h-4/5  mt-4 flex justify-center items-center">
                  <FileUpload onFilesSelected={handleFilesSelected} />
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-1/2 mx-auto rounded my-[2%] z-40 "
              >
                <div className="w-full flex gap-x-4">
                  <div className="mb-4">
                    <input
                      type="text"
                      id="name"
                      className="shadow appearance-none placeholder:text-white/50 text-white placeholder:text-sm p-4 border bg-transparent border-white rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      placeholder="Author"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="title"
                      className="shadow appearance-none placeholder:text-white/50 placeholder:text-sm p-4 border bg-transparent border-white rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      required
                      placeholder="Title"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full flex gap-x-4">
                  <div className="mb-4">
                    <input
                      type="text"
                      id="Country"
                      className="shadow appearance-none placeholder:text-white/50 text-white placeholder:text-sm p-4 border bg-transparent border-white rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      placeholder="Country"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="City"
                      className="shadow appearance-none placeholder:text-white/50 placeholder:text-sm p-4 border bg-transparent border-white rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      required
                      placeholder="City"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <button className="p-4 rounded-full bg-red-500 text-white items-center hover:shadow-sm hover:shadow-white hover:scale-110 duration-300 transition ease-in-out gap-x-4">
                    Conservative
                    <FontAwesomeIcon icon={faDemocrat} className="ml-2" />
                  </button>
                  <button className="p-4 rounded-full bg-blue-500 text-white items-center hover:shadow-sm hover:shadow-white hover:scale-110 duration-300 transition ease-in-out gap-x-4">
                    Liberal
                    <FontAwesomeIcon icon={faRepublican} className="ml-2" />
                  </button>
                  <button className="p-4 rounded-full bg-purple-600 text-white items-center hover:shadow-sm hover:shadow-white hover:scale-110 duration-300 transition ease-in-out gap-x-4">
                    Non-Political
                  </button>
                </div>
                <textarea
                  id="description"
                  rows={4}
                  maxLength={300}
                  className="shadow my-4 placeholder:text-white/50 bg-transparent placeholder:text-sm border-white appearance-none border rounded w-full h-[300px] py-2 px-3 text-white text-sm leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Brief Description of your Essay"
                  onChange={handleChange}
                />

                <button
                  onClick={openEssayPrompt}
                  className="relative inline-flex shadow-xl items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white bg-white w-full transition duration-300 ease-out rounded-full group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#2b2b2b] group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                    Write Your Essay
                  </span>
                  <span className="relative invisible">Button Text</span>
                </button>
              </form>
              <div className="absolute inset-0 ">
                <Image
                  src="/Images/pexels-ketchumcommunity-1464232.jpg"
                  alt="A descriptive alt text"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-20 inset-0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {essay && (
        <>
          <button
            onClick={closeEssayPrompt}
            className="p-8 absolute left-8 flex gap-x-8"
          >
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <EssayPrompt />
        </>
      )}
    </section>
  );
};

export default OpinionCreate;
