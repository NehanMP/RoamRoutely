import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Questionairre.css";

const districts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Moneragala",
  "Ratnapura",
  "Kegalle",
];

function Questionnaire() {
  const [formData, setFormData] = useState({
    userLocation: "",
    location: "",
    estimatedBudget: "",
    TypeofTrip: "",
    fromDate: "",
    toDate: "",
    travelingCount: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.id === "fromDate" || e.target.id === "toDate") {
      value = new Date(value);
    } else if (e.target.id === "estimatedBudget" || e.target.id === "travelingCount") {
      // Prevent entering negative numbers
      if (value < 0) {
        value = "";
        alert("Please enter a positive number.");
      }
    }

    setFormData({ ...formData, [e.target.id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fromDate, toDate } = formData;
    const currentDate = new Date();

    // Check if fromDate and toDate are in the past
    if (fromDate && new Date(fromDate) < currentDate) {
      alert("Please select a 'From' date in the present or future.");
      return;
    }

    if (toDate && new Date(toDate) < currentDate) {
      alert("Please select a 'To' date in the present or future.");
      return;
    }

    // Check if fromDate is after toDate
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      alert(
        "Please select valid dates. 'From' date should be before 'To' date."
      );
      return;
    }

    try {
      const response = await fetch("/API/auth/saveItinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data saved successfully");
        // You can add more actions here like redirecting the user to another page
        navigate("/ItineraryGenerated");
      } else {
        console.log("Error saving data");
      }
    } catch (error) {
      console.error("An error occurred while saving the data:", error);
    }
  };

  return (
    <div className="bg-q">
      <div className="content-q">
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="userLocation">Your Location:</label>
            <select id="userLocation" name="userLocation" onChange={handleChange}>
              <option value="">Select a location</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <select id="location" name="location" onChange={handleChange}>
              <option value="">Select a location</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="estimatedBudget">Estimated Budget:</label>
            <input
              type="number"
              id="estimatedBudget"
              name="estimatedBudget"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="TypeofTrip">Type of Trip</label>
            <select id="TypeofTrip" name="TypeofTrip" onChange={handleChange}>
              <option value="cultural">Cultural</option>
              <option value="religious">Religious</option>
              <option value="family">Family</option>
              <option value="Educational">Educational</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>
          <div className="dates">
            <div>
              <label htmlFor="fromDate">From:</label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="toDate">To:</label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="travelingCount">Traveling Count:</label>
            <input
              type="number"
              id="travelingCount"
              name="travelingCount"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="content-btn btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Questionnaire;
