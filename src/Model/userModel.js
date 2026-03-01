import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },

    avatar: {
    type: DataTypes.STRING,
    defaultValue: "uploads/default-avatar.png",
    },

  },
  {
    tableName: '"Users"',     
    freezeTableName: true, 
     underscored: false, 
    timestamps: true,
  }
);

export default User;
