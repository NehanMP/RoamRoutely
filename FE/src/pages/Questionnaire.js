import React from "react";

const Questionnaire = () => {
  return (
    <div className="bg-white bg-opacity-45 rounded-md p-8 my-24 w-full">
      <form>
        <div className="flex items-center gap-4 justify-end">
          <span className="font-bold  w-full basis-1/5 ">Location:</span>
          <input
            type="text"
            className="rounded-md opacity-50 w-full h-8 my-3 basis-4/5"
          />
        </div>

        <div className="flex items-center gap-4 justify-end">
          <span className="font-bold basis-1/5 w-full ">Estimated Budget:</span>
          <input
            type="text"
            className="rounded-md opacity-50 w-full basis-4/5 h-8 my-3"
          />
        </div>

        <div className="flex items-center gap-4 justify-end">
          <span className="font-bold basis-1/5 w-full ">Age Category:</span>
          <input
            type="text"
            className="rounded-md opacity-50 w-full basis-4/5 h-8 my-3"
          />
        </div>

        <div className="flex items-center gap-4 justify-end">
          <span className="font-bold basis-1/5 w-full ">Time Frame:</span>
          <input
            type="text "
            className="rounded-md opacity-50 w-full basis-4/5 h-8 my-3"
          />
        </div>

        <div className="flex items-center gap-4 justify-end">
          <span className="font-bold basis-1/5 w-full ">Travelling Count:</span>
          <input
            type="text"
            className="rounded-md opacity-50 w-full basis-4/5 h-8 my-3"
          />
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;
