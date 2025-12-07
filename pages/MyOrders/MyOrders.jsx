import React, { useContext, useEffect } from "react";
import "./MyOrders.css";
import { StoreContext } from "../Context/StoreContext";

const MyOrders = () => {
  const { orders, fetchMyOrders } = useContext(StoreContext);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="orders-empty">You have not placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <p className="order-id">Order #{order.id}</p>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="order-total">
                  {order.totals.grandTotal.toLocaleString("en-EG")} EGP
                </p>
              </div>
              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={`${item.foodId}-${index}`}>
                    <span>{item.foodId}</span>
                    <span>
                      {item.quantity} × {item.price.toLocaleString("en-EG")} EGP
                    </span>
                  </li>
                ))}
              </ul>
              <div className="order-status">
                <span className="active">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
