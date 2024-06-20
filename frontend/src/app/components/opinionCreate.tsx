import { Icon } from "@iconify/react";

const OpinionCreate = () => {
  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-[#2b2b2b] border p-8 rounded-lg shadow-xl">
        <div className="flex gap-x-4 items-center text-white">
          <div className="gap-x-4 flex my-4">
            <h1 className="text-2xl font-medium text-white">
              Create An Opinion
            </h1>
            <Icon icon="noto:fountain-pen" className="w-8 h-8" />
          </div>
          <div className="p-4 rounded-full border">Select a Category</div>
        </div>
        <form className="max-w-md mx-auto  rounded  my-[8%] ">
          <div className="w-full flex gap-x-4">
            <div className="mb-4">
              <input
                type="text"
                id="name"
                className="shadow appearance-none placeholder:text-white/50 text-white placeholder:text-sm p-4 border bg-transparent border-white/50  rounded-full w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Author"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="title"
                className="shadow appearance-none placeholder:text-white/50 placeholder:text-sm p-4 border bg-transparent border-white/50 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none placeholder:text-white/50 text-white placeholder:text-sm p-4 border bg-transparent border-white/50  rounded-full w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Country"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="City"
                className="shadow appearance-none placeholder:text-white/50 placeholder:text-sm p-4 border bg-transparent border-white/50 rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="City"
              />
            </div>
          </div>
          <div className="flex gap-x-4">
            <button className="p-4 rounded-full border text-white">
              Consevative
            </button>
            <button className="p-4 rounded-full border text-white">
              Liberal
            </button>
            <button className="p-4 rounded-full border text-white">
              Non-Political
            </button>
          </div>
          <textarea
            id="description"
            rows={4}
            maxLength={300}
            className="shadow my-4 placeholder:text-white/50 bg-transparent placeholder:text-sm border-white/50 appearance-none border rounded w-full py-2 px-3 text-white text-sm leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Brief Description of your Essay"
          />
          <textarea
            id="description"
            rows={4}
            maxLength={5000}
            className="shadow my-4 h-44 placeholder:text-white/50 bg-transparent placeholder:text-sm border-white/50 appearance-none border rounded w-full px-3 py-2 text-white text-sm leading-tight focus:outline-none focus:shadow-outline"
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
    </section>
  );
};

export default OpinionCreate;
