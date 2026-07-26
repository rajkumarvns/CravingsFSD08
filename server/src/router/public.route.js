import express from "express";
import { ContactUsForm, FeedbackForm, getRestaurants, getDishFeed, getDishReviews } from "../controller/public.controller.js";

const router = express.Router();

router.post("/contact-us", ContactUsForm);
router.post("/feedback", FeedbackForm);
router.get("/restaurants", getRestaurants);
router.get("/dishes/feed", getDishFeed);
router.get("/dishes/:id/reviews", getDishReviews);

export default router;