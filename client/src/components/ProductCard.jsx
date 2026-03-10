import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { HiOutlineTruck, HiOutlineHome, HiOutlinePlusCircle } from 'react-icons/hi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Стани для вибору клієнта
  const [selectedColor, setSelectedColor] = useState(product.color || 'Стандарт');
  const [selectedMaterial, setSelectedMaterial] = useState(product.material || 'ДСП');
  const [delivery, setDelivery] = useState('Самовивіз');

  const handleAdd = () => {
    const finalItem = {
      title: product.title,
      // Додаємо +500 грн якщо обрано доставку (як приклад динамічної ціни)
      price: delivery === 'Доставка' ? Number(product.price) + 500 : Number(product.price),
      details: `Колір: ${selectedColor}, Матеріал: ${selectedMaterial}, Доставка: ${delivery}`,
      image: product.images[0] // Беремо перше фото з масиву
    };
    
    addToCart(finalItem);
    alert(`${product.title} додано у кошик!`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 shadow-xl border border-transparent hover:border-[#6919dd]/20 transition-all flex flex-col h-full">
      {/* Зображення */}
      <div className="h-52 rounded-[2rem] overflow-hidden mb-6">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
        />
      </div>

      <h3 className="text-lg font-black dark:text-white uppercase mb-1">{product.title}</h3>
      <p className="text-[#6919dd] font-black text-xl mb-4">{product.price} грн</p>

      {/* ОПЦІЇ ВИБОРУ */}
      <div className="space-y-4 flex-1">
        {/* Вибір матеріалу */}
        <div>
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Матеріал</label>
          <select 
            value={selectedMaterial} 
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white text-[10px] font-bold outline-none border dark:border-gray-700"
          >
            <option value="ДСП Egger">ДСП Egger</option>
            <option value="МДФ Фарбований">МДФ (+15%)</option>
            <option value="Дерево">Дерево (+30%)</option>
          </select>
        </div>

        {/* Вибір доставки */}
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setDelivery('Самовивіз')}
            className={`py-2 rounded-xl border text-[9px] font-black flex items-center justify-center gap-1 transition-all ${delivery === 'Самовивіз' ? 'bg-[#6919dd] text-white border-[#6919dd]' : 'dark:text-gray-400 border-gray-700'}`}
          >
            <HiOutlineHome size={14}/> САМОВИВІЗ
          </button>
          <button 
            onClick={() => setDelivery('Доставка')}
            className={`py-2 rounded-xl border text-[9px] font-black flex items-center justify-center gap-1 transition-all ${delivery === 'Доставка' ? 'bg-[#6919dd] text-white border-[#6919dd]' : 'dark:text-gray-400 border-gray-700'}`}
          >
            <HiOutlineTruck size={14}/> ДОСТАВКА
          </button>
        </div>
      </div>

      <button 
        onClick={handleAdd}
        className="w-full mt-6 py-4 bg-[#6919dd] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#5714bd] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
      >
        <HiOutlinePlusCircle size={18} /> Додати в кошик
      </button>
    </div>
  );
};

export default ProductCard;
