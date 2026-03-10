import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const PopularOrders = () => {
  const projectCategories = [
    {
      id: "01",
      title: "Architectural Kitchens",
      desc: "Інтелектуальні кухонні простори з інтегрованими системами Blum та преміальними кам'яними поверхнями.",
      tag: "Interiors / Kitchen",
      image: "/images/kitchen-cabinet-1.jpg",
      formCategory: "Кухні" // Додав технічну назву для форми
    },
    {
      id: "02",
      title: "Silent Bedrooms",
      desc: "Екосистема для відпочинку: ліжка з італійським текстилем та прихованими нішами для зберігання.",
      tag: "Comfort / Bedroom",
      image: "/images/bed-1.jpg",
      formCategory: "Ліжка"
    },
    {
      id: "03",
      title: "Smart Wardrobes",
      desc: "Гардеробні кімнати з автоматичним підсвічуванням та кастомним зонуванням під ваші потреби.",
      tag: "Storage / Luxury",
      image: "/images/sliding-wardrobe-1.jpg",
      formCategory: "Шафи"
    }
  ];

  // ФУНКЦІЯ ПЕРЕДАЧІ КАТЕГОРІЇ У ФОРМУ
  const handleOrderClick = (category, title) => {
    // 1. Плавний скрол до форми
    document.getElementById('order-form-section')?.scrollIntoView({ behavior: 'smooth' });

    // 2. Відправка події для Blog.jsx
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("fillOrderForm", { 
        detail: { 
          category: category, 
          comment: `Цікавить прорахунок проекту: ${title}` 
        } 
      }));
    }, 500); // невелика затримка, щоб скрол встиг початися
  };

  return (
    <section id="popular-orders" className="pt-24 pb-12 bg-white dark:bg-[#050505] overflow-hidden relative">
      <div className="absolute left-0 w-full hidden md:flex justify-center pointer-events-none select-none opacity-[0.02] dark:opacity-[0.05] z-0">
        <h1 className="text-[22vw] font-black leading-none uppercase">Premium</h1>
      </div>

      <div className="w-[95%] lg:w-[98%] mx-auto relative z-10">
        <Swiper
          modules={[Pagination, Navigation, Autoplay, EffectFade, Mousewheel]}
          effect="fade"
          loop={true}
          speed={1200}
          mousewheel={{ forceToAxis: true }}
          navigation={{ prevEl: '.prev-btn', nextEl: '.next-btn' }}
          pagination={{ 
            clickable: true,
            renderBullet: (index, className) => `<span class="${className} !text-[10px] md:!text-sm font-black">${index + 1}</span>`
          }}
          className="rounded-[2rem] md:rounded-[3rem] h-auto lg:h-[85vh] group shadow-2xl bg-white dark:bg-[#0a0a0a]"
        >
          {projectCategories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
                
                <div className="order-1 lg:order-none lg:col-span-8 relative h-[280px] sm:h-[400px] lg:h-full overflow-hidden">
                   <img src={cat.image} alt={cat.title} className="w-full h-full object-cover object-center transition-transform duration-[3s] group-hover:scale-105 lg:group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 lg:from-black/40 via-transparent to-transparent"></div>
                </div>

                <div className="order-2 lg:order-none lg:col-span-4 flex flex-col justify-center p-7 sm:p-10 md:p-16 pb-28 lg:pb-16 border-l dark:border-white/5 relative bg-white dark:bg-[#0a0a0a]">
                  <span className="text-[#6919dd] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-3 md:mb-4 block">{cat.tag}</span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-5 md:mb-8">{cat.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg font-medium leading-relaxed mb-8 md:mb-12 max-w-sm">{cat.desc}</p>

                  <div className="flex gap-4">
                    {/* ОНОВЛЕНА КНОПКА */}
                    <button 
                      onClick={() => handleOrderClick(cat.formCategory, cat.title)}
                      className="flex-1 bg-[#6919dd] text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-[#5714bd] transition-all shadow-xl active:scale-95"
                    >
                      Отримати прорахунок
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-30 flex gap-3 md:gap-4">
            <button className="prev-btn w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-300 dark:border-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 dark:text-white hover:bg-[#6919dd] hover:text-white transition-all"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
            <button className="next-btn w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-300 dark:border-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 dark:text-white hover:bg-[#6919dd] hover:text-white transition-all"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7 7l7-7-7-7"/></svg></button>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default PopularOrders;
