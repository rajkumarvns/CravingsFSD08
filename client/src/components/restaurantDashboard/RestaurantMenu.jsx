import React, { useState } from "react";
import { FaAward, FaRegGrinStars } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { LuPencilLine, LuTrash2, LuEye, LuChevronDown } from "react-icons/lu";
import { AiTwotoneLike } from "react-icons/ai";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import ConfirmModal from "./menuItems/ConfirmModal";
import AddNewItemModal from "./menuItems/AddNewItemModal";
import EditOrViewItem from "./menuItems/EditOrViewItem";
import { dummyMenu, statusChipStyles, statusLabels } from "./menuItems/menuData";

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState(dummyMenu);

  const [isAddNewItemModalOpen, setIsAddNewItemModalOpen] = useState(false);
  const [isEditViewItemModalOpen, setIsEditViewItemModalOpen] = useState(false);
  const [isControlsModalOpen, setIsControlsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirmAction = async () => {
    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 800));
    if (modalMode === "delete") {
      setMenuItems((prev) => prev.filter((m) => m.itemName !== selectedItem.itemName));
      showToast("Item deleted successfully!");
    } else if (modalMode === "topRated") {
      setMenuItems((prev) => prev.map((m) => m.itemName === selectedItem.itemName ? { ...m, isTopRated: !m.isTopRated } : m));
      showToast("Top Rated status updated!");
    } else if (modalMode === "recommended") {
      setMenuItems((prev) => prev.map((m) => m.itemName === selectedItem.itemName ? { ...m, isRecommended: !m.isRecommended } : m));
      showToast("Recommended status updated!");
    } else if (modalMode === "new") {
      setMenuItems((prev) => prev.map((m) => m.itemName === selectedItem.itemName ? { ...m, isNew: !m.isNew } : m));
      showToast("New status updated!");
    }
    setIsControlsModalOpen(false);
    setIsProcessing(false);
  };

  const handleEditItem = async (updatedItem) => {
    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 800));
    setMenuItems((prev) => prev.map((m) => m.itemName === selectedItem.itemName ? { ...m, ...updatedItem } : m));
    setIsEditViewItemModalOpen(false);
    setIsProcessing(false);
    showToast("Item updated successfully!");
  };

  const handleAddItem = async (newItem) => {
    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 800));
    const itemToAdd = {
      ...newItem,
      image: {
        url: newItem.imageUrl || "https://picsum.photos/seed/newitem/600/600",
        publicId: "dummy-new",
      },
      status: "available",
      isTopRated: false,
      isRecommended: false,
      isNew: true,
      isDeleted: false,
    };
    delete itemToAdd.imageUrl;
    setMenuItems((prev) => [itemToAdd, ...prev]);
    setIsAddNewItemModalOpen(false);
    setIsProcessing(false);
    showToast("Item added successfully!");
  };

  return (
    <>
      <div className="overflow-y-auto h-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 mb-6 gap-4 sm:gap-0">
          <h2 className="text-2xl font-bold">Menu Management</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch sm:items-center">
            <button
              className="hover:bg-(--color-primary) border border-(--color-primary) text-(--color-primary) hover:text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
              onClick={() => setIsAddNewItemModalOpen(true)}
            >
              <IoMdAddCircleOutline />
              Add New Item
            </button>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-(--color-primary) rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-colors w-full sm:w-auto"
            />
          </div>
        </div>
        <div className="bg-(--color-base-200) p-2 sm:p-4 rounded-lg">
          <div className="hidden lg:grid text-(--color-primary) grid-cols-7 gap-4 font-bold border-b border-(--color-secondary) py-2 px-2">
            <div className="col-span-2">Item Name & Description</div>
            <div className="text-center">Price</div>
            <div>Category & Type</div>
            <div>Status</div>
            <div>Controls</div>
            <div>Actions</div>
          </div>
          <div className="overflow-y-auto max-h-[70vh] pr-1 sm:pr-2 mt-2">
            {filteredMenuItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:grid lg:grid-cols-7 gap-3 lg:gap-4 bg-(--color-base-100) p-4 mb-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-(--color-secondary) hover:-translate-y-0.5 items-start lg:items-center"
              >
                <div className="col-span-2 flex items-start sm:items-center gap-4 w-full">
                  <img
                    src={item.image.url}
                    alt={item.itemName}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-lg leading-tight mb-1">{item.itemName}</div>
                    <div className="text-xs sm:text-sm text-gray-500 leading-snug">
                      {item.description}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between w-full lg:w-auto lg:block lg:text-center mt-2 lg:mt-0">
                  <span className="lg:hidden font-semibold text-gray-600 text-sm">Price:</span>
                  <span className="font-bold text-gray-800">₹ {item.price.toFixed(2)}</span>
                </div>

                <div className="flex justify-between w-full lg:w-auto lg:block border-t border-dashed border-gray-200 lg:border-0 pt-2 lg:pt-0">
                  <span className="lg:hidden font-semibold text-gray-600 text-sm">Category:</span>
                  <div className="text-right lg:text-left">
                    <div className="font-semibold text-gray-800">{item.category}</div>
                    <div className="text-xs text-gray-500">{item.type}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full lg:w-auto lg:block border-t border-dashed border-gray-200 lg:border-0 pt-2 lg:pt-0">
                  <span className="lg:hidden font-semibold text-gray-600 text-sm">Status:</span>
                  <div className="relative inline-flex items-center">
                    <select
                      value={item.status}
                      className={`appearance-none rounded-md pl-3 pr-8 py-1.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                        statusChipStyles[item.status]
                      }`}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        setIsProcessing(true);
                        await new Promise((res) => setTimeout(res, 800));
                        setMenuItems((prev) => prev.map((m) => m.itemName === item.itemName ? { ...m, status: newStatus } : m));
                        setIsProcessing(false);
                        showToast(`Status updated to ${newStatus}!`);
                      }}
                    >
                      <option value="available">
                        {statusLabels.available}
                      </option>
                      <option value="unavailable">
                        {statusLabels.unavailable}
                      </option>
                      <option value="discontinued">
                        {statusLabels.discontinued}
                      </option>
                    </select>
                    <LuChevronDown className="pointer-events-none absolute right-2 text-xs opacity-70" />
                  </div>
                </div>

                <div className="flex justify-between items-center w-full lg:w-auto lg:block border-t border-dashed border-gray-200 lg:border-0 pt-2 lg:pt-0">
                  <span className="lg:hidden font-semibold text-gray-600 text-sm">Controls:</span>
                  <div className="flex gap-2">
                    <button
                      className={`rounded flex items-center justify-center p-1 hover:bg-gray-100 transition-colors ${
                        item.isTopRated
                          ? " text-(--color-primary)"
                          : "text-(--color-secondary)"
                      }`}
                      title={item.isTopRated ? "Top Rated" : "Mark as Top Rated"}
                      onClick={() => {
                        setSelectedItem(item);
                        setModalMode("topRated");
                        setIsControlsModalOpen(true);
                      }}
                    >
                      <FaAward size={18} />
                    </button>
                    <button
                      className={`rounded flex items-center justify-center p-1 hover:bg-gray-100 transition-colors ${
                        item.isRecommended
                          ? "text-(--color-primary)"
                          : "text-(--color-secondary)"
                      }`}
                      onClick={() => {
                        setSelectedItem(item);
                        setModalMode("recommended");
                        setIsControlsModalOpen(true);
                      }}
                      title={
                        item.isRecommended ? "Recommended" : "Mark as Recommended"
                      }
                    >
                      <AiTwotoneLike size={18} />
                    </button>
                    <button
                      className={`px-2 py-0.5 rounded flex items-center justify-center text-xs font-semibold transition-colors ${
                        item.isNew
                          ? "text-white bg-(--color-primary) border border-(--color-primary)"
                          : "text-(--color-secondary) border border-(--color-secondary) hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSelectedItem(item);
                        setModalMode("new");
                        setIsControlsModalOpen(true);
                      }}
                      title={item.isNew ? "New Item" : "Mark as New"}
                    >
                      New
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full lg:w-auto lg:block border-t border-dashed border-gray-200 lg:border-0 pt-2 lg:pt-0 pb-1 lg:pb-0">
                  <span className="lg:hidden font-semibold text-gray-600 text-sm">Actions:</span>
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1.5 border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded transition-colors"
                      title="Edit Item"
                      onClick={() => {
                        setSelectedItem(item);
                        setModalMode("edit");
                        setIsEditViewItemModalOpen(true);
                      }}
                    >
                      <LuPencilLine size={16} />
                    </button>
                    <button
                      className="px-2 py-1.5 border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded transition-colors"
                      title="View Item Details"
                      onClick={() => {
                        setSelectedItem(item);
                        setModalMode("view");
                        setIsEditViewItemModalOpen(true);
                      }}
                    >
                      <LuEye size={16} />
                    </button>
                    <button
                      className="px-2 py-1.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                      title="Delete Item"
                      onClick={() => {
                        setSelectedItem(item);
                        setModalMode("delete");
                        setIsControlsModalOpen(true);
                      }}
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isControlsModalOpen && (
        <ConfirmModal
          selectedItem={selectedItem}
          modalMode={modalMode}
          isOpen={isControlsModalOpen}
          onClose={() => setIsControlsModalOpen(false)}
          onConfirm={handleConfirmAction}
        />
      )}
      
      {isAddNewItemModalOpen && (
        <AddNewItemModal 
          isOpen={isAddNewItemModalOpen}
          onClose={() => setIsAddNewItemModalOpen(false)}
          onAdd={handleAddItem}
        />
      )}

      {isEditViewItemModalOpen && (
        <EditOrViewItem
          selectedItem={selectedItem}
          modalMode={modalMode}
          isOpen={isEditViewItemModalOpen}
          onClose={() => setIsEditViewItemModalOpen(false)}
          onSave={handleEditItem}
        />
      )}

      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="w-12 h-12 border-4 border-t-(--color-primary) border-white rounded-full animate-spin shadow-lg mb-4"></div>
          <p className="text-white font-semibold text-lg drop-shadow-md animate-pulse">Processing...</p>
        </div>
      )}

      {toast.show && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-lg shadow-xl text-white font-semibold transition-all duration-300 animate-bounce ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
};

export default RestaurantMenu;
