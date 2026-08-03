import React from "react";
import { FaShoppingCart, FaMoneyBillWave, FaRoute, FaStar } from "react-icons/fa";
import { MdTimeline } from "react-icons/md";
import { BiTrendingUp } from "react-icons/bi";

const RiderOverview = () => {
  return (
    <div className="overflow-y-auto h-full px-2 pb-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-(--color-primary) to-orange-500 drop-shadow-sm">
            Rider Overview
          </h2>
          <p className="text-(--color-neutral) text-sm font-medium mt-1">
            Welcome back! Here's your performance at a glance.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full shadow-inner border border-white/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
          </span>
          <span className="text-sm font-semibold text-green-600 dark:text-green-600">Online & Accepting Orders</span>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="group relative bg-white/40 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-linear-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-(--color-neutral) text-sm font-semibold tracking-wide uppercase mb-1">Total Orders</p>
              <p className="text-4xl font-black text-gray-800 dark:text-white">124</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl shadow-inner">
              <FaShoppingCart size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-green-500">
            <BiTrendingUp className="mr-1" size={18} />
            <span>+12% this week</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative bg-white/40 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-linear-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-(--color-neutral) text-sm font-semibold tracking-wide uppercase mb-1">Total Earnings</p>
              <p className="text-4xl font-black text-gray-800 dark:text-white">$1,245</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl shadow-inner">
              <FaMoneyBillWave size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-green-500">
            <BiTrendingUp className="mr-1" size={18} />
            <span>+$240 this week</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group relative bg-white/40 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-linear-to-br from-orange-400/20 to-red-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-(--color-neutral) text-sm font-semibold tracking-wide uppercase mb-1">Total Distance</p>
              <p className="text-4xl font-black text-gray-800 dark:text-white">452 <span className="text-xl font-bold text-gray-500">km</span></p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl shadow-inner">
              <FaRoute size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <MdTimeline className="mr-1" size={18} />
            <span>Avg 3.6 km/order</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group relative bg-white/40 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden lg:col-span-1 md:col-span-2">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-linear-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-(--color-neutral) text-sm font-semibold tracking-wide uppercase mb-1">Rider Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-4xl font-black text-gray-800 dark:text-white">4.9</p>
                <div className="flex text-yellow-400 drop-shadow-md">
                  <FaStar size={20} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-2xl shadow-inner">
              <FaStar size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>Based on 98 reviews</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders List */}
        <div className="lg:col-span-2 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-(--color-primary) to-orange-400 opacity-50"></div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recent Orders</h3>
            <button className="text-sm font-semibold text-(--color-primary) hover:text-(--color-primary-focus) transition-colors hover:underline">
              View All
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {/* Order Item */}
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="group flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-white/10 shadow-sm hover:shadow-md cursor-pointer">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center shadow-inner font-bold text-base sm:text-lg
                    ${index === 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : 
                      index === 1 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 
                      'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400'}
                  `}>
                    #{item}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100 truncate">Order #CRV-{Math.floor(Math.random() * 9000) + 1000}</h4>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">Burger King • 2.4 km</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100">${(Math.random() * 20 + 10).toFixed(2)}</p>
                  <p className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block
                    ${index === 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 
                      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}
                  `}>
                    {index === 0 ? 'Delivered' : 'Completed'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notice Board */}
        <div className="bg-linear-to-br from-(--color-primary) to-orange-500 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-8 -mb-8 group-hover:scale-150 transition-transform duration-1000"></div>
          
          <h3 className="text-xl font-bold mb-4 relative z-10 flex items-center gap-2">
            <span className="text-2xl">📢</span> Announcements
          </h3>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-black/30 transition-colors cursor-pointer">
              <h4 className="font-bold text-sm mb-1 text-yellow-200">Weekend Bonus!</h4>
              <p className="text-xs text-white/90 leading-relaxed">
                Complete 20 deliveries this weekend and earn an extra $50 bonus. Stay safe on the roads!
              </p>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-black/30 transition-colors cursor-pointer">
              <h4 className="font-bold text-sm mb-1 text-blue-200">App Update</h4>
              <p className="text-xs text-white/90 leading-relaxed">
                New navigation features have been added to the rider app. Please update to version 2.4.
              </p>
            </div>
          </div>
          
          <button className="mt-6 w-full py-3 bg-white text-orange-600 font-bold rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-300 relative z-10">
            View All Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiderOverview;
