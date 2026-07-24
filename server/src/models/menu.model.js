import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true, default: "Vegetarian" },
    image: {
      url: { type: String },
      publicId: { type: String }
    },
    status: {
      type: String,
      enum: ["available", "unavailable", "discontinued"],
      default: "available"
    },
    isTopRated: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
  },
  { suppressReservedKeysWarning: true }
);

const MenuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
    menuItems: [MenuItemSchema],
  },
  { timestamps: true, suppressReservedKeysWarning: true },
);

const Menu = mongoose.model("menu", MenuSchema);

export default Menu;
