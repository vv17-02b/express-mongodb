import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import wall_vetalny from "../assets/images/wall_vetalny.jpg";
import SuccessModal from "../components/Modals/SuccessModal";

const Blog = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("Індивідуальне замовлення");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    AOS.init({ offset: 200, duration: 800, easing: "ease-in-out", once: true });

    const handleFillForm = (e) => {
      if (e.detail) {
        setCategory(e.detail.category || "");
        setComment(e.detail.comment || "");
      }
    };

    window.addEventListener("fillOrderForm", handleFillForm);
    return () => window.removeEventListener("fillOrderForm", handleFillForm);
  }, []);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0 && !value.startsWith("380")) value = "380" + value;
    const finalPhone = value.length > 0 ? "+" + value.slice(0, 12) : "";
    setPhone(finalPhone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length < 13) return alert("Введіть повний номер: +380XXXXXXXXX");

    const token = localStorage.getItem("token");
    if (!token) return alert("Будь ласка, авторизуйтесь через іконку профілю!");

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone, city, type, category, comment }),
      });

      if (response.ok) {
        setSubmittedName(name);
        setShowSuccess(true);
        setName(""); setPhone(""); setCity(""); setComment(""); setCategory("");
        window.dispatchEvent(new Event("refreshOrders"));
      } else {
        const data = await response.json();
        alert(data.message || "Помилка при відправці");
      }
    } catch (error) {
      alert("Помилка сервера.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ФУНКЦІЯ ДЛЯ ВІДКРИТТЯ МОДАЛКИ ДЕТАЛЕЙ
  const openDetails = () => {
    window.dispatchEvent(new Event("openDetailsModal"));
  };

  return (
    <>
      <div id="order-form-section" className="pt-28 lg:pt-36 pb-16 w-[95%] max-w-[1400px] mx-auto">
        <section className="flex flex-col lg:flex-row gap-8 rounded-xl overflow-hidden shadow-2xl">
          
          {/* ЛІВА ЧАСТИНА З КНОПКОЮ ДЕТАЛЕЙ */}
          <div className="relative lg:w-1/2 flex-1 bg-cover bg-center flex flex-col justify-center p-6 md:p-12 rounded-xl min-h-[500px]" style={{ backgroundImage: `url(${wall_vetalny})` }}>
            <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
            <div className="relative z-10 flex flex-col gap-4 text-white">
              <h1 data-aos="fade-up" className="text-3xl md:text-5xl font-black uppercase leading-tight">
                Виготовлення меблів<br /><span className="text-[#6919dd]">під замовлення</span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="100" className="text-lg text-gray-200">Створюємо простір, що надихає.</p>
              
              {/* ОСЬ ЦЯ КНОПКА ТЕПЕР ПРАЦЮЄ */}
              <button
                onClick={openDetails}
                className="bg-white text-black px-10 py-4 rounded-2xl hover:bg-[#6919dd] hover:text-white transition-all w-max mt-6 font-black uppercase tracking-widest text-xs shadow-lg active:scale-95"
              >
                Дізнатися більше
              </button>
            </div>
          </div>

          {/* ПРАВА ЧАСТИНА З ФОРМОЮ */}
          <div className="lg:w-1/2 flex-1 bg-white dark:bg-gray-900 rounded-xl p-6 md:p-12 border dark:border-gray-800 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-black mb-8 dark:text-white uppercase tracking-tight">Заповніть заявку</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 outline-none focus:ring-2 ring-[#6919dd] dark:text-white transition-all" required />
              <input type="tel" placeholder="+380" value={phone} onChange={handlePhoneChange} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 outline-none focus:ring-2 ring-[#6919dd] dark:text-white transition-all font-bold" required />
              <input type="text" placeholder="Місто" value={city} onChange={(e) => setCity(e.target.value)} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 outline-none focus:ring-2 ring-[#6919dd] dark:text-white transition-all" />
              <select value={type} onChange={(e) => setType(e.target.value)} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 outline-none dark:text-white cursor-pointer">
                <option>Індивідуальне замовлення</option>
                <option>Консультація</option>
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 outline-none dark:text-white md:col-span-2 cursor-pointer" required>
                <option value="">Виберіть категорію</option>
                <option value="Кухні">Кухні</option>
                <option value="Шафи">Шафи</option>
                <option value="Ліжка">Ліжка</option>
                <option value="Столи">Столи</option>
              </select>
              <textarea rows="4" placeholder="Побажання..." value={comment} onChange={(e) => setComment(e.target.value)} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 outline-none dark:text-white md:col-span-2 resize-none" />
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#6919dd] text-white py-6 rounded-2xl font-black transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs md:col-span-2 mt-4 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? "Відправляємо..." : "Надіслати проект"}
              </button>
            </form>
          </div>
        </section>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} customerName={submittedName} />
    </>
  );
};

export default Blog;
