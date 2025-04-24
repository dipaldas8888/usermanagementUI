import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const loggedIn = localStorage.getItem("token") !== null;
  const isAdmin =
    localStorage.getItem("role") === "ADMIN" ||
    localStorage.getItem("role") === "admin";
  const isUser =
    localStorage.getItem("role") === "USER" ||
    localStorage.getItem("role") === "user";
  const isGuest = !loggedIn;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          {loggedIn && (
            <h1>
              {isAdmin && <>Welcome, Admin!</>}
              {isUser && <>Welcome, User!</>}
            </h1>
          )}
          {!loggedIn && <h1>Welcome to Our User Management System</h1>}
          <p>A powerful solution for managing your organization's users</p>
          {isGuest && (
            <div className="cta-buttons">
              <Link to="/register" className="btn primary">
                Get Started
              </Link>
              <Link to="/login" className="btn secondary">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>User Management</h3>
            <p>Easily manage user accounts with our intuitive interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Access</h3>
            <p>Role-based access control for enhanced security</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics</h3>
            <p>Track and monitor user activities efficiently</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
