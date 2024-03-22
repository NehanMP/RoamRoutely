import express from "express";
import { signup, signin, signout,createItinerary, retrieveItineraries } from "../controllers/authController.js";
const router = express.Router();

router.post("/signUp", signup);
router.post("/signIn", signin);
router.get("/signout", signout);
router.post("/saveItinerary",createItinerary);
router.get('/itineraries', retrieveItineraries); 

export default router;
// export as default so it can be imported however needed.
