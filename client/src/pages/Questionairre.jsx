import React, { useState } from "react";
import { Link } from "react-router-dom";

function Questionnaire() {
  const [formData, setFormData] = useState({
    location: "",
    estimatedBudget: "",
    ageCategory: "",
    timeFrame: "",
    travelingCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form for the submission logic must come here, such as sending the data to a server or performing validation. still in work
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="estimatedBudget">Estimated Budget:</label>
        <input
          type="number"
          id="estimatedBudget"
          name="estimatedBudget"
          value={formData.estimatedBudget}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ageCategory">Type of Trip</label>
        <select
          id="ageCategory"
          name="ageCategory"
          value={formData.ageCategory}
          onChange={handleChange}
        >
          <option value="Fun and Friends">Fun and Friends</option>
          <option value="Religious">Religious</option>
          <option value="Family">Family</option>

          <option value="Educational">Educational</option>
          <option value="Leisure">Leisure</option>
          <option value="Solo">Solo</option>
        </select>
      </div>

      <div>
        <label htmlFor="timeFrame">Time Frame:</label>
        <input
          type="text"
          id="timeFrame"
          name="timeFrame"
          value={formData.timeFrame}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="travelingCount">Traveling Count:</label>
        <input
          type="number"
          id="travelingCount"
          name="travelingCount"
          value={formData.travelingCount}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="content-btn btn">
        <Link to="/Itineraygenerated">Submit</Link>
      </button>
    </form>
  );
}

export default Questionnaire;
