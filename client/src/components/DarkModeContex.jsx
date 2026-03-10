import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  //  Початкове значення теми
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");

    if (saved) return saved;

    // якщо нічого не збережено — беремо системну
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return systemPrefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  //  Зберігаємо тему в localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);

    //  Додаємо клас до <html> (важливо для Tailwind)
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};