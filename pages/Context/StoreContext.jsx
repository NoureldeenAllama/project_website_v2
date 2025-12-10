import React, { createContext, useState, useCallback, useEffect } from "react";
import { food_list as seedFoodList, menu_list } from "../../assets/assets";
import { createOrderApi, getMyOrdersApi } from "../../api";

export const StoreContext = createContext(null);

const DELIVERY_FEE = 150;

const deriveFoodMeta = (item) => {
  const lowerName = item.food_name.toLowerCase();
  const vegetarianCategories = [
    "Salad",
    "Pure Veg",
    "Cake",
    "Deserts",
    "Pasta",
    "Noodles",
    "Rolls"
  ];
  const vegetarianKeywords = [
    "veg",
    "vegan",
    "cheese",
    "paneer",
    "mushroom",
    "pancake",
    "rice",
    "pulao",
    "noodles",
    "cake",
    "ice cream",
    "lasagna",
    "bread"
  ];
  const isVegetarian =
    vegetarianCategories.includes(item.food_category) ||
    vegetarianKeywords.some((keyword) => lowerName.includes(keyword));

  let priceTier = "Medium";
  if (item.food_price <= 360) {
    priceTier = "Low";
  } else if (item.food_price > 600) {
    priceTier = "High";
  }

  const rating = Number((4 + ((item.food_id % 5) * 0.1)).toFixed(1));
  const reviews = 24 + item.food_id * 2;

  return {
    ...item,
    isVegetarian,
    priceTier,
    rating,
    reviews
  };
};

const StoreContextProvider = (props) => {
  const [foodData] = useState(() => seedFoodList.map(deriveFoodMeta));
  const [cartItems, setCartItems] = useState({});
  const [favoriteItems, setFavoriteItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [orders, setOrders] = useState([]);
  const [currentTrackingId, setCurrentTrackingId] = useState(null);

  // --- FIX START: Safe User Loading ---
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      // Check if stored is valid and not the string "undefined"
      if (stored && stored !== "undefined") {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error("Corrupt user data in local storage, clearing it.", error);
      localStorage.removeItem("user");
      return null;
    }
  });
  // --- FIX END ---

  // Ensure we sync user to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      // REMOVED THE LINE THAT WAS DELETING YOUR TOKEN
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);


  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev };
      if (updated[itemId] <= 1) {
        delete updated[itemId];
      } else {
        updated[itemId] = updated[itemId] - 1;
      }
      return updated;
    });
  };

  const toggleFavorite = (itemId) => {
    setFavoriteItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId]) {
        delete updated[itemId];
      } else {
        updated[itemId] = true;
      }
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodData.find(
          (product) => product.food_id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.food_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // NEW: backend-based order placement
  const placeOrder = async (deliveryData, paymentData, orderItems, totals) => {
    const payload = {
      items: orderItems.map((item) => ({
        foodId: String(item.food_id),
        quantity: item.quantity,
        price: item.food_price
      })),
      totals: {
        subtotal: totals.subtotal,
        deliveryFee: totals.deliveryFee,
        grandTotal: totals.grandTotal
      },
      deliveryInfo: deliveryData,
      paymentInfo: paymentData
    };

    const { orderId } = await createOrderApi(payload);

    // Clear cart locally; orders list will be fetched from backend
    setCartItems({});
    setCurrentTrackingId(orderId);

    return orderId;
  };

  const fetchMyOrders = useCallback(async () => {
    const res = await getMyOrdersApi();
    setOrders(res.orders || []);
  }, []);

  const contextValue = {
    food_list: foodData,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    placeOrder,
    favoriteItems,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    orders,
    fetchMyOrders,
    currentTrackingId,
    deliveryFeeAmount: DELIVERY_FEE,
    user,
    setUser
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;