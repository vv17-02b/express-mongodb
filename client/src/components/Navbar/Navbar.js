import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { VscSettingsGear } from "react-icons/vsc";
import { FaPhone, FaRegUserCircle, FaEyeSlash } from "react-icons/fa";
import { HiMenu, HiX, HiOutlineShoppingBag } from "react-icons/hi"; // Додали сумку
import { IoEyeSharp } from "react-icons/io5";
import ToggleThemeButton from "../../hooks/ToggleThemeButton";
import interer from "../../assets/images/interer.png";
import logo from "../../assets/images/logo.png";
import AdminModal from "../Admin/Admin";
import { useCart } from "../../context/CartContext"; // Імпорт кошика

const navLink = [
  { label: "Дім", href: "/" },
  { label: "Сервіс", href: "/UI-Components/Pages/Service" },
{
  label: "Проєкти", // Замість "Демонструвати"
  href: "/UI-Components/Projects",
  dropdown: [
    { label: "Всі роботи", href: "/UI-Components/Projects" },
    { label: "Останній монтаж", href: "/UI-Components/Projects/2" },
  ],
},
  {
    label: "Блог",
    href: "/UI-Components/Blogs",
    dropdown: [
      { label: "Блог", href: "/UI-Components/Blogs" },
      { label: "Деталі блогу", href: "/UI-Components/Blogs/2" },
    ],
  },
  {
    label: "Сторінки",
    href: "/UI-Components/Pages/About", 
    dropdown: [
      { label: "Про нас", href: "/UI-Components/Pages/About" },
      { label: "Команда", href: "/UI-Components/Pages/Teams" },
      { label: "Галерея", href: "/UI-Components/Pages/Gallery" },
      { label: "Картки", href: "/UI-Components/Pages/CardGrid" },
      { label: "Популярні замовлення", href: "/UI-Components/Pages/PopularOrdes" },
      { label: "Контакт", href: "/UI-Components/Pages/Constant" },
    ],
  },
  { label: "Контакт", href: "/UI-Components/Pages/Constant" },
];

