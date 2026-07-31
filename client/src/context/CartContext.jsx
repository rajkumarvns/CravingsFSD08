import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cravingsCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cravingsCart", JSON.stringify(cart));
  }, [cart]);

  const getCartQuantity = (itemId) => {
    const cartItem = cart.find((c) => c.item._id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    // Prevent adding from different restaurants
    if (cart.length > 0 && cart[0].item.restaurantId !== item.restaurantId) {
      toast.error("You can only order from one restaurant at a time. Please clear your cart first.");
      return;
    }
    
    // Check if already in cart, if yes, just increase quantity
    const existing = cart.find(c => c.item._id === item._id);
    if(existing) {
       handleRemoveFromCart(item, true);
       return;
    }

    setCart([...cart, { item, quantity: 1 }]);
    toast.success("Added to cart");
  };

  const handleRemoveFromCart = (item, isAdding = true) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item._id === item._id);
      
      if (!existing && !isAdding) return prev;
      if (!existing && isAdding) {
        toast.success("Added to cart");
        return [...prev, { item, quantity: 1 }];
      }

      if (isAdding) {
        return prev.map((c) =>
          c.item._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        if (existing.quantity === 1) {
          toast.success("Removed from cart");
          return prev.filter((c) => c.item._id !== item._id);
        }
        return prev.map((c) =>
          c.item._id === item._id ? { ...c, quantity: c.quantity - 1 } : c
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        getCartQuantity,
        handleAddToCart,
        handleRemoveFromCart,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
