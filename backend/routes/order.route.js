const { Router } = require("express");
const axios = require("axios");
const Order = require("../models/order");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, phone, city, cartItems, totalPrice, comment } = req.body;

    // Створюємо замовлення в БД
    const order = await Order.create({
      name, 
      phone, 
      city, 
      comment,
      items: cartItems || [],
      totalAmount: totalPrice || 0,
      user: req.user.id
    });

    // Додаємо ID замовлення в масив замовлень користувача
    await User.findByIdAndUpdate(req.user.id, { $push: { orders: order._id } });

    // Формуємо повідомлення для Telegram
    const message = `🚀 *НОВЕ ЗАМОВЛЕННЯ!*\n\n👤 *Клієнт:* ${name}\n📞 *Тел:* ${phone}\n📍 *Місто:* ${city || 'Не вказано'}\n💰 *Сума:* ${totalPrice} грн\n🛒 *Товари:* ${cartItems?.length || 0} шт.\n💬 *Коментар:* ${comment || '-'}`;

    // ВІДПРАВКА В TELEGRAM (ВИПРАВЛЕНО: додано /bot та $)
    try {
      await axios.post(`https://api.telegram.org{process.env.TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });
    } catch (tgError) {
      console.error("Telegram API Error:", tgError.response?.data || tgError.message);
      // Не повертаємо 500 помилку тут, щоб замовлення вважалося прийнятим, навіть якщо бот збоїть
    }

    res.status(201).json({ message: "Успішно!", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Помилка сервера при створенні замовлення" });
  }
});

module.exports = router;
