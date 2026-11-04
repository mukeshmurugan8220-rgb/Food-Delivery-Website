import React from "react";
import "./FoodCard.css";

function FoodCard({ food, onAdd }) {
  return (
    <div className="food-card">
      <div className="food-image">
        <img src={food.image} alt={food.name} />

        <span className="food-rating">⭐ {food.rating}</span>
      </div>

      <div className="food-info">
        <span className="food-category">{food.category}</span>

        <h3>{food.name}</h3>

        <p>{food.description}</p>

        <div className="food-bottom">
          <h3>₹{food.price}</h3>

          <button onClick={() => onAdd(food)}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;