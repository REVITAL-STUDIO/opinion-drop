import React from "react";

const ShowReplies = () => {
  return (
    <section className="w-full top-full left-0 bg-white mb-4 rounded-md">
      <h2 className="p-4 text-black text-xl">Comments</h2>
      <div className="w-full max-h-52 overflow-y-auto border-t ">
        <div className="h-auto  p-4 flex">
          <div className="p-4 ">
            <div className="w-6 h-6 rounded-full bg-red-500"></div>
          </div>
          <div className="mx-2 text-black">
            <div className="flex items-center gap-x-2">
              <h2 className="text-black font-medium">Heather Crowley</h2>
              <p className="text-gray-500 text-xs">3 days ago</p>
            </div>
            <p className="text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
        </div>
        <div className="h-auto  p-4 flex">
          <div className="p-4 ">
            <div className="w-6 h-6 rounded-full bg-red-500"></div>
          </div>
          <div className="mx-2 text-black">
            <div className="flex items-center gap-x-2">
              <h2 className="text-black font-medium">Heather Crowley</h2>
              <p className="text-gray-500 text-xs">3 days ago</p>
            </div>
            <p className="text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
        </div>
        <div className="h-auto  p-4 flex">
          <div className="p-4 ">
            <div className="w-6 h-6 rounded-full bg-red-500"></div>
          </div>
          <div className="mx-2 text-black">
            <div className="flex items-center gap-x-2">
              <h2 className="text-black font-medium">Heather Crowley</h2>
              <p className="text-gray-500 text-xs">3 days ago</p>
            </div>
            <p className="text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
        </div>
      </div>
      <form className="mt-4 ">
        <div className="py-2 px-4   text-black/75   border-t border-gray-200  dark:border-gray-700">
          <textarea
            id="comment"
            rows={3}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
      </form>
    </section>
  );
};

export default ShowReplies;
