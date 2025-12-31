'use client';

import { useAuthLogic } from './auth/useAuthLogic';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { toggleTheme, theme } = useAuthLogic();
    const { lang, toggleLang } = useLanguage();
    const isFa = lang === 'fa';
    const isDark = theme === 'dark';

    return (
        <nav className="flex justify-between items-center p-6 bg-[var(--bg-secondary)] text-[var(--text-primary)]">
            {/* AI Badge */}
            <span className=" w-8 h-8 flex items-center justify-center text-[12px] font-bold rounded-md bg-[var(--text-primary)] text-[var(--bg-primary)] border border-[var(--text-secondary)]">
                AI
            </span>

            {/* Right Controls */}
            <div className="flex items-center gap-4 select-none">
                {/* ===== Theme Toggle ===== */}
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-[20px] text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--hover-bg)] group">
                    <i className={`ph ${isDark ? 'ph-sun' : 'ph-moon'} opacity-60 group-hover:opacity-100 transition-opacity duration-200 `} />
                </button>
                {/* ===== Language Toggle ===== */}
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold">
                        EN
                    </span>

                    <button
                        onClick={toggleLang}
                        className={`relative w-8 h-4 rounded-full transition-colors duration-300
                                    ${isFa
                                        ? 'bg-[var(--text-primary)]'
                                        : 'bg-[var(--toggle-off-bg)]'
                                    }
                                `}>
                        <span className={`
                                absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300
                                bg-[var(--bg-primary)]
                                ${isFa ? 'right-0.5' : 'left-0.5'}
                            `}
                        />
                    </button>

                    <span className="text-[11px] font-bold">
                        FA
                    </span>
                </div>
            </div>
        </nav>
    );
}
