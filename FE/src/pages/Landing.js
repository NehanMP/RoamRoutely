import React from "react";

const Landing = () => {
  return (
    <div className="p-8 my-24 w-2/3">
      <h1 className="text-center text-2xl underline text-white font-bold my-4 ">
        Welcome to RoamRoutely
      </h1>
      <p className="text-center text-white font-medium my-4">
        RoamRoutely is an travel itinerary generating web application which
        allows users to enter a location and the application will provide a
        personalized itinerary based on a questionnaire.
      </p>
      <p className="text-center text-white font-medium my-4">
        Using the questionnaire the application gets information relevant to the
        users traveling interests. Based on the given inputs the application
        will provide the user a personalized itinerary including a schedule, for
        the user on ways how to spend the vacation.
      </p>
    </div>
  );
};

export default Landing;
