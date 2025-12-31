'use client';

import { useState } from 'react';
import { useAuthLogic } from './useAuthLogic';
import { messages } from '../../locales/index';
import { useLanguage } from '../../context/LanguageContext';

export default function AuthCard() {
  const [showMore, setShowMore] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { loginType, setLoginType } = useAuthLogic();
  const { lang } = useLanguage();
  const t = messages[lang];

  const resetInputs = () => { setShowCode(false); setValue(''); setCode(''); setError(''); };

  const handleContinue = () => {
    if (!showCode) {
      if (!value) return;
      setShowCode(true);
      setError('');
      return;
    }
    if (code.length < 6) {
      setError(t.invalidCode);
      return;
    }
    setError('');
    // submit logic here
  };

  return (
    <div className="auth-card mt-[-80px]">

      {/* ===== Header ===== */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{t.welcome}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{t.continue}</p>
      </div>

      {/* ===== Google Button ===== */}
      <button className="w-full py-3 rounded-full border border-[var(--border-color)] text-[13pt] text-[var(--text-primary)] transition flex items-center justify-center gap-2 hover:border-[var(--social-hover-border)]">
        <i className="ph ph-google-logo text-lg" />
        {t.loginWithGoogle}
      </button>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {[{ key: 'apple', icon: 'ph-apple-logo' }, { key: 'linkedin', icon: 'ph-linkedin-logo' }, { key: 'x', icon: 'ph-x-logo' }].map(item => (
          <button key={item.key} className="flex items-center justify-center rounded-full h-11 border border-[var(--border-color)] text-[var(--text-primary)] transition hover:border-[var(--social-hover-border)]">
            <i className={`ph ${item.icon} text-xl`} />
          </button>
        ))}
      </div>

      {/* ===== More Options ===== */}
      <div className="text-center mt-4">
        <button onClick={() => setShowMore(v => !v)} className="text-xs text-[var(--text-secondary)] underline decoration-dotted hover:text-[var(--text-primary)] transition">{t.moreOptions}</button>
        <div className={`grid grid-cols-5 gap-2 mt-3 overflow-hidden transition-all duration-300 ${showMore ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          {['Microsoft', 'Facebook', 'GitHub', 'GitLab', 'Discord'].map(item => (
            <div key={item} className="text-[10px] text-center py-2 rounded-lg cursor-pointer border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition">{item}</div>
          ))}
        </div>
      </div>

      {/* ===== Divider ===== */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-color)]" /></div>
        <div className="relative text-center"><span className="bg-[var(--bg-form)] px-2 text-xs text-[var(--text-secondary)]">{t.orLoginWith}</span></div>
      </div>

      {/* ===== Login Type Toggle ===== */}
      <div className="flex w-35 mx-auto rounded-full border border-[var(--border-color)] bg-[var(--bg-button)] p-1 mb-4">
        <button onClick={() => { setLoginType('email'); resetInputs(); }} className={`flex-1 py-2 text-sm rounded-full transition-all duration-200 ${loginType === 'email' ? 'bg-[var(--select-toggle)] text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)]'}`}>{t.email}</button>
        <button onClick={() => { setLoginType('phone'); resetInputs(); }} className={`flex-1 py-2 text-sm rounded-full transition-all duration-200 ${loginType === 'phone' ? 'bg-[var(--select-toggle)] text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)]'}`}>{t.phone}</button>
      </div>

      {/* ===== Email ===== */}
      {loginType === 'email' && (
        <div className="space-y-2">
          <label className="font-bold text-xs text-[var(--text-secondary)]">{t.emailLabel}</label>
          <input type="email" value={value} onChange={e => setValue(e.target.value)} placeholder="name@example.com" className="w-full px-3 py-3 text-sm rounded-lg bg-[var(--bg-button-form)] text-[var(--text-primary)] border border-[var(--border-color)] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />

          {showCode && (
            <div className="space-y-2 pt-3">
              <label className="font-bold text-xs text-[var(--text-secondary)]">{t.enterCodeLabel}</label>
              <input type="text" value={code} maxLength={6} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder={t.codePlaceholder} dir="ltr" className="w-full px-3 py-3 text-sm rounded-lg bg-[var(--bg-button-form)] text-[var(--text-primary)] border border-[var(--border-color)] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-center tracking-[0.45em] placeholder:text-base placeholder:tracking-[0.45em]" />
              {error && <div className="mt-2 px-3 py-2 rounded-lg bg-red-50 border border-red-400 text-red-600 text-xs text-center">{error}</div>}
              <p className="text-[11px] text-center text-[var(--text-secondary)]">{t.checkInboxHint}</p>
            </div>
          )}
        </div>
      )}

      {/* ===== Phone ===== */}
      {loginType === 'phone' && (
        <div className="space-y-2">
          <label className="font-bold text-xs text-[var(--text-secondary)]">{t.phoneLabel}</label>
          <div className="flex items-center gap-2 rounded-lg px-2 py-1 border border-[var(--border-color)] bg-[var(--bg-button-form)] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
            <input type="tel" value={value} onChange={e => setValue(e.target.value)} placeholder={lang === 'fa' ? '6789 345 912' : '912 345 6789'} dir={lang === 'fa' ? 'rtl' : 'ltr'} className="flex-1 px-2 py-2 text-sm bg-transparent text-[var(--text-primary)] focus:outline-none" />
            <span className="min-w-[40px] h-7 flex items-center justify-center rounded-md bg-[var(--bg-primary)] text-[9pt] font-bold text-[var(--text-secondary)] border border-[var(--border-color)] select-none">+98</span>
          </div>

          {showCode && (
            <div className="space-y-2 pt-3">
              <label className="font-bold text-xs text-[var(--text-secondary)]">{t.enterCodeLabel}</label>
              <input type="text" value={code} maxLength={6} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder={t.codePlaceholder} dir="ltr" className="w-full px-3 py-3 text-sm rounded-lg bg-[var(--bg-button-form)] text-[var(--text-primary)] border border-[var(--border-color)] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-center tracking-[0.45em] placeholder:text-base placeholder:tracking-[0.45em]" />
              {error && <div className="mt-2 px-3 py-2 rounded-lg bg-red-50 border border-red-400 text-red-600 text-xs text-center">{error}</div>}
              <p className="text-[11px] text-center text-[var(--text-secondary)]">{t.checkInboxHint}</p>
            </div>
          )}
        </div>
      )}

      {/* ===== Continue / Login Button ===== */}
      <button onClick={handleContinue} className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] transition hover:opacity-90">
        {showCode ? t.login : t.continueBtn}
        <i className="ph ph-arrow-left rtl:rotate-0 ltr:rotate-180 transition-transform" />
      </button>

      {/* ===== Guest Login ===== */}
      <button className="mt-3 mx-auto block text-xs text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">{t.guestContinue}</button>

      <div className="my-6 border-t border-[var(--border-color)]" />

      {/* ===== Terms ===== */}
      <div className="flex justify-center items-center gap-1 text-[11px] text-[var(--text-secondary)] mt-4 whitespace-nowrap">
        <span>{t.termsPrefix}</span>
        <span className="underline underline-offset-2 cursor-pointer transition hover:text-[var(--text-primary)] font-medium">{t.terms}</span>
        <span>{t.and}</span>
        <span className="underline underline-offset-2 cursor-pointer transition hover:text-[var(--text-primary)] font-medium">{t.privacy}</span>
      </div>

    </div>
  );
}
