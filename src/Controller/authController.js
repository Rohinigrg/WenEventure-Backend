import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Security/jwt-utils.js";

/**
 * REGISTER (Normal users only)
 */
export const register = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    if (!fullName || !userName || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).send({ message: "Email already in use" });
    }

    const existingUsername = await User.findOne({ where: { userName } });
    if (existingUsername) {
      return res.status(409).send({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
      role: "user", // force normal user
    });

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    const { password: pw, ...userData } = newUser.toJSON();

    res.status(201).send({
      message: "User registered successfully",
      user: userData,
      role: newUser.role,
      access_token: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/**
 * LOGIN (Admin & User)
 */
export const login = async (req, res) => {
    console.log("REQ BODY:", req.body); 
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Password is incorrect" });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: pw, ...userData } = user.toJSON();

    res.status(200).send({
      message: "Login successful",
      user: userData,
      role: user.role,
      access_token: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
