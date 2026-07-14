import React, { useState, useEffect } from "react";
import { MdRestaurantMenu, MdAddCircleOutline } from "react-icons/md";
import api from "../../../config/ApiConfig";
import RestaurantInformation from "./RestaurantInformation";
import RestaurantPhotos from "./RestaurantPhotos";
import FinancialDetails from "./FinancialDetails";
import RestaurantDocuments from "./RestaurantDocuments";
import ContactAndHours from "./ContactAndHours";
import CreateRestaurantProfile from "./CreateRestaurantProfile";

const RestaurantProfileContainer = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/restaurant/get-profile");
      if (response.data?.data) {
        setProfileData(response.data.data);
        setIsProfileCreated(true);
      } else {
        setIsProfileCreated(false);
      }
    } catch (error) {
      console.error("Error fetching restaurant profile:", error);
      setIsProfileCreated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500 font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {isProfileCreated ? (
        <>
          <div className="flex gap-4 border-b border-(--color-base-300) pb-2 overflow-x-auto whitespace-nowrap">
            <button
              className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === "basic" ? "border-(--color-primary) text-(--color-primary)" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("basic")}
            >
              Basic Details & Location
            </button>
            <button
              className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === "photos" ? "border-(--color-primary) text-(--color-primary)" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("photos")}
            >
              Restaurant Photos
            </button>
            <button
              className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === "documents" ? "border-(--color-primary) text-(--color-primary)" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("documents")}
            >
              Documents & Legal
            </button>
            <button
              className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === "financial" ? "border-(--color-primary) text-(--color-primary)" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("financial")}
            >
              Financial Details
            </button>
            <button
              className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === "contact" ? "border-(--color-primary) text-(--color-primary)" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("contact")}
            >
              Contact & Social Media
            </button>
          </div>

          <div className="animate-fade-in mt-4">
            {activeTab === "basic" && (
              <RestaurantInformation
                initialData={profileData}
                onSuccess={fetchProfile}
                isProfileCreated={isProfileCreated}
              />
            )}
            {activeTab === "photos" && (
              <RestaurantPhotos
                initialData={profileData}
                onSuccess={fetchProfile}
              />
            )}
            {activeTab === "documents" && (
              <RestaurantDocuments
                initialData={profileData}
                onSuccess={fetchProfile}
              />
            )}
            {activeTab === "financial" && (
              <FinancialDetails
                initialData={profileData}
                onSuccess={fetchProfile}
              />
            )}
            {activeTab === "contact" && (
              <ContactAndHours
                initialData={profileData}
                onSuccess={fetchProfile}
              />
            )}
          </div>
        </>
      ) : showCreateForm ? (
        <CreateRestaurantProfile
          onSuccess={fetchProfile}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <MdRestaurantMenu className="text-5xl text-(--color-primary)" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Welcome to Cravings!
          </h2>
          <p className="text-gray-500 max-w-lg mb-8 text-lg">
            It looks like you haven't set up your restaurant profile yet. Add
            your restaurant details to get started and start receiving orders.
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-3 bg-(--color-primary) text-(--color-primary-content) px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <MdAddCircleOutline className="text-2xl" /> Add Restaurant
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfileContainer;
