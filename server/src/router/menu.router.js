import express from "express";
import { getMenuItems, createMenuItem } from "../controller/menu.controller.js";
// import checkAuth from "../middleware/auth.middleware.js"; // Optional, depending on existing auth

const router = express.Router();

router.get("/:restaurantId", getMenuItems);
router.post("/create", createMenuItem);

export default router;
