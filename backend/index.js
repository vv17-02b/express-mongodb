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

// ПІДКЛЮЧЕННЯ ДО БД (для Serverless важливо викликати це один раз)
connectDB(); 

// ================= MIDDLEWARE =================

// На Vercel краще дозволити всі origin або вказати ваш домен .vercel.app
app.use(cors({
  origin: true, 
  credentials: true
}));

app.use(express.json());

// ================= ROUTES =================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running on Vercel' });
});

app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);
app.use('/api/order', orderRouter); 
app.use("/api/admin/orders", orderAdminRouter);
app.use('/api/reviews', reviewRouter);

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ message: 'Внутрішня помилка сервера' });
});

// ================= START SERVER (LOCAL ONLY) =================
// Це дозволить серверу працювати локально, але на Vercel цей блок не заважатиме
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// !!! КРИТИЧНО ДЛЯ VERCEL !!!
module.exports = app;
