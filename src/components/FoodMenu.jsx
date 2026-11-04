import React, { useState } from "react";
import FoodCard from "./FoodCard";
import "./FoodMenu.css";
import { useCart } from "../context/CartContext";

const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 249,
    rating: 4.8,
    description: "Classic cheese pizza with fresh tomatoes.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 179,
    rating: 4.7,
    description: "Juicy burger with cheese and fresh veggies.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 299,
    rating: 4.9,
    description: "Authentic aromatic chicken dum biryani.",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
  },
  {
    id: 4,
    name: "Grilled Chicken",
    category: "Chicken",
    price: 349,
    rating: 4.6,
    description: "Delicious grilled chicken with spices.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 149,
    rating: 4.8,
    description: "Rich chocolate cake with creamy layers.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
  },
  {
    id: 6,
    name: "Fresh Milkshake",
    category: "Drinks",
    price: 99,
    rating: 4.5,
    description: "Refreshing and creamy milkshake.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600",
  },
];

const categories = [
  "All",
  "Pizza",
  "Burger",
  "Biryani",
  "Chicken",
  "Desserts",
  "Drinks",
];

function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { addToCart, totalItems } = useCart();

  const filteredFoods =
    activeCategory === "All"
      ? foods
      : foods.filter((food) => food.category === activeCategory);

  const handleAdd = (food) => {
    addToCart(food);
  };

  return (
    <section className="food-menu-section" id="food-menu">
      <div className="food-menu-heading">
        <div>
          <h2>Our Delicious Menu 🍽️</h2>
          <p>Choose your favourite food and enjoy!</p>
        </div>

        <span className="menu-cart-count">
          🛒 Cart: {totalItems}
        </span>
      </div>

      <div className="food-filter-list">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="food-grid">
        {filteredFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onAdd={handleAdd}
          />
        ))}
      </div>
    </section>
  );
}

export default FoodMenu;