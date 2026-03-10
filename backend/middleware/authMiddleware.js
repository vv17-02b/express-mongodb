const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Пропускаємо preflight запити браузера
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Отримуємо заголовок Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: "Відсутній заголовок авторизації" });
    }

    // Формат заголовка: "Bearer TOKEN_VALUE"
    const token = authHeader.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Токен не знайдено" });
    }

    // Перевірка токена через секретний ключ з .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Додаємо дані користувача в об'єкт запиту req
    req.user = decoded;
    
    next(); // Йдемо далі до маршруту
  } catch (e) {
    console.error("JWT Auth Error:", e.message);
    return res.status(401).json({ message: "Невалідний токен або термін дії вичерпано" });
  }
};
