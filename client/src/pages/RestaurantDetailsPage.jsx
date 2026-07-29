import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/ApiConfig";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";
import NoDataFoundGif from "../assets/NoDataFound.gif";
import { IoArrowBack, IoStar, IoLocationOutline, IoTimeOutline, IoCartOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // for checking if user is logged in for checkout button

  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]); // [{ item, quantity }]

  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchRestaurantDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/public/restaurant-detail/${restaurantId}`);
      setRestaurantDetails(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during fetching restaurant details. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [restaurantId]);

  // Cart operations
  const getCartQuantity = (itemId) => {
    const cartItem = cart.find(c => c.item._id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    setCart([...cart, { item, quantity: 1 }]);
  };

  const handleUpdateQuantity = (itemId, delta) => {
    setCart((prev) => {
      const existing = prev.find(c => c.item._id === itemId);
      if (!existing) return prev;
      
      const newQuantity = existing.quantity + delta;
      if (newQuantity <= 0) {
        return prev.filter(c => c.item._id !== itemId);
      }
      return prev.map(c => 
        c.item._id === itemId ? { ...c, quantity: newQuantity } : c
      );
    });
  };

  // Cart derivations
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);

  // Close cart if empty - MUST BE ABOVE EARLY RETURNS
  useEffect(() => {
    if (totalItems === 0 && isCartOpen) {
      setIsCartOpen(false);
    }
  }, [totalItems, isCartOpen]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F4EB]">
        <img src={NoDataFoundGif} alt="Loading..." className="w-40 h-40 object-contain drop-shadow-md" />
        <h2 className="mt-4 text-2xl font-extrabold text-[#c2410c] animate-pulse">Loading Menu...</h2>
      </div>
    );
  }

  if (!restaurantDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <NoDataFound height="auto" width="100%" text="Restaurant Not Found" />
        <button 
          onClick={() => navigate(-1)} 
          className="mt-6 bg-[#c2410c] text-white px-6 py-2 rounded-lg shadow font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const restaurant = restaurantDetails.restaurantId;
  const menuItems = restaurantDetails.menuItems || [];
  
  const defaultRestaurantImage = "https://placehold.co/800x400?text=Restaurant";
  const restaurantImage = restaurant?.coverImage?.url || restaurant?.restaurantImage?.[0]?.url || defaultRestaurantImage;

  return (
    <div className="min-h-screen bg-[#F6F4EB] pb-24 font-sans relative">
      {/* Header section similar to mockup with cream/off-white background */}
      <div className="bg-[#FAF7F2] shadow-md relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          {/* Back button */}
          <button 
            onClick={() => navigate("/order-now")} 
            className="flex items-center text-[#c2410c] font-bold mb-6 hover:opacity-80 transition"
          >
            <IoArrowBack className="mr-2" size={20} />
            Back to Restaurants
          </button>

          {/* Restaurant Info Card */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-75 h-48 md:h-45 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-100">
              <img 
                src={restaurantImage} 
                alt={restaurant?.restaurantName} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 pt-1">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                {restaurant?.restaurantName}
              </h1>
              <div className="flex items-center gap-1 mb-2">
                <IoStar className="text-yellow-500" />
                <span className="font-bold text-gray-800">{restaurant?.rating?.toFixed(1) || "New"}</span>
                <span className="text-gray-600 text-sm ml-1 font-medium">
                  ({restaurant?.numReviews || 0} reviews)
                </span>
              </div>
              <p className="text-gray-600 mb-3 capitalize font-medium">
                {restaurant?.cuisineTypes?.join(", ") || "Various Cuisines"}
              </p>
              
              <div className="flex items-start gap-2 text-gray-600 mb-1 text-sm font-medium">
                <IoLocationOutline className="mt-0.5 shrink-0" size={16} />
                <span>{restaurant?.address}, {restaurant?.city}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                <IoTimeOutline size={16} />
                <span>
                  {restaurant?.servingHours?.openingTime || "10:00"} - {restaurant?.servingHours?.closingTime || "23:00"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
        
        {menuItems.length === 0 ? (
          <p className="text-gray-500 text-center py-10 font-medium">No items available at the moment.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => {
              const qty = getCartQuantity(item._id);
              const isVeg = item.type?.toLowerCase() === "vegetarian" || item.type?.toLowerCase() === "veg";
              const itemImage = item.image?.url || "https://placehold.co/150x150?text=Food";

              return (
                <div key={item._id} className="bg-white rounded-xl p-4 shadow-md flex gap-4 transition-transform hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img 
                      src={itemImage} 
                      alt={item.itemName}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{item.itemName}</h3>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          isVeg ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {isVeg ? 'veg' : 'non-veg'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3 font-medium pr-4">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between items-end min-w-20 py-1">
                    <span className="font-bold text-lg text-[#c2410c]">₹{item.price}</span>
                    
                    {qty === 0 ? (
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-[#c2410c] text-white px-5 py-1.5 rounded-md text-sm font-bold shadow hover:bg-[#a3360a] transition flex items-center justify-center min-w-18"
                      >
                        + Add
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#F6F4EB] rounded-md border border-gray-200 overflow-hidden shadow-sm">
                        <button 
                          onClick={() => handleUpdateQuantity(item._id, -1)}
                          className="px-3 py-1.5 text-[#c2410c] hover:bg-gray-200 transition font-bold"
                        >
                          −
                        </button>
                        <span className="px-2 font-bold text-gray-800 min-w-5 text-center text-sm">
                          {qty}
                        </span>
                        <button 
                          onClick={() => handleUpdateQuantity(item._id, 1)}
                          className="px-3 py-1.5 text-[#c2410c] hover:bg-gray-200 transition font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky Cart Footer */}
      {totalItems > 0 && !isCartOpen && (
        <div 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-0 left-0 w-full bg-[#FAF7F2] border-t shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-40 cursor-pointer hover:bg-white transition"
        >
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#c2410c] text-white flex items-center justify-center font-bold text-lg">
                {totalItems}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Items in Cart</p>
                <p className="font-bold text-gray-900">{totalItems} item{totalItems > 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 font-semibold">Total Amount</p>
              <p className="font-bold text-xl text-[#c2410c]">₹{totalAmount.toFixed(2)}</p>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsCartOpen(true);
              }}
              className="bg-[#c2410c] text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#a3360a] transition shadow-md"
            >
              <IoCartOutline size={20} className="hidden sm:block" />
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}>
          <div 
            className="w-full md:w-100 h-full bg-[#FAF7F2] shadow-2xl flex flex-col animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-white">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <IoCartOutline size={24} className="text-[#c2410c]" />
                Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-[#c2410c] font-bold text-xl"
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {cart.map((c) => {
                const isVeg = c.item.type?.toLowerCase() === "vegetarian" || c.item.type?.toLowerCase() === "veg";
                return (
                  <div key={c.item._id} className="flex flex-col bg-white p-3 rounded-lg border border-gray-100 shadow-sm gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-sm border ${isVeg ? 'border-green-600 bg-green-100' : 'border-red-500 bg-red-100'} flex items-center justify-center`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-500'}`}></span>
                        </span>
                        <span className="font-bold text-sm text-gray-800">{c.item.itemName}</span>
                      </div>
                      <span className="font-bold text-[#c2410c] text-sm">₹{(c.item.price * c.quantity).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pl-5">
                      <span className="text-xs text-gray-500 font-medium">₹{c.item.price} each</span>
                      <div className="flex items-center bg-[#FAF7F2] rounded border border-gray-200">
                        <button 
                          onClick={() => handleUpdateQuantity(c.item._id, -1)}
                          className="px-2 py-1 text-[#c2410c] hover:bg-gray-200 font-bold"
                        >
                          −
                        </button>
                        <span className="px-2 font-bold text-gray-800 text-xs min-w-5 text-center">
                          {c.quantity}
                        </span>
                        <button 
                          onClick={() => handleUpdateQuantity(c.item._id, 1)}
                          className="px-2 py-1 text-[#c2410c] hover:bg-gray-200 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Subtotal</span>
                <span className="font-bold text-lg text-gray-900">₹{totalAmount.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => {
                  if (user) {
                    toast.success("Checkout feature coming soon!");
                  } else {
                    navigate("/login");
                  }
                }}
                className="w-full bg-[#c2410c] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#a3360a] shadow transition"
              >
                {user ? "Proceed to Checkout" : "Login to Checkout"}
                <IoArrowBack className="rotate-180" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
