const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  // Основні дані клієнта
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String },

  // Дані замовлення (відповідно до вашого роуту)
  items: { type: Array, default: [] }, // масив товарів з кошика
  totalAmount: { type: Number, default: 0 }, // загальна сума
  comment: { type: String },

  // Зв'язок з користувачем
  user: { type: Schema.Types.ObjectId, ref: "User" },

  // Додаткові поля, які були у вас раніше
  type: { type: String },
  category: { type: String },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // Додає автоматичні поля updatedAt та createdAt

module.exports = model("Order", OrderSchema);
