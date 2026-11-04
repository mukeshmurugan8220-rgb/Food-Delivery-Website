import React from "react";
import "./CategoryNav.css";

const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Biryani", icon: "🍛" },
  { name: "Chicken", icon: "🍗" },
  { name: "Desserts", icon: "🍰" },
  { name: "Drinks", icon: "🥤" },
  { name: "Healthy", icon: "🥗" },
];

function CategoryNav() {
  return (
    <section className="category-section">
      <div className="category-heading">
        <div>
          <h2>What's on your mind?</h2>
          <p>Explore food by category</p>
        </div>
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <button className="category-item" key={category.name}>
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryNav;