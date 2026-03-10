const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  likes: { type: Number, default: 0 },
  avatar: { type: String },
  role: { type: String, default: "Клієнт" }
}, { timestamps: true });

module.exports = model("Review", ReviewSchema);
