import express from "express";
import { ContactUsForm, FeedbackForm } from "../controller/public.controller.js";

const router = express.Router();

router.post("/contact-us", ContactUsForm);
router.post("/feedback", FeedbackForm);

export default router;