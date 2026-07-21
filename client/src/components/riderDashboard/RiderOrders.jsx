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
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="border-b border-(--color-secondary)">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Restaurant</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2 hidden sm:table-cell">Date</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.length > 0 ? (
              mockOrders.map((order, index) => (
                <tr key={index} className="border-b border-(--color-secondary)">
                  <td className="py-4">{order.id}</td>
                  <td className="py-4">{order.restaurant}</td>
                  <td className="py-4">{order.amount}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 hidden sm:table-cell">{order.date}</td>
                  <td className="py-4">
                    <a
                      href={order.navLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-(--color-primary) text-white px-3 py-2 rounded-md hover:opacity-90 transition-opacity text-sm w-fit"
                    >
                      <FaMapMarkedAlt />
                      <span className="hidden md:inline">Navigate</span>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-(--color-secondary)">
                <td
                  colSpan="6"
                  className="text-center py-4 text-(--color-neutral)"
                >
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderOrders;
