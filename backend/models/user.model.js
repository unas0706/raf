import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userNumber: {
      type: String,
      maxLength: 10,
      unique: true,
    },
    total: {
      type: Number,
      default: 1,
      min: 0,
    },
    place: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
