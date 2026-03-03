// src/middleware/token-middleware.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    // Check that id exists in payload
    if (!decoded.id)
      return res.status(403).json({ message: "Invalid token payload" });

    req.user = decoded; // now req.user.id, req.user.email, req.user.role
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};