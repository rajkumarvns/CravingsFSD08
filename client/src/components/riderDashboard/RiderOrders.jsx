import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

const RiderOrders = () => {
  const mockOrders = [
    {
      id: "ORD-001",
      restaurant: "Spice Symphony",
      amount: "$45.00",
      status: "Ready for Pickup",
      date: "2026-07-21",
      navLink:
        "https://www.google.com/maps/dir/?api=1&origin=23.259933,77.412615&destination=23.233300,77.432500&travelmode=Two-wheeler",
    },
    {
      id: "ORD-002",
      restaurant: "Burger Point",
      amount: "$15.50",
      status: "On the way",
      date: "2026-07-21",
      navLink:
        "https://www.google.com/maps/dir/?api=1&origin=23.259933,77.412615&destination=23.233300,77.432500&travelmode=driving",
    },
  ];

  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="bg-(--color-base-200) p-2 sm:p-4 rounded-lg">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b border-(--color-secondary)">
                <th className="text-left py-2 px-2">Order ID</th>
                <th className="text-left py-2 px-2">Restaurant</th>
                <th className="text-left py-2 px-2">Amount</th>
                <th className="text-left py-2 px-2">Status</th>
                <th className="text-left py-2 px-2">Date</th>
                <th className="text-left py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.length > 0 ? (
                mockOrders.map((order, index) => (
                  <tr key={index} className="border-b border-(--color-secondary)">
                    <td className="py-4 px-2 font-semibold text-gray-800 dark:text-gray-200">{order.id}</td>
                    <td className="py-4 px-2">{order.restaurant}</td>
                    <td className="py-4 px-2 font-bold">{order.amount}</td>
                    <td className="py-4 px-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold shadow-sm border border-blue-200">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-2">{order.date}</td>
                    <td className="py-4 px-2">
                      <a
                        href={order.navLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-(--color-primary) text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-700 hover:shadow-lg transition-all text-sm font-semibold w-fit"
                      >
                        <FaMapMarkedAlt />
                        <span>Navigate</span>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-(--color-secondary)">
                  <td
                    colSpan="6"
                    className="text-center py-8 text-(--color-neutral) font-medium"
                  >
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4">
          {mockOrders.length > 0 ? (
            mockOrders.map((order, index) => (
              <div key={index} className="bg-white dark:bg-black/40 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{order.id}</h3>
                    <p className="text-xs text-gray-500 font-medium">{order.date}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] font-bold shadow-sm border border-blue-200 uppercase tracking-wide">
                    {order.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Restaurant</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{order.restaurant}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Amount</p>
                    <p className="font-bold text-[#c2410c]">{order.amount}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={order.navLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-(--color-primary) text-white px-4 py-2.5 rounded-lg shadow hover:bg-orange-700 transition-colors text-sm font-bold"
                  >
                    <FaMapMarkedAlt />
                    Navigate to Customer
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-(--color-neutral) font-medium bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              No orders yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderOrders;
