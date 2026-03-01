import bcrypt from "bcryptjs";
import { User } from "../Model/userModel.js";

export const createAdminIfNotExists = async () => {
  try {
    const adminEmail = "admin@gmail.com";

    // Force the table name to match exactly
    const admin = await User.findOne({ where: { email: adminEmail } });

    if (admin) {
      console.log("Admin already exists ✅");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const newAdmin = await User.create({
      fullName: "Admin",
      userName: "admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully:", newAdmin.toJSON());
  } catch (error) {
    console.error("❌ Admin creation failed:", error.message);
  }
};
