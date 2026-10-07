import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#projects', label: isTr ? 'Projeler' : 'Projects' },
    { href: '#architecture', label: isTr ? 'Mimari' : 'Architecture' },
    { href: '#principles', label: isTr ? 'İlkeler' : 'Principles' },
    { href: '#stack', label: isTr ? 'Stack' : 'Stack' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-[#0b0d13]/90 border-b border-slate-200/80 dark:border-white/10 transition-colors">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Name / Brand */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Ahmet İhtiyar
          </span>
          <span className="text-slate-300 dark:text-zinc-700 text-xs font-mono hidden xs:inline">•</span>
          <span className="text-slate-500 dark:text-zinc-400 text-xs font-mono hidden sm:inline">Systems & IoT</span>
        </a>

        {/* Right Section */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 hidden md:block" />

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs shrink-0"
          >
            {isTr ? 'İletişim' : 'Contact'}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors md:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0e111a]/95 backdrop-blur-md px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <nav className="flex flex-col space-y-1 font-medium text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
