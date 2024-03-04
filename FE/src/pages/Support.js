import React from "react";

const Support = () => {
  return (
    <div className="bg-white bg-opacity-45 rounded-md p-8 my-24 text-center flex flex-col items-end">
      <textarea
        cols="70"
        rows="10"
        className="rounded-md px-4 py-3 outline-none bg-transparent text-black placeholder-black"
        placeholder="Type here"
      ></textarea>

      <button className="float-end bg-slate-900 text-white font-medium px-4 py-2 rounded-full w-fit mt-4">
        Submit
      </button>
    </div>
  );
};

export default Support;
