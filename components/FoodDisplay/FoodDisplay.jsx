import React, { useContext, useEffect, useMemo, useState } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../pages/Context/StoreContext'

const FoodDisplay = ({category}) => {

  const {food_list, toggleFavorite, favoriteItems, searchQuery, setSearchQuery} = useContext(StoreContext);
  const [search, setSearch] = useState(searchQuery);
  const [filteredDishes, setFilteredDishes] = useState(food_list);
  const [filters, setFilters] = useState({ veg: false, price: 'All' });

  const filterItems = useMemo(() => {
    return (queryValue = "", activeFilters = filters) => {
      const normalizedQuery = queryValue.trim().toLowerCase();
      return food_list.filter((item) => {
        if (!(category === "All" || item.food_category === category)) return false;
        if (normalizedQuery) {
          const matchesName = item.food_name.toLowerCase().includes(normalizedQuery);
          const matchesDesc = item.food_desc?.toLowerCase().includes(normalizedQuery);
          if (!matchesName && !matchesDesc) return false;
        }
        if (activeFilters.veg && !item.isVegetarian) return false;
        if (activeFilters.price !== 'All' && item.priceTier !== activeFilters.price) return false;
        return true;
      });
    };
  }, [food_list, category, filters]);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setFilteredDishes(filterItems(search, filters));
  }, [filterItems, search, filters]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setSearchQuery(value);
  };

  const handleSearch = () => {
    setFilteredDishes(filterItems(search, filters));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: typeof value === 'boolean' ? !prev[key] : value
    }));
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-controls">
        <div className="food-search-bar">
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder='Search for dishes or descriptions'
            aria-label='Search dishes'
          />
          <button type='button' onClick={handleSearch}>Search</button>
        </div>
        <div className="food-filter-controls">
          <button
            type='button'
            className={filters.veg ? 'active' : ''}
            onClick={() => toggleFilter('veg', true)}
          >
            Vegetarian
          </button>
          <div className="price-filter">
            {['All', 'Low', 'Medium', 'High'].map((tier) => (
              <button
                key={tier}
                type='button'
                className={filters.price === tier ? 'active' : ''}
                onClick={() => toggleFilter('price', tier)}
              >
                {tier === 'All' ? 'All prices' : `${tier} price`}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='food-display-list'>
        {filteredDishes.length === 0 ? (
          <p className='food-display-empty'>No dishes match your search. Try adjusting your filters.</p>
        ) : (
          filteredDishes.map((item)=>(
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
          ))
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
