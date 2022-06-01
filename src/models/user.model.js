const mongoose = require("mongoose");
const crypto = require("crypto");

let schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: String,
    salt: String,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Role",
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

schema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

schema.methods.verifyPassword = function (hashedPassword) {
  const password = crypto
    .pbkdf2Sync(hashedPassword, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.password === password;
};

module.exports = mongoose.model("User", schema);
