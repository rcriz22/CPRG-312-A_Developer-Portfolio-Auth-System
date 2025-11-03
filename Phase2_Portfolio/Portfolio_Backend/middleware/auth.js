import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

export function authorize(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: "insufficient permissions" });
    }
    next();
  };
}
