import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const AddNewItemModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        imageUrl: url,
        imageFile: file,
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
      imageFile: null,
    }));
  };

  const handleAdd = () => {
    if (!formData.itemName || !formData.price || !formData.category) {
      alert("Please fill out the required fields: Item Name, Price, Category.");
      return;
    }
    onAdd(formData);
    setFormData({
      itemName: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="text-2xl flex justify-between items-center mb-4 border-b border-(--color-secondary) pb-2 sticky top-0 bg-white z-10">
            <h1 className="text-(--color-primary)">Add New Item</h1>
            <button
              className="text-red-300 hover:text-red-500"
              onClick={onClose}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="itemName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-(--color-primary) focus:ring-(--color-primary) sm:text-sm p-2 border"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="e.g. Garlic Bread"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-(--color-primary) focus:ring-(--color-primary) sm:text-sm p-2 border"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="e.g. Warm, crusty bread with garlic butter."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-(--color-primary) file:text-white
                    hover:file:bg-opacity-90"
                  onChange={handleFileChange}
                />
                {formData.imageUrl && (
                  <div className="mt-2 relative inline-block">
                    <img src={formData.imageUrl} alt="Preview" className="h-16 w-16 object-cover rounded shadow-sm" />
                    <button
                      className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full hover:text-red-700 shadow-md"
                      onClick={removeImage}
                      title="Remove image"
                    >
                      <IoMdCloseCircleOutline size={20} />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-(--color-primary) focus:ring-(--color-primary) sm:text-sm p-2 border"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-(--color-primary) focus:ring-(--color-primary) sm:text-sm p-2 border"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Starter"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-(--color-primary) text-white rounded-md hover:bg-opacity-90"
                  onClick={handleAdd}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewItemModal;
