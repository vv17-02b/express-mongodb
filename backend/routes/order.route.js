const { Router } = require("express");
const axios = require("axios");
const Order = require("../models/order");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, phone, city, cartItems, totalPrice, comment } = req.body;

    const order = await Order.create({
      name, phone, city, comment,
      items: cartItems || [],
      totalAmount: totalPrice || 0,
      user: req.user.id
    });

    await User.findByIdAndUpdate(req.user.id, { $push: { orders: order._id } });

    // Відправка в Telegram
    const message = `🚀 *НОВЕ ЗАМОВЛЕННЯ!*\n *Клієнт:* ${name}\n📞 *Тел:* ${phone}\n💰 *Сума:* ${totalPrice} грн\n🛒 *Товари:* ${cartItems?.length || 0} шт.`;

    await axios.post(`https://api.telegram.org{process.env.TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });

    res.status(201).json({ message: "Успішно!", order });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

module.exports = router;
