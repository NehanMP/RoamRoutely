import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/User/userSlice";

export default function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  const handleSignOut = async () => {
    try {
      await fetch("/API/auth/signout");
      dispatch(signOut());
      navigate("/SignIn", { replace: true }); // Then navigate to SignIn page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav">
      <nav className="navbar">
        <img
          src="../public/images/Travel_App__1_-removebg-preview.png"
          alt="logo"
          className="logo"
        ></img>
        <ul className="nav-link">
          {!isSignedIn ? (
            <>
              <Link to="/AboutUs">
                <li>About Us</li>
              </Link>
              <Link to="/Support">
                <li>Support</li>
              </Link>
              <Link to="/SignUp">
                <li className="btn-s">Sign Up</li>
              </Link>
              <Link to="/SignIn">
                <li className="btn-s">Sign In</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Home">
                <li>Home</li>
              </Link>
              <Link to="/AboutUs">
                <li>About Us</li>
              </Link>
              <Link to="/Support">
                <li>Support</li>
              </Link>
              <Link to="/Map">
                <li>Explore</li>
              </Link>
              <li onClick={handleSignOut} className="btn-s">
                Sign Out
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
