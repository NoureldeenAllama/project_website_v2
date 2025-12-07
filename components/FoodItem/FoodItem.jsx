import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../pages/Context/StoreContext';

const FoodItem = ({ image, name, price, desc , id, rating, reviews, isFavorite, onToggleFavorite }) => {

    const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);
    const formattedPrice = Number(price).toLocaleString('en-EG');
    const displayRating = rating ? rating.toFixed(1) : "4.5";
    const displayReviews = reviews || 24;

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={image} alt="" />
                <button
                    type='button'
                    className={`food-item-favourite ${isFavorite ? 'active' : ''}`}
                    onClick={onToggleFavorite}
                    aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
                >
                    <svg width="20" height="18" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 21s-1-.45-1-1.35C7 16 3 12.5 3 8.5 3 5.42 5.42 3 8.5 3a5 5 0 0 1 3.5 1.5A5 5 0 0 1 15.5 3C18.58 3 21 5.42 21 8.5c0 4-4 7.5-8 11.15 0 .9-1 1.35-1 1.35Z"
                            strokeWidth="1"
                            stroke="none"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                {!cartItems[id]
                ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <div className="food-item-rating">
                        <span>{displayRating} ★</span>
                        <span className='food-item-reviews'>{displayReviews} reviews</span>
                    </div>
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{formattedPrice} EGP</p>
            </div>
        </div>
    )
}

export default FoodItem
