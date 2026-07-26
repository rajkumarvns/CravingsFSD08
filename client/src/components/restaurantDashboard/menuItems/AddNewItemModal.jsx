import React, { useState } from "react";
import { IoMdCloseCircleOutline, IoMdImage } from "react-icons/io";
import { FaTag, FaInfoCircle, FaRupeeSign, FaUtensils, FaLeaf } from "react-icons/fa";

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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-(--color-primary) to-orange-400 p-6 text-white flex justify-between items-center shadow-md z-10 relative">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Add New Dish
              </h1>
              <p className="text-orange-100 text-sm mt-1 opacity-90 font-medium">
                Create a new, delicious addition to your menu.
              </p>
            </div>
            <button
              className="text-white/80 hover:text-white transition-transform hover:scale-110 hover:rotate-90 duration-300"
              onClick={onClose}
            >
              <IoMdCloseCircleOutline size={32} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 lg:p-8 flex-1">
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Left Column: Image */}
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 aspect-square flex items-center justify-center">
                  {formData.imageUrl ? (
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center gap-2 pointer-events-none">
                      <IoMdImage size={48} className="opacity-50 group-hover:text-(--color-primary) transition-colors duration-300" />
                      <span className="text-sm font-medium group-hover:text-(--color-primary) transition-colors duration-300">Upload Image</span>
                    </div>
                  )}

                  {!formData.imageUrl && (
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleFileChange}
                    />
                  )}

                  {formData.imageUrl && (
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-lg transition-transform hover:scale-110 z-20"
                      onClick={(e) => { e.preventDefault(); removeImage(); }}
                      title="Remove image"
                    >
                      <IoMdCloseCircleOutline size={20} />
                    </button>
                  )}
                </div>
                
                {formData.imageUrl && (
                  <div>
                    <label className="cursor-pointer flex items-center justify-center w-full px-4 py-2 bg-orange-50 text-(--color-primary) border border-orange-200 rounded-xl font-bold text-sm hover:bg-orange-100 transition-colors shadow-sm">
                      <span>Change Image</span>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Right Column: Details */}
              <div className="w-full md:w-2/3 flex flex-col gap-5">
                {/* Item Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    <FaTag className="text-(--color-primary) opacity-80" /> Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 shadow-inner focus:border-(--color-primary) focus:ring-2 focus:ring-orange-200 text-gray-900 dark:text-white px-4 py-3 font-medium transition-all outline-none"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="e.g. Signature Garlic Bread"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    <FaInfoCircle className="text-(--color-primary) opacity-80" /> Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 shadow-inner focus:border-(--color-primary) focus:ring-2 focus:ring-orange-200 text-gray-900 dark:text-white px-4 py-3 text-sm transition-all resize-none outline-none"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g. Warm, crusty bread topped with our special garlic butter blend."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Price */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      <FaRupeeSign className="text-(--color-primary) opacity-80" /> Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 shadow-inner focus:border-(--color-primary) focus:ring-2 focus:ring-orange-200 text-gray-900 dark:text-white px-4 py-2.5 font-bold transition-all outline-none"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="150"
                    />
                  </div>
                  {/* Category */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      <FaUtensils className="text-(--color-primary) opacity-80" /> Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 shadow-inner focus:border-(--color-primary) focus:ring-2 focus:ring-orange-200 text-gray-900 dark:text-white px-4 py-2.5 font-medium transition-all cursor-pointer outline-none"
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
                  {/* Menu Type */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      <FaLeaf className="text-(--color-primary) opacity-80" /> Menu Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 shadow-inner focus:border-(--color-primary) focus:ring-2 focus:ring-orange-200 text-gray-900 dark:text-white px-4 py-2.5 font-medium transition-all cursor-pointer outline-none"
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

          {/* Footer Action */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-4 rounded-b-3xl">
            <button
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-colors outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-8 py-2.5 bg-gradient-to-r from-(--color-primary) to-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all outline-none"
              onClick={handleAdd}
            >
              Create Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewItemModal;
