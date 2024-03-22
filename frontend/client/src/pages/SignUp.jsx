import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./SignUp.css";
export default function SignUp() {
  //  form data stored in state

  const [formdata, setformdata] = useState({});
  // initial value, an empty object
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
    // the spread operator
  };
  console.log(formdata);

  const handleSubmit = async (e) => {
    // should be asynchronous, cuz it should wait until data is passed. if fetch is used await is used so async is mandatory
    e.preventDefault();
    // prevents refreasing the page upon clicking submit button
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/API/auth/signUp", {
        // esssentail if fetch is used instead of axios 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
  
      const data = await res.json();
      console.log(data);
    
  
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/SignIn");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
    
  return (
    <div className="bg-signup">
      <div className="content-signup">
      <h1>Sign up page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            onChange={handleChange}
            placeholder="username"
            id="username"
            // id added to fecth unique formdata and get its value
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            onChange={handleChange}
            placeholder="email"
            id="email"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            onChange={handleChange}
            placeholder="password"
            id="password"
          />
        </label>
        <br />
        <button type="submit" disabled={loading}> {loading ? 'creating profile...' : 'Sign Up'}</button>
      </form>

      <p>
        Already have an account? <Link to="/signIn">Sign In</Link>
      </p>
      <p className="error-msg">{error && 'Something went wrong!'}</p>
    </div>
    </div>
  );
}