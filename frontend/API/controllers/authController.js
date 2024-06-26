import User from "../models/user.js";
import Itinerary from "../models/Itinerary.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utilities/customerror.js";
import jwt from "jsonwebtoken";
import ItineraryGenerated from "../models/generatedItinerary.js";
import axios from "axios";
// for password encryption

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // res.status(500).json(error.message);
    next(error);
    // goes through middleware created.
  }
};

//   awaits makes js stay in this call as long as the job is done. await essentials async function

// localhost:3000/API/auth/signUp the url for api route

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // encripting and compared
    if (!validPassword) return next(errorHandler(401, "wrong details!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // the id is the id generetaed by mingodb just so that no illicit actions againts user by hacker can be done wusing their email or password
    const expiryDate = new Date(Date.now() + 3600000); // cookie valid for 1 hour from current sign in time
    const { password: hashedPassword, ...rest } = validUser._doc;

    // the rest operator, and also here validUser._doc gets only the relevant data not everything is logged. password is hidden to client
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest); // prevent 3rd party applications to modify cookie
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout successfull!");
};

export const createItinerary = async (req, res, next) => {
  const {
    userLocation,
    location,
    estimatedBudget,
    TypeofTrip,
    fromDate,
    toDate,
    travelingCount,
  } = req.body;
  const newItinerary = new Itinerary({
    userLocation,
    location,
    estimatedBudget,
    TypeofTrip,
    fromDate,
    toDate,
    travelingCount,
  });
  try {
    const savedItinerary = await newItinerary.save();
    console.log(savedItinerary._id);
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:5000/itinerary/${savedItinerary._id}`
      );
    } catch (error) {
      console.log(error);
    }
    res.status(201).json({ message: "Itinerary created successfully" });
  } catch (error) {
    next(error);
  }
};

// ... other actions
export const retrieveItineraries = async (req, res, next) => {
  try {
    console.log("Trying to fetch itineraries...");
    const itineraries = await ItineraryGenerated.find()
      .sort({ _id: -1 })
      .limit(1);
    console.log("Fetched itineraries:", itineraries);

    // Retrieve all itineraries

    // Flatten the nested structure and extract the content:
    const itineraryContents = itineraries.flatMap((itinerary) =>
      itinerary ? (itinerary.itineraries || []).map((item) => item.content) : []
    );

    res.json(itineraryContents); // Send the flattened content as JSON response
  } catch (error) {
    next(error);
  }
};
