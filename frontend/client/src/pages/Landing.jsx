import React from "react";
import "./Landing.css";
import videoSrc from "../../public/images/video.webm"; // Import your webm video file

export default function Landing() {
  return (
    <div className="bg-landing">
      <video autoPlay muted loop className="bg-video">
        <source src={videoSrc} type="video/webm" />
        {/* Include other video formats here if needed */}
        Your browser does not support the video tag.
      </video>
      <h1 className="title">Welcome to RoamRoutely</h1>
      <p className="content">
        RoamRoutely is a travel itinerary generating web application which
        allows users to enter a location and the application will provide a
        personalized itinerary based on a questionnaire.
      </p>
      <p className="content">
        Using the questionnaire, the application gathers information relevant to
        the user's traveling interests. Based on the given inputs, the
        application will provide the user a personalized itinerary including a
        schedule for the user on ways how to spend the vacation.
      </p>
    </div>
  );
}
