import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDemocrat,
  faRepublican,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import EssayPrompt from "./essayPrompt";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "./FileUpload";
interface OpinionCreateProps {
  toggleCreate: () => void;
  topic: {
    name: string;
    id: number;
  };
}
interface FormData {
  title: string;
  textContent: string;
  affiliation: string;
  userId: number | null;
  topicId: number | null;
  parentOpinionId: number | null;
  backgroundImage: string;
  images: FileList | null;
  videos: FileList | null;
  documents: FileList | null;
  audios: FileList | null;
}

interface FileExtended extends File {
  url?: string;
}

const OpinionCreate: React.FC<OpinionCreateProps> = ({
  toggleCreate,
  topic,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
  const [selectedAffiliation, setSelectedAffiliation] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    title: "",
    textContent: "",
    userId: null,
    topicId: null,
    parentOpinionId: null,
    affiliation: "",
    backgroundImage: "",
    images: null,
    videos: null,
    documents: null,
    audios: null,
  });
  const [essay, setEssay] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const affiliations = [
    { label: "Conservative", icon: faDemocrat },
    { label: "Liberal", icon: faRepublican },
    { label: "Non-Political" },
    { label: "Libertarian" },
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

  useEffect(() => {
    console.log("in opinion create topic: ", topic);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (!formData.topicId) {
      setFormData({ ...formData, topicId: topic.id });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

     if (selectedFiles.length === 0) {
       alert("Please drop a file to continue.");
       return;
     }

     if (!selectedAffiliation) {
       alert("Please select an affiliation.");
       return;
     }

     const data = {
       ...formData,
       affiliation: selectedAffiliation,
       files: selectedFiles,
     };

     console.log("Submitted data:", data);

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
  };
  const [confirmation, setConfirmation] = useState(false);

  const handleToggleConfirmation = () => {
    setConfirmation(!confirmation);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.8 }}
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-90 z-50"
    >
      <button
        onClick={toggleCreate}
        className={`w-12 h-12 shadow-lg flex justify-center items-center rounded-full absolute top-4 left-4 ${
          essay ? "hidden" : "block"
        }`}
      >
        <FontAwesomeIcon icon={faXmark} className="w-8 h-8 text-white " />
      </button>
      <AnimatePresence>
        {isVisible ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 500 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-t relative from-stone-500 to-stone-700 border lg:w-3/4 w-[90%] xl:p-8 p-4 rounded-lg shadow-xl"
            >
              <div className="flex gap-x-4 justify-between items-center z-10 text-white">
                <div className="gap-x-4 flex my-4">
                  <h1 className="xl:text-3xl text-xl font-semibold text-white">
                    Voice An Opinion
                  </h1>
                  <Icon icon="noto:fountain-pen" className="w-8 h-8" />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-y-4 gap-x-12 w-full xl:max-h-[750px] xl:overflow-none max-h-[400px] overflow-y-auto">
                <div className="w-full lg:w-1/2 mx-auto my-[2%] z-40">
                  <label className="text-white">Drop Your Cover Here</label>
                  <div className="w-full lg:h-4/5 h-[300px] mt-4 flex justify-center items-center">
                    <FileUpload
                      onFilesSelected={handleFilesSelected}
                      initialFiles={selectedFiles}
                    />
                  </div>
                </div>
                <form className="lg:w-1/2 w-full mx-auto rounded mt-[5%] z-40">
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
                    <h2 className="text-white font-semibold">
                      What Best Describes You?
                    </h2>
                    <div className="grid grid-cols-2 gap-4 my-[2%] mx-auto">
                      {affiliations.map((affiliation, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleAffiliation(affiliation.label);
                          }}
                          className={`p-4 rounded-full ${
                            selectedAffiliation === affiliation.label
                              ? "bg-purple-500 text-white"
                              : "bg-[#efefef] text-black"
                          } lg:text-sm items-center text-xs justify-center hover:shadow-sm hover:shadow-white hover:bg-purple-500 hover:text-white duration-300 transition ease-in-out gap-x-4 flex`}
                        >
                          {affiliation.label}
                          {affiliation.icon && (
                            <FontAwesomeIcon
                              icon={affiliation.icon}
                              className="ml-2"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>

                <div className="absolute inset-0">
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
            <motion.button
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 500 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={handleSubmit}
              type="submit"
              className="relative inline-flex my-4 w-[90%] shadow-xl items-center justify-center py-6 xl:w-3/4 overflow-hidden font-medium text-white bg-white transition duration-300 ease-out rounded-full group"
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
            </motion.button>
          </>
        ) : essay ? (
          <>
            <button
              onClick={closeEssayPrompt}
              className="p-8 absolute top-0 left-8 flex gap-x-8 z-10"
            >
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
              toggleConfirmation={handleToggleConfirmation}
            />
          </>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
};

export default OpinionCreate;
