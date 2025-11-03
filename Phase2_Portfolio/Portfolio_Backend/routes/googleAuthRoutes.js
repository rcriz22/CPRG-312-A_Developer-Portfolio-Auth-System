import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
  session: false
}), (req, res) => {

  const token = jwt.sign(
    { id: req.user._id, role: req.user.role },
    process.env.JWT_SECRET, 
    { expiresIn: "15m" });
    
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
     maxAge: 15 * 60 * 1000,
  });

  res.redirect("https://localhost:5173/profile"); 
  
});

export default router;
