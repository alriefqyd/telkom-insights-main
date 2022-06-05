const mongoose = require("mongoose");

let schema = mongoose.Schema(
  {
    ratings: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    bookings_id: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", schema);
