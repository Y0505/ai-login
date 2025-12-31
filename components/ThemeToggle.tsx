'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full flex items-center justify-center
                 text-[var(--text-secondary)]
                 hover:text-[var(--text-primary)]
                 hover:bg-[var(--border-color)]
                 transition"
    >
      <i
        className={`ph text-xl ${
          theme === 'dark' ? 'ph-sun' : 'ph-moon'
        }`}
      />
    </button>
  );
}
