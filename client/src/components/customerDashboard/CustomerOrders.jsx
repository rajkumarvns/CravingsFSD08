import React from "react";

const CustomerOrders = () => {
  const mockOrders = [
    { id: "#ORD-9001", restaurant: "Burger King", amount: "$25.00", status: "Delivered", date: "2026-07-10" },
    { id: "#ORD-9002", restaurant: "Pizza Hut", amount: "$32.50", status: "Preparing", date: "2026-07-10" },
    { id: "#ORD-9003", restaurant: "KFC", amount: "$18.75", status: "Delivered", date: "2026-07-09" },
    { id: "#ORD-9004", restaurant: "Subway", amount: "$15.20", status: "Cancelled", date: "2026-07-09" },
    { id: "#ORD-9005", restaurant: "McDonalds", amount: "$22.00", status: "Delivered", date: "2026-07-08" },
    { id: "#ORD-9006", restaurant: "Domino's", amount: "$41.10", status: "Delivered", date: "2026-07-08" },
    { id: "#ORD-9007", restaurant: "Taco Bell", amount: "$15.00", status: "Delivered", date: "2026-07-07" },
    { id: "#ORD-9008", restaurant: "Wendy's", amount: "$18.90", status: "Delivered", date: "2026-07-07" },
    { id: "#ORD-9009", restaurant: "Chipotle", amount: "$29.50", status: "Delivered", date: "2026-07-06" },
    { id: "#ORD-9010", restaurant: "Panda Express", amount: "$17.25", status: "Delivered", date: "2026-07-06" }
  ];

  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-(--color-secondary)">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Restaurant</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order, index) => (
              <tr key={index} className="border-b border-(--color-secondary) hover:bg-(--color-base-100) transition-colors">
                <td className="py-3">{order.id}</td>
                <td className="py-3">{order.restaurant}</td>
                <td className="py-3 font-semibold">{order.amount}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.status === "Delivered" ? "bg-green-100 text-green-800" :
                    order.status === "Preparing" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
