import React from "react";

const Home = () => {
  return (
    <div className="bg-white bg-opacity-45 rounded-md p-8 my-24">
      <div className="text-center pb-10">
        <h2 className="font-bold text-2xl">Roam Routely</h2>
      </div>

      <div className="flex justify-between text-center gap-5">
        <div className="basis-1/2">
          <h2 className="text-xl font-semibold leading-none">
            Itinerary Generator
          </h2>
          <p className="my-6">
            Generate a personalized Itinerary based on your requirements.
          </p>

          <button className="bg-zinc-950 text-white rounded-full py-2 px-4">
            Generate Itinerary
          </button>
        </div>

        <div>
          <div className="w-[2px] h-full bg-black"></div>
        </div>

        <div className="basis-1/2">
          <h2 className="text-xl font-semibold leading-none">
            Currency Convertor
          </h2>
          <p className="my-6">
            Convert any amount from USD to another Currency or otherwise with
            ease using our currency convertor.
          </p>

          <button className="bg-zinc-950 text-white rounded-full py-2 px-4">
            Currency Convertor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
