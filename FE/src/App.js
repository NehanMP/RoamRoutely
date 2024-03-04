import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import Support from "./pages/Support";
import About from "./pages/About";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="bg-[url('./bg.jpg')] h-screen w-full bg-cover bg-center font-body font-light text-sm bg-fixed">
        <NavBar />
        <div className="flex justify-center items-center px-56">
          <Routes>
            <Route exact path="/Home" element={<Home />} />
            <Route path="/About Us" element={<About />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/Questionnaire" element={<Questionnaire />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
