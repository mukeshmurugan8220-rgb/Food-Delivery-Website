import React from "react";
import "./RestaurantCard.css";

const restaurants = [
  {
    id: 1,
    name: "Pizza Paradise",
    cuisine: "Pizza, Italian, Fast Food",
    rating: "4.8",
    time: "25-30 min",
    offer: "50% OFF",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
  },
  {
    id: 2,
    name: "Burger House",
    cuisine: "Burgers, American, Fast Food",
    rating: "4.7",
    time: "20-25 min",
    offer: "40% OFF",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: 3,
    name: "Biryani Express",
    cuisine: "Biryani, South Indian",
    rating: "4.9",
    time: "30-35 min",
    offer: "30% OFF",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
  },
  {
    id: 4,
    name: "Chicken Kingdom",
    cuisine: "Grill, Chicken, BBQ",
    rating: "4.6",
    time: "25-30 min",
    offer: "20% OFF",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600",
  },
];

function RestaurantCard() {
  return (
    <section className="restaurant-section">
      <div className="restaurant-heading">
        <div>
          <h2>Popular Restaurants 🔥</h2>
          <p>Discover the best restaurants near you</p>
        </div>

        <button className="view-all">View All →</button>
      </div>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant.id}>
            <div className="restaurant-image">
              <img src={restaurant.image} alt={restaurant.name} />

              <span className="offer-badge">
                {restaurant.offer}
              </span>
            </div>

            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>

              <p className="cuisine">{restaurant.cuisine}</p>

              <div className="restaurant-details">
                <span className="rating">
                  ⭐ {restaurant.rating}
                </span>

                <span>🕒 {restaurant.time}</span>
              </div>

              <button className="order-button">
                Explore Restaurant →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RestaurantCard;