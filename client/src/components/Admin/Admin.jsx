import React, { useEffect, useState, useCallback } from "react";

const AdminModal = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Отримуємо актуальні дані
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const fetchOrders = useCallback(async () => {
    // Робимо запит тільки якщо модалка відкрита, є токен і роль саме admin
    if (!isOpen || !token || userRole !== "admin") return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/orders", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        onClose();
        alert("Сесія закінчилася, увійдіть знову");
        return;
      }

      if (!res.ok) throw new Error("Помилка завантаження");

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  }, [token, isOpen, onClose, userRole]);

  // Завантаження при відкритті
  useEffect(() => {
    if (isOpen && userRole === "admin") {
      fetchOrders();
    }
  }, [isOpen, userRole, fetchOrders]);

  // Слухаємо оновлення (якщо хтось відправив нову форму)
  useEffect(() => {
    const handleRefresh = () => {
      if (isOpen) fetchOrders();
    };
    window.addEventListener("refreshOrders", handleRefresh);
    return () => window.removeEventListener("refreshOrders", handleRefresh);
  }, [fetchOrders, isOpen]);

  const handleDelete = async (id) => {
    if (!window.confirm("Видалити це замовлення?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
      } else {
        alert("Помилка при видаленні");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ТУТ ГОЛОВНЕ ВИПРАВЛЕННЯ: якщо не адмін — нічого не показуємо
  if (!isOpen || userRole !== "admin") return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white dark:bg-gray-900 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="p-8 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Адмін-панель</h2>
            <p className="text-[#6919dd] font-bold text-sm">Управління замовленнями</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Таблиця */}
        <div className="flex-1 overflow-auto p-8 dark:bg-[#0f172a]">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#6919dd]"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-gray-400 italic text-xl">Замовлень поки немає</div>
          ) : (
            <div className="overflow-x-auto rounded-3xl border dark:border-gray-800">
              <table className="w-full text-left">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800/50 dark:text-gray-400 border-b dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4">Клієнт</th>
                    <th className="px-6 py-4">Контакт</th>
                    <th className="px-6 py-4">Категорія</th>
                    <th className="px-6 py-4">Коментар</th>
                    <th className="px-6 py-4 text-right">Дії</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#6919dd]/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-black dark:text-white">{order.name}</div>
                        <div className="text-[10px] text-gray-500 uppercase">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 text-[#6919dd] font-bold">{order.phone}</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#6919dd] text-white text-[10px] px-2 py-1 rounded-md uppercase font-black">
                          {order.category || "Загальне"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {order.comment || "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
                        >
                          Видалити
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-6 border-t dark:border-gray-800 flex justify-center bg-gray-50 dark:bg-gray-800/30">
          <button onClick={onClose} className="px-10 py-4 bg-gray-900 dark:bg-[#6919dd] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
