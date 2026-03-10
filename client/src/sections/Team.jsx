import React, { useEffect } from "react";
import { FaAward, FaUsers, FaCheckCircle, FaInstagram, FaTelegram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import teamImg from "../assets/images/team.jpg"; // Твій шлях до фото

const Team = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const achievements = [
    { icon: <FaAward />, title: "10+ років", desc: "Досвіду на ринку меблів" },
    { icon: <FaUsers />, title: "5000+", desc: "Задоволених клієнтів" },
    { icon: <FaCheckCircle />, title: "100%", desc: "Гарантія якості збірки" },
  ];

  return (
    <section id="team" className="py-24 bg-white dark:bg-[#080808] overflow-hidden pt-32 transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-20" data-aos="fade-down">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Наша <span className="text-[#6919dd]">Команда</span>
          </h2>
          <div className="w-24 h-2 bg-[#6919dd] mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(105,25,221,0.5)]"></div>
          <p className="mt-8 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Ми — професіонали, закохані у свою справу. Створюємо меблі, які стають частиною вашої історії.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Фото з ефектами */}
          <div className="relative" data-aos="fade-right">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#6919dd]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative rounded-[3.5rem] overflow-hidden border-8 border-white dark:border-[#111] shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src={teamImg} 
                alt="Наша команда" 
                className="w-full h-[500px] md:h-[650px] object-cover"
              />
              {/* Соціальні мережі поверх фото */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                <a href="#" className="p-4 bg-white/10 backdrop-blur-md hover:bg-[#6919dd] text-white rounded-2xl transition-all shadow-xl">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="p-4 bg-white/10 backdrop-blur-md hover:bg-[#6919dd] text-white rounded-2xl transition-all shadow-xl">
                  <FaTelegram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Опис та Досягнення */}
          <div className="space-y-12" data-aos="fade-left">
            <div>
              <span className="text-[#6919dd] font-black text-sm uppercase tracking-[0.3em] mb-4 block">Про нас</span>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter mb-6">
                Майстерність у <br /> кожній деталі
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                Наша команда складається з дизайнерів, технологів та майстрів вищої категорії. 
                Ми не просто збираємо меблі — ми розробляємо ергономічні рішення для вашого комфорту, 
                використовуючи лише екологічні матеріали та фурнітуру світових брендів.
              </p>
            </div>

            {/* Сітка досягнень */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 bg-gray-50 dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-white/5 hover:border-[#6919dd]/30 transition-all group"
                >
                  <div className="text-[#6919dd] text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-xl font-black text-gray-900 dark:text-white mb-1 tracking-tighter">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Заклик до дії */}
            <div className="pt-8">
              <button className="bg-[#6919dd] hover:bg-[#5815b8] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(105,25,221,0.3)] transition-all transform hover:-translate-y-1 active:scale-95">
                Познайомитись особисто
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;
