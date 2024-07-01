import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDemocrat, faRepublican } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface OpinionCreateProps {
  toggleCreate: () => void;
}

const [formData, setFormData] = useState({
  title: "",
  textContent: "",
  backgroundImage: "",
  images: null,
  videos: null,
  documents: null,
  audios: null,

});

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


const OpinionCreate: React.FC<OpinionCreateProps> = ({ toggleCreate }) => {
  return (
    <section className="fixed  top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
      <button
        onClick={toggleCreate}
        className="w-20 h-20 bg-white shadow-lg flex justify-center items-center rounded-full absolute top-4 left-4 p-4"
      >
        <Icon icon="mingcute:back-fill" className="w-10 h-10 " />
      </button>
      <div className="bg-purple-800 border p-8 rounded-lg shadow-xl">
        {/* Title */}
        <div className="flex gap-x-4 justify-between items-center text-white">
          <div className="gap-x-4 flex my-4">
            <h1 className="text-3xl font-semibold text-white">
              Create An Opinion
            </h1>
            <Icon icon="noto:fountain-pen" className="w-8 h-8" />
          </div>
          <div className="p-4 rounded-full border flex items-center gap-x-4">
            <span>Select a Category</span>
            <button className="w-8 h-8 justify-center items-center">
              {" "}
              <Icon className="w-6 h-6" icon="oui:arrow-down" />
            </button>
          </div>
        </div>
        <div className="flex  gap-x-12 w-full">
          <div className="w-2/3 mx-auto my-[2%]">
            <label className="text-white ">Drop Your Cover Here</label>
            <div className="w-full h-4/5 border border-dashed mt-4 flex justify-center items-center">
              <button
                className="w-32 h-32 flex justify-center
               items-center rounded-full border text-5xl bg-white border-white shadow-lg text-black"
              >
                +
              </button>
            </div>
          </div>
          {/* form */}
          <form className="max-w-1/3 mx-auto  rounded  my-[2%] ">
            <div className="w-full flex gap-x-4">
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none placeholder:text-white/50 text-white placeholder:text-sm p-4 border bg-transparent border-white  rounded-full w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                  placeholder="Author"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="title"
                  className="shadow appearance-none placeholder:text-white/50 placeholder:text-sm p-4 border bg-transparent border-white rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  required
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="w-full flex gap-x-4">
              <div className="mb-4">
                <input
                  type="text"
                  id="Country"
                  className="shadow appearance-none placeholder:text-white/50 text-white placeholder:text-sm p-4 border bg-transparent border-white  rounded-full w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                  placeholder="Country"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="City"
                  className="shadow appearance-none placeholder:text-white/50 placeholder:text-sm p-4 border bg-transparent border-white rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  required
                  placeholder="City"
                />
              </div>
            </div>
            <div className="flex gap-x-4">
              <button className="p-4 rounded-full  bg-red-500 text-white items-center hover:shadow-sm hover:shadow-white hover:scale-110 duration-300 transition ease-in-out  gap-x-4">
                Consevative
                <FontAwesomeIcon icon={faDemocrat} />
              </button>
              <button className="p-4 rounded-full  bg-blue-500 text-white items-center hover:shadow-sm hover:shadow-white hover:scale-110 duration-300 transition ease-in-out  gap-x-4">
                Liberal
                <FontAwesomeIcon icon={faRepublican} />
              </button>
              <button className="p-4 rounded-full  bg-orange-500 text-white items-center hover:shadow-sm hover:shadow-white hover:scale-110 duration-300 transition ease-in-out  gap-x-4">
                Non-Political
              </button>
            </div>
            <textarea
              id="description"
              rows={4}
              maxLength={300}
              className="shadow my-4 placeholder:text-white/50 bg-transparent placeholder:text-sm border-white appearance-none border rounded w-full py-2 px-3 text-white text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Brief Description of your Essay"
            />
            <textarea
              id="description"
              rows={4}
              maxLength={5000}
              className="shadow my-4 h-36 placeholder:text-white/50 bg-transparent placeholder:text-sm border-white appearance-none border rounded w-full px-3 py-2 text-white text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write A Essay"
            />
            <button
              className="p-4 w-full bg-white shadow-xl font-bold text-center text-black rounded-full border"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OpinionCreate;
