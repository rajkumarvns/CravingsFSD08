import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({
  activeTab,
  setActiveTab,
  mainTabs,
  settingsTab,
  title = "Cravings",
  subtitle = "Dashboard",
  dropdownOptions,
  selectedDropdownValue,
  onDropdownChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(false); // Default to collapsed icons on desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleTabClick = (val) => {
    setActiveTab(val);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const renderTab = (tab) => {
    const isActive = activeTab === tab.value;
    const showText = isMobile || isOpen; // Show text if mobile (drawer is open) or if desktop is expanded

    return (
      <li
        key={tab.value}
        className={`group relative cursor-pointer flex items-center transition-all duration-300 ease-out ${
          !showText ? "justify-center p-3 w-12 h-12" : "px-4 py-3 w-full gap-4"
        } rounded-sm ${
          isActive
            ? "bg-(--color-primary) text-(--color-primary-content) shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3)] ring-1 ring-white/20"
            : "text-(--color-neutral) hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-inner"
        } my-1`}
        onClick={() => handleTabClick(tab.value)}
      >
        {isActive && showText && (
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white/80 rounded-r-full blur-[1px]"></div>
        )}

        <div
          className={`flex items-center justify-center text-2xl shrink-0 transition-transform duration-500 ${
            isActive
              ? "scale-110 drop-shadow-md"
              : "group-hover:scale-110 opacity-70 group-hover:opacity-100"
          }`}
        >
          {tab.icon}
        </div>

        {showText && (
          <span className="font-semibold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300">
            {tab.name}
          </span>
        )}

        {/* Tooltip for collapsed state */}
        {!showText && (
          <div className="absolute left-full ml-6 px-4 py-2 bg-gray-900/90 backdrop-blur-md text-white text-sm font-medium tracking-wide rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] border border-white/10 scale-95 group-hover:scale-100 origin-left">
            {tab.name}
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile Hamburger Button - floating over dashboard content */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-[40] p-2 bg-white dark:bg-black text-(--color-primary) rounded-md shadow-md border border-gray-200 dark:border-gray-800"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[50]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`relative h-full flex-col bg-white/60 dark:bg-black/60 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/40 dark:border-white/10 transition-all duration-300 flex ${
          isMobile
            ? `fixed top-0 left-0 h-[100dvh] z-[60] ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } w-72 p-6`
            : `${
                isOpen ? "w-72 p-6 z-50 absolute md:relative" : "w-24 items-center py-8"
              } md:z-auto`
        }`}
      >
        {/* Header Area */}
        <div
          className={`w-full flex items-center mb-8 ${
            !isOpen && !isMobile ? "justify-center flex-col gap-4" : "justify-between"
          }`}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-(--color-primary) to-orange-400 flex items-center justify-center shadow-lg text-white font-black text-xl shrink-0">
              {title.charAt(0)}
            </div>
            {(isOpen || isMobile) && (
              <div className="ml-4 flex flex-col">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-linear-to-r from-gray-800 to-gray-500 dark:from-white dark:to-gray-300">
                  {title}
                </span>
                <span className="text-[10px] font-bold text-(--color-primary) uppercase tracking-widest">
                  {subtitle}
                </span>
              </div>
            )}
          </div>

          {/* Toggle inside sidebar (Desktop & Mobile when open) */}
          {(!isMobile || isOpen) && (
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-(--color-primary) transition p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
            >
              {isMobile ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>

        {/* Dropdown Options */}
        {dropdownOptions && dropdownOptions.length > 0 && (
          <div className={`mb-6 ${!isOpen && !isMobile ? "hidden" : "block px-1"}`}>
            <select
              value={selectedDropdownValue}
              onChange={(e) => onDropdownChange(e.target.value)}
              className="w-full bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-(--color-primary) outline-none transition-all"
            >
              {dropdownOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Tabs */}
        <div className="flex-1 w-full mt-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <ul className={`flex flex-col gap-3 ${!isOpen && !isMobile ? "items-center" : ""}`}>
            {mainTabs.map(renderTab)}
          </ul>
        </div>

        {/* Settings Tab */}
        {settingsTab && (
          <div
            className={`w-full relative mt-6 pt-6 ${
              !isOpen && !isMobile ? "flex flex-col items-center" : ""
            }`}
          >
            <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-50"></div>
            <ul className="flex flex-col gap-3">{renderTab(settingsTab)}</ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
