import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(
    { id: payload.id }, // ✅ id must be numeric
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};