import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const AddNewItemModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "Starter",
    type: "Vegetarian",
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
      category: "Starter",
      type: "Vegetarian",
      imageUrl: "",
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85%] overflow-hidden flex flex-col transform transition-all">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white/80 sticky top-0 z-10 backdrop-blur-md">
            <div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">Add New Menu Item</h2>
              <p className="text-sm text-gray-500 mt-1">Fill in the details to add a new dish to your menu.</p>
            </div>
            <button
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
              onClick={onClose}
            >
              <IoMdCloseCircleOutline size={26} />
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Left Column - Image (40%) */}
              <div className="md:col-span-2 flex flex-col h-full">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Item Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center h-full min-h-48 relative hover:border-(--color-primary) hover:bg-(--color-primary)/5 transition-all duration-300 bg-gray-50 group cursor-pointer overflow-hidden">
                  {!formData.imageUrl ? (
                    <div className="transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                      <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-gray-400 group-hover:text-(--color-primary) transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-2 font-medium">PNG, JPG up to 5MB</p>
                    </div>
                  ) : null}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                  />
                  {formData.imageUrl && (
                    <div className="absolute inset-0 bg-white p-1">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-inner" />
                      <button
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur text-red-500 rounded-full p-1.5 hover:bg-red-500 hover:text-white shadow-md z-20 transition-all duration-200 transform hover:scale-110"
                        onClick={(e) => { e.preventDefault(); removeImage(); }}
                        title="Remove image"
                      >
                        <IoMdCloseCircleOutline size={22} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Text Data (60%) */}
              <div className="md:col-span-3 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    className="w-full rounded-xl border border-gray-200 shadow-sm focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 sm:text-sm px-4 py-3 transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="e.g. Garlic Bread"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full rounded-xl border border-gray-200 shadow-sm focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 sm:text-sm px-4 py-3 transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white resize-none"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g. Warm, crusty bread with garlic butter."
                  />
                </div>

                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">₹</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        className="w-full rounded-xl border border-gray-200 shadow-sm focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 sm:text-sm pl-8 pr-4 py-3 transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="150"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      className="w-full rounded-xl border border-gray-200 shadow-sm focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 sm:text-sm px-4 py-3 transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="Starter">Starter</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Burger">Burger</option>
                      <option value="Biryani">Biryani</option>
                      <option value="Rice">Rice</option>
                      <option value="Seafood">Seafood</option>
                      <option value="Wrap">Wrap</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Menu Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      className="w-full rounded-xl border border-gray-200 shadow-sm focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 sm:text-sm px-4 py-3 transition-all duration-200 outline-none bg-gray-50 hover:bg-white focus:bg-white"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
            <button
              className="px-6 py-2.5 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2.5 bg-(--color-primary) text-white font-medium rounded-xl shadow-md shadow-(--color-primary)/30 hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--color-primary)/50 flex items-center gap-2"
              onClick={handleAdd}
            >
              Add Menu Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewItemModal;
