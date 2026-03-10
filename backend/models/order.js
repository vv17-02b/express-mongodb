const { Schema, model } = require("mongoose")

const OrderSchema = new Schema({

  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String },

  type: { type: String },
  category: { type: String },

  comment: { type: String },

  createdAt: {
    type: Date,

    default: Date.now
  }

})

module.exports = model("Order", OrderSchema)