import React, { useState } from "react";
import { motion } from "framer-motion"; 
import { HiArrowNarrowRight } from "react-icons/hi";

import carpenter from "../assets/images/carpenter.jpg";
import delivery from "../assets/images/delivery2.jpg";
import design from "../assets/images/design.jpg";

const Card = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-[400px] h-[480px] perspective-1000">
      <motion.div
        className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* ЛИЦЬОВА СТОРОНА */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden [backface-visibility:hidden] border border-gray-100 flex flex-col cursor-pointer"
          onClick={() => setIsFlipped(true)}
        >
          <img
            src={item.image}
            alt="content"
            className="h-44 w-full object-cover shrink-0"
          />

          <div className="p-5 flex flex-col flex-grow min-h-0 overflow-hidden">
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>

              <div className="mt-4 pb-4">
                <h4 className="font-semibold">{item.subtitle}</h4>
                <p className="text-sm whitespace-pre-line text-gray-600">
                  {item.schedule}
                </p>
              </div>

              {/* Графік */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex items-end gap-1 h-12">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-blue-500 rounded-t-sm"
                    />
                  ))}
                </div>
                <p className="text-[10px] text-blue-600 mt-2 font-semibold">
                  Статистика активності за тиждень
                </p>
              </div>
            </div>

            {/* Кнопка */}
            <div className="flex items-center justify-center gap-2 pt-4 mt-auto border-t border-gray-50 shrink-0 bg-white">
              <button className="underline text-[#8a8a8a] hover:text-[#6c63ff] transition text-base sm:text-lg font-medium">
                Отримати консультацію
              </button>
              <HiArrowNarrowRight size={18} className="text-[#6c63ff]" />
            </div>
          </div>
        </div>

        {/* ЗВОРОТНА СТОРОНА */}
        <div
          className="absolute inset-0 w-full h-full bg-gray-900 text-white rounded-2xl shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col overflow-hidden cursor-pointer"
          onClick={() => setIsFlipped(false)}
        >
          <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
            <h3 className="text-xl font-bold mb-4 text-indigo-400">
              Наші виконаної роботи та умовах гарантії доставка
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
              {item.description}
            </p>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-xs uppercase text-gray-500 font-bold mb-3 tracking-wider">
                Останній відгук
              </p>

              <div className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500"
                />
                <div>
                  <p className="text-xs font-medium">{item.userName}</p>
                  <p className="text-[11px] text-gray-400 italic">
                    "Чудовий сервіс, все працює ідеально!"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-red-500">❤️</span>
              <span className="text-sm font-bold">{item.likes}</span>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              ID: 4829-X
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CardGrid = () => {
  const data = [
    {
      id: 1,
      title: "Наш сервіс",
      image: carpenter,
      description: `Ми пропонуємо вам найкращі меблі на замовлення, створені індивідуально 
      під ваші потреби та стиль життя. Кожен предмет виготовляється з високоякісних матеріалів,
       з урахуванням точнихрозмірів вашого приміщення,
       щоб забезпечити комфорт, стиль довговічність.     Вітальня, спальня, кухня, офіс або сад — ми допоможемо втілити
              ваші ідеї у життя. Дизайнери та майстри працюють над кожною
              деталлю, щоб ваш інтер’єр став унікальним, функціональним та
              затишним.  Замовляючи меблі у нас, ви отримуєте не просто предмети інтер’єру,
              а повноцінне рішення під ваш стиль життя, яке щодня дарує комфорт
              і естетику. Ми гарантуємо індивідуальний підхід, професійну
              консультацію та доставку у зручний для вас час.`,
      schedule: `
    Понеділок – П’ятниця: 09:00 – 18:00
    Субота: 10:00 – 15:00
    Неділя: вихідний
  `,
      avatar: "https://i.pravatar.cc",
      userName: "Олексій К.",
      likes: "1.2k",
    },
    {
      id: 2,
      title: "доставка",
      image: delivery,
      description: `
Ми забезпечуємо швидку та надійну доставку меблів із дотриманням погоджених термінів. Кожне замовлення ретельно пакується для збереження цілісності під час транспортування.

Наша команда організовує логістику таким чином, щоб ви отримали готові меблі у зручний для вас час без затримок та пошкоджень.

Ми гарантуємо відповідальний підхід, точність та повний контроль на кожному етапі доставки.
`,
      subtitle:
        "Працюємо щодня для організації зручної та оперативної доставки.",
      avatar: "https://i.pravatar.cc",
      userName: "Марія П.",
      likes: "850",
    },
    {
      id: 3,
      title: "проект 3D меблів",
      image: design,
      description: `
Перед початком виробництва ми розробляємо повний технічний проєкт меблів з урахуванням точних розмірів приміщення, ергономіки та ваших індивідуальних побажань.

Створюємо реалістичні 3D-візуалізації, які дозволяють побачити майбутній інтер’єр ще до виготовлення. Ви можете оцінити дизайн, функціональність та розташування кожного елемента.

На етапі проєктування легко внести корективи, що гарантує точний результат, продуману конструкцію та повну відповідність вашим очікуванням.
`,
      schedule: `
   Індивідуальне 3D-проєктування з повною візуалізацією майбутнього інтер’єру.
  `,
      avatar: "https://i.pravatar.cc",
      userName: "Іван Б.",
      likes: "2.4k",
    },
  ];

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-8 lg:px-12 py-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardGrid;