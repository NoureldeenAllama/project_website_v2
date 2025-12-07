// Simple in-memory database (local until we are sure)

export const users = []; 
// user: { id, name, email, passwordHash, createdAt }

export const orders = [];
// order: { id, userId, items, totals, deliveryInfo, paymentInfo, status, createdAt }

export const menuItems = [
  {
    id: "1",
    name: "Smash Burger",
    price: 150,
    category: "combo"
  },
  {
    id: "2",
    name: "Hotdog",
    price: 90,
    category: "hotdog"
  },
  {
    id: "3",
    name: "Mini Pancakes",
    price: 120,
    category: "pancake"
  }
  
];
