import React, { useState } from "react";

export default function Support() {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  implementation of the  logic is still in work, to send the email here
    // For example, using a backend service like Nodemailer or by triggering the user's email client
    // For demonstration purposes, we're logging the query to the console
    console.log("Query:", query);
    //  the input field should be cleared after submitting
    setQuery("");
  };

  return (
    <div>
      <h3>Write your queries to us</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={handleInputChange}
          placeholder="Type your query here..."
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit" className="content-btn btn">Submit</button>
      </form>
    </div>
  );
}
