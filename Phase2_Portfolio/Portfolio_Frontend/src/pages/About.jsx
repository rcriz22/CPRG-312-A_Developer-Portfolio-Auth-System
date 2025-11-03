
import React from "react";
import "../styles/about.css"


export default function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Me</h1>
        <p>
          I'm a full-stack developer passionate about building secure, scalable, and user-friendly web applications.
          This portfolio is more than a showcase — it's a demonstration of how role-based access and modern security practices can elevate developer workflows.
        </p>
      </header>

      <section className="about-section">
        <h2>👨‍💻 My Mission</h2>
        <p>
          I believe every developer should have a portfolio that not only highlights their skills but also reflects real-world application architecture. 
          That’s why I built this platform with authentication, role-based access, and secure session management — just like a production-grade app.
        </p>
      </section>

      <section className="about-section">
        <h2>🛠️ Technologies I Use</h2>
        <ul>
          <li>Frontend: React, Vite, React Router</li>
          <li>Backend: Node.js, Express, MongoDB</li>
          <li>Security: JWT, CSRF, HTTPS, Rate Limiting</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>🎯 Role-Based Portfolio Vision</h2>
        <p>
          Whether you're a visitor, a registered user, or an admin, this portfolio adapts to your role. 
          Users can explore projects and contact me, while admins can manage content and user access securely.
        </p>
      </section>

      <footer className="about-footer">
        <p>© 2025 Raizel Criz Tayao • Secure Developer Portfolio</p>
      </footer>
    </div>
  );
}
