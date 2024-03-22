import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NavBar from "./components/navBar";
import AboutUs from "./pages/AboutUs";
import Questionairre from "./pages/Questionairre";
import Support from "./pages/Support";
import ItineraryGenerated from "./pages/ItineraryGenerated";
import CurrencyConvertor from "./pages/CurrencyConvertor";
import Map from "./pages/Map";
import Footer from "./components/Footer";
import withAuth from "./components/withAuth"; // HOC 

const AuthenticatedHome = withAuth(Home);
const AuthenticatedSupport = withAuth(Support);
const AuthenticatedQuestionairre = withAuth(Questionairre);
const AuthenticatedItineraryGenerated = withAuth(ItineraryGenerated);
const AuthenticatedCurrencyConvertor = withAuth(CurrencyConvertor);
const AuthenticatedMap = withAuth(Map);

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<AuthenticatedHome />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Support" element={<AuthenticatedSupport />} />
        <Route path="/Questionairre" element={<AuthenticatedQuestionairre />} />
        <Route
          path="/ItineraryGenerated"
          element={<AuthenticatedItineraryGenerated />}
        />
        <Route path="/CC" element={<AuthenticatedCurrencyConvertor />} />
        <Route path="/Map" element={<AuthenticatedMap />} />
      </Routes>
      <Footer />
    </Router>
  );
}
