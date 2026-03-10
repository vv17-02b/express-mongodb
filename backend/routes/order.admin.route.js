const { Router } = require("express");
const router = Router();
const Order = require("../models/order");
const authMiddleware = require("../middleware/authMiddleware");

// Мідлвар для перевірки прав
function adminMiddleware(req, res, next) {
  // Дозволяємо доступ, якщо роль admin АБО користувач (як ви вказали у фронтенді)
  if (req.user && (req.user.role === "admin" || req.user.role === "користувач")) {
    return next();
  }
  return res.status(403).json({ message: "Немає прав адміністратора" });
}

// GET: Отримати всі замовлення
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: "Помилка сервера при отриманні замовлень" });
  }
});

// DELETE: Видалити замовлення
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    res.json({ message: "Замовлення успішно видалено" });
  } catch (e) {
    res.status(500).json({ message: "Помилка сервера при видаленні" });
  }
});

module.exports = router;
