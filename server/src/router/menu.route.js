import express from "express";
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "../controller/menu.controller.js";
// import checkAuth from "../middleware/auth.middleware.js"; // Optional, depending on existing auth

import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/:restaurantId", getMenuItems);
router.post("/create", upload.single("image"), createMenuItem);
router.put("/update/:itemId", upload.single("image"), updateMenuItem);
router.delete("/delete/:itemId", deleteMenuItem);

export default router;
