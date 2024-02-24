import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NavBar from "./components/navBar"
import AboutUs from "./pages/AboutUs";
import Questionairre from "./pages/Questionairre";
import Support from "./pages/Support";
import ItineraryGenerated from "./pages/ItineraryGenerated";
import CurrencyConvertor from "./pages/CurrencyConvertor";
import Map from "./pages/Map";

export default function App() {
  return (
    <Router>
     <NavBar/>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Questionairre" element={<Questionairre />} />
        <Route path="/Itineraygenerated" element={<ItineraryGenerated />} />
        <Route path="/CC" element={<CurrencyConvertor />} />
        <Route path="/Map" element={<Map />} />
      </Routes>

    </Router>
  );
}
