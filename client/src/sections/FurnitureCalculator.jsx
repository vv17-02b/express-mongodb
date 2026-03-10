import React, { useState, useEffect } from 'react';
import { HiOutlineCalculator, HiOutlineCheckCircle, HiOutlineTruck, HiOutlineHome } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const FurnitureCalculator = () => {
  const { addToCart } = useCart();
  
  // Стани вибору
  const [category, setCategory] = useState('Кухня');
  const [size, setSize] = useState(2.5); 
  const [material, setMaterial] = useState('ДСП Egger');
  const [materialPrice, setMaterialPrice] = useState(15000);
  const [color, setColor] = useState('Білий');
  const [delivery, setDelivery] = useState('Самовивіз');
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [total, setTotal] = useState(0);

  // Кольори з назвами
  const colors = [
    { name: 'Білий', hex: '#FFFFFF' },
    { name: 'Графіт', hex: '#4B5563' },
    { name: 'Антрацит', hex: '#1F2937' },
    { name: 'Дерево', hex: '#8B4513' },
    { name: 'Фірмовий', hex: '#6919dd' }
  ];

  useEffect(() => {
    const basePrice = size * materialPrice;
    setTotal(Math.round(basePrice + deliveryPrice));
  }, [size, materialPrice, deliveryPrice]);

  const handleAddToCart = () => {
    // Формуємо об'єкт так, щоб кожне поле було окремим (для відображення в кошику)
    const productToAdd = {
      id: `custom-${Date.now()}`,
      title: `${category} (Індивідуальний)`,
      price: total,
      category: category,
      color: color,             // ПЕРЕДАЄМО КОЛІР
      size: `${size} м.п.`,      // ПЕРЕДАЄМО РОЗМІР
      delivery: delivery,       // ПЕРЕДАЄМО ДОСТАВКУ
      material: material,
      image: category === 'Кухня' ? "/images/kitchen-cabinet-1.jpg" : "/images/wardrobe-1.jpg",
      quantity: 1
    };

    addToCart(productToAdd);
    alert("Додано до кошика з усіма параметрами!");
  };

  return (
    <section id="calculator" className="py-24 bg-gray-50 dark:bg-[#080808] min-h-screen pt-36">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-12 bg-white dark:bg-[#111] p-8 md:p-12 rounded-[3.5rem] shadow-2xl border dark:border-white/5">
          
          <div className="space-y-10">
            {/* КАТЕГОРІЯ */}
            <div>
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Тип виробу</label>
              <div className="grid grid-cols-2 gap-4">
                {['Кухня', 'Шафа'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border-2 ${
                      category === cat 
                      ? 'border-[#6919dd] bg-[#6919dd] text-white shadow-xl scale-[1.02]' 
                      : 'border-gray-100 dark:border-gray-800 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* РОЗМІР */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Довжина (м.п.)</label>
                <span className="text-[#6919dd] font-black">{size} м.</span>
              </div>
              <input 
                type="range" min="1" max="15" step="0.1" value={size} 
                onChange={(e) => setSize(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-[#6919dd]"
              />
            </div>

            {/* КОЛІР */}
            <div>
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Колір фасаду: <span className="text-gray-900 dark:text-white">{color}</span></label>
              <div className="flex flex-wrap gap-4">
                {colors.map((c) => (
                  <button 
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${color === c.name ? 'border-[#6919dd] scale-125 shadow-lg' : 'border-transparent'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* ДОСТАВКА */}
            <div>
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Логістика</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {setDelivery('Самовивіз'); setDeliveryPrice(0)}}
                  className={`p-5 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs uppercase transition-all ${
                    delivery === 'Самовивіз' ? 'border-[#6919dd] bg-[#6919dd]/10 text-[#6919dd]' : 'border-gray-100 dark:border-gray-800 text-gray-400'
                  }`}
                >
                  <HiOutlineHome size={20}/> Самовивіз
                </button>
                <button 
                  onClick={() => {setDelivery('Доставка'); setDeliveryPrice(2500)}}
                  className={`p-5 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs uppercase transition-all ${
                    delivery === 'Доставка' ? 'border-[#6919dd] bg-[#6919dd]/10 text-[#6919dd]' : 'border-gray-100 dark:border-gray-800 text-gray-400'
                  }`}
                >
                  <HiOutlineTruck size={20}/> Доставка
                </button>
              </div>
            </div>
          </div>

          {/* КАРТКА ПІДСУМКУ */}
          <div className="bg-[#6919dd] rounded-[3rem] p-10 text-white flex flex-col justify-between shadow-[0_20px_50px_rgba(105,25,221,0.3)]">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/20 rounded-2xl"><HiOutlineCalculator size={32} /></div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Конфігурація</h3>
              </div>
              
              <div className="space-y-5">
                {[
                  { label: 'Виріб', val: category },
                  { label: 'Колір', val: color },
                  { label: 'Розмір', val: `${size} м.п.` },
                  { label: 'Доставка', val: delivery }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">{item.label}</span>
                    <span className="font-bold text-sm">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Підсумкова вартість</div>
              <div className="text-6xl font-black tracking-tighter mb-10">
                {total.toLocaleString()} <span className="text-2xl">грн</span>
              </div>
              <button 
                onClick={handleAddToCart}
                className="w-full py-6 bg-white text-[#6919dd] rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl"
              >
                Додати в кошик <HiOutlineCheckCircle size={24} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FurnitureCalculator;
