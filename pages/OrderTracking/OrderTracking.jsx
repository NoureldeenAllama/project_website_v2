import React, { useEffect, useState } from "react";
import "./OrderTracking.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getOrderByIdApi } from "../../api";

const OrderTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setError("No order in progress.");
        return;
      }
      try {
        const res = await getOrderByIdApi(orderId);
        setOrder(res.order);
      } catch (err) {
        setError(err.message || "Failed to load order");
      }
    };

    loadOrder();
  }, [orderId]);

  const handleBackHome = () => {
    navigate("/");
  };

  if (error) {
    return (
      <div className="order-tracking">
        <div className="tracking-card">
          <h2>Order Tracking</h2>
          <p>{error}</p>
          <Link to="/" className="primary-button">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-tracking">
        <div className="tracking-card">
          <h2>Order Tracking</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-tracking">
      <div className="tracking-card">
        <h2>Order in Progress</h2>
        <p className="tracking-subtitle">Order #{order.id}</p>

        <div className="tracking-timeline">
          <div className="timeline-step active">
            <span className="timeline-index">1</span>
            <p>{order.status}</p>
          </div>
        </div>

        <div className="tracking-location">
          <h3>Delivery location</h3>
          {order.deliveryInfo ? (
            <>
              <p>
                {order.deliveryInfo.street}, {order.deliveryInfo.city}
              </p>
              <p>
                {order.deliveryInfo.state}, {order.deliveryInfo.country},{" "}
                {order.deliveryInfo.zipcode}
              </p>
              <div className="map-card">
                Rider is on the way to {order.deliveryInfo.street},{" "}
                {order.deliveryInfo.city}.
              </div>
            </>
          ) : (
            <p>Delivery details will appear here.</p>
          )}
        </div>

        <button className="primary-button" onClick={handleBackHome}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
