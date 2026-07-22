import Menu from "../models/menu.model.js";

export const getMenuItems = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const menu = await Menu.findOne({ restaurantId });
    res.status(200).json({ success: true, data: menu ? menu.menuItems : [] });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const { itemName, description, price, category } = req.body;
    
    // In a real app, restaurantId comes from req.user (authenticated manager)
    // For now, if passed in body, use it, else wait for auth middleware integration
    const restaurantId = req.body.restaurantId || req.user?._id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Restaurant ID is required" });
    }

    const newItem = {
      itemName,
      description,
      price:
      Number(price),
      category,
      image: { url: "", publicId: "" },
    };

    const updatedMenu = await Menu.findOneAndUpdate(
      { restaurantId },
      { $push: { menuItems: newItem } },
      { new: true, upsert: true }
    );

    const addedItem = updatedMenu.menuItems[updatedMenu.menuItems.length - 1];

    res.status(201).json({ success: true, data: addedItem, message: "Menu item created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { itemName, description, price, category, status } = req.body;
    const restaurantId = req.body.restaurantId || req.user?._id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Restaurant ID is required" });
    }

    const updatedMenu = await Menu.findOneAndUpdate(
      { restaurantId, "menuItems._id": itemId },
      { 
        $set: { 
          "menuItems.$.itemName": itemName,
          "menuItems.$.description": description,
          "menuItems.$.price": Number(price),
          "menuItems.$.category": category,
          "menuItems.$.status": status,
        } 
      },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    const updatedItem = updatedMenu.menuItems.find(item => item._id.toString() === itemId);

    res.status(200).json({ success: true, data: updatedItem, message: "Menu item updated successfully" });
  } catch (error) {
    next(error);
  }
};
