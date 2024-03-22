import React, { useState, useEffect, useRef } from "react";
import "./ItineraryGenerated.css";
import { Link } from 'react-router-dom';

// ... other imports

export default function ItineraryGenerated() {
  const [itineraryContents, setItineraryContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const itineraryRef = useRef(null); // Add this line

  useEffect(() => {
    const fetchItineraryData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const res = await fetch("/API/auth/itineraries"); // Adjust the base URL if needed

        if (!res.ok) {
          throw new Error("Failed to fetch itineraries");
        }

        const data = await res.json();
        setItineraryContents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItineraryData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleShareClick = () => { // Add this function
    const itineraryText = itineraryRef.current.innerText;
    navigator.clipboard.writeText(itineraryText).then(() => {
      alert('Copied to clipboard'); // Add this line
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="content-body-ig">
      <div className="button-container-ig">
        <button className="content-btn btn ig-btn" onClick={handleEditClick}>
          {isEditing ? "Finish Editing" : "Edit Itinerary"}
        </button>
        <button className="content-btn btn ig-btn" onClick={handleShareClick}> 
          Share Itinerary
        </button>
      </div>

      <div className="sub-content-ig">
        <h3>Your Itinerary</h3>

        {isLoading && <p>Loading itinerary...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading &&
          !error &&
          itineraryContents &&
          itineraryContents.length === 0 && <p>No itineraries found.</p>}
        {!isLoading && !error && itineraryContents && (
          <>
            {" "}
            {/* Use a fragment to avoid unnecessary DOM nodes */}
            {itineraryContents.length > 0 ? (
              <ul className="itinerary" ref={itineraryRef}> 
                {itineraryContents.map((content, index) => (
                  <li key={index}>
                    <h3>
                      {
                        content && content.includes("Travel")
                          ? "Travel"
                          : `Day ${
                              content.split(" - ")[0].split("Day ")[1] || ""
                            }` // Handle potential undefined values
                      }
                    </h3>
                    <p contentEditable={isEditing}>{content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No itineraries found.</p>
            )}
            <Link to="/Questionairre">
              <button className="content-btn btn regen-btn">Re-generate</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
