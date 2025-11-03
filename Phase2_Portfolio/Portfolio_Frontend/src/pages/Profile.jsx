
import React, { useEffect, useState } from "react";
import { getProfile } from "../api";
import "../styles/profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data.error) {
          setError(data.error);
        } else {
          setProfile(data);
        }
      } catch (err) {
        setError("Failed to fetch profile.");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="profile-error">{error}</div>;
  if (!profile || !profile.user) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Welcome, {profile.user.username}</h1>
        <p>This is your secure developer profile. Your role determines what you can access and manage.</p>
      </header>

      <section className="profile-details">
        <p><strong>Email:</strong> {profile.user.email}</p>
        <p><strong>Role:</strong> {profile.user.role}</p>
      </section>

      <section className="profile-role-info">
        {profile.user.role === "Admin" ? (
          <p>🛠️ As an <strong>Admin</strong>, you can manage users, projects, and backend settings.</p>
        ) : (
          <p>👤 As a <strong>User</strong>, you can explore projects, contact the developer, and personalize your experience.</p>
        )}
      </section>

      <footer className="profile-footer">
        <p>© 2025 Raizel Criz Tayao • Secure Developer Portfolio</p>
      </footer>
    </div>
  );
}
