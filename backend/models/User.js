const { Schema, model } = require("mongoose")

const UserSchema = new Schema({

  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user"
  },

  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ],

  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo"
    }
  ]

},
{ timestamps: true }
)

module.exports = model("User", UserSchema)