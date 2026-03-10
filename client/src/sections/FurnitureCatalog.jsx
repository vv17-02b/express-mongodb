import React from 'react';
import properties from '../data/Properties.json';
import ProductCard from '../components/ProductCard';

const FurnitureCatalog = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center lg:text-left">
          <span className="text-[#6919dd] font-black uppercase tracking-[0.3em] text-xs">Наш асортимент</span>
          <h2 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mt-2">
            Готові <span className="text-[#6919dd]">моделі</span>
          </h2>
        </div>

        {/* ТУТ ВИВОДЯТЬСЯ ВСІ 8 ТОВАРІВ З JSON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {properties.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FurnitureCatalog;
