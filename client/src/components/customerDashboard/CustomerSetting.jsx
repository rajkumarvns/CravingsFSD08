import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";

const CustomerSetting = () => {
  const { user, setUser } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email.toLowerCase());
      payload.append("phone", formData.phone);

      payload.append("displayPic", profilePic);

      const response = await api.put(`/user/edit-profile`, payload);

      setUser(response.data.data);
      sessionStorage.setItem("cravingUser", JSON.stringify(response.data.data));

      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelProfile = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });
    setProfilePicPreview(null);
    setEditingProfile(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicPreview(URL.createObjectURL(file));
    setProfilePic(file);
  };

  return (
    <div className="overflow-y-auto h-full p-4 md:p-8 bg-gray-50/50">
      
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Cover Banner Area */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-(--color-primary) via-orange-500 to-amber-400 relative">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          
          {/* Header Action Buttons inside Cover */}
          <div className="absolute top-6 right-6 flex items-center gap-3">
            {!editingProfile ? (
              <button
                onClick={() => setEditingProfile(true)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
              >
                <MdEdit className="text-lg" /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelProfile}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all duration-300 focus:outline-none"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 bg-white text-(--color-primary) px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-(--color-primary) border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pb-12 relative">
          
          {/* Avatar and Info Header - Overlapping Cover */}
          <div className="relative -mt-24 mb-8 flex flex-col md:flex-row md:items-end gap-6">
            
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl bg-white overflow-hidden relative z-10 transition-transform duration-500 group-hover:scale-105">
                <img
                  src={profilePicPreview || user.photo.url}
                  alt="Profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {editingProfile && (
                <div
                  className="absolute bottom-2 right-2 border-2 border-white p-3 rounded-full bg-(--color-primary) text-white shadow-lg cursor-pointer hover:bg-orange-700 hover:scale-110 transition-all duration-300 z-20"
                  title="Change Photo"
                >
                  <label htmlFor="profilePic" className="cursor-pointer flex items-center justify-center w-full h-full">
                    <MdOutlineAddAPhoto className="text-xl" />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePic"
                    id="profilePic"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </div>
              )}
            </div>

            {/* Profile Name/Role */}
            <div className="pb-2">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {user?.fullName}
              </h2>
              <p className="text-(--color-primary) font-bold text-sm uppercase tracking-widest mt-1">
                Customer Account
              </p>
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Full Name Field */}
              <div className="col-span-1 md:col-span-2 relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleProfileChange}
                    className={`w-full bg-white px-5 py-4 text-gray-800 font-semibold text-lg border-2 ${
                      editingProfile 
                        ? "border-orange-200 focus:border-(--color-primary) shadow-md" 
                        : "border-transparent shadow-sm"
                    } rounded-xl transition-all duration-300 outline-none`}
                    disabled={!editingProfile}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="col-span-1 relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-100 px-5 py-4 text-gray-500 font-semibold text-lg border-2 border-transparent rounded-xl shadow-sm outline-none cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="col-span-1 relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleProfileChange}
                    className={`w-full bg-white px-5 py-4 text-gray-800 font-semibold text-lg border-2 ${
                      editingProfile 
                        ? "border-orange-200 focus:border-(--color-primary) shadow-md" 
                        : "border-transparent shadow-sm"
                    } rounded-xl transition-all duration-300 outline-none`}
                    disabled={!editingProfile}
                  />
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CustomerSetting;
