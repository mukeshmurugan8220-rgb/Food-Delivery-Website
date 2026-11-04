import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const deliveryCharge = totalPrice === 0 ? 0 : 40;
  const grandTotal = totalPrice + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <section className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your Cart is Empty!</h2>
        <p>Looks like you haven't added any delicious food yet.</p>

        <button onClick={() => navigate("/")}>
          Explore Food →
        </button>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h2>My Shopping Cart 🛒</h2>
        <p>You have {cartItems.length} different food items in your cart.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <strong>₹{item.price}</strong>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <strong>₹{item.price * item.quantity}</strong>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="continue-shopping"
            onClick={() => navigate("/")}
          >
            ← Continue Shopping
          </button>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <div className="summary-row total-row">
            <strong>Grand Total</strong>
            <strong>₹{grandTotal}</strong>
          </div>

          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>

          <p className="secure-message">
            🔒 Safe and Secure Checkout
          </p>
        </div>
      </div>
    </section>
  );
}

export default Cart;