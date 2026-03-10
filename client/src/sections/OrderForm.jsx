import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const OrderForm = () => {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const [comment, setComment] = useState("")

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    })
  }, [])

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Помилка: Ви не авторизовані! Увійдіть в аккаунт.");
    return;
  }

  const formData = { name, phone, city, type, category, comment };

  try {
    const response = await fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

  if (response.ok) {
  alert("Заявка успішно збережена в базі!");
  
  // ЦЕЙ РЯДОК: Посилаємо сигнал усім компонентам оновити дані
  window.dispatchEvent(new Event("refreshOrders"));

  // очистка форми...
  setName(""); setPhone(""); // і так далі
} else {
      // Якщо бекенд повернув помилку (наприклад 401 або 500)
      console.error("Сервер повернув помилку:", data);
      alert(`Помилка сервера: ${data.message || "Невідома помилка"}`);
    }

  } catch (error) {
    console.error("Помилка мережі:", error);
    alert("Не вдалося з'єднатися з сервером. Перевірте, чи запущений бекенд.");
  }
};


  return (
    <section className="py-20 bg-gray-100">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-6">

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Замовити меблі під індивідуальний проєкт
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Залиште заявку і ми зв'яжемося з вами, щоб обговорити деталі,
            розміри, матеріали та вартість майбутніх меблів.
          </p>
        </div>

        {/* Форма */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          {/* Ім'я */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Ваше ім’я
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введіть ім’я"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Телефон */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Телефон
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380..."
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Місто */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Місто
            </label>

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ваше місто"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Тип */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Тип замовлення
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
            >
              <option value="">Виберіть тип</option>
              <option>Індивідуальне замовлення</option>
              <option>Консультація</option>
              <option>Розрахунок вартості</option>
            </select>
          </div>

          {/* Категорія */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Категорія меблів
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
            >
              <option value="">Виберіть категорію</option>
              <option>Кухня</option>
              <option>Шафи</option>
              <option>Ліжка</option>
              <option>Комоди</option>
              <option>Столи</option>
              <option>Тумби</option>
            </select>
          </div>

          {/* Коментар */}
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-2 font-medium text-gray-700">
              Коментар
            </label>

            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Опишіть ваше замовлення..."
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Кнопка */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-black text-white px-10 py-3 rounded-lg hover:bg-gray-800 transition text-lg font-medium"
            >
              Надіслати заявку
            </button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default OrderForm