'use client';

import { useEffect, useState } from 'react';

export function useAuthLogic() {
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  /* ===== Apply language & direction ===== */
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  }, [lang]);

  /* ===== Apply theme ===== */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleLang() {
    setLang(prev => (prev === 'fa' ? 'en' : 'fa'));
  }

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  return {
    loginType,
    setLoginType,
    lang,
    toggleLang,
    theme,
    toggleTheme,
  };
}
