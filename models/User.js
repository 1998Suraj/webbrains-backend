const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      validate: [
        validatePassword,
        "Password must be at least 8 characters long, contain at least one capital letter, one special character, and one number.",
      ],
    },
    isAdmin: { type: Boolean, default: false },
    isApproved: { type: String, default: "Pending" },
    isActive: { type: Boolean, default: true },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogPost" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogPost" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
