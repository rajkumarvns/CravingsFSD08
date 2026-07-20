import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
      },
    },
    userType: {
      type: String,
      enum: ["admin", "customer", "rider", "restaurant"],
      required: true,
      default: "customer",
    },
    lastPasswordChange: {
      type: Date,
      default: null,
    },
    addresses: [
      {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, required: true },
        isDefault: { type: Boolean, default: false }
      }
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

export default User;
