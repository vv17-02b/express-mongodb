const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Отримати todos користувача
router.get('/', authMiddleware, async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    res.json(user.todos);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});


// Додати todo
router.post('/', authMiddleware, async (req, res) => {
  try {

    const { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ message: 'Todo порожній' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    user.todos.push(todo);

    await user.save();
    res.json(user.todos);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

module.exports = router;