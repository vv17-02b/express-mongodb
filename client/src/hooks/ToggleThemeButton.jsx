import React from "react";
import { useTheme } from "../components/DarkModeContex";

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group relative overflow-hidden rounded-full"
    >
      {/* Шар, що створює діагональний перехід */}
      <span className="absolute inset-0  transition-transform duration-700 ease-in-out " />

      {/* Текст (міняє колір при наведенні завдяки mix-blend-mode або просто через z-index) */}
      <span className="relative z-10 flex items-center gap-2duration-500">
        {theme === "light" ? (
          <>🌙 </>
        ) : (
          <>☀️ </>
        )}
      </span>
    </button>
  );
};

export default ToggleThemeButton;
