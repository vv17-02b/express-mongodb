import React, { useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaClock, FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Імпортуємо хук для навігації
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const navigate = useNavigate(); // Ініціалізуємо навігацію

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const contactDetails = [
    {
      icon: <FaPhoneAlt className="w-6 h-6 text-white" />,
      title: "Телефони",
      content: ["+38 (097) 111-22-33", "+38 (050) 444-55-66"],
      color: "bg-blue-600",
      delay: "100",
    },
    {
      icon: <FaEnvelope className="w-6 h-6 text-white" />,
      title: "Email",
      content: ["sales@furniture.com", "support@furniture.com"],
      color: "bg-emerald-600",
      delay: "200",
    },
    {
      icon: <FaClock className="w-6 h-6 text-white" />,
      title: "Графік роботи",
      content: ["Пн-Пт: 09:00 - 19:00", "Сб: 10:00 - 17:00"],
      color: "bg-amber-500",
      delay: "300",
    },
    {
      icon: <FaWallet className="w-6 h-6 text-white" />,
      title: "Оплата замовлень",
      content: ["Аванс: 30% при замовленні", "Залишок: при отриманні"],
      color: "bg-[#6919dd]", // Колір як у калькулятора
      delay: "400",
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden pt-32">
      {/* Фоновий декор */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6919dd] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Зв'яжіться з <span className="text-[#6919dd]">нами</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Ми завжди готові обговорити ваш проект або допомогти з розрахунком вартості.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={item.delay}
              className="group bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-[#6919dd] transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {item.title}
              </h3>
              <div className="space-y-2">
                {item.content.map((text, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 font-medium italic">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* СИНІЙ БЛОК З КНОПКОЮ ПЕРЕХОДУ */}
        <div 
          className="mt-20 bg-gradient-to-r from-[#6919dd] to-indigo-900 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden"
          data-aos="zoom-in"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 italic uppercase tracking-tighter">
                Потрібен точний розрахунок?
              </h3>
              <p className="text-blue-100 text-lg max-w-xl font-medium">
                Скористайтеся нашим онлайн-калькулятором, щоб миттєво дізнатися вартість вашої ідеальної кухні чи шафи.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/calculator')} // ПЕРЕХІД НА КАЛЬКУЛЯТОР
              className="bg-white text-[#6919dd] hover:bg-gray-100 px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center gap-4"
            >
              Відкрити калькулятор
            </button>
          </div>
          
          {/* Декор */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
