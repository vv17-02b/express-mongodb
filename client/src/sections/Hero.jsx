import React, { useState, useEffect } from "react";
import { CiSearch, CiRuler, CiViewList } from "react-icons/ci"; 
import { HiX, HiOutlineTag } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,  Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Properties from "../data/Properties.json";

const Hero = () => {
  const furnitureTypes = [...new Set(Properties.map((item) => item.furniture))];

  const [activeType, setActiveType] = useState(furnitureTypes[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleOrderClick = () => {
    if (!selectedItem) return;

    // 1. Закриваємо модалку
    setIsModalOpen(false);

    // 2. Скролимо до форми
    const orderSection = document.getElementById("order-form-section");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }

    // 3. Передаємо дані у Blog.jsx через CustomEvent
    const event = new CustomEvent("fillOrderForm", {
      detail: {
        category: selectedItem.furniture,
        comment: `Цікавить модель: ${selectedItem.title}. Матеріал: ${selectedItem.material}, Розмір: ${selectedItem.size}.`
      }
    });
    window.dispatchEvent(event);
  };

  const handleTypeClick = (type) => {
    setActiveType(type);
    const item = Properties.find((p) => p.furniture === type);
    if (item) openModal(item);
  };

  const handleSearch = () => {
    const item = Properties.find((p) =>
      p.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      p.furniture.toLowerCase().includes(searchInput.toLowerCase())
    );
    item ? openModal(item) : alert("Товар не знайдено");
  };

  return (
    <div className="relative min-h-[90vh] flex items-center bg-fixed bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/interer2.png)` }}>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center text-white">
        <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Знайти свою <span className="text-indigo-500 italic">мрію</span>
        </h1>
        
        <p data-aos="fade-up" data-aos-delay="200" className="text-lg md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto font-light">
          Створіть простір, де кожна деталь відповідає вашому стилю. <span className="text-indigo-400 font-medium">Комфорт преміум-класу.</span>
        </p>

        <div data-aos="zoom-in" className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 max-w-4xl mx-auto shadow-2xl">
          <div className="flex flex-wrap gap-2 justify-center mb-4 p-2">
            {furnitureTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeClick(type)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
                  activeType === type ? "bg-indigo-600 text-white" : "bg-white/5 hover:bg-white/20 text-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-2 bg-white rounded-xl p-1 overflow-hidden shadow-inner">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Шукайте меблі (наприклад: Ліжко)"
              className="flex-1 px-6 py-4 text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button onClick={handleSearch} className="bg-gray-900 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all font-bold group">
              <CiSearch className="group-hover:scale-125 transition-transform" size={22} /> ПОШУК
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white dark:bg-gray-900 w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-50 bg-black/10 hover:bg-black/30 backdrop-blur-md p-2 rounded-full text-white transition-all">
              <HiX size={28} />
            </button>

            <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative bg-gray-100">
              <Swiper modules={[Pagination,  Autoplay]} pagination={{ clickable: true }} navigation autoplay={{ delay: 4000 }} className="h-full w-full">
                {selectedItem.images.map((img, idx) => (
                  <SwiperSlide key={idx}><img src={img} alt={selectedItem.title} className="w-full h-full object-cover" /></SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-white dark:bg-gray-800">
              <div className="overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                  <img src={selectedItem.avatar} alt="Designer" className="w-12 h-12 rounded-full border-2 border-indigo-500 p-0.5 object-cover" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Категорія</p>
                    <p className="font-bold text-gray-800 dark:text-white">{selectedItem.furniture}</p>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900 dark:text-white leading-tight">{selectedItem.title}</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                    <span className="p-2 bg-indigo-50 dark:bg-gray-700 rounded-lg text-indigo-600"><HiOutlineTag size={20} /></span>
                    <p>Матеріал: <span className="font-semibold text-gray-900 dark:text-white">{selectedItem.material}</span></p>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                    <span className="p-2 bg-indigo-50 dark:bg-gray-700 rounded-lg text-indigo-600"><CiRuler size={20} /></span>
                    <p>Розмір: <span className="font-semibold text-gray-900 dark:text-white">{selectedItem.size}</span></p>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">"{selectedItem.description}"</p>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t dark:border-gray-700">
                <div className="flex items-end justify-between mb-6">
                  <p className="text-4xl font-black text-indigo-600">{selectedItem.price} <span className="text-lg font-normal text-gray-400">₴</span></p>
                  <span className="px-4 py-1 rounded-full text-sm font-bold bg-green-50 text-green-600">В наявності</span>
                </div>
                <button onClick={handleOrderClick} className="w-full bg-gray-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-100">
                  Замовити прорахунок
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
