import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../assets/transparentLogoLight.png";
import { useAuth } from "../context/AuthContext";
import { FaPowerOff } from "react-icons/fa";
import { IoCartOutline, IoCloseOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import api from "../config/ApiConfig";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, isLogin, role, setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();
  const { totalItems, cart, totalAmount, handleAddToCart, handleRemoveFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  React.useEffect(() => {
    if (totalItems === 0 && isCartOpen) {
      setIsCartOpen(false);
    }
  }, [totalItems, isCartOpen]);

  const handleNavigate = () => {
    //console.log("Handle Navigate", role);

    if (role === "restaurant") {
      navigate("/restaurant-dashboard", { state: { activeTab: "settings" } });
    } else if (role === "rider") {
      navigate("/rider-dashboard", { state: { activeTab: "settings" } });
    } else if (role === "admin") {
      navigate("/admin-dashboard", { state: { activeTab: "settings" } });
    } else {
      navigate("/customer-dashboard", { state: { activeTab: "settings" } });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);

      sessionStorage.removeItem("cravingUser");
      setUser(null);
      setIsLogin(false);
      setRole(null);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unknown error occurred during registration. Please try again.",
      );
    }
  };

  return (
    <>
      <div className="sticky top-0 z-99 flex items-center justify-between px-12 py-1 bg-(--color-primary) text-white w-full h-16 shadow-md">
        <div className="h-full">
          <Link to="/">
            <img src={logoLight} alt="Logo" className="w-fit h-full" />{" "}
          </Link>
        </div>
        <div className="flex items-center gap-4 h-full">
          {totalItems > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center focus:outline-none"
            >
              <IoCartOutline size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                {totalItems}
              </span>
            </button>
          )}

          {isLogin ? (
          <div className="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 rounded-full pr-2 pl-1 py-1 shadow-lg backdrop-blur-md group">
            <button
              className="flex items-center gap-3 cursor-pointer text-left focus:outline-none"
              title="Go to Dashboard"
              onClick={handleNavigate}
            >
              <div className="relative">
                <img
                  src={user?.photo?.url}
                  alt={user?.fullName}
                  className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-white/40 group-hover:ring-white transition-all duration-300"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-(--color-primary) rounded-full"></div>
              </div>
              <div className="flex flex-col mr-3">
                <span className="text-sm font-bold text-white leading-tight">
                  {user?.fullName}
                </span>
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
                  {role}
                </span>
              </div>
            </button>

            <div className="w-1px h-8 bg-white/20 mx-1"></div>

            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-white hover:bg-red-500/90 p-2.5 rounded-full transition-all duration-300 ml-1 flex items-center justify-center focus:outline-none"
              title="Logout"
            >
              <FaPowerOff size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/register/customer"
              className="bg-(--color-primary-content) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-content) border px-3 py-1 rounded"
            >
              Register
            </Link>
          </div>
        )}
        </div>
      </div>

      {/* Cart Modal Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}>
          <div 
            className="w-full sm:w-96 bg-white h-full shadow-2xl flex flex-col transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <IoCartOutline size={24} className="text-[#c2410c]" />
                <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {cart.map((c) => {
                const itemImage = c.item.image?.url || "https://placehold.co/150x150?text=Food";
                return (
                <div key={c.item._id} className="flex gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                  <img src={itemImage} alt={c.item.itemName} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 line-clamp-1">{c.item.itemName}</h4>
                      <p className="text-[#c2410c] font-bold">₹{c.item.price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button onClick={() => handleRemoveFromCart(c.item, false)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-[#c2410c] font-bold text-lg transition-all">-</button>
                        <span className="font-bold text-gray-700 min-w-[20px] text-center">{c.quantity}</span>
                        <button onClick={() => handleAddToCart(c.item)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-[#c2410c] font-bold text-lg transition-all">+</button>
                      </div>
                      <p className="font-bold text-gray-800">₹{c.item.price * c.quantity}</p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">Item Total</span>
                <span className="text-xl font-bold text-gray-800">₹{totalAmount}</span>
              </div>
              <button className="w-full bg-[#c2410c] hover:bg-[#a0350a] text-white py-3.5 rounded-xl font-bold text-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
