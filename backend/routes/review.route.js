const { Router } = require("express");
const router = Router();
const Review = require("../models/Review");

// Додати новий відгук
router.post("/", async (req, res) => {
  try {
    const { name, text, rating } = req.body;
    const review = await Review.create({
      name, 
      text, 
      rating,
      // Додаємо / та $ перед фігурними дужками
      avatar: `https://i.pravatar.cc{Date.now()}`
    });
    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ message: "Не вдалося зберегти відгук" });
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
