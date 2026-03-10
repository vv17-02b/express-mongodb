import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRulerCombined, FaTools, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();

  const projectData = [
    {
      id: 1,
      title: "Кухня Anthracite Loft",
      location: "ЖК 'River Stone', Київ",
      image: "/images/kitchen-cabinet-2.jpg",
      tags: ["MDF Paint", "Blum", "Quartz"],
      stats: { area: "12 м²", term: "45 днів", price: "120к+" }
    },
    {
      id: 2,
      title: "Гардеробна система Glass",
      location: "Приватний будинок, Ірпінь",
      image: "/images/sliding-wardrobe-2.jpg",
      tags: ["Glass", "Aluminum", "LED"],
      stats: { area: "8 м²", term: "30 днів", price: "85к+" }
    },
    {
      id: 3,
      title: "Minimalist Master Bedroom",
      location: "ЖК 'Central Park', Львів",
      image: "/images/bed-2.jpg",
      tags: ["Oak", "Soft-touch", "Hettich"],
      stats: { area: "18 м²", term: "25 днів", price: "60к+" }
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#050505] pt-32 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Заголовок у стилі "Luxury Brand" */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="text-[#6919dd] font-black text-xs uppercase tracking-[0.5em] mb-4 block">Наше Портфоліо</span>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-none">
              Виконані <br /> <span className="text-[#6919dd]">Проєкти</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 max-w-xs text-sm font-medium uppercase tracking-widest leading-relaxed border-r-4 border-[#6919dd] pr-6 text-right"
          >
            Ми не просто продаємо меблі, ми створюємо простір для життя.
          </motion.p>
        </div>

        {/* Списох проектів */}
        <div className="space-y-32">
          {projectData.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              {/* Візуальна частина (Фото) */}
              <div className="w-full lg:w-7/12 relative group cursor-pointer" onClick={() => navigate(`/calculator`)}>
                <div className="overflow-hidden rounded-[3rem] shadow-2xl bg-gray-100 dark:bg-[#111]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                {/* Плашка з локацією */}
                <div className="absolute top-8 left-8 bg-white/90 dark:bg-black/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-white/20">
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#6919dd] mb-1">Локація</p>
                   <p className="text-sm font-bold text-gray-800 dark:text-white">{project.location}</p>
                </div>
              </div>

              {/* Текстова частина */}
              <div className="w-full lg:w-5/12 space-y-8 px-4">
                <div className="flex gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-white/10 px-4 py-1.5 rounded-full text-gray-500 dark:text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
                  {project.title}
                </h3>

                {/* Міні-статистика об'єкта */}
                <div className="grid grid-cols-3 gap-4 py-8 border-y border-gray-100 dark:border-white/5">
                  <div className="text-center">
                    <FaRulerCombined className="mx-auto mb-2 text-[#6919dd]" />
                    <p className="text-[10px] uppercase font-black opacity-50 dark:text-white tracking-widest">Площа</p>
                    <p className="font-bold dark:text-white">{project.stats.area}</p>
                  </div>
                  <div className="text-center">
                    <FaCalendarAlt className="mx-auto mb-2 text-[#6919dd]" />
                    <p className="text-[10px] uppercase font-black opacity-50 dark:text-white tracking-widest">Термін</p>
                    <p className="font-bold dark:text-white">{project.stats.term}</p>
                  </div>
                  <div className="text-center">
                    <FaTools className="mx-auto mb-2 text-[#6919dd]" />
                    <p className="text-[10px] uppercase font-black opacity-50 dark:text-white tracking-widest">Бюджет</p>
                    <p className="font-bold dark:text-white">{project.stats.price}</p>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/calculator')}
                  className="group flex items-center gap-4 text-[#6919dd] font-black uppercase tracking-[0.2em] text-sm hover:gap-6 transition-all"
                >
                  ХОЧУ ТАКИЙ ПРОЄКТ <FaArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Нижня кнопка */}
        <div className="mt-32 text-center">
           <button className="px-16 py-6 border-2 border-[#6919dd] text-[#6919dd] hover:bg-[#6919dd] hover:text-white transition-all rounded-full font-black uppercase tracking-widest text-xs">
              Переглянути всі роботи (250+)
           </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
