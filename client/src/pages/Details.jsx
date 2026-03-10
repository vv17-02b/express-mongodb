import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBadgeCheck, HiOutlineTruck, HiOutlineClock, HiOutlineShieldCheck } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";

const Details = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0); // Скрол вгору при переході
  }, []);

  const features = [
    { icon: <HiOutlineBadgeCheck size={32}/>, title: "Матеріали", desc: "Використовуємо лише екологічне дерево, австрійське ДСП (Egger) та надійну фурнітуру Blum." },
    { icon: <HiOutlineTruck size={32}/>, title: "Доставка", desc: "Безкоштовна доставка по місту та професійне занесення на будь-який поверх." },
    { icon: <HiOutlineClock size={32}/>, title: "Графік", desc: "Виготовлення від 14 до 30 робочих днів залежно від складності проєкту." },
    { icon: <HiOutlineShieldCheck size={32}/>, title: "Гарантія", desc: "Надаємо офіційну гарантію 24 місяці на всі вироби та механізми." },
  ];

  return (
    <div className="pt-28 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Хлібні крихти */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link to="/" className="hover:text-indigo-600 transition">Головна</Link> / <span>Деталі сервісу</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div data-aos="fade-right" className="relative group">
            <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-2xl group-hover:bg-indigo-500/20 transition duration-1000"></div>
            <img 
              src="/images/box.jpg" 
              alt="Furniture Box" 
              className="relative rounded-[2.5rem] shadow-2xl object-cover w-full h-[500px] border border-white/20"
            />
          </div>

          <div data-aos="fade-left">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Процес та якість</span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
              Створюємо меблі, що <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">надихають</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
              Ми контролюємо кожен етап: від першого заміру до фінального монтажу. Наша мета — створити простір, де кожна деталь на своєму місці.
            </p>
            <Link to="/" className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl">
              Повернутися до замовлення
            </Link>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              data-aos="zoom-in" 
              data-aos-delay={i * 100}
              className="p-8 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-indigo-600 mb-6 bg-indigo-50 dark:bg-indigo-900/30 w-16 h-16 rounded-2xl flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Details;
