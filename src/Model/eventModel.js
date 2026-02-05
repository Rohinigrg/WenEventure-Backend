import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING, // image URL
      allowNull: true,
    },
    startTime: { type: DataTypes.STRING, allowNull: true },
    endTime: { type: DataTypes.STRING, allowNull: true },

    slots: {
    type: DataTypes.INTEGER,
    allowNull: true,
   },

  },
  {
    tableName: "events",
    timestamps: true,
  }
);

export default Event;
