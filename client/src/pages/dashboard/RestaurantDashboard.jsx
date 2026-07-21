import React from "react";
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

const RestaurantDashboard = () => {
  const { isLogin,role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.state?.activeTab;
  const [activeTab, setActiveTab] = React.useState(active || "overview");

  React.useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);
  const mainTabs = [
    { name: "Overview", value: "overview", icon: <MdDashboard size={20} /> },
    { name: "Menu", value: "menu", icon: <MdRestaurantMenu size={20} /> },
    { name: "Orders", value: "orders", icon: <FaShoppingCart size={20} /> },
  ];
  const settingsTab = { name: "Settings", value: "settings", icon: <IoMdSettings size={20} /> };

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
          />
        </div>
        <div className="flex-1 bg-(--color-base-100) p-4 rounded-2xl shadow-xl h-full overflow-y-auto w-full">
          {activeTab === "overview" && <RestaurantOverview />}
          {activeTab === "menu" && <RestaurantMenu />}
          {activeTab === "orders" && <RestaurantOrders />}
          {activeTab === "settings" && <RestaurantSetting />}
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboard;
