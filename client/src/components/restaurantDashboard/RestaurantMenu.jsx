import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";

const RestaurantMenu = () => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State for creating new item
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/menu/create", {
        ...formData,
        restaurantId: user._id,
      });
      if (res.data.success) {
        toast.success("Menu item added!");
        setMenuItems([...menuItems, res.data.data]);
        setIsAdding(false);
        setFormData({ itemName: "", description: "", price: "", category: "" });
      }
    } catch (error) {
      toast.error("Failed to add menu item");
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading menu...</div>;
  }

  return (
    <div className="overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          {isAdding ? "Cancel" : "Add New Item"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-(--color-base-200) p-6 rounded-lg mb-6 border border-(--color-secondary)">
          <h3 className="font-semibold text-lg mb-4">Add Menu Item</h3>
          <form onSubmit={handleAddItem} className="space-y-4">
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
              className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded font-semibold w-full"
            >
              Save Item
            </button>
          </form>
        </div>
      )}

      <div className="bg-(--color-base-200) p-4 rounded-lg">
        {menuItems.length === 0 ? (
          <div className="text-center py-8 text-(--color-neutral)">
            No menu items yet. Click "Add New Item" to start!
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--color-secondary)">
                <th className="text-left py-2">Item Name</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item._id} className="border-b border-(--color-secondary) hover:bg-(--color-base-100) transition-colors">
                  <td className="py-3 font-medium">
                    <div>{item.itemName}</div>
                    <div className="text-xs text-(--color-neutral)">{item.description}</div>
                  </td>
                  <td className="py-3">{item.category}</td>
                  <td className="py-3 font-semibold">${item.price}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${item.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </span>
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
