// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, getProfile } from "../api";
import "../styles/login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Login failed. Please try again.");
        return;
      }

      const profile = await getProfile();
      window.location.href =
        profile.user.role === "Admin" ? "/admin-panel" : "/profile";
    } catch (err) {
      setStatus("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Login to Your Developer Dashboard</h1>
        <p>
          Access personalized content based on your role. Admins can manage projects and users, while regular users can explore and connect.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        {status && <p className="login-status">{status}</p>}

        <a href="https://localhost:3000/api/auth/google" className="google-login">
          Log In with Google
        </a>

        <Link to="/forgot-password" className="forgot-link">
          Forgot Password?
        </Link>
      </form>

      <footer className="login-footer">
        <p>© 2025 Raizel Criz Tayao • Secure Developer Portfolio</p>
      </footer>
    </div>
  );
}
