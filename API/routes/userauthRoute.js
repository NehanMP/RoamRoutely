import express from "express";
import { signup, signin } from "../controllers/authController.js";
const router = express.Router();

router.post("/signUp", signup);
router.post("/signIn", signin);
export default router;
// export as default so it can be imported however needed.
