import React from "react";


export default function ItineraryGenerated() {
  return (
    <div className="content-body">
      <button className="content-btn btn">Edit Itinerary</button>
      <button className="content-btn btn">Share Itinerary</button>
      <button className="content-btn btn">Save Itinerary</button>
      
      <div className="sub-content">
        <h3>Your Itinerary</h3>
        <button className="content-btn btn">Re-generate</button>
      </div>
    </div>
  );
}
