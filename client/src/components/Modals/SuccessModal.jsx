import React from 'react';
import { HiCheckCircle, HiX } from 'react-icons/hi';

const SuccessModal = ({ isOpen, onClose, customerName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border border-[#6919dd]/20 text-center relative animate-in zoom-in-95 duration-300">
        
        {/* Кнопка закриття */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-[#6919dd] transition-colors">
          <HiX size={24} />
        </button>

        {/* Іконка успіху */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#6919dd] blur-2xl opacity-20 animate-pulse"></div>
            <HiCheckCircle className="text-[#6919dd] relative z-10" size={100} />
          </div>
        </div>

        {/* Текст */}
        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
          Дякуємо, {customerName || 'Друже'}!
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8">
          Ваша заявка успішно отримана. Ми вже вивчаємо деталі та зателефонуємо вам протягом <span className="text-[#6919dd] font-bold">15-30 хвилин</span> для уточнення замірів.
        </p>

        {/* Кнопка */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-[#6919dd] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg shadow-[#6919dd]/30 active:scale-95"
        >
          Зрозуміло
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
