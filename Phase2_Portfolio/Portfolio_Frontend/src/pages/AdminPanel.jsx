
import React from "react";
import "../styles/adminpanel.css";

export default function AdminPanel() {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p>
          Welcome, Admin. This is your secure control center for managing portfolio content, users, and backend settings.
        </p>
      </header>

      <section className="admin-section">
        <h2>👥 User Management</h2>
        <ul>
          <li>View and manage registered users</li>
          <li>Assign or revoke roles</li>
          <li>Monitor login activity</li>
        </ul>
      </section>

      <section className="admin-section">
        <h2>📁 Project Management</h2>
        <ul>
          <li>Add new projects to your portfolio</li>
          <li>Edit or remove existing projects</li>
          <li>Tag projects by tech stack or category</li>
        </ul>
      </section>

      <section className="admin-section">
        <h2>🔐 Security Settings</h2>
        <ul>
          <li>Review authentication logs</li>
          <li>Manage CSRF and session configurations</li>
          <li>Update password reset policies</li>
        </ul>
      </section>

      <footer className="admin-footer">
        <p>© 2025 Raizel Criz Tayao • Secure Developer Portfolio</p>
      </footer>
    </div>
  );
}
