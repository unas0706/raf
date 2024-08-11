import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    requuired: true,
  },
  place: {
    type: String,
    requuired: true,
  },
  number: {
    type: String,
    requuired: true,
    maxLength: 10,
    minLength: 10,
    unique: true,
  },
  password: {
    type: String,
    requuired: true,
    select: false,
  },
  email: {
    type: String,
    requuired: true,
    validate: validator.isEmail,
    unique: true,
  },
  refreshToken: {
    type: String,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 8);
    next();
  } catch (error) {
    console.log("error occured:" + error.message);
    next(error);
  }
});

export const Admin = mongoose.model("admin", adminSchema);
