import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderTracking.css";

const steps = [
  {
    title: "Order Placed",
    icon: "📦",
    description: "Your order has been received.",
  },
  {
    title: "Preparing",
    icon: "👨‍🍳",
    description: "Restaurant is preparing your food.",
  },
  {
    title: "Out for Delivery",
    icon: "🛵",
    description: "Your food is on its way!",
  },
  {
    title: "Delivered",
    icon: "✅",
    description: "Your order has been delivered!",
  },
];

const DEMO_OTP = "4826";

function OrderTracking() {
  const [order, setOrder] = useState(() =>
    JSON.parse(localStorage.getItem("foodieGoOrder") || "null")
  );

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("foodieGoOrder") || "null"
    );

    return Math.min(saved?.trackingStep ?? 0, 3);
  });

  const [secondsLeft, setSecondsLeft] = useState(15);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);

  // AUTOMATIC TRACKING
  useEffect(() => {
    if (!order?.orderId || currentStep >= 2) return;

    let seconds = 15;
    let step = currentStep;

    setSecondsLeft(15);

    const timer = setInterval(() => {
      seconds -= 1;
      setSecondsLeft(seconds);

      if (seconds <= 0) {
        seconds = 15;

        const savedOrder = JSON.parse(
          localStorage.getItem("foodieGoOrder") || "null"
        );

        if (!savedOrder || savedOrder.orderId !== order.orderId) {
          clearInterval(timer);
          return;
        }

        const nextStep = Math.min(step + 1, 2);
        step = nextStep;

        const updatedOrder = {
          ...savedOrder,
          trackingStep: nextStep,
          status: steps[nextStep].title,
        };

        localStorage.setItem(
          "foodieGoOrder",
          JSON.stringify(updatedOrder)
        );

        setOrder(updatedOrder);
        setCurrentStep(nextStep);

        if (nextStep >= 2) {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [order?.orderId, currentStep]);

  // OTP INPUT CHANGE
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) {
      const updated = otp.split("");
      updated[index] = "";
      setOtp(updated.join(""));
      setOtpError("");
      return;
    }

    const updated = otp.split("");
    updated[index] = value.slice(-1);

    setOtp(updated.join(""));
    setOtpError("");

    const boxes = document.querySelectorAll(".otp-box");

    if (index < 3) {
      boxes[index + 1]?.focus();
    }
  };

  // BACKSPACE AND PASTE
  const handleOtpKeyDown = (e, index) => {
    const boxes = document.querySelectorAll(".otp-box");

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      boxes[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    setOtp(pasted);
    setOtpError("");

    const boxes = document.querySelectorAll(".otp-box");
    boxes[Math.min(pasted.length, 3)]?.focus();
  };

  // OTP VERIFICATION
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP.");
      return;
    }

    if (otp !== DEMO_OTP) {
      setOtpError("Incorrect OTP! Please try again.");
      setOtpSuccess(false);
      return;
    }

    const savedOrder = JSON.parse(
      localStorage.getItem("foodieGoOrder") || "null"
    );

    if (!savedOrder || savedOrder.orderId !== order.orderId) {
      setOtpError("Order not found. Please refresh the page.");
      return;
    }

    const updatedOrder = {
      ...savedOrder,
      trackingStep: 3,
      status: "Delivered",
      otpVerified: true,
    };

    localStorage.setItem(
      "foodieGoOrder",
      JSON.stringify(updatedOrder)
    );

    setOrder(updatedOrder);
    setCurrentStep(3);
    setOtpSuccess(true);
    setOtpError("");
    setOtp("");
  };

  if (!order) {
    return (
      <div className="tracking-empty">
        <h2>📦 No Order Found!</h2>
        <p>Please place an order first.</p>

        <Link to="/" className="tracking-btn">
          Order Now
        </Link>
      </div>
    );
  }

  const progress =
    currentStep >= 3
      ? 100
      : currentStep === 2
      ? 66.67
      : ((currentStep + (15 - secondsLeft) / 15) / 3) * 100;

  const deliveryTime = [
    "25 minutes",
    "15 minutes",
    "Waiting for OTP",
    "Delivered 🎉",
  ];

  return (
    <section className="tracking-page">
      <div className="tracking-card">

        {/* HEADER */}
        <div className="tracking-header">
          <div className="tracking-main-icon">🚚</div>

          <h1>Track Your Order</h1>
          <p>Your delicious food is on its way!</p>

          <div className="tracking-order-id">
            Order ID: <strong>{order.orderId}</strong>
          </div>
        </div>

        {/* ETA */}
        <div className="delivery-eta">
          <div>
            <span>⏱️ Estimated Delivery</span>
            <h2>{deliveryTime[currentStep]}</h2>

            {currentStep < 2 && (
              <p className="countdown-text">
                Next update in: 00:
                {String(secondsLeft).padStart(2, "0")}
              </p>
            )}
          </div>

          <div className="eta-icon">⏱️</div>
        </div>

        {/* DELIVERY ROAD */}
        <div className="delivery-road">
          <div className="road-start">🏠</div>

          <div className="road-line">
            <div
              className="road-progress"
              style={{ width: `${progress}%` }}
            />

            <div
              className="moving-bike"
              style={{ left: `${progress}%` }}
            >
              🛵
            </div>
          </div>

          <div className="road-end">📍</div>
        </div>

        <div className="road-labels">
          <span>Restaurant</span>
          <span>Your Location</span>
        </div>

        {/* PROGRESS */}
        <div className="tracking-progress">
          <div
            className="tracking-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* TIMELINE */}
        <div className="tracking-steps">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`tracking-step ${
                index <= currentStep ? "completed" : ""
              }`}
            >
              <div className="tracking-icon">
                {step.icon}
              </div>

              <div className="tracking-step-info">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              <span className="step-status">
                {index < currentStep
                  ? "Completed"
                  : index === currentStep
                  ? "In Progress"
                  : "Pending"}
              </span>
            </div>
          ))}
        </div>

        {/* CURRENT STATUS */}
        <div className="tracking-current-status">
          <span>Current Delivery Status</span>

          <h2>
            {steps[currentStep].icon} {steps[currentStep].title}
          </h2>

          <p>
            {currentStep === 3
              ? "Your order has been delivered successfully!"
              : currentStep === 2
              ? "Enter your OTP to confirm delivery."
              : "Your delivery status updates automatically."}
          </p>
        </div>

        {/* DELIVERY OTP */}
        {currentStep === 2 && !otpSuccess && (
          <div className="delivery-otp-card">
            <div className="otp-icon">🔐</div>

            <h3>Delivery OTP Verification</h3>

            <p>
              Please share your OTP with the delivery partner
              to confirm your order delivery.
            </p>

            <div className="demo-otp">
              Demo OTP: <strong>{DEMO_OTP}</strong>
            </div>

            <form onSubmit={handleVerifyOtp}>
              <div className="otp-container">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    placeholder="•"
                    className="otp-box"
                    value={otp[index] || ""}
                    onChange={(e) =>
                      handleOtpChange(e, index)
                    }
                    onKeyDown={(e) =>
                      handleOtpKeyDown(e, index)
                    }
                    onPaste={handleOtpPaste}
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>

              {otpError && (
                <p className="otp-error">{otpError}</p>
              )}

              <button type="submit" className="verify-otp-btn">
                Verify OTP →
              </button>
            </form>
          </div>
        )}

        {/* OTP SUCCESS */}
        {otpSuccess && (
          <div className="otp-success">
            <span>🎉</span>
            <h3>Delivery Verified Successfully!</h3>
            <p>Your food has been delivered. Enjoy your meal!</p>
          </div>
        )}

        {/* DELIVERY PARTNER */}
        <div className="delivery-partner-card">
          <h3>🛵 Your Delivery Partner</h3>

          <div className="partner-info">
            <div className="partner-avatar">👨🏻</div>

            <div className="partner-details">
              <h4>Arun Kumar</h4>
              <p>⭐ 4.8 Rating</p>
              <span>FoodieGo Delivery Partner</span>
            </div>

            <a
              href="tel:+919876543210"
              className="partner-call-btn"
            >
              📞 Call
            </a>
          </div>

          <div className="partner-message">
            <span>💬</span>
            <p>
              Your delivery partner is assigned to your order.
            </p>
          </div>
        </div>

        {/* ORDER DETAILS */}
        <div className="tracking-order-details">
          <h3>📋 Order Details</h3>

          <p>
            Customer:
            <strong>{order.customer?.name || "N/A"}</strong>
          </p>

          <p>
            Payment:
            <strong>{order.paymentMethod || "N/A"}</strong>
          </p>

          <p>
            Total Amount:
            <strong>₹{order.totalAmount ?? 0}</strong>
          </p>

          <p>
            Delivery Address:
            <strong>{order.customer?.address || "N/A"}</strong>
          </p>
        </div>

        <Link to="/" className="tracking-btn">
          Continue Shopping →
        </Link>

      </div>
    </section>
  );
}

export default OrderTracking;