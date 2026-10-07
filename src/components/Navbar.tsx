import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { type Language } from '../data/portfolioData';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenContact: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenContact,
  isDark,
  onToggleTheme,
}) => {
  const isTr = currentLang === 'tr';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#0b0d13]/85 border-b border-slate-200/80 dark:border-white/10 transition-colors">
      <div className="w-full max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Name / Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Ahmet İhtiyar
          </span>
          <span className="text-slate-300 dark:text-zinc-700 text-xs font-mono">•</span>
          <span className="text-slate-500 dark:text-zinc-400 text-xs font-mono hidden sm:inline">Systems & IoT</span>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-400">
          <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {isTr ? 'Projeler' : 'Projects'}
          </a>
          <a href="#architecture" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {isTr ? 'Mimari' : 'Architecture'}
          </a>
          <a href="#principles" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {isTr ? 'İlkeler' : 'Principles'}
          </a>
          <a href="#stack" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            {isTr ? 'Stack' : 'Stack'}
          </a>

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title={isDark ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Language switch */}
          <button
            onClick={() => onLanguageChange(isTr ? 'en' : 'tr')}
            className="px-2 py-1 rounded text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer font-medium"
            title={isTr ? 'Switch to English' : 'Türkçeye Geç'}
          >
            {currentLang.toUpperCase()}
          </button>

          {/* Contact direct link */}
          <button
            onClick={onOpenContact}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors cursor-pointer shadow-xs"
          >
            {isTr ? 'İletişim' : 'Contact'}
          </button>
        </nav>
      </div>
    </header>
  );
};
