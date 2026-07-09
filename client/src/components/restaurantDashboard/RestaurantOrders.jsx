import React from "react";

const RestaurantOrders = () => {
  const mockOrders = [
    { id: "#ORD-1001", customer: "John Doe", amount: "$45.00", status: "Delivered", date: "2026-07-10" },
    { id: "#ORD-1002", customer: "Jane Smith", amount: "$32.50", status: "Preparing", date: "2026-07-10" },
    { id: "#ORD-1003", customer: "Bob Johnson", amount: "$18.75", status: "Delivered", date: "2026-07-09" },
    { id: "#ORD-1004", customer: "Alice Brown", amount: "$55.20", status: "Cancelled", date: "2026-07-09" },
    { id: "#ORD-1005", customer: "Charlie Davis", amount: "$22.00", status: "Delivered", date: "2026-07-08" },
    { id: "#ORD-1006", customer: "Diana Prince", amount: "$41.10", status: "Preparing", date: "2026-07-08" },
    { id: "#ORD-1007", customer: "Evan Wright", amount: "$15.00", status: "Delivered", date: "2026-07-07" },
    { id: "#ORD-1008", customer: "Fiona Apple", amount: "$68.90", status: "Delivered", date: "2026-07-07" },
    { id: "#ORD-1009", customer: "George King", amount: "$29.50", status: "Delivered", date: "2026-07-06" },
    { id: "#ORD-1010", customer: "Hannah Scott", amount: "$37.25", status: "Delivered", date: "2026-07-06" },
    { id: "#ORD-1011", customer: "Ian Bell", amount: "$50.00", status: "Delivered", date: "2026-07-05" },
    { id: "#ORD-1012", customer: "Julia Roberts", amount: "$24.80", status: "Delivered", date: "2026-07-05" }
  ];

  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">Restaurant Orders</h2>
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-(--color-secondary)">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order, index) => (
              <tr key={index} className="border-b border-(--color-secondary) hover:bg-(--color-base-100) transition-colors">
                <td className="py-3">{order.id}</td>
                <td className="py-3">{order.customer}</td>
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

export default RestaurantOrders;
