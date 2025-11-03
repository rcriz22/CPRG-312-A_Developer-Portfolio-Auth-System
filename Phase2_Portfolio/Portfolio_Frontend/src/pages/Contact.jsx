
import React from "react";
import "../styles/contact.css"

export default function Contact() {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Get in Touch</h1>
        <p>
          Whether you're a fellow developer, recruiter, or collaborator — I’d love to hear from you.
          This contact form is protected with CSRF and session security, so your message stays safe.
        </p>
      </header>

      <section className="contact-form-section">
        <form className="contact-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your full name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your email address" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="Your message..." required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>

      <section className="contact-note">
        <p>
          🔐 Authenticated users will see pre-filled contact info and can track past inquiries. 
          Admins can manage incoming messages securely.
        </p>
      </section>

      <footer className="contact-footer">
        <p>© 2025 Raizel Criz Tayao • Secure Developer Portfolio</p>
      </footer>
    </div>
  );
}
