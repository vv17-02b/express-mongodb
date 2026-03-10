import React, { useEffect } from "react";
import { FaPencilRuler, FaTruckLoading, FaTools, FaGem, FaCouch, FaLayerGroup } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Імпортуємо навігацію
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  const navigate = useNavigate(); // Створюємо функцію для переходу

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const serviceData = [
    {
      icon: <FaPencilRuler />,
      title: "Дизайн-проект",
      desc: "Створення 3D-візуалізації ваших майбутніх меблів з урахуванням ергономіки приміщення.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <FaLayerGroup />,
      title: "Вибір матеріалів",
      desc: "Величезний каталог ДСП, МДФ, шпону та стільниць від брендів Egger, Cleaf та Blum.",
      color: "from-[#6919dd] to-purple-600"
    },
    {
      icon: <FaTools />,
      title: "Виробництво",
      desc: "Власне високоточне обладнання, що гарантує ідеальну якість кожної деталі.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <FaTruckLoading />,
      title: "Доставка та заніс",
      desc: "Окуратне транспортування спеціалізованим авто та підйом на будь-який поверх.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <FaCouch />,
      title: "Професійний монтаж",
      desc: "Встановлення меблів нашими майстрами з дотриманням усіх технічних норм.",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: <FaGem />,
      title: "Гарантія якості",
      desc: "Сервісне обслуговування протягом 24 місяців та післягарантійна підтримка.",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#080808] overflow-hidden pt-32 transition-all duration-500">
      <div className="container mx-auto px-4">
        
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6" data-aos="fade-up">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-[#6919dd] font-black text-sm uppercase tracking-[0.4em] mb-4 block">Що ми робимо</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
              Повний спектр <span className="text-[#6919dd]">Послуг</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm font-medium uppercase tracking-widest text-center md:text-right border-l-2 border-[#6919dd] pl-6 leading-relaxed">
            Від першого заміру до фінального монтажу — ми беремо все на себе.
          </p>
        </div>

        {/* Сітка послуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <div 
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group relative bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-[#6919dd]/50 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                {service.icon}
              </div>

              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                {service.desc}
              </p>

              <div className="absolute top-8 right-10 text-white/5 font-black text-6xl select-none group-hover:text-[#6919dd]/10 transition-colors">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Заклик до дії з робочою кнопкою */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-[#111] p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <p className="text-white font-bold px-4 tracking-tight">Бажаєте прорахувати вартість меблів самостійно?</p>
            <button 
              onClick={() => navigate('/calculator')} // ТУТ ВІДБУВАЄТЬСЯ ПЕРЕХІД
              className="bg-white text-[#080808] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#6919dd] hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Відкрити калькулятор
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
