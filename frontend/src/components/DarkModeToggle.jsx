import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2.5 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 hover:from-primary-100 hover:to-primary-200 dark:hover:from-primary-900 dark:hover:to-primary-800 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg group"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-400 group-hover:rotate-90 transition-transform duration-500" />
      ) : (
        <Moon size={20} className="text-gray-600 group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
}
