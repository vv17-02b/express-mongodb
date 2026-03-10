import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaQuoteLeft, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
  const [reviews, setReviews] = useState([]);

  // 1. ЗАВАНТАЖЕННЯ ВІДГУКІВ
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error("Помилка завантаження відгуків:", err);
    }
  };

  // 2. ВИДАЛЕННЯ ВІДГУКУ
  const handleDelete = async (id) => {
    if (window.confirm("Видалити цей відгук?")) {
      try {
        await axios.delete(`/api/reviews/${id}`);
        setReviews(reviews.filter(rev => (rev._id || rev.id) !== id));
      } catch (err) {
        console.error("Помилка при видаленні:", err);
        alert("Не вдалося видалити");
      }
    }
  };

  const handleLike = (id) => {
    setReviews(reviews.map(rev => (rev._id || rev.id) === id ? { ...rev, likes: (rev.likes || 0) + 1 } : rev));
  };

  // 3. ВІДПРАВКА НОВОГО ВІДГУКУ
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/reviews', newReview);
      setReviews([res.data, ...reviews]);
      setIsModalOpen(false);
      setNewReview({ name: '', text: '', rating: 5 });
    } catch (err) {
      console.error(err);
      alert("Помилка при відправці");
    }
  };

  return (
    <section id="reviews" className="py-24 bg-white dark:bg-[#080808] pt-32 overflow-hidden relative transition-colors duration-500">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16" data-aos="fade-down">
          <span className="text-[#6919dd] font-black text-xs uppercase tracking-[0.5em] mb-4 block">Відгуки</span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Що кажуть <span className="text-[#6919dd]">Клієнти</span>
          </h2>
          <div className="w-20 h-2 bg-[#6919dd] mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(105,25,221,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {reviews.map((rev) => (
              <motion.div
                key={rev._id || rev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-gray-50 dark:bg-[#111] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              >
                {/* КНОПКА ВИДАЛЕННЯ */}
                <button
                  onClick={() => handleDelete(rev._id || rev.id)}
                  className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <FaTrash size={14} />
                </button>

                <FaQuoteLeft className="absolute top-8 right-8 text-4xl text-[#6919dd]/10 group-hover:text-[#6919dd]/20 transition-colors" />

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={rev.avatar || "https://i.pravatar.cc"}
                    alt={rev.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#6919dd]/30 shadow-lg"
                  />

                  <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white leading-tight uppercase italic">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest">
                      {rev.role || "Клієнт"}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 font-medium italic mb-8 leading-relaxed">
                  "{rev.text}"
                </p>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-white/5">
                  <button
                    onClick={() => handleLike(rev._id || rev.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group/like"
                  >
                    <FaHeart className={`${(rev.likes || 0) > 20 ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : ''} group-hover/like:scale-125 transition-transform`} />
                    <span className="text-xs font-black">{rev.likes || 0}</span>
                  </button>
                  <span className="text-[10px] font-black text-[#6919dd] uppercase tracking-[0.2em]">Перевірено</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#6919dd] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#5815b8] transition-all shadow-[0_20px_40px_rgba(105,25,221,0.3)] transform active:scale-95"
          >
            <FaPlus /> Залишити свій відгук
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="bg-white dark:bg-[#111] w-full max-w-lg rounded-[3rem] p-10 relative border dark:border-white/10 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-8 text-gray-400 hover:text-[#6919dd]"><FaTimes size={24} /></button>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic mb-8 text-center">Ваш <span className="text-[#6919dd]">Відгук</span></h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input required type="text" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} className="w-full bg-gray-50 dark:bg-[#080808] border-none rounded-2xl p-4 dark:text-white" placeholder="Ваше ім'я" />
              <div className="flex justify-center gap-2 py-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`text-3xl cursor-pointer ${i < (hoverRating || newReview.rating) ? 'text-amber-500' : 'text-gray-200'}`} onMouseEnter={() => setHoverRating(i + 1)} onMouseLeave={() => setHoverRating(0)} onClick={() => setNewReview({ ...newReview, rating: i + 1 })} />
                ))}
              </div>
              <textarea required rows="4" value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} className="w-full bg-gray-50 dark:bg-[#080808] border-none rounded-2xl p-4 dark:text-white resize-none" placeholder="Ваш коментар..."></textarea>
              <button type="submit" className="w-full py-5 bg-[#6919dd] text-white rounded-2xl font-black uppercase text-xs shadow-xl active:scale-95 transition-all">Опублікувати</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
