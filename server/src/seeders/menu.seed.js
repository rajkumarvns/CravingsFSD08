import Menu from "../models/menu.model.js";
import Restaurant from "../models/restaurant.model.js";

const getMenuItemsForRestaurant = (restaurantName) => {
  if (restaurantName.includes("Manohar Dairy")) {
    return [
      {
        itemName: "Chole Bhature",
      description: "Spicy chickpea curry served with two fluffy bhaturas.",
      price: 150,
      category: "Main Course",
      type: "Vegetarian",
      image: {
        url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 521, protein: 23 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "Raj Kachori",
        description: "Crispy kachori filled with potatoes, sprouts, and sweet curd.",
        price: 120,
        category: "Snacks",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 272, protein: 32 },
        status: "available",
      },
      {
        itemName: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled to perfection.",
        price: 250,
        category: "Starters",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 469, protein: 14 },
        status: "available",
        isRecommended: true,
      },
      {
        itemName: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potato mash, served with sambar and chutney.",
      price: 130,
      category: "Main Course",
      type: "Vegetarian",
      image: {
        url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 582, protein: 18 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "Rasmalai (2 Pcs)",
        description: "Soft cottage cheese dumplings soaked in sweetened, thickened milk.",
        price: 90,
        category: "Dessert",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 519, protein: 27 },
        status: "available",
      },
      {
        itemName: "Deluxe Veg Thali",
        description: "A complete meal with dal makhani, shahi paneer, mix veg, rice, raita, sweet, and breads.",
        price: 299,
        category: "Thali",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 248, protein: 22 },
        status: "available",
        isRecommended: true,
      }
    ];
  } else if (restaurantName.includes("Sagar Gaire")) {
    return [
      {
        itemName: "Veg Cheese Burger",
        description: "Signature crispy patty with double cheese and creamy mayo.",
        price: 90,
        category: "Burger",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 323, protein: 30 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "White Sauce Pasta",
        description: "Penne pasta tossed in rich, creamy, cheesy white sauce.",
        price: 150,
        category: "Italian",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 281, protein: 18 },
        status: "available",
      },
      {
        itemName: "Cold Coffee",
        description: "Thick, creamy, and refreshing cold coffee.",
        price: 80,
        category: "Beverages",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 307, protein: 13 },
        status: "available",
        isRecommended: true,
      },
      {
        itemName: "Cheese Corn Sandwich",
        description: "Grilled sandwich stuffed with sweet corn and melted cheese.",
        price: 110,
        category: "Snacks",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 534, protein: 18 },
        status: "available",
      },
      {
        itemName: "Veg Wrap",
        description: "Tortilla wrapped with crispy veggies, sauces, and cheese.",
        price: 100,
        category: "Wrap",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 205, protein: 27 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "Red Sauce Pasta",
        description: "Tangy tomato-based pasta loaded with vegetables.",
        price: 140,
        category: "Italian",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 202, protein: 33 },
        status: "available",
      }
    ];
  } else if (restaurantName.includes("Zam Zam")) {
    return [
      {
        itemName: "Chicken Biryani",
        description: "Aromatic basmati rice layered with spiced chicken.",
        price: 220,
        category: "Biryani",
        type: "Non-Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 556, protein: 23 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "Mutton Korma",
        description: "Tender mutton pieces cooked in rich Mughlai gravy.",
        price: 350,
        category: "Main Course",
        type: "Non-Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 244, protein: 20 },
        status: "available",
      },
      {
        itemName: "Chicken Shawarma",
        description: "Juicy grilled chicken wrapped in soft pita bread.",
        price: 110,
        category: "Wrap",
        type: "Non-Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 279, protein: 24 },
        status: "available",
        isRecommended: true,
      },
      {
        itemName: "Tandoori Chicken (Half)",
      description: "Chicken marinated in yogurt and spices, roasted in a tandoor.",
      price: 280,
      category: "Main Course",
      type: "Non-Vegetarian",
      image: {
        url: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 318, protein: 21 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "Butter Chicken",
        description: "Classic creamy tomato curry with tender chicken pieces.",
        price: 320,
        category: "Main Course",
        type: "Non-Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 260, protein: 6 },
        status: "available",
      },
      {
        itemName: "Rumali Roti",
        description: "Extremely thin, soft bread served folded like a handkerchief.",
        price: 20,
        category: "Breads",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 324, protein: 5 },
        status: "available",
      }
    ];
  } else if (restaurantName.includes("Sharma & Vishnu")) {
    return [
      {
        itemName: "Veg Manchurian",
        description: "Crispy vegetable balls tossed in spicy soy gravy.",
        price: 160,
        category: "Chinese",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 324, protein: 16 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "Hakka Noodles",
        description: "Wok-tossed noodles with fresh vegetables and sauces.",
        price: 140,
        category: "Chinese",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 597, protein: 31 },
        status: "available",
      },
      {
        itemName: "Paneer Chilli",
        description: "Spicy and tangy paneer cubes cooked Chinese style.",
        price: 190,
        category: "Starters",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 298, protein: 20 },
        status: "available",
      },
      {
        itemName: "Veg Fried Rice",
        description: "Aromatic basmati rice tossed with fresh chopped vegetables.",
        price: 130,
        category: "Chinese",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 346, protein: 10 },
        status: "available",
      },
      {
        itemName: "Spring Rolls",
        description: "Crispy fried rolls stuffed with a savory mixed vegetable filling.",
        price: 120,
        category: "Snacks",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 539, protein: 33 },
        status: "available",
        isRecommended: true,
      },
      {
        itemName: "Honey Chilli Potato",
        description: "Crispy potato fries glazed in a sweet and spicy honey sauce.",
        price: 150,
        category: "Starters",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 314, protein: 7 },
        status: "available",
      }
    ];
  } else if (restaurantName.includes("Bake N Shake")) {
    return [
      {
        itemName: "Chocolate Truffle Cake (Slice)",
        description: "Rich, dense chocolate cake loaded with truffle cream.",
        price: 130,
        category: "Bakery",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 559, protein: 12 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "Oreo Shake",
        description: "Thick milkshake blended with Oreo cookies.",
        price: 160,
        category: "Beverages",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 531, protein: 34 },
        status: "available",
      },
      {
        itemName: "Peri Peri Fries",
        description: "Crispy french fries tossed in spicy peri peri seasoning.",
        price: 110,
        category: "Snacks",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 314, protein: 31 },
        status: "available",
      },
      {
        itemName: "Chicken Patties",
        description: "Flaky puff pastry stuffed with spiced minced chicken.",
        price: 45,
        category: "Bakery",
        type: "Non-Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 460, protein: 27 },
        status: "available",
        isTopRated: true,
      },
      {
        itemName: "Cold Coffee with Ice Cream",
        description: "Classic cold coffee topped with a generous scoop of vanilla ice cream.",
        price: 120,
        category: "Beverages",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 543, protein: 15 },
        status: "available",
        isRecommended: true,
      },
      {
        itemName: "Veg Club Sandwich",
        description: "Three-layered sandwich packed with fresh veggies, cheese, and mayo.",
        price: 140,
        category: "Snacks",
        type: "Vegetarian",
        image: { url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400" },
        macros: { calories: 332, protein: 23 },
        status: "available",
      }
    ];
  }
  
  // Default fallback
  return [
    {
      itemName: "Classic Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, basil leaves, and oregano.",
      price: 299,
      category: "Pizza",
      type: "Vegetarian",
      image: { url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400" },
      macros: { calories: 554, protein: 24 },
        status: "available",
    }
  ];
};

const menuSeed = async () => {
  try {
    const menus = await Menu.find({}).populate("restaurantId");
    console.log(`Found ${menus.length} menus to populate...`);
    
    for (const menu of menus) {
      if (menu.restaurantId && menu.restaurantId.restaurantName) {
        const restaurantName = menu.restaurantId.restaurantName;
        const newItems = getMenuItemsForRestaurant(restaurantName);
        
        // Clear existing items just in case and push new
        menu.menuItems = newItems;
        await menu.save();
        console.log(`Added realistic items for restaurant: ${restaurantName}`);
      }
    }
    console.log("Realistic Menu seeding complete!");
  } catch (error) {
    console.error("Error seeding menu:", error);
  }
};

export default menuSeed;
