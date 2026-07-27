import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import RestaurantOverview from "../../components/restaurantDashboard/RestaurantOverview";
import RestaurantMenu from "../../components/restaurantDashboard/RestaurantMenu";
import RestaurantSetting from "../../components/restaurantDashboard/RestaurantSetting";
import RestaurantOrders from "../../components/restaurantDashboard/RestaurantOrders";
import { MdDashboard, MdRestaurantMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import api from "../../config/ApiConfig";

const RestaurantDashboard = () => {
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.state?.activeTab;
  const [activeTab, setActiveTab] = useState(active || "overview");
  
  const [restaurants, setRestaurants] = useState([]);
  const [activeRestaurantId, setActiveRestaurantId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get("/restaurant/get-profile");
      if (response.data?.data && Array.isArray(response.data.data)) {
        setRestaurants(response.data.data);
        if (response.data.data.length > 0 && !activeRestaurantId) {
          setActiveRestaurantId(response.data.data[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching restaurants", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin && role === "restaurant") {
      fetchRestaurants();
    }
  }, [isLogin, role]);

  const mainTabs = [
    { name: "Overview", value: "overview", icon: <MdDashboard size={20} /> },
    { name: "Menu", value: "menu", icon: <MdRestaurantMenu size={20} /> },
    { name: "Orders", value: "orders", icon: <FaShoppingCart size={20} /> },
  ];
  const settingsTab = { name: "Settings", value: "settings", icon: <IoMdSettings size={20} /> };

  const dropdownOptions = restaurants.map(r => ({ label: r.restaurantName, value: r._id }));

  if (!isLogin || role !== "restaurant") {
    return (
      <div className="h-[92vh] bg-[url('/foodTable.webp')]  bg-cover bg-center">
        <div className="h-full backdrop-blur-lg flex flex-col items-center justify-center ">
          <h1 className="text-2xl font-bold text-(--color-neutral-content)">
            Access Denied. Please log in as a Restaurant Manager to view this
            page.
          </h1>
          <button
            className="mt-4 px-4 py-2 bg-(--color-primary) text-white rounded-md"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="h-[calc(100vh-64px)] flex items-center justify-center">Loading dashboard...</div>;
  }

  return (
    <>
      <div className="h-[calc(100vh-64px)] flex overflow-hidden relative">
        <div className="h-full shrink-0">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mainTabs={mainTabs}
            settingsTab={settingsTab}
            subtitle="Restaurant"
            dropdownOptions={dropdownOptions}
            selectedDropdownValue={activeRestaurantId}
            onDropdownChange={setActiveRestaurantId}
          />
        </div>
        <div className="flex-1 bg-(--color-base-100) p-4 rounded-2xl shadow-xl h-full overflow-y-auto w-full">
          {activeTab === "overview" && <RestaurantOverview activeRestaurantId={activeRestaurantId} />}
          {activeTab === "menu" && <RestaurantMenu activeRestaurantId={activeRestaurantId} />}
          {activeTab === "orders" && <RestaurantOrders activeRestaurantId={activeRestaurantId} />}
          {activeTab === "settings" && <RestaurantSetting activeRestaurantId={activeRestaurantId} refreshRestaurants={fetchRestaurants} restaurants={restaurants} />}
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboard;
