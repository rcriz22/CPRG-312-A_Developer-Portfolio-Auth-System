import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { sendResetEmail } from "../services/mailer.js"
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Profile
router.get("/profile", authenticate, (req, res) => {
  res.set("Cache-Control", "private, max-age=600");
  res.json({
    name: "Raizel Criz",
    title: "Web Designer & Developer",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    about: "Curious, creative, and passionate about organizing ideas into digital art.",
  });
});

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, passwordHash, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", accessToken, {
      httpOnly: true,
      // secure: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Refresh Token
  router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify (refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: "Invalid user" });

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
});


// Logout
router.post("/logout", authenticate, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict"
  });
  res.json({ message: "Logged out successfully" });
});

// Request Password Reset
router.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ message: "If that email exists, a reset link was sent." });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();

  const resetLink = `https://localhost:5173/reset-password/${token}`;
  await sendResetEmail(user.email, resetLink);

  res.json({ message: "Password reset link sent." });
});

// Password Reset
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  user.passwordHash = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password has been reset successfully." });
});


// Get current user info
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

// Admin-only route
router.get("/admin-panel", authenticate, authorize("Admin"), (req, res) => {
  res.json({ message: "Welcome to the admin panel" });
});

export default router;
