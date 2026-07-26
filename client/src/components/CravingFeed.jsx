import React, { useState, useEffect } from 'react';
import api from '../config/ApiConfig';
import { FaHeart, FaTimes, FaShoppingCart, FaFire, FaLeaf, FaDumbbell, FaSlidersH } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CravingFeed = () => {
  const [dishes, setDishes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Macro filter state
  const [showFilters, setShowFilters] = useState(false);
  const [macros, setMacros] = useState({
    maxCalories: '',
    minProtein: ''
  });

  useEffect(() => {
    fetchFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [macros]);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      
      // Build query string based on macros
      const params = new URLSearchParams();
      if (macros.maxCalories) params.append('maxCalories', macros.maxCalories);
      if (macros.minProtein) params.append('minProtein', macros.minProtein);

      const { data } = await api.get(`/public/dishes/feed?${params.toString()}`);
      setDishes(data.data || []);
      setCurrentIndex(0); // Reset index when feed reloads
    } catch (error) {
      console.error('Failed to fetch feed:', error);
      toast.error('Failed to load cravings feed');
    } finally {
      setLoading(false);
    }
  };

  const handleMacroChange = (e) => {
    const { name, value } = e.target;
    setMacros(prev => ({ ...prev, [name]: value }));
  };

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      toast.success('Added to cravings list!');
    }
    
    if (currentIndex < dishes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      toast("You've seen all the dishes!", { icon: '🍽️' });
    }
  };

  const addToCart = () => {
    toast.success('Added to Cart!');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto relative">
      
      {/* Macro Filters Header */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_20px_-4px_rgba(249,115,22,0.1)] border border-orange-100 dark:border-orange-900/50 p-4 mb-4 transition-all">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
          <div className="flex items-center gap-2 text-(--color-primary) font-bold text-lg">
            <FaDumbbell className="animate-pulse" /> <span>Fitness Goals</span>
          </div>
          <FaSlidersH className={`text-orange-400 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
        </div>
        
        {showFilters && (
          <div className="mt-4 flex gap-4 animate-in slide-in-from-top-2 fade-in">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Max Calories</label>
              <input 
                type="number" 
                name="maxCalories"
                value={macros.maxCalories}
                onChange={handleMacroChange}
                placeholder="e.g. 500"
                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Min Protein (g)</label>
              <input 
                type="number" 
                name="minProtein"
                value={macros.minProtein}
                onChange={handleMacroChange}
                placeholder="e.g. 30"
                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
              />
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex h-[70vh] items-center justify-center w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-(--color-primary)"></div>
        </div>
      ) : dishes.length === 0 ? (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <FaShoppingCart className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">No cravings fit those macros!</h2>
          <p className="text-gray-500 mt-2">Try relaxing your fitness goals a bit.</p>
        </div>
      ) : (
        <div className="w-full h-[70vh] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden relative border border-gray-200 dark:border-gray-700 flex flex-col">
          
          {/* Dish Image */}
          <div className="relative h-1/2 w-full bg-gray-200">
            <img 
              src={dishes[currentIndex].image?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"} 
              alt={dishes[currentIndex].itemName} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {dishes[currentIndex].type === "Vegetarian" && (
                <span className="bg-green-500 text-white p-2 rounded-full shadow-lg" title="Vegetarian">
                  <FaLeaf />
                </span>
              )}
              {dishes[currentIndex].isTopRated && (
                <span className="bg-orange-500 text-white p-2 rounded-full shadow-lg" title="Top Rated">
                  <FaFire />
                </span>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 pt-12">
              <h2 className="text-3xl font-extrabold text-white mb-1">{dishes[currentIndex].itemName}</h2>
              <p className="text-white/80 font-medium">{dishes[currentIndex].restaurantName || "Unknown Restaurant"}</p>
            </div>
          </div>

          {/* Dish Details & Macros */}
          <div className="flex-1 p-6 flex flex-col bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl font-bold text-(--color-primary)">₹{dishes[currentIndex].price}</span>
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                ★ {dishes[currentIndex].rating || "4.5"}
              </div>
            </div>

            {/* Macro Tags */}
            <div className="flex gap-2 mb-4">
              <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-800/50 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                🔥 {dishes[currentIndex].macros?.calories || 0} Cal
              </span>
              <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                💪 {dishes[currentIndex].macros?.protein || 0}g Protein
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
              {dishes[currentIndex].description}
            </p>

            {/* Action Buttons */}
            <div className="mt-auto flex justify-center gap-6 pb-2">
              <button 
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 shadow-xl flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-gray-600 transition-all hover:scale-110 border border-gray-100 dark:border-gray-600"
              >
                <FaTimes size={24} />
              </button>
              <button 
                onClick={addToCart}
                className="w-14 h-14 rounded-full bg-(--color-primary) text-white shadow-xl shadow-orange-500/30 flex items-center justify-center hover:bg-orange-600 transition-all hover:scale-110 self-end mb-2"
              >
                <FaShoppingCart size={20} />
              </button>
              <button 
                onClick={() => handleSwipe('right')}
                className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 shadow-xl flex items-center justify-center text-green-500 hover:bg-green-50 dark:hover:bg-gray-600 transition-all hover:scale-110 border border-gray-100 dark:border-gray-600"
              >
                <FaHeart size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CravingFeed;
