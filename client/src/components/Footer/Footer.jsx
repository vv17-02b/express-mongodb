import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import logo from "../../assets/images/logo.png";
import videoFile from "../../assets/video/video.mp4";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openVideo, setOpenVideo] = useState(false);

  // Функція для швидкого переходу до замовлення конкретної категорії
  const scrollToOrder = (category) => {
    const element = document.getElementById("order-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Відправляємо подію, щоб Blog.jsx підставив категорію
      window.dispatchEvent(new CustomEvent("fillOrderForm", { 
        detail: { category, comment: `Мене цікавить розрахунок вартості: ${category}` } 
      }));
    }
  };

  return (
    <>
      <footer className="pt-20 pb-10 bg-[#050505] text-white border-t border-white/5 mt-auto">
        <div className="w-[90%] max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. БРЕНД ТА СОЦМЕРЕЖІ */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full border border-[#6919dd]/50 group-hover:border-[#6919dd] transition-all"
              />
              <span className="text-2xl font-black tracking-tighter uppercase">
                MEBLI <span className="text-[#6919dd]">PRO</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed font-medium italic">
              «Ми не просто робимо меблі — ми створюємо простір, у якому хочеться жити та перемагати.»
            </p>

            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 group">
                <FaFacebookF className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] transition-all duration-300 group">
                <FaInstagram className="group-hover:scale-110 transition-transform" />
              </a>
              <button onClick={() => setOpenVideo(true)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 group">
                <FaYoutube className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* 2. НАВІГАЦІЯ (Згідно з твоїм App.js) */}
          <div>
            <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-[#6919dd]">Компанія</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm uppercase tracking-tight">
              <li><Link to="/UI-Components/Pages/About" className="hover:text-[#6919dd] transition-colors">Про нас</Link></li>
              <li><Link to="/UI-Components/Pages/Service" className="hover:text-[#6919dd] transition-colors">Наші Послуги</Link></li>
              <li><Link to="/UI-Components/Projects" className="hover:text-[#6919dd] transition-colors">Галерея робіт</Link></li>
              <li><Link to="/UI-Components/Blogs" className="hover:text-[#6919dd] transition-colors">Блог / Заявка</Link></li>
            </ul>
          </div>

          {/* 3. КАТЕГОРІЇ (З функцією скролу до форми) */}
          <div>
            <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-[#6919dd]">Категорії</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm uppercase tracking-tight">
              <li onClick={() => scrollToOrder("Кухні")} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-[#6919dd] rounded-full"></span> Кухні на замовлення
              </li>
              <li onClick={() => scrollToOrder("Шафи")} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-[#6919dd] rounded-full"></span> Шафи-купе
              </li>
              <li onClick={() => scrollToOrder("Ліжка")} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-[#6919dd] rounded-full"></span> Ліжка та спальні
              </li>
              <li onClick={() => scrollToOrder("Столи")} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-[#6919dd] rounded-full"></span> Столи та комоди
              </li>
            </ul>
          </div>

          {/* 4. КОНТАКТИ */}
          <div>
            <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-[#6919dd]">Контакти</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#6919dd]"><FaPhoneAlt size={16} /></div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-widest">Гаряча лінія</p>
                  <a href="tel:+380991234567" className="text-white font-bold hover:text-[#6919dd] transition-colors">+38 (099) 123-45-67</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#6919dd]"><FaMapMarkerAlt size={16} /></div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-widest">Виробництво</p>
                  <p className="text-white font-bold">вул. Європейська, Умань</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#6919dd]"><FaEnvelope size={16} /></div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-widest">Для пропозицій</p>
                  <a href="mailto:info@mebli-pro.com" className="text-white font-bold hover:text-[#6919dd] transition-colors">info@mebli-pro.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* НИЖНЯ ЧАСТИНА */}
        <div className="mt-20 w-[90%] max-w-[1400px] mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
          <p>© {currentYear} MEBLI PRO. ВСІ ПРАВА ЗАХИЩЕНІ.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Політика конфіденційності</span>
            <span className="hover:text-white cursor-pointer transition-colors">Договір оферти</span>
          </div>
        </div>
      </footer>

      {/* VIDEO POPUP */}
      {openVideo && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[200] p-4 animate-in fade-in duration-300" onClick={() => setOpenVideo(false)}>
          <div className="relative w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden border border-white/10" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpenVideo(false)} className="absolute top-4 right-4 text-white/50 hover:text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all">✕</button>
            <video src={videoFile} controls autoPlay className="w-full h-auto block" />
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
