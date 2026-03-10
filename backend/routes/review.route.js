const { Router } = require("express");
const router = Router();
const Review = require("../models/Review");

// Отримати всі відгуки
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ message: "Помилка бази даних" });
  }
});

// Додати новий відгук
router.post("/", async (req, res) => {
  try {
    const { name, text, rating } = req.body;
    const review = await Review.create({
      name, text, rating,
      avatar: `https://i.pravatar.cc{Date.now()}`
    });
    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ message: "Не вдалося зберегти відгук" });
  }
});

module.exports = router;
