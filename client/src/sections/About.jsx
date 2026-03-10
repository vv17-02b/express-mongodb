import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import wardrobe from "../assets/images/wardrobe-2.jpg"

const About = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-out",
      delay: 100
    });

  }, []);

  return (
    <section
      id="about"
      className="w-full m-auto lg:px-40 px-10 py-20 pt-32 lg:pt-40 grid lg:grid-cols-2 grid-cols-1 
             bg-gray-100 dark:bg-gray-800 justify-center items-center gap-10 min-h-[80vh]"
    >
      <div className="flex justify-center">
        <img
          data-aos="zoom-in"
          src={wardrobe}
          alt="wardrobe"
          className="rounded-2xl lg:w-[500px] lg:h-[600px] w-full h-auto object-cover shadow-2xl"
        />
      </div>

      <div className="flex flex-col justify-center items-start gap-6">
        {/* Маленький надзаголовок */}
        <span className="text-[#6919dd] font-bold tracking-widest uppercase text-sm">
          Ваш простір — наш пріоритет
        </span>

        {/* Головний заголовок */}
        <h1 data-aos="zoom-in" className="text-4xl lg:text-6xl font-black dark:text-white leading-tight">
          Про <span className="text-[#6919dd]">нас</span>
        </h1>

        {/* Основний текст */}
        <p data-aos="fade-up" className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
          Ми спеціалізуємося на <span className="font-bold text-gray-900 dark:text-white">професійному виготовленні та збірці меблів</span> за індивідуальними проектами. Перетворюємо ваші ідеї на реальність, враховуючи кожне побажання та особливість інтер'єру.
        </p>

        {/* БЛОК ІЗ ЦИФРАМИ (Counter Block) */}
        <div data-aos="fade-up" className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full py-6 border-y border-gray-200 dark:border-gray-700 mt-4">
          <div className="flex flex-col">
            <span className="text-3xl lg:text-4xl font-black text-[#6919dd]">10+</span>
            <span className="text-xs lg:text-sm font-bold text-gray-500 uppercase">Років досвіду</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl lg:text-4xl font-black text-[#6919dd]">500+</span>
            <span className="text-xs lg:text-sm font-bold text-gray-500 uppercase">Проєктів</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl lg:text-4xl font-black text-[#6919dd]">100%</span>
            <span className="text-xs lg:text-sm font-bold text-gray-500 uppercase">Якість</span>
          </div>
        </div>

        {/* Кнопка дії */}
        <Link
          to="/calculator"
          className="header-btn mt-4 px-10 py-4 bg-[#6919dd] text-white font-black rounded-2xl ..."
        >
          Замовити прорахунок
        </Link>


      </div>


    </section>

  )
}

export default About
