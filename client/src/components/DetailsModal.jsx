import React, { useEffect, useState } from "react";
import { HiX, HiOutlineBadgeCheck, HiOutlineTruck, HiOutlineClock, HiOutlineShieldCheck } from "react-icons/hi";

const DetailsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openDetailsModal", handleOpen);
    return () => window.removeEventListener("openDetailsModal", handleOpen);
  }, []);

  if (!isOpen) return null;

  const features = [
    { icon: <HiOutlineBadgeCheck />, title: "Матеріали", desc: "Натуральне дерево та австрійське ДСП Egger." },
    { icon: <HiOutlineTruck />, title: "Доставка", desc: "Безкоштовна доставка та професійний монтаж." },
    { icon: <HiOutlineClock />, title: "Терміни", desc: "Виготовлення від 14 до 21 робочих днів." },
    { icon: <HiOutlineShieldCheck />, title: "Гарантія", desc: "Офіційна гарантія 24 місяці на всі механізми." },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative flex flex-col md:flex-row">
        
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 z-10 bg-white/10 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all">
          <HiX size={28} className="text-gray-500" />
        </button>

        {/* Зображення */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto">
          <img src="/images/box.jpg" alt="Production" className="w-full h-full object-cover" />
        </div>

        {/* Контент */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-black mb-6 dark:text-white uppercase italic">Наше виробництво</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Ми контролюємо кожен етап: від вибору деревини до останнього гвинтика при монтажі.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="text-indigo-600 text-2xl">{f.icon}</div>
                <h4 className="font-bold dark:text-white">{f.title}</h4>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="w-full mt-10 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition"
          >
            ЗРОЗУМІЛО
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
