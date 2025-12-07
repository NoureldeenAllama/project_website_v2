import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const formatCurrency = (value) => `${Number(value).toLocaleString('en-EG')} EGP`;

const Cart = () => {

  const {cartItems, food_list, removeFromCart,getTotalCartAmount, deliveryFeeAmount} = useContext(StoreContext);
  const navigate = useNavigate();
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : deliveryFeeAmount;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    navigate('/order', {
      state: {
        cartItems,
        subtotal,
        deliveryFee,
        total: grandTotal,
      },
    });
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item.food_id]>0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={item.food_image} alt="" />
                <p>{item.food_name}</p>
                <p>{formatCurrency(item.food_price)}</p>
                <div>{cartItems[item.food_id]}</div>
                <p>{formatCurrency(item.food_price*cartItems[item.food_id])}</p>
                <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item.food_id)}>x</p>
              </div>
              <hr />
            </div>)
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{formatCurrency(subtotal)}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{formatCurrency(deliveryFee)}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{formatCurrency(grandTotal)}</b></div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
