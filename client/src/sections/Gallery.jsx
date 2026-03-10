import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import properties from '../data/Properties.json';
import AOS from "aos";
import "aos/dist/aos.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!properties || properties.length === 0) return null;

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-[#080808] overflow-hidden pt-32 transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
            Наша <span className="text-[#6919dd]">Галерея</span>
          </h2>
          <div className="w-20 h-2 bg-[#6919dd] mx-auto mt-4 rounded-full"></div>
        </div>

        <div data-aos="zoom-in" className="relative group px-2 md:px-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 5, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false,
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="!pb-20"
          >
            {properties.map((item) => (
              <SwiperSlide key={item.id} className="max-w-[450px] p-2">
                <div 
                  onClick={() => setSelectedImg(item.images[0])}
                  className="cursor-pointer bg-gray-50 dark:bg-[#111] rounded-[3rem] overflow-hidden border dark:border-white/5 shadow-2xl transition-all duration-500 hover:border-[#6919dd]/50"
                >
                  <div className="h-[380px] overflow-hidden relative">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 bg-[#6919dd] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl">
                      {item.furniture}
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-2 italic">{item.title}</h3>
                    <div className="text-[#6919dd] font-black text-2xl tracking-tighter">
                      {Number(item.price).toLocaleString()} <span className="text-sm font-bold">грн</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* FULLSCREEN MODAL - МАКСИМАЛЬНИЙ РОЗМІР */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl m-0 p-0 transition-opacity duration-300"
          onClick={() => setSelectedImg(null)}
        >
          {/* Кнопка Закрити - тепер вона зверху над картинкою */}
          <button className="absolute top-5 right-5 text-white/50 text-5xl font-thin hover:text-white z-[110] transition-all transform hover:rotate-90">
            &times;
          </button>
          
          {/* Контейнер картинки без зайвих маржинів */}
          <div className="w-screen h-screen flex items-center justify-center p-2 md:p-4">
             <img 
             width={700}
             height={700}
                src={selectedImg} 
                alt="Full size view" 
                className=" object-cover shadow-2xl animate-in zoom-in duration-300 select-none"
              />
          </div>
        </div>
      )}

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(4px);
          width: 40px !important;
          height: 40px !important;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          opacity: 0.4;
        }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 14px !important; font-weight: 900; }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: #6919dd !important;
          opacity: 1;
          border-color: #6919dd;
        }
        .swiper-pagination-bullet-active {
          background: #6919dd !important;
          width: 25px !important;
          border-radius: 10px !important;
        }
        @media (max-width: 768px) { .swiper-button-next, .swiper-button-prev { display: none !important; } }
      `}</style>
    </section>
  );
};

export default Gallery;
