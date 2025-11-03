import express from "express";
import fs from "fs";
import https from "https";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import csurf from "csurf";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";
import passport from "passport";
import "./config/passport.js";

const __dirname = path.resolve();
const app = express();
const PORT = 3000;

// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

// CSRF protection
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // secure: true,
    sameSite: "Strict",
  },
});

// Middleware
app.use(cors({
  origin: "https://localhost:5173",
  credentials: true
}));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/login", loginLimiter);
app.use("/api", authRoutes);
app.use("/api", googleAuthRoutes);
app.use("/api/contact", csrfProtection);
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});



// MongoDB connection
mongoose.connect("mongodb://localhost:27017/portfolioDB");
mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Public routes
app.get("/", (req, res) => {
  res.send("<h1>Secure HTTPS Portfolio Server Running. Yey!</h1>");
});

app.get("/api/projects", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
  res.json([
    { id: 1, title: "Portfolio Website", tech: ["React", "Express"], link: "#" },
    { id: 2, title: "Task Tracker", tech: ["Node.js", "MongoDB"], link: "#" },
  ]);
});

app.get("/api/projects/:id", (req, res) => {
  res.set("Cache-Control", "public, max-age=300");
  const projectId = req.params.id;
  res.json({
    id: projectId,
    title: "Sample Project",
    tech: ["React"],
    link: "#",
  });
});

app.get("/api/blog", (req, res) => {
  res.set("Cache-Control", "public, max-age=120");
  res.json([
    { id: 1, title: "5 Tips to Secure Your Web App" },
    { id: 2, title: "How HTTPS Keeps You Safe" },
  ]);
});

app.post("/api/contact", (req, res) => {
  res.set("Cache-Control", "no-store");
  const { name, email, message } = req.body || {};
  console.log("Contact form received:", { name, email, message });
  res.json({ status: "success", message: "Message received securely!" });
});

// HTTPS server
const options = {
  key: fs.readFileSync(path.join(__dirname, "cert/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "cert/server.cert")),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`✅ HTTPS server running at https://localhost:${PORT}`);
});
