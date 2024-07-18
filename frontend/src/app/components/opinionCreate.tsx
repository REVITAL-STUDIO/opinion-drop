import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDemocrat, faRepublican, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
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
  const [selectedAffiliation, setSelectedAffiliation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    textContent: "",
    affiliation: "",
    backgroundImage: "",
    images: null,
    videos: null,
    documents: null,
    audios: null,
  });
  const [essay, setEssay] = useState(false); // Controls essay prompt visibility
  const [isVisible, setIsVisible] = useState(true); // Controls the visibility of the initial form

  const affiliations = [
    { label: "Conservative", icon: faDemocrat },
    { label: "Liberal", icon: faRepublican },
    { label: "Non-Political" },
    { label: "Libertarian" },
    { label: "Progressive" },
    { label: "Independent" },
    { label: "Green Party" },
    { label: "Moderate" },
    { label: "Socialist" },
    { label: "Constitutional Party" },
    { label: "Centrist" },
  ];

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const createOpinion = async () => {
    const opinionData = new FormData();
    opinionData.append("userId", "0");
    opinionData.append("topicId", "0");
    opinionData.append("title", formData.title);
    opinionData.append("affiliation", formData.affiliation);
    opinionData.append("textContent", formData.textContent);

    if (selectedFiles.length > 0) {
      opinionData.append("backgroundImage", selectedFiles[0]);
    }

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
    console.log("selectedfile: ", selectedFiles);

    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please drop a file to continue.");
      return;
    }

    if (!selectedAffiliation) {
      alert("Please select an affiliation.");
      return;
    }

    // Move to the essay step
    setEssay(true);
    setIsVisible(false);
  };

  const toggleAffiliation = (label: string) => {
    console.log("selectedfile: ", selectedFiles);

    setSelectedAffiliation(label);
    setFormData({ ...formData, affiliation: label });
  };

  const closeEssayPrompt = () => {
    console.log("selectedfile: ", selectedFiles);

    setEssay(false);
    setIsVisible(true);
  };

  const handleTextEditorChange = (textContent: string) => {
    setFormData(prevState => ({
      ...prevState,
      textContent
    }));
  };
  
  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50">
      <button
        onClick={toggleCreate}
        className="w-12 h-12 shadow-lg flex justify-center items-center rounded-full absolute top-4 left-4 "
      >
        <FontAwesomeIcon icon={faXmark} className="w-12 h-12 text-white text-xl" />
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-t relative from-stone-500 to-stone-700 border w-3/4 h-[700px] p-8 rounded-lg shadow-xl"
          >
            <div className="flex gap-x-4 justify-between items-center z-10 text-white">
              <div className="gap-x-4 flex my-4">
                <h1 className="text-3xl font-semibold text-white">Voice An Opinion</h1>
                <Icon icon="noto:fountain-pen" className="w-8 h-8" />
              </div>
            </div>
            <div className="flex gap-x-12 w-full h-[600px] ">
              <div className="w-1/2 mx-auto my-[2%] z-40">
                <label className="text-white">Drop Your Cover Here</label>
                <div className="w-full h-4/5 mt-4 flex justify-center items-center">
                  <FileUpload onFilesSelected={handleFilesSelected} initialFiles={selectedFiles} />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="w-1/2 mx-auto rounded mt-[5%] z-40">
                <div className="w-full flex gap-x-4">
                  <div className="mb-4">
                    <input
                      type="text"
                      id="title"
                      className="shadow appearance-none placeholder:text-white/90 placeholder:text-sm p-4 border bg-transparent border-white rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      required
                      placeholder="Title"
                      onChange={handleChange}
                      value={formData.title}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <h2 className="text-white font-semibold">What Best Describes You?</h2>
                  <div className="flex flex-wrap gap-4 my-[5%] mx-auto">
                    {affiliations.map((affiliation, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleAffiliation(affiliation.label);
                        }} className={`p-4 rounded-full ${selectedAffiliation === affiliation.label
                            ? "bg-purple-500 text-white"
                            : "bg-[#efefef] text-black"
                          } text-sm items-center hover:shadow-sm hover:shadow-white hover:bg-purple-500 hover:text-white hover:scale-110 duration-300 transition ease-in-out gap-x-4 flex`}
                      >
                        {affiliation.label}
                        {affiliation.icon && (
                          <FontAwesomeIcon icon={affiliation.icon} className="ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="relative inline-flex shadow-xl items-center justify-center py-6  overflow-hidden font-medium text-white bg-white w-full transition duration-300 ease-out rounded-full group"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                    Write Your Essay
                  </span>
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
          <button onClick={closeEssayPrompt} className="p-8 absolute left-8 flex gap-x-8">
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <EssayPrompt
            formData={formData}
            selectedFiles={selectedFiles}
            toggleEssay={() => setEssay(false)}
          />        </>
      )}
    </section>
  );
};

export default OpinionCreate;