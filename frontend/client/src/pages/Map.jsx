import React, { useEffect, useState } from "react";
import Mapper from "../components/Mapper";
import List from "../components/List";
import { getplacedata, getWeatherData } from "./FrontendAPIs/RRApi";
import { IoMdSearch } from "react-icons/io";

import "./Map.css";

const districts = [
  { name: "Colombo", coords: { lat: 6.9271, lng: 79.8612 } },
  { name: "Gampaha", coords: { lat: 7.0873, lng: 79.9998 } },
  { name: "Kalutara", coords: { lat: 6.5854, lng: 79.9607 } },
  { name: "Kandy", coords: { lat: 7.2906, lng: 80.6337 } },
  { name: "Matale", coords: { lat: 7.4675, lng: 80.6234 } },
  { name: "Nuwara Eliya", coords: { lat: 6.9700, lng: 80.7828 } },
  { name: "Galle", coords: { lat: 6.0535, lng: 80.2210 } },
  { name: "Matara", coords: { lat: 5.9490, lng: 80.5350 } },
  { name: "Hambantota", coords: { lat: 6.1240, lng: 81.1184 } },
  { name: "Jaffna", coords: { lat: 9.6615, lng: 80.0255 } },
  { name: "Kilinochchi", coords: { lat: 9.3917, lng: 80.4037 } },
  { name: "Mannar", coords: { lat: 8.9756, lng: 79.9071 } },
  { name: "Vavuniya", coords: { lat: 8.7544, lng: 80.4986 } },
  { name: "Mullaitivu", coords: { lat: 9.2678, lng: 80.8121 } },
  { name: "Batticaloa", coords: { lat: 7.7180, lng: 81.7011 } },
  { name: "Ampara", coords: { lat: 7.2804, lng: 81.6666 } },
  { name: "Trincomalee", coords: { lat: 8.5877, lng: 81.2152 } },
  { name: "Kurunegala", coords: { lat: 7.4900, lng: 80.3633 } },
  { name: "Puttalam", coords: { lat: 8.0380, lng: 79.8280 } },
  { name: "Anuradhapura", coords: { lat: 8.3210, lng: 80.4037 } },
  { name: "Polonnaruwa", coords: { lat: 7.9403, lng: 81.0188 } },
  { name: "Badulla", coords: { lat: 6.9934, lng: 81.0556 } },
  { name: "Moneragala", coords: { lat: 6.8804, lng: 81.3400 } },
  { name: "Ratnapura", coords: { lat: 6.7052, lng: 80.3860 } },
  { name: "Kegalle", coords: { lat: 7.2514, lng: 80.3464 } }
];

export default function Map() {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [childClicked, setChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [bounds, setBounds] = useState({
    sw: { lat: 0, lng: 0 },
    ne: { lat: 0, lng: 0 },
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        (error) => {
          console.log(
            "Error Code: " + error.code + " Message: " + error.message
          );
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    }
  };

  useEffect(() => {
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
      getWeatherData(coords.lat, coords.lng).then((data) =>
        setWeatherData(data)
      );
      getplacedata(type, bounds.sw, bounds.ne)
        .then((data) => {
          if (Array.isArray(data)) {
            setPlaces(data);
            setFilteredPlaces([]);
          } else {
            console.error("Data is not an array:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching place data:", error);
        });
    }
  }, [type, coords, bounds]);

  useEffect(() => {
    if (coords) {
      setBounds({
        sw: { lat: coords.lat - 0.01, lng: coords.lng - 0.01 },
        ne: { lat: coords.lat + 0.01, lng: coords.lng + 0.01 },
      });
    }
  }, [coords]);

  useEffect(() => {
    let filteredPlaces = places;

    if (rating) {
      filteredPlaces = places.filter(
        (place) => Number(place.rating) > Number(rating)
      );
    }

    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  const handleDistrictChange = (event) => {
    const selectedDistrictName = event.target.value;
    const selectedDistrict = districts.find(
      (district) => district.name === selectedDistrictName
    );
    if (selectedDistrict) {
      setCoords(selectedDistrict.coords);
      setSelectedDistrict(selectedDistrictName);
    }
  };

  return (
    <div className="container">
      <div className="district-dropdown">
        <select onChange={handleDistrictChange}>
          <option value="">Select a district</option>
          {districts.map((district, index) => (
            <option key={index} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button onClick={getLocation} className="content-btn btn">
          Find near me
        </button>
      </div>
      <div className="list">
        <List
          places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          className="places"
        />
      </div>
      <div className="mapper">
        {loading ? (
          <p>Loading...</p>
        ) : coords ? (
          <Mapper
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
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
