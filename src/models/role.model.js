const mongoose = require("mongoose");
const { roleTypes } = require("../config/roles");

let schema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: [roleTypes.ADMIN, roleTypes.PUBLIC, roleTypes.LOCATION_ADMIN],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", schema);
