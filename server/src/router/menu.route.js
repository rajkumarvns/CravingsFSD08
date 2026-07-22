import express from "express";
import { getMenuItems, createMenuItem, updateMenuItem } from "../controller/menu.controller.js";
// import checkAuth from "../middleware/auth.middleware.js"; // Optional, depending on existing auth

const router = express.Router();

router.get("/:restaurantId", getMenuItems);
router.post("/create", createMenuItem);
router.put("/update/:itemId", updateMenuItem);

export default router;
