import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";

const RestaurantMenu = () => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State for creating new item
  const [isAdding, setIsAdding] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    status: "available",
    isTopRated: false,
    isRecommended: false,
  });

  useEffect(() => {
    fetchMenuItems();
  }, [user?._id]);

  const fetchMenuItems = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await api.get(`/menu/${user._id}`);
      if (res.data.success) {
        setMenuItems(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const submitData = new FormData();
      submitData.append("itemName", formData.itemName);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("category", formData.category);
      submitData.append("status", formData.status);
      submitData.append("isTopRated", formData.isTopRated);
      submitData.append("isRecommended", formData.isRecommended);
      submitData.append("restaurantId", user._id);
      
      if (imageFile) {
        submitData.append("image", imageFile);
      } else if (removeImage) {
        submitData.append("removeImage", "true");
      }

      if (editingItemId) {
        const res = await api.put(`/menu/update/${editingItemId}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data.success) {
          toast.success("Menu item updated!");
          setMenuItems(menuItems.map(item => item._id === editingItemId ? res.data.data : item));
          resetForm();
        }
      } else {
        const res = await api.post("/menu/create", submitData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data.success) {
          toast.success("Menu item added!");
          setMenuItems([...menuItems, res.data.data]);
          resetForm();
        }
      }
    } catch (error) {
      toast.error(editingItemId ? "Failed to update menu item" : "Failed to add menu item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setFormData({
      itemName: item.itemName || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "",
      status: item.status || "available",
      isTopRated: item.isTopRated || false,
      isRecommended: item.isRecommended || false,
    });
    setExistingImage(item.image?.url || null);
    setRemoveImage(false);
    setIsAdding(true);
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const res = await api.put(`/menu/update/${itemId}`, {
        status: newStatus,
        restaurantId: user._id,
      });
      if (res.data.success) {
        toast.success("Status updated!");
        setMenuItems(menuItems.map(item => item._id === itemId ? { ...item, status: newStatus } : item));
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingItemId(null);
    setImageFile(null);
    setExistingImage(null);
    setRemoveImage(false);
    setFormData({ 
      itemName: "", description: "", price: "", category: "", status: "available",
      isTopRated: false, isRecommended: false 
    });
  };

  const filteredItems = menuItems.filter((item) =>
    item.itemName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="p-4 text-center">Loading menu...</div>;
  }

  return (
    <div className="overflow-y-auto h-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Control Section: Search Bar */}
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 p-2 rounded-lg border border-(--color-secondary) bg-transparent"
          />
          
          <button
            onClick={() => {
              if (isAdding) resetForm();
              else setIsAdding(true);
            }}
            className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg font-semibold hover:opacity-90 whitespace-nowrap w-full sm:w-auto"
          >
            {isAdding ? "Cancel" : "Add New Item"}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-(--color-base-200) p-6 rounded-lg mb-6 border border-(--color-secondary)">
          <h3 className="font-semibold text-lg mb-4">{editingItemId ? "Edit Menu Item" : "Add Menu Item"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  required
                  value={formData.itemName}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-(--color-secondary) bg-transparent"
                  placeholder="e.g. Margherita Pizza"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-(--color-secondary) bg-transparent"
                  placeholder="e.g. Main Course"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-(--color-secondary) bg-transparent"
                  placeholder="e.g. 12.99"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-(--color-secondary) bg-white text-gray-800"
                >
                  <option value="available">Available</option>
                  <option value="soldout">Sold Out</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm mb-1">Item Image</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="flex items-center justify-center w-full p-2 rounded border-2 border-dashed border-(--color-secondary) hover:border-(--color-primary) bg-transparent cursor-pointer transition-colors text-center text-(--color-neutral)">
                      <span className="text-sm truncate px-2">{imageFile ? imageFile.name : "Choose an image..."}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {(imageFile || (!removeImage && existingImage)) && (
                    <div className="relative">
                      <img 
                        src={imageFile ? URL.createObjectURL(imageFile) : existingImage} 
                        alt="Preview" 
                        className="w-10 h-10 object-cover rounded shadow-sm border border-(--color-secondary)"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (imageFile) setImageFile(null);
                          else setRemoveImage(true);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-sm"
                        title="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-2 flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    name="isTopRated"
                    checked={formData.isTopRated}
                    onChange={handleChange}
                    className="rounded border-(--color-secondary) w-4 h-4"
                  />
                  Top Rated (⭐)
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    name="isRecommended"
                    checked={formData.isRecommended}
                    onChange={handleChange}
                    className="rounded border-(--color-secondary) w-4 h-4"
                  />
                  Recommended (👍)
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 rounded border border-(--color-secondary) bg-transparent"
                placeholder="Delicious pizza with fresh tomatoes..."
                rows="2"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded font-semibold w-full disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : editingItemId ? "Update Item" : "Save Item"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-(--color-base-200) p-4 rounded-lg">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-(--color-neutral)">
            {menuItems.length === 0 
              ? 'No menu items yet. Click "Add New Item" to start!' 
              : 'No menu items found matching your search.'}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--color-secondary)">
                <th className="text-left py-2">Item Name</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Status</th>
                <th className="text-right py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className="border-b border-(--color-secondary) hover:bg-(--color-base-100) transition-colors">
                  <td className="py-3 font-medium flex items-center gap-3">
                    {item.image?.url ? (
                      <img src={item.image.url} alt={item.itemName} className="w-12 h-12 object-cover rounded-md" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs text-center">No Image</div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.itemName}
                        {item.isTopRated && <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded flex items-center shadow-sm border border-yellow-200">⭐ Top Rated</span>}
                        {item.isRecommended && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded flex items-center shadow-sm border border-green-200">👍 Recommended</span>}
                      </div>
                      <div className="text-xs text-(--color-neutral)">{item.description}</div>
                    </div>
                  </td>
                  <td className="py-3">{item.category}</td>
                  <td className="py-3 font-semibold">${item.price}</td>
                  <td className="py-3">
                    <select
                      value={item.status || "available"}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className={`text-xs font-semibold uppercase tracking-wider border rounded px-2 py-1 outline-none cursor-pointer ${
                        item.status === "available" ? "bg-green-50 text-green-700 border-green-200" :
                        item.status === "soldout" ? "bg-orange-50 text-orange-700 border-orange-200" :
                        item.status === "discontinued" ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      <option value="available">Available</option>
                      <option value="soldout">Sold Out</option>
                      <option value="discontinued">Discontinued</option>
                    </select>
                  </td>
                  <td className="py-3 text-right">
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors text-sm shadow-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
