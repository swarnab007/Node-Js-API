import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // index helps to search the data faster in the database
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    fullname: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    // for createdAt and updatedAt fields
    timestamps: true,
  }
);

// hash the password before saving
// middleware
userSchema.pre("save", async function (next) {
  // arrow function is not used here because we need to access the user object
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});

// compare the password
// This is our custom method to compare the password
userSchema.methods.isCorrectPassword = async function (password) {
  // we have to compare with the hashed password
  return await bcrypt.compare(password, this.password);
};

// generate token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    "swarnab-123",
    {
      expiresIn: "1d",
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    "banerjee-123",
    {
      expiresIn: "7d",
    }
  );
};

export const User = mongoose.model("User", userSchema);
