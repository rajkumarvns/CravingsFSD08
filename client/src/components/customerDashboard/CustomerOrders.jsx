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
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, index) => (
                <tr key={index} className="border-b border-(--color-secondary) hover:bg-(--color-base-100) transition-colors">
                  <td className="py-3 px-2 font-semibold text-gray-800 dark:text-gray-200">{order.id}</td>
                  <td className="py-3 px-2">{order.restaurant}</td>
                  <td className="py-3 px-2 font-bold">{order.amount}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                      order.status === "Delivered" ? "bg-green-100 text-green-800 border-green-200" :
                      order.status === "Preparing" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                      "bg-red-100 text-red-800 border-red-200"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">{order.date}</td>
                </tr>
              ))}
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
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm border uppercase tracking-wide ${
                    order.status === "Delivered" ? "bg-green-100 text-green-800 border-green-200" :
                    order.status === "Preparing" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                    "bg-red-100 text-red-800 border-red-200"
                  }`}>
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

export default CustomerOrders;
