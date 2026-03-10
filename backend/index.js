require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./db');

// Роутери
const authRouter = require('./routes/auth.route');
const todosRouter = require('./routes/todos.route');
const orderRouter = require('./routes/order.route');
const orderAdminRouter = require("./routes/order.admin.route");
const reviewRouter = require('./routes/review.route');

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================

// Дозволяємо запити з фронтенда
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Для парсингу JSON у тілі POST-запитів
app.use(express.json());

// ================= ROUTES =================

// Проста перевірка сервера
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Авторизація
app.use('/api/auth', authRouter);

// Todo-менеджер
app.use('/api/todos', todosRouter);

// Замовлення меблів
app.use('/api/order', orderRouter); 

app.use("/api/admin/orders", orderAdminRouter);

app.use('/api/reviews', reviewRouter);

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ message: 'Внутрішня помилка сервера' });
});

// ================= START SERVER =================
const start = async () => {
  try {
    await connectDB(); // підключення до MongoDB

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
    process.exit(1);
  }
};

start();