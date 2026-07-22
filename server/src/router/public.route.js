import express from "express";
import { ContactUsForm, FeedbackForm, getRestaurants } from "../controller/public.controller.js";

const router = express.Router();

router.post("/contact-us", ContactUsForm);
router.post("/feedback", FeedbackForm);
router.get("/restaurants", getRestaurants);

export default router;