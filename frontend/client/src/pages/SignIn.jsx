import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formdata, setformdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/API/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/Home", { replace: true });
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="bg-signin">
      <div className="content-signin">
      <h1>Sign In page</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {" "}
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>

      <p className="signup-link">
        Dont have an account? <Link to="/signUp">Sign Up</Link>
      </p>
      <p className="error-msg">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
    </div>
  );
}
