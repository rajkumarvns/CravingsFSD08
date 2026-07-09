import Menu from "../models/menu.model.js";

export const getMenuItems = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await Menu.find({ restaurantId });
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    
    // In a real app, restaurantId comes from req.user (authenticated manager)
    // For now, if passed in body, use it, else wait for auth middleware integration
    const restaurantId = req.body.restaurantId || req.user?._id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Restaurant ID is required" });
    }

    const newItem = await Menu.create({
      restaurantId,
      name,
      description,
      price,
      category,
    });

    res.status(201).json({ success: true, data: newItem, message: "Menu item created successfully" });
  } catch (error) {
    next(error);
  }
};
