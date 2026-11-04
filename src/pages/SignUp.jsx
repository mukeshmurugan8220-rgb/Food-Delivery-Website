import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = signup({
        name: name.trim(),
        email: email.trim(),
        phone,
        password,
      });

      setLoading(false);

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate("/");
    }, 500);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        <div className="signup-left">
          <div className="signup-brand">
            <span className="brand-icon">🍔</span>
            <h1>FoodieGo</h1>
          </div>

          <div className="signup-left-content">
            <h2>Join FoodieGo!</h2>
            <p>
              Delicious food is just a few clicks away.
              Create your account and enjoy your favourite meals.
            </p>

            <div className="signup-food-image">🍕 🍔 🍟</div>

            <div className="signup-benefits">
              <p>✓ Easy and quick ordering</p>
              <p>✓ Track your food delivery</p>
              <p>✓ Enjoy your favourite dishes</p>
            </div>
          </div>
        </div>

        <div className="signup-right">
          <div className="signup-form-wrapper">
            <h2>Create Account</h2>
            <p className="signup-subtitle">
              Sign up to get started with FoodieGo.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="signup-field">
                <label>Full Name</label>
                <div className="signup-input">
                  <FaUser className="signup-input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="signup-field">
                <label>Email Address</label>
                <div className="signup-input">
                  <FaEnvelope className="signup-input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="signup-field">
                <label>Mobile Number</label>
                <div className="signup-input">
                  <FaPhone className="signup-input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="signup-field">
                <label>Password</label>
                <div className="signup-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="signup-field">
                <label>Confirm Password</label>
                <div className="signup-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <div className="signup-error">{error}</div>}

              <button
                type="submit"
                className="signup-submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="signup-login-link">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// IMPORTANT: Default export
export default SignUp;