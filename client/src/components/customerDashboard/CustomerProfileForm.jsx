import React, { useState, useEffect } from "react";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";
import runningLoader from "../../assets/runningLoader.gif";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const CustomerProfileForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    photo: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
        gender: user.gender || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        photo: null,
      });
      if (user.photo?.url) {
        setPhotoPreview(user.photo.url);
      }
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "photo" && formData[key]) {
          payload.append("displayPic", formData[key]); // Backend expects displayPic
        } else if (key !== "photo" && formData[key] !== null && formData[key] !== "") {
          payload.append(key, formData[key]);
        }
      });
      
      const response = await api.put("/common/edit-profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message || "Profile updated successfully!");
      if (response.data.data?.photo?.url) {
        setPhotoPreview(response.data.data.photo.url);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile} className="flex flex-col gap-8 w-full max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-xl rounded-2xl border border-gray-100">

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-100 pb-8">
        <div className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-(--color-primary) shadow-lg overflow-hidden shrink-0 group">
          {photoPreview ? (
            <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 font-medium">No Photo</span>
          )}
          <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
            <MdOutlineAddAPhoto className="text-2xl mb-1" />
            <span className="text-xs">Upload</span>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
          </label>
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Customer Profile</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">Manage your personal information, contact details, and preferences to get the best out of Cravings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <h3 className="text-xl font-bold col-span-full text-gray-800">Basic Details</h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleProfileChange} required className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleProfileChange} required className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleProfileChange} required className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleProfileChange} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all" />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-600">Gender</label>
          <div className="flex items-center gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleProfileChange} className="text-(--color-primary) focus:ring-(--color-primary) w-4 h-4" />
              <span className="text-gray-700 font-medium">Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleProfileChange} className="text-(--color-primary) focus:ring-(--color-primary) w-4 h-4" />
              <span className="text-gray-700 font-medium">Female</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleProfileChange} className="text-(--color-primary) focus:ring-(--color-primary) w-4 h-4" />
              <span className="text-gray-700 font-medium">Other</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h3 className="text-xl font-bold col-span-full text-gray-800">Location Details</h3>

        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-sm font-semibold text-gray-600">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleProfileChange} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleProfileChange} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">State</label>
          <input type="text" name="state" value={formData.state} onChange={handleProfileChange} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all" />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-600">Pincode</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleProfileChange} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all w-full md:w-1/2" />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-gray-100">
        <button type="submit" disabled={isLoading} className="bg-(--color-primary) text-(--color-primary-content) px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:bg-opacity-70 disabled:transform-none disabled:shadow-none flex items-center gap-3">
          {isLoading ? (
            <>
              <img src={runningLoader} alt="Loading..." className="w-6 h-6 object-contain" />
              Saving Changes...
            </>
          ) : (
            "Save Profile"
          )}
        </button>
      </div>

    </form>
  );
};

export default CustomerProfileForm;
