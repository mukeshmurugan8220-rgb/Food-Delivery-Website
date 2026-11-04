import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  FaPizzaSlice,
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/#food-menu`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <FaPizzaSlice className="logo-icon" />
          <span>
            Foodie<span className="logo-highlight">Go</span>
          </span>
        </Link>

        {/* Location */}
        <div className="navbar-location">
          <FaMapMarkerAlt className="location-icon" />
          <div>
            <small>Deliver to</small>
            <strong>Chennai, India</strong>
          </div>
        </div>

        {/* Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <FaSearch />

          <input
            type="text"
            placeholder="Search restaurants or food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <FaTimes />
            </button>
          )}
        </form>

        {/* Desktop Actions */}
        <div className="navbar-actions">

          <Link to="/cart" className="navbar-cart">
            <FaShoppingBag />
            <span>Cart</span>
            <span className="cart-badge">{totalItems}</span>
          </Link>

          {user ? (
            <div className="navbar-user">
              <span className="navbar-welcome">
                <FaUser /> Hi, {user.name}
              </span>

              <button
                className="signin-button"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth-buttons">
              <Link to="/signin" className="signin-button">
                <FaUser /> Sign In
              </Link>

              <Link to="/signup" className="signup-button">
                Sign Up
              </Link>
            </div>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <FaShoppingBag /> Cart ({totalItems})
          </Link>

          {user ? (
            <>
              <span className="mobile-user-name">
                <FaUser /> Hi, {user.name}
              </span>

              <button
                className="mobile-signin"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" onClick={() => setMenuOpen(false)}>
                <FaUser /> Sign In
              </Link>

              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

        </div>
      )}
    </header>
  );
}

export default Navbar;