const { Router } = require("express");
const router = Router();
const Review = require("../models/Review");


// delete 

router.delete("/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Видалено" });
});

// 1. Отримати всі відгуки
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ message: "Помилка бази даних" });
  }
});

// 2. Додати новий відгук (ВИПРАВЛЕНО: додано / та $)
router.post("/", async (req, res) => {
  try {
    const { name, text, rating } = req.body;
    const review = await Review.create({
      name, 
      text, 
      rating,
      // ТУТ ТЕЖ ДОДАНО /$ ПЕРЕД ДУЖКАМИ
     avatar: "https://i.pravatar.cc"

    });
    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ message: "Не вдалося зберегти відгук" });
  }
});


module.exports = router;
