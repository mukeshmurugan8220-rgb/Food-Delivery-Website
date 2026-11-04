import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [placedTotal, setPlacedTotal] = useState(0);

  const deliveryCharge = totalPrice > 0 ? 40 : 0;
  const grandTotal = totalPrice + deliveryCharge;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/");
      return;
    }

    // Save total before clearing cart
    const finalAmount = grandTotal;

    const newOrderId = "FG" + Date.now().toString().slice(-8);

    const orderDetails = {
      orderId: newOrderId,
      customer: formData,
      items: cartItems,
      paymentMethod,
      totalAmount: finalAmount,
      orderDate: new Date().toLocaleString(),
      status: "Order Placed",
    };

    localStorage.setItem(
      "foodieGoOrder",
      JSON.stringify(orderDetails)
    );

    setOrderId(newOrderId);
    setPlacedTotal(finalAmount);

    clearCart();
    setOrderPlaced(true);
  };

  // Order Success Page
  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="success-icon">🎉</div>

        <h2>Order Placed Successfully!</h2>

        <p>
          Thank you, {formData.name}! Your delicious food is on its way.
        </p>

        <div className="success-order-info">
          <span>Order ID</span>
          <strong>{orderId}</strong>
        </div>

        <div className="success-order-info">
          <span>Total Amount</span>
          <strong>₹{placedTotal}</strong>
        </div>

        <button
          onClick={() => navigate("/track-order")}
          style={{ marginBottom: "12px" }}
        >
          📦 Track Your Order →
        </button>

        <button onClick={() => navigate("/")}>
          Continue Shopping →
        </button>
      </div>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-heading">
        <h2>Checkout 🛍️</h2>
        <p>Complete your details and enjoy your favourite food.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="checkout-layout">

          {/* Customer Information */}

          <div className="checkout-left">

            <div className="checkout-card">
              <h3>👤 Customer Information</h3>

              <div className="checkout-form-grid">

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10 digit mobile number"
                    pattern="[6-9][0-9]{9}"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>
            </div>

            {/* Delivery Address */}

            <div className="checkout-card">
              <h3>📍 Delivery Address</h3>

              <div className="form-group">
                <label>Full Address</label>
                <textarea
                  name="address"
                  placeholder="House number, street, area..."
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkout-form-grid">

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>PIN Code</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="6 digit PIN code"
                    pattern="[0-9]{6}"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>
            </div>

            {/* Payment Method */}

            <div className="checkout-card">
              <h3>💳 Payment Method</h3>

              <div className="payment-options">

                <label className={paymentMethod === "COD" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💵 Cash on Delivery</span>
                </label>

                <label className={paymentMethod === "UPI" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>📱 UPI Payment</span>
                </label>

                <label className={paymentMethod === "Card" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💳 Credit / Debit Card</span>
                </label>

              </div>

              <p className="payment-note">
                Demo checkout: online payment options are selection-only.
                No actual payment will be processed.
              </p>
            </div>

          </div>

          {/* Order Summary */}

          <div className="checkout-summary">
            <h3>Order Summary</h3>

            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </div>
            ))}

            <div className="checkout-total-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="checkout-total-row">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <div className="checkout-grand-total">
              <strong>Grand Total</strong>
              <strong>₹{grandTotal}</strong>
            </div>

            <button
              type="submit"
              className="place-order-button"
              disabled={cartItems.length === 0}
            >
              Place Order → ₹{grandTotal}
            </button>

            <p className="checkout-security">
              🔒 Your information is securely stored in this demo.
            </p>
          </div>

        </div>
      </form>
    </section>
  );
}

export default Checkout;