import Menu from "../models/menu.model.js";
import User from "../models/user.model.js";

const dummyMenu = [
  {
    itemName: "Classic Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil leaves, and oregano.",
    price: 299,
    category: "Pizza",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/pizza1/600/600",
      publicId: "dummy-pizza-1",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
  },
  {
    itemName: "Crispy Veg Burger",
    description:
      "Loaded with crispy vegetable patty, lettuce, cheese, and mayo.",
    price: 179,
    category: "Burger",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/burger1/600/600",
      publicId: "dummy-burger-1",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: true,
  },
  {
    itemName: "Paneer Tikka Wrap",
    description:
      "Soft tortilla stuffed with spicy paneer tikka and fresh veggies.",
    price: 229,
    category: "Wrap",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/wrap1/600/600",
      publicId: "dummy-wrap-1",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: false,
    isNew: false,
  },
  {
    itemName: "Chocolate Brownie Sundae",
    description: "Warm chocolate brownie served with vanilla ice cream.",
    price: 199,
    category: "Dessert",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/dessert1/600/600",
      publicId: "dummy-dessert-1",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: true,
  },
  {
    itemName: "Cold Coffee Delight",
    description: "Refreshing chilled coffee topped with whipped cream.",
    price: 149,
    category: "Beverages",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/coffee1/600/600",
      publicId: "dummy-coffee-1",
    },
    status: "discontinued",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
  },
  {
    itemName: "Chicken Tikka Pizza",
    description:
      "Stone-baked pizza topped with spicy chicken tikka and mozzarella.",
    price: 399,
    category: "Pizza",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-pizza/600/600",
      publicId: "dummy-chicken-pizza",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
  },
  {
    itemName: "Grilled Chicken Burger",
    description:
      "Juicy grilled chicken patty with lettuce, cheese, and smoky sauce.",
    price: 279,
    category: "Burger",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-burger/600/600",
      publicId: "dummy-chicken-burger",
    },
    status: "available",
    isTopRated: true,
    isRecommended: false,
    isNew: true,
  },
  {
    itemName: "Butter Chicken",
    description: "Tender chicken cooked in a rich, creamy tomato gravy.",
    price: 429,
    category: "Main Course",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/butter-chicken/600/600",
      publicId: "dummy-butter-chicken",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
  },
  {
    itemName: "Chicken Biryani",
    description:
      "Fragrant basmati rice cooked with marinated chicken and aromatic spices.",
    price: 349,
    category: "Biryani",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-biryani/600/600",
      publicId: "dummy-chicken-biryani",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: true,
  },
  {
    itemName: "Fish & Chips",
    description:
      "Crispy battered fish fillet served with golden fries and tartar sauce.",
    price: 379,
    category: "Seafood",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/fish-chips/600/600",
      publicId: "dummy-fish-chips",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: false,
  },
  {
    itemName: "Prawn Fried Rice",
    description:
      "Wok-tossed fried rice with juicy prawns, vegetables, and soy sauce.",
    price: 389,
    category: "Rice",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/prawn-rice/600/600",
      publicId: "dummy-prawn-rice",
    },
    status: "discontinued",
    isTopRated: false,
    isRecommended: false,
    isNew: true,
  },
  {
    itemName: "Chicken Shawarma Wrap",
    description:
      "Grilled chicken wrapped with fresh veggies, garlic sauce, and pita bread.",
    price: 249,
    category: "Wrap",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/shawarma-wrap/600/600",
      publicId: "dummy-shawarma-wrap",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
  },
  {
    itemName: "Spicy Chicken Wings",
    description: "Crispy chicken wings tossed in a fiery hot sauce.",
    price: 299,
    category: "Starter",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-wings/600/600",
      publicId: "dummy-chicken-wings",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
  },
];

const menuSeed = async () => {
  try {
    const menus = await Menu.find({});
    console.log(`Found ${menus.length} menus to check...`);
    
    for (const menu of menus) {
      const existingNames = menu.menuItems.map(i => i.itemName);
      const newItems = dummyMenu.filter(d => !existingNames.includes(d.itemName));
      
      if (newItems.length > 0) {
        menu.menuItems.push(...newItems);
        await menu.save();
        console.log(`Added ${newItems.length} dummy items to restaurant ${menu.restaurantId}`);
      } else {
        console.log(`Restaurant ${menu.restaurantId} already has all dummy items.`);
      }
    }
    console.log("Menu seeding complete!");
  } catch (error) {
    console.error("Error seeding menu:", error);
  }
};

export default menuSeed;
