import React, { useState, useEffect } from "react";
import { MdEdit, MdOutlineLockReset } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";
import PasswordChangeModal from "../commonModals/PasswordChangeModal";
import RestaurantProfileContainer from "./RestaurantProfile";
const RestaurantSetting = () => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("user");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

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

      const response = await api.put(`/common/edit-profile`, payload);

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
    <>
      <div className="overflow-y-auto h-full p-6 space-y-6">

        {/* Tabs for Settings */}
        <div className="flex justify-between items-center border-b border-(--color-base-300) pb-2">
          <div className="flex gap-4">
            <button
              className={`font-semibold pb-2 border-b-2 ${activeTab === "user" ? "border-(--color-primary) text-(--color-primary)" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("user")}
            >
              User Profile
            </button>
            <button
              className={`font-semibold pb-2 border-b-2 ${activeTab === "restaurant" ? "border-(--color-primary) text-(--color-primary)" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("restaurant")}
            >
              Restaurant Profile
            </button>
          </div>
        </div>

        {activeTab === "user" && (
          <div className="bg-(--color-base-100) rounded-2xl shadow-xl overflow-hidden border border-(--color-base-300)">
            {/* Cover Banner */}
            <div className="h-32 bg-gradient-to-r from-(--color-primary) to-(--color-secondary) relative">
              <div className="absolute top-4 right-4 z-10">
                {!editingProfile ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="flex items-center gap-2 bg-white text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-content) px-4 py-2 rounded-lg text-sm transition-all font-bold shadow-md"
                    >
                      <MdEdit className="text-lg" /> Edit Profile
                    </button>
                    <button
                      onClick={() => setIsPasswordChangeModalOpen(true)}
                      className="flex items-center gap-2 bg-white text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-content) px-4 py-2 rounded-lg text-sm transition-all font-bold shadow-md"
                    >
                      <MdOutlineLockReset className="text-lg" /> Change Password
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelProfile}
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm transition-all font-medium"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 bg-white text-(--color-primary) px-4 py-2 rounded-lg text-sm transition-all font-bold shadow-md hover:shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="px-8 pb-8 relative">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Avatar */}
                <div className="-mt-16 relative flex-shrink-0 z-10 mx-auto md:mx-0">
                  <div className="w-32 h-32 rounded-full p-1 bg-(--color-base-100) shadow-lg relative group">
                    <img
                      src={profilePicPreview || user?.photo?.url}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                    {editingProfile && (
                      <label 
                        htmlFor="profilePic" 
                        className="absolute inset-0 m-1 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm"
                      >
                        <MdOutlineAddAPhoto className="text-3xl mb-1" />
                        <span className="text-xs font-semibold">Change Photo</span>
                      </label>
                    )}
                    {editingProfile && (
                      <input
                        type="file"
                        accept="image/*"
                        name="profilePic"
                        id="profilePic"
                        className="hidden"
                        onChange={handleProfilePicChange}
                      />
                    )}
                  </div>
                </div>

                {/* User Info Details */}
                <div className="mt-4 md:mt-2 w-full">
                  <div className="mb-6 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-(--color-base-content)">
                      {user?.fullName || "User Profile"}
                    </h3>
                    <p className="text-(--color-base-content) opacity-60 text-sm">
                      Manage your personal information and settings
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-(--color-base-content) opacity-70 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleProfileChange}
                        className={`w-full px-4 py-3 bg-(--color-base-200) border ${editingProfile ? "border-(--color-primary) ring-1 ring-(--color-primary)/20 focus:outline-none focus:ring-2 focus:ring-(--color-primary)" : "border-transparent"} rounded-xl transition-all font-medium text-(--color-base-content)`}
                        disabled={!editingProfile}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-(--color-base-content) opacity-70 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleProfileChange}
                        className={`w-full px-4 py-3 bg-(--color-base-200) border border-transparent rounded-xl transition-all font-medium text-(--color-base-content) opacity-70 cursor-not-allowed`}
                        disabled
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-(--color-base-content) opacity-70 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleProfileChange}
                        className={`w-full px-4 py-3 bg-(--color-base-200) border ${editingProfile ? "border-(--color-primary) ring-1 ring-(--color-primary)/20 focus:outline-none focus:ring-2 focus:ring-(--color-primary)" : "border-transparent"} rounded-xl transition-all font-medium text-(--color-base-content)`}
                        disabled={!editingProfile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "restaurant" && (
          <RestaurantProfileContainer />
        )}
      </div>

      {isPasswordChangeModalOpen && (
        <PasswordChangeModal
          open={isPasswordChangeModalOpen}
          onClose={() => setIsPasswordChangeModalOpen(false)}
        />
      )}
    </>
  );
};

export default RestaurantSetting;
