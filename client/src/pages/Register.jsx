import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../config/ApiConfig";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const userType = useParams().userType; // Get userType from URL params (if needed)
  const navigate = useNavigate();
  const { handleGoogleLogin } = useAuth();
  const [formData, setFormData] = useState({
    userType: userType || "customer",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUserTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      userType: e.target.value,
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.dob) newErrors.dob = "Date of birth is required";
    if (!data.password || data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!data.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!data.agreeTerms)
      newErrors.agreeTerms = "You must agree to terms and conditions";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }



    try {
      const res = await api.post("/auth/register", {
        ...formData,
        email: formData.email.toLowerCase(),
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during registration. Please try again.",
      );
    } finally {
      setLoading(false);
    }
    // Handle registration here
  };

  return (
    <div className="min-h-[90vh] bg-[url('/foodTable.webp')] flex items-center justify-center md:justify-end bg-cover bg-center p-2 sm:p-4 py-4 md:pe-20">
      <div className="bg-white rounded-lg shadow-md px-6 sm:px-8 py-4 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-(--color-primary) mb-1 text-center">
          Create Account
        </h1>
        <p className="text-(--color-secondary) text-center mb-3 text-sm">
          Join us as a Customer, Restaurant, or Rider
        </p>

        {/* User Type Selection */}
        <div className="mb-3">
          <label className="block text-(--color-neutral) font-semibold mb-3">
            Register as:
          </label>
          <div className="flex flex-wrap gap-3 sm:gap-5">
            {["customer", "restaurant", "rider"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="userType"
                  value={type}
                  checked={formData.userType === type}
                  onChange={handleUserTypeChange}
                  className="cursor-pointer"
                />
                <span className="text-(--color-neutral) capitalize">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Google Register */}
        <div className="flex justify-center mb-3">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const res = await handleGoogleLogin(credentialResponse, formData.userType);
              if (res?.success) {
                const role = res.data.userType;
                if (role === "restaurant") navigate("/restaurant-dashboard");
                else if (role === "rider") navigate("/rider-dashboard");
                else if (role === "admin") navigate("/admin-dashboard");
                else navigate("/customer-dashboard");
              }
            }}
            onError={() => {
              toast.error("Google Sign Up Failed");
            }}
            text="signup_with"
            width="100%"
          />
        </div>

        <div className="relative mb-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or register with email
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.fullName ? "border-(--color-error) border-2" : "border-(--color-base-300)"
                }`}
              />
              {errors.fullName && <span className="text-(--color-error) text-xs mt-1 block">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.email ? "border-(--color-error) border-2" : "border-(--color-base-300)"
                }`}
              />
              {errors.email && <span className="text-(--color-error) text-xs mt-1 block">{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Phone */}
            <div>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.phone ? "border-(--color-error) border-2" : "border-(--color-base-300)"
                }`}
              />
              {errors.phone && <span className="text-(--color-error) text-xs mt-1 block">{errors.phone}</span>}
            </div>

            {/* Gender */}
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.gender ? "border-(--color-error) border-2" : "border-(--color-base-300)"
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-(--color-error) text-xs mt-1 block">{errors.gender}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* DOB */}
            <div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.dob ? "border-(--color-error) border-2" : "border-(--color-base-300)"
                }`}
              />
              {errors.dob && <span className="text-(--color-error) text-xs mt-1 block">{errors.dob}</span>}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.password ? "border-(--color-error) border-2" : "border-(--color-base-300)"
                }`}
              />
              {errors.password && <span className="text-(--color-error) text-xs mt-1 block">{errors.password}</span>}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                errors.confirmPassword
                  ? "border-(--color-error) border-2"
                  : "border-(--color-base-300)"
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-(--color-error) text-xs mt-1 block">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="flex items-start gap-2 cursor-pointer text-(--color-secondary)">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mt-1 cursor-pointer"
              />
              <span className="text-sm">
                I agree to the{" "}
                <span className="text-(--color-primary) hover:underline">
                  terms and conditions.
                </span>
              </span>
            </label>
            {errors.agreeTerms && (
              <span className="text-(--color-error) text-xs mt-1 block ml-7">
                {errors.agreeTerms}
              </span>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-(--color-primary) text-white font-semibold rounded-md hover:bg-orange-700 transition-colors duration-300 mb-3"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-(--color-secondary) text-sm">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-(--color-primary) font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
