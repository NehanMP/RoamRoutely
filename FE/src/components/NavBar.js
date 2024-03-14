import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NavBar = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  });

  const navBarItems = [
    { id: 1, name: "Home" },
    { id: 2, name: "About Us" },
    { id: 3, name: "Support" },
    { id: 4, name: "Agencies" },
    { id: 5, name: "Questionnaire" },
  ];

  return (
    <nav className="flex justify-between items-center bg-zinc-950 py-4 px-20">
      {/* logo div */}
      <div>
        <img src={logo} alt="logo" className="h-14" />
      </div>

      {/* nav links div */}
      <div>
        <ul className="flex justify-between items-center gap-6 text-white">
          {navBarItems.map((item, index) => {
            return (
              <li key={index} className="cursor-pointer">
                <Link to={`/${item.name}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* button div */}
      <div>
        {location.pathname === "/SignIn" || location.pathname === "/SignUp" ? (
          <div className="flex gap-2 items-center">
            <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full">
              <Link to="/SignIn">Sign In</Link>
            </button>
            <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full">
              <Link to="/SignUp">Sign Up</Link>
            </button>
          </div>
        ) : (
          <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full">
            <Link to="/SignIn">Sign Out</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

