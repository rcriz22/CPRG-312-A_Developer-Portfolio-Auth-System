
import React from "react";
import "../styles/home.css"

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Build Your Developer Portfolio with Confidence</h1>
        <p>
          This platform empowers developers to showcase their work, manage content securely, and explore role-based access — all in one place.
        </p>
        <div className="home-actions">
          <a href="/login" className="home-button">Login</a>
          <a href="/projects" className="home-button secondary">Explore Projects</a>
        </div>
      </header>

      <section className="home-section">
        <h2>🔧 Why Use a Role-Based Portfolio?</h2>
        <ul>
          <li>🧑‍💻 <strong>Users</strong> can view projects, contact the developer, and personalize their experience.</li>
          <li>🛠️ <strong>Admins</strong> can manage content, users, and backend settings securely.</li>
          <li>🔐 Built with secure authentication, CSRF protection, and session management.</li>
        </ul>
      </section>

      <section className="home-section">
        <h2>🚀 What You’ll Find Inside</h2>
        <ul>
          <li>Project showcase with tech stacks and links</li>
          <li>Secure login and password reset flows</li>
          <li>Admin dashboard for managing portfolio content</li>
        </ul>
      </section>

      <footer className="home-footer">
        <p>© 2025 © 2025 Raizel Criz Tayao • Built with React, Express, MongoDB, and a passion for secure development</p>
      </footer>
    </div>
  );
}
