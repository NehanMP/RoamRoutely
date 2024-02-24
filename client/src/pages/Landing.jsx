import React from "react";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="bg">
      <h1 className="Title">Welcome to RoamRoutely</h1>

      <p className="content">
        RoamRoutely is an travel itinerary generating web application which
        allows users to enter a location and the application will provide a
        personalized itinerary based on a questionnaire.
      </p>
      <p className="content">
        Using the questionnaire the application gets information relevant to the
        users traveling interests. Based on the given inputs the application
        will provide the user a personalized itinerary including a schedule, for
        the user on ways how to spend the vacation.
      </p>
    </div>
  );
}
