import React from "react";
import { FiArrowRight, FiClock } from "react-icons/fi";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-badge">
          🔥 Delicious food, delivered fresh
        </span>

        <h1>
          Hungry? <br />
          <span>You're in the</span> <br />
          right place!
        </h1>

        <p>
          Discover amazing restaurants and enjoy your
          favourite meals delivered straight to your door.
        </p>

        <div className="hero-buttons">
          <a href="#popular" className="explore-btn">
            Explore Food <FiArrowRight />
          </a>

          <div className="delivery-time">
            <FiClock />
            <span>30 min delivery</span>
          </div>
        </div>

        <div className="hero-stats">
          <div>
            <h3>500+</h3>
            <small>Restaurants</small>
          </div>

          <div>
            <h3>10K+</h3>
            <small>Happy Customers</small>
          </div>

          <div>
            <h3>4.9 ⭐</h3>
            <small>Customer Rating</small>
          </div>
        </div>

      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900"
          alt="Delicious pizza"
        />

        <div className="floating-card">
          <span>⭐ 4.9 Rating</span>
          <p>Customer Favourite</p>
        </div>
      </div>

    </section>
  );
}

export default Hero;