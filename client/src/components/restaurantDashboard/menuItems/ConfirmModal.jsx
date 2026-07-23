import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ConfirmModal = ({ selectedItem, modalMode, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="text-2xl flex justify-between items-center mb-4 border-b border-(--color-secondary) pb-2">
            <h1 className="text-(--color-primary)">Are you sure?</h1>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={onClose}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
          </div>
          <div className="mb-6">
            <h2 className="text-gray-700">
              {modalMode === "delete" && "Do you really want to delete this item? This action cannot be undone."}
              {modalMode === "topRated" && "Do you want to change the Top Rated status of this item?"}
              {modalMode === "recommended" && "Do you want to change the Recommended status of this item?"}
              {modalMode === "new" && "Do you want to change the New status of this item?"}
            </h2>
          </div>
          <div className="flex justify-end gap-3">
            <button 
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-gray-700 font-medium transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className={`px-4 py-2 rounded text-white font-medium transition-colors ${
                modalMode === "delete" ? "bg-red-500 hover:bg-red-600" : "bg-(--color-primary) hover:bg-opacity-90"
              }`}
              onClick={onConfirm}
            >
              {modalMode === "delete" ? "Delete" : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
