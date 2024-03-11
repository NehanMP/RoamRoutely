import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="bg-white bg-opacity-45 rounded-md p-8 my-24 w-2/3">
      <h1 className="font-bold my-4 text-2xl">SignIn</h1>
      <div className="flex items-center justify-between w-full">
        <span className="w-full basis-1/4 font-semibold">User Name:</span>
        <input
          type="text"
          className="rounded-md opacity-50 h-8 my-3 outline-none ps-2 w-full basis-3/4"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="w-full basis-1/4 font-semibold">Password:</span>
        <input
          type="text"
          className="rounded-md opacity-50 h-8 my-3 outline-none ps-2 w-full basis-3/4"
        />
      </div>
      <button className="bg-zinc-950 text-white rounded-full py-2 px-4 mt-4">
        Sign In
      </button>
      <div className="mt-4">
        <Link to="/SignUp" className="text-blue-500">
          <span className="text-black text-xs underline">
            Don't have an account? Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
