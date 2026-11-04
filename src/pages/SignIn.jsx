import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPizzaSlice } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./SignIn.css";

function SignIn() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = login(email.trim().toLowerCase(), password);

      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Invalid email or password!");
      }

      setLoading(false);
    }, 700);
  };

  if (user) {
    return (
      <div className="signin-page">
        <div className="signin-container">
          <div className="signin-right">
            <div className="signin-form-wrapper">
              <h1>Welcome back, {user.name}!</h1>
              <p className="signin-subtitle">
                You are already signed in to FoodieGo.
              </p>
              <Link to="/" className="signin-home">
                Go to Home →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signin-page">
      <div className="signin-container">

        {/* LEFT SECTION */}
        <div className="signin-left">

          <div className="signin-brand">
            <FaPizzaSlice />
            <h2>FoodieGo</h2>
          </div>

          <div className="signin-welcome-content">

            <span className="signin-welcome-label">
              WELCOME BACK
            </span>

            <h1>
              Good Food.
              <br />
              Great Moments.
              <br />
              <span>Welcome Back!</span>
            </h1>

            <p>
              Your favourite meals are waiting for you.
              Sign in to explore delicious food and get
              your cravings delivered to your doorstep.
            </p>

            <div className="signin-food">
              🍕 🍔 🍟 🍗
            </div>

            <h3>Delicious Moments Start Here!</h3>

          </div>

          <small>© 2026 FoodieGo. All rights reserved.</small>

        </div>

        {/* RIGHT SECTION */}
        <div className="signin-right">

          <div className="signin-form-wrapper">

            <span className="signin-label">WELCOME BACK</span>

            <h1>Sign In</h1>

            <p className="signin-subtitle">
              Enter your credentials to access your account.
            </p>

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="signin-field">
                <label>Email Address</label>

                <div className="signin-input">
                  <FaEnvelope />

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

              {/* PASSWORD */}
              <div className="signin-field">
                <label>Password</label>

                <div className="signin-input">
                  <FaLock />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="signin-error">
                  {error}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="signin-submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            {/* SIGN UP LINK */}
            <div className="signin-signup">
              Don't have an account?
              <Link to="/signup"> Sign Up</Link>
            </div>

            <Link to="/" className="signin-home">
              ← Back to Home
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

// IMPORTANT: DEFAULT EXPORT
export default SignIn;