import React, { useState, useEffect } from 'react';
import api from '../config/ApiConfig';
import { FaHeart, FaTimes, FaShoppingCart, FaFire, FaLeaf, FaDumbbell, FaSlidersH, FaMotorcycle, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CravingFeed = () => {
  const [dishes, setDishes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  
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
      setCart(prev => [...prev, dishes[currentIndex]]);
      toast.success('Added to cravings list!');
    }
    
    if (currentIndex < dishes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      toast("You've seen all the dishes! Looping back...", { icon: '🍽️' });
      setCurrentIndex(0);
    }
  };

  const addToCart = () => {
    const currentDish = dishes[currentIndex];
    setCart(prev => [...prev, currentDish]);
    if (currentDish?.travelScore !== undefined && currentDish.travelScore < 60) {
      toast.error(`Warning: This item may not travel well! (${currentDish.travelScore}/100)`, { duration: 4000 });
    }
    toast.success('Added to Cart!');
  };

  const totalCalories = cart.reduce((sum, item) => sum + (item.macros?.calories || 0), 0);
  const totalProtein = cart.reduce((sum, item) => sum + (item.macros?.protein || 0), 0);
  const firstItemName = cart.length > 0 ? cart[0].itemName : "";

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
                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
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
                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm outline-none focus:border-(--color-primary)"
              />
            </div>
          </div>
        )}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="w-full bg-(--color-primary) text-white rounded-2xl p-4 mb-4 shadow-lg animate-in slide-in-from-top-2 border border-orange-500/30">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg flex items-center gap-2"><FaShoppingCart /> Your Selections</h3>
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold">{cart.length} items</span>
          </div>
          <div className="text-sm font-medium mb-3 opacity-90 bg-black/10 p-2 rounded-md max-h-24 overflow-y-auto">
            Selected Items: <span className="font-bold text-white leading-relaxed">{cart.map(item => item.itemName).join(', ')}</span>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1 bg-black/20 rounded-lg p-2 text-center border border-white/10 shadow-inner">
              <span className="block text-xs uppercase tracking-wider opacity-80 mb-0.5">Total Calories</span>
              <span className="font-bold text-lg">🔥 {totalCalories}</span>
            </div>
            <div className="flex-1 bg-black/20 rounded-lg p-2 text-center border border-white/10 shadow-inner">
              <span className="block text-xs uppercase tracking-wider opacity-80 mb-0.5">Total Protein</span>
              <span className="font-bold text-lg">💪 {totalProtein}g</span>
            </div>
          </div>
        </div>
      )}

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

            {/* Macro & Travel Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-800/50 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                🔥 {dishes[currentIndex].macros?.calories || 0} Cal
              </span>
              <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                💪 {dishes[currentIndex].macros?.protein || 0}g Protein
              </span>
              {dishes[currentIndex].travelScore !== undefined && (
                <span className={`border text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 ${
                  dishes[currentIndex].travelScore >= 80 ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/50' : 
                  dishes[currentIndex].travelScore >= 60 ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-100 dark:border-yellow-800/50' : 
                  'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/50'
                }`}>
                  <FaMotorcycle /> Travel: {dishes[currentIndex].travelScore}/100
                  {dishes[currentIndex].travelScore < 60 && <FaExclamationTriangle className="ml-0.5" title="Melts or spills easily" />}
                </span>
              )}
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
