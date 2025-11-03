// src/pages/Signup.jsx
import React, { useState } from "react";
import { signup } from "../api";
import "../styles/signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      setStatus(res.message || "Signup successful!");
    } catch (err) {
      setStatus("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <h1>Create Your Developer Account</h1>
        <p>
          Join the platform to explore projects, connect securely, and manage content based on your role.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

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

        <label htmlFor="role">Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Sign Up</button>
        {status && <p className="signup-status">{status}</p>}

        <a href="https://localhost:3000/api/auth/google" className="google-signup">
          Sign Up with Google
        </a>
      </form>

      <footer className="signup-footer">
        <p>© 2025 Raizel Criz Tayao • Secure Developer Portfolio</p>
      </footer>
    </div>
  );
}
