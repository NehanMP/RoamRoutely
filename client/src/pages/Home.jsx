import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

export default function home() {
  return (
    <div className="home-body">
      <button className="content-btn btn">Existing Itineraries </button>
      <div className="content-main">
        <h2>RoamRoutely</h2>
        <div className="sub-content">
          <div className="sub-content-1 inner-cont">
            <h2>Genrate Your Itinerary now!</h2>
            <p>Generate a personlaized Itinerary based on your requirments</p>
            <button className="content-btn btn">
              <Link to="/Questionairre">Generate a Personalized Itinerary</Link>
            </button>
          </div>
          <div className="sub-content-2 inner-cont">
            <h2>Convert Currencies</h2>
            <p>
              Utilize the currency converter feature to convert any world
              currencies into another currency.
            </p>
            <button className="content-btn btn">
              <Link to="/CC">Convert Currencies now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
