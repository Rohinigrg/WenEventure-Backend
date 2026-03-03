// src/Controllers/userController.js
import User from "../Model/userModel.js";

export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ now guaranteed to exist

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Failed to delete user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};