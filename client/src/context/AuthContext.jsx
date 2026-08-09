import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../config/ApiConfig";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("cravingUser")) || null,
  );
  const [isLogin, setIsLogin] = useState(!!user);
  const [role, setRole] = useState(user ? user.userType : null);

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user ? user.userType : null);
  }, [user]);

  const handleGoogleLogin = async (credentialResponse, userType) => {
    try {
      const response = await api.post("/auth/google", { credential: credentialResponse.credential, userType });
      if (response.data && response.data.data) {
        setUser(response.data.data);
        sessionStorage.setItem("cravingUser", JSON.stringify(response.data.data));
        toast.success("Logged in successfully via Google!");
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      console.error("Google login failed", error);
      toast.error(error.response?.data?.message || "Google login failed");
      return { success: false, error: error.response?.data?.message || "Google login failed" };
    }
  };

  const value = { user, isLogin, role, setUser, setIsLogin, setRole, handleGoogleLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
