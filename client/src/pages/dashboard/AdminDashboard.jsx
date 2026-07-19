// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import AdminSetting from "../../components/adminDashboard/AdminSetting";
// import Sidebar from "../../components/Sidebar";
// import AdminOverview from "../../components/adminDashboard/AdminOverview";
// import AdminOrders from "../../components/adminDashboard/AdminOrders";
// import { MdDashboard } from "react-icons/md";
// import { FaShoppingCart } from "react-icons/fa";
// import { IoMdSettings } from "react-icons/io";

// const AdminDashboard = () => {
//   const { isLogin, role } = useAuth();
//   const navigate = useNavigate();
//   const active = useLocation().state?.activeTab;
//   const [activeTab, setActiveTab] = React.useState(active || "overview");

//   const mainTabs = [
//     { name: "Overview", value: "overview", icon: <MdDashboard size={20} /> },
//     { name: "Orders", value: "orders", icon: <FaShoppingCart size={20} /> },
//   ];
//   const settingsTab = { name: "Settings", value: "settings", icon: <IoMdSettings size={20} /> };

//   if (!isLogin || role !== "admin") {
//     return (
//       <div className="h-[92vh] bg-[url('/foodTable.webp')]  bg-cover bg-center">
//         <div className="h-full backdrop-blur-lg flex flex-col items-center justify-center ">
//           <h1 className="text-2xl font-bold text-(--color-neutral-content)">
//             Access Denied. Please log in as a Admin to view this page.
//           </h1>
//           <button
//             className="mt-4 px-4 py-2 bg-(--color-primary) text-white rounded-md"
//             onClick={() => navigate("/login")}
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="h-[calc(100vh-64px)] flex gap-4 p-4 overflow-hidden relative">
//         <div className="h-full shrink-0">
//           <Sidebar
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             mainTabs={mainTabs}
//             settingsTab={settingsTab}
//             subtitle="Admin Panel"
//           />
//         </div>
//         <div className="flex-1 bg-(--color-base-100) p-4 rounded-2xl shadow-xl h-full overflow-y-auto w-full">
//           {activeTab === "overview" && <AdminOverview />}
//           {activeTab === "orders" && <AdminOrders />}
//           {activeTab === "settings" && <AdminSetting />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;
