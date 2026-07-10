import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../assets/transparentLogoLight.png";
import { useAuth } from "../context/AuthContext";
import { FaPowerOff } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../config/ApiConfig";

const Navbar = () => {
  const { user, isLogin, role, setUser, setIsLogin, setRole } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    //console.log("Handle Navigate", role);

    if (role === "restaurant") {
      navigate("/restaurant-dashboard");
    } else if (role === "rider") {
      navigate("/rider-dashboard");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/customer-dashboard");
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

        {isLogin ? (
          <div className="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 rounded-full pr-2 pl-1 py-1 shadow-lg backdrop-blur-md group">
            <button
              className="flex items-center gap-3 cursor-pointer text-left focus:outline-none"
              title="Go to Dashboard"
              onClick={handleNavigate}
            >
              <div className="relative">
                <img
                  src={user?.photo.url}
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
    </>
  );
};

export default Navbar;