const Navbar = () => {
  const { cartItems, removeFromCart } = useCart(); // Логіка кошика
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Стан панелі кошика
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (token && savedRole === "admin") {
      setIsAdminOpen(true);
    } else {
      setShowModal(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        setShowModal(false);
        if (data.user.role === "admin") setIsAdminOpen(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Помилка сервера");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        alert("Реєстрація успішна! Увійдіть.");
        setIsRegister(false);
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      alert("Помилка при реєстрації");
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-10 flex items-center justify-between h-18">
          <Link to="/"><img src={logo} alt="Logo" width={50} height={50} className="rounded-full" /></Link>

          <nav className="hidden lg:flex items-center gap-8 font-medium">
            {navLink.map((link) => (
              <div key={link.label} className="relative group">
                {link.dropdown ? (
                  <>
                    <Link to={link.href} className="flex items-center gap-1 hover:text-[#6919dd] dark:text-gray-200 transition-colors uppercase text-sm tracking-widest">
                      {link.label} <TiArrowSortedDown className="group-hover:rotate-180 transition-transform" />
                    </Link>
                    <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl py-2 min-w-[200px] border dark:border-gray-700">
                        {link.dropdown.map((item) => (
                          <Link key={item.label} to={item.href} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-[#6919dd] dark:text-gray-200">
                            <VscSettingsGear size={16} /> {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link.href} className="hover:text-[#6919dd] dark:text-gray-200 uppercase text-sm tracking-widest">{link.label}</Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ToggleThemeButton />
            
            {/* ІКОНКА КОШИКА */}
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gray-900 dark:text-gray-200 hover:text-[#6919dd] transition-all">
              <HiOutlineShoppingBag size={28} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button onClick={handleProfileClick} className="text-gray-900 dark:text-gray-200 hover:text-[#6919dd]">
              <FaRegUserCircle size={28} />
            </button>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-3xl dark:text-white"><HiMenu /></button>
          </div>
        </div>
      </header>

      {/* CART DRAWER (БІЧНА ПАНЕЛЬ КОШИКА) */}
      <div className={`fixed inset-0 z-[120] transition-visibility ${isCartOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isCartOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsCartOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#0f172a] shadow-2xl transition-transform duration-500 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase dark:text-white italic">Ваш вибір</h2>
              <button onClick={() => setIsCartOpen(false)} className="dark:text-white"><HiX size={30} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 italic">Кошик порожній</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border dark:border-gray-700 flex justify-between items-center">
                    <div>
                      <h4 className="font-black dark:text-white uppercase text-xs">{item.title}</h4>
                      <p className="text-[#6919dd] font-bold text-sm mt-1">{item.price?.toLocaleString()} грн</p>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-all"><HiX size={20} /></button>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="pt-6 border-t dark:border-gray-800">
                <div className="flex justify-between text-xl font-black dark:text-white mb-6 uppercase">
                  <span>Всього:</span>
                  <span className="text-[#6919dd]">{cartItems.reduce((acc, i) => acc + (i.price || 0), 0).toLocaleString()} грн</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); document.getElementById('order-form-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full bg-[#6919dd] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#5714bd] transition-all active:scale-95 shadow-lg"
                >Оформити замовлення</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[100] transition-visibility duration-300 ${mobileMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)}></div>
        <div className={`absolute top-0 left-0 h-full w-[280px] bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <img src={logo} alt="Logo" width={40} className="rounded-full" />
              <button onClick={() => setMobileOpen(false)} className="text-3xl dark:text-white"><HiX /></button>
            </div>
            <nav className="flex flex-col gap-4 overflow-y-auto">
              {navLink.map((link, idx) => (
                <div key={idx} className="border-b dark:border-gray-800 pb-2">
                  {link.dropdown ? (
                    <div>
                      <div className="flex items-center justify-between w-full py-2">
                        <Link to={link.href} onClick={() => setMobileOpen(false)} className="font-semibold text-lg dark:text-white uppercase">{link.label}</Link>
                        <button onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)} className="p-2 dark:text-white">
                          <TiArrowSortedDown className={`transition-transform ${activeDropdown === idx ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      {activeDropdown === idx && (
                        <div className="pl-4 flex flex-col gap-2 pb-2">
                          {link.dropdown.map((sub) => (
                            <Link key={sub.label} to={sub.href} onClick={() => setMobileOpen(false)} className="text-gray-500 dark:text-gray-400">{sub.label}</Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to={link.href} onClick={() => setMobileOpen(false)} className="block py-2 font-semibold text-lg dark:text-white uppercase">{link.label}</Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t dark:border-gray-800">
               {localStorage.getItem("token") && (
                <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full mb-4 py-2 bg-red-50 text-red-500 rounded-lg text-xs font-bold uppercase">Вийти</button>
              )}
              <div className="flex items-center gap-3 text-[#6919dd]">
                <FaPhone /><span className="text-sm font-bold">+38 (099) 123-45-67</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOGIN/REG MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white dark:bg-[#0f172a] w-full max-w-5xl h-auto lg:h-[600px] rounded-[32px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
            <div className="relative w-full lg:w-[60%] h-[200px] lg:h-full overflow-hidden group">
              <img src={interer} alt="interior" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/90 to-transparent p-10 flex flex-col justify-end text-white">
                <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter">Ваш інтер'єр — <br/><span className="text-[#6919dd]">наша пристрасть</span></h2>
              </div>
            </div>
            <div className="relative w-full lg:w-[40%] p-10 flex flex-col justify-center bg-white dark:bg-gray-900">
              <button onClick={() => setShowModal(false)} className="absolute top-8 right-6 text-gray-500 hover:rotate-90 transition-all"><HiX size={24} /></button>
              <div className="w-full max-sm mx-auto">
                <div className="mb-8 flex justify-center lg:justify-start gap-6 font-black uppercase tracking-widest">
                  <button className={`text-lg ${!isRegister ? "text-[#6919dd] border-b-4 border-[#6919dd]" : "text-gray-400"}`} onClick={() => setIsRegister(false)}>Логін</button>
                  <button className={`text-lg ${isRegister ? "text-[#6919dd] border-b-4 border-[#6919dd]" : "text-gray-400"}`} onClick={() => setIsRegister(true)}>Реєстрація</button>
                </div>
                <form className="space-y-5" onSubmit={isRegister ? handleRegister : handleLogin}>
                  {isRegister && (
                    <input type="text" placeholder="Ім'я" required value={name} className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-[#6919dd] dark:text-white transition-all" onChange={(e) => setName(e.target.value)} />
                  )}
                  <input type="email" placeholder="Email" required value={email} className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-[#6919dd] dark:text-white transition-all" onChange={(e) => setEmail(e.target.value)} />
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="Пароль" required value={password} className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-[#6919dd] dark:text-white transition-all" onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-400 hover:text-[#6919dd]">
                      {showPassword ? <FaEyeSlash size={22} /> : <IoEyeSharp size={22} />}
                    </button>
                  </div>
                  <button type="submit" className="w-full bg-[#6919dd] hover:bg-[#5714bd] text-white py-5 rounded-2xl font-black shadow-lg transition-all active:scale-95 uppercase tracking-[0.2em] text-xs mt-4">
                    {isRegister ? "ЗАРЕЄСТРУВАТИСЯ" : "УВІЙТИ"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </>
  );
};

export default Navbar;
