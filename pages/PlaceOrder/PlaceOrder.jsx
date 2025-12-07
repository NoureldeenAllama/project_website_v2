import React, { useContext, useEffect, useMemo, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../Context/StoreContext";
import { useLocation, useNavigate } from "react-router-dom";

const formatCurrency = (value) =>
  `${Number(value).toLocaleString("en-EG")} EGP`;

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const {
    getTotalCartAmount,
    placeOrder,
    deliveryFeeAmount,
    cartItems,
    food_list
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state || {};
  const effectiveCartItems = locationState.cartItems || cartItems || {};

  const subtotal = locationState.subtotal ?? getTotalCartAmount();
  const deliveryFee =
    locationState.deliveryFee ?? (subtotal === 0 ? 0 : deliveryFeeAmount);
  const grandTotal = locationState.total ?? subtotal + deliveryFee;

  const orderItems = useMemo(() => {
    return food_list
      .filter((item) => (effectiveCartItems[item.food_id] || 0) > 0)
      .map((item) => ({
        ...item,
        quantity: effectiveCartItems[item.food_id]
      }));
  }, [food_list, effectiveCartItems]);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: ""
  });
  const [paymentError, setPaymentError] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const hasItems = Object.values(effectiveCartItems || {}).some(
      (count) => count > 0
    );
    if (!hasItems) {
      navigate("/");
    }
  }, [effectiveCartItems, navigate]);

  const handleCardInput = (event) => {
    const { name, value } = event.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const getTrimmedCardDetails = () => ({
    name: cardDetails.name.trim(),
    number: cardDetails.number.replace(/\s+/g, ""),
    expiry: cardDetails.expiry.trim(),
    cvv: cardDetails.cvv.trim()
  });

  const isCardInfoComplete = () => {
    if (paymentMethod !== "card") return true;
    const trimmed = getTrimmedCardDetails();
    return (
      trimmed.name &&
      /^\d{12,19}$/.test(trimmed.number) &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(trimmed.expiry) &&
      /^\d{3,4}$/.test(trimmed.cvv)
    );
  };

  const validateCardDetails = () => {
    if (paymentMethod !== "card") return true;
    const trimmed = getTrimmedCardDetails();
    if (!trimmed.name) {
      setPaymentError("Cardholder name is required.");
      return false;
    }
    if (!/^\d{12,19}$/.test(trimmed.number)) {
      setPaymentError("Enter a valid card number (12-19 digits).");
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(trimmed.expiry)) {
      setPaymentError("Expiration must be in MM/YY format.");
      return false;
    }
    if (!/^\d{3,4}$/.test(trimmed.cvv)) {
      setPaymentError("CVV must be 3 or 4 digits.");
      return false;
    }
    setPaymentError("");
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateCardDetails()) {
      return;
    }

    const trimmedCard = getTrimmedCardDetails();
    const paymentInfo =
      paymentMethod === "card"
        ? {
            method: "card",
            cardholder: trimmedCard.name,
            last4: trimmedCard.number.slice(-4)
          }
        : { method: "cod" };

    const totals = {
      subtotal,
      deliveryFee,
      grandTotal
    };

    try {
      const orderId = await placeOrder(data, paymentInfo, orderItems, totals);
      if (orderId) {
        navigate("/order-tracking", { state: { orderId } });
      }
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last name"
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-field">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-field">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip code"
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-summary">
          <h2>Order Summary</h2>
          {orderItems.length === 0 ? (
            <p className="cart-summary-empty">Your cart is empty.</p>
          ) : (
            <ul>
              {orderItems.map((item) => (
                <li key={item.food_id}>
                  <div>
                    <p className="item-name">{item.food_name}</p>
                    <span>
                      {item.quantity} ×{" "}
                      {Number(item.food_price).toLocaleString("en-EG")} EGP
                    </span>
                  </div>
                  <p className="item-total">
                    {(item.food_price * item.quantity).toLocaleString("en-EG")}{" "}
                    EGP
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{formatCurrency(deliveryFee)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{formatCurrency(grandTotal)}</b>
            </div>
          </div>
        </div>

        <div className="payment-options">
          <h2>Select Payment Method</h2>
          <div
            className="payment-option-group"
            role="radiogroup"
            aria-label="Payment method"
          >
            <button
              type="button"
              role="radio"
              aria-checked={paymentMethod === "cod"}
              className={`payment-pill ${
                paymentMethod === "cod" ? "active" : ""
              }`}
              onClick={() => {
                setPaymentMethod("cod");
                setPaymentError("");
                setCardDetails({ name: "", number: "", expiry: "", cvv: "" });
              }}
            >
              COD (Cash on Delivery)
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={paymentMethod === "card"}
              className={`payment-pill ${
                paymentMethod === "card" ? "active" : ""
              }`}
              onClick={() => {
                setPaymentMethod("card");
                setPaymentError("");
              }}
            >
              Pay with Card
            </button>
          </div>

          {paymentMethod === "card" ? (
            <div className="payment-details" key="card-form">
              <div className="card-form card-form-visible">
                <div className="form-field">
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input
                    id="cardName"
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardInput}
                    placeholder="Full name as on card"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    name="number"
                    inputMode="numeric"
                    value={cardDetails.number}
                    onChange={handleCardInput}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="card-form-row">
                  <div className="form-field">
                    <label htmlFor="cardExpiry">Expiration Date</label>
                    <input
                      id="cardExpiry"
                      type="text"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardInput}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="cardCvv">CVV</label>
                    <input
                      id="cardCvv"
                      type="text"
                      name="cvv"
                      inputMode="numeric"
                      value={cardDetails.cvv}
                      onChange={handleCardInput}
                      placeholder="123"
                    />
                  </div>
                </div>
                {paymentError && (
                  <p className="payment-error">{paymentError}</p>
                )}
              </div>
            </div>
          ) : null}

          <button onClick={handlePlaceOrder} disabled={!isCardInfoComplete()}>
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
