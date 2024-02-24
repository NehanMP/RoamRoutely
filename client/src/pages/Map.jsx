import React, { useEffect, useState } from "react";
import Mapper from "../components/Mapper";
import List from "../components/List";
import { getplacedata } from "./FrontendAPIs/RRApi";

import "./Map.css";

export default function Map() {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState(null); // Initialize to null
  const [loading, setLoading] = useState(true); // Add loading state

  const [bounds, setBounds] = useState({
    sw: { lat: 0, lng: 0 },
    ne: { lat: 0, lng: 0 },
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setLoading(false); // Set loading to false if geolocation is not supported
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
          setLoading(false); // Set loading to false after coords are set
        },
        (error) => {
          console.log(
            "Error Code: " + error.code + " Message: " + error.message
          );
          setLoading(false); // Set loading to false if there is an error
        },
        {
          enableHighAccuracy: true,
          timeout: 5000, // Increase timeout to 5000 milliseconds
        }
      );
    }
  };

  useEffect(() => {
    console.log("useEffect running");
    console.log("coords:", coords);
    console.log("bounds:", bounds);

    // Check if coords and bounds are defined
    if (
      coords &&
      bounds &&
      bounds.sw &&
      bounds.ne &&
      bounds.sw.lat &&
      bounds.sw.lng &&
      bounds.ne.lat &&
      bounds.ne.lng
    ) {
      console.log("Making API call");
      getplacedata(bounds.sw, bounds.ne)
        .then((data) => {
          console.log("API call successful, data:", data);
          if (Array.isArray(data)) {
            setPlaces(data);
          } else {
            console.error("Data is not an array:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching place data:", error);
        });
    } else {
      console.log("Not making API call because condition is not met");
      console.log("coords:", coords);
      console.log("bounds:", bounds);
    }
  }, [coords, bounds]);

  // Add this useEffect to update bounds when coords change
  useEffect(() => {
    if (coords) {
      setBounds({
        sw: { lat: coords.lat - 0.01, lng: coords.lng - 0.01 },
        ne: { lat: coords.lat + 0.01, lng: coords.lng + 0.01 },
      });
    }
  }, [coords]);

  return (
    <div className="container">
      <button onClick={getLocation}>Find near me</button>
      <div className="list">
        <List places={places} className="places"/>
      </div>
      <div className="mapper">
        {loading ? (
          <p>Getting location...</p>
        ) : coords ? (
          <Mapper
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={places}
          />
        ) : (
          <p>
            Unable to get location. Please check your location settings and try
            again.
          </p>
        )}
      </div>
    </div>
  );
}
