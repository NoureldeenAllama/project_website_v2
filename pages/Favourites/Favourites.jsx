import React, { useContext } from 'react';
import './Favourites.css';
import { StoreContext } from '../Context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';

const Favourites = () => {
    const { food_list, favoriteItems, toggleFavorite } = useContext(StoreContext);
    const favourites = food_list.filter((item) => favoriteItems[item.food_id]);

    return (
        <div className='favourites-page'>
            <div className="favourites-header">
                <h2>Your favourites</h2>
                <p>Save the dishes you love and reorder them anytime.</p>
            </div>
            {favourites.length === 0 ? (
                <p className='favourites-empty'>No favourites yet. Tap the heart icon on a dish to save it.</p>
            ) : (
                <div className="favourites-grid">
                    {favourites.map((item) => (
                        <FoodItem
                            key={item.food_id}
                            image={item.food_image}
                            name={item.food_name}
                            desc={item.food_desc}
                            price={item.food_price}
                            id={item.food_id}
                            rating={item.rating}
                            reviews={item.reviews}
                            isFavorite={Boolean(favoriteItems[item.food_id])}
                            onToggleFavorite={() => toggleFavorite(item.food_id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourites;

