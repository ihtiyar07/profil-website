import React, { useState } from 'react';
import { 
  Terminal, 
  Globe, 
  Menu, 
  X, 
  Cpu, 
  Mail
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTr = currentLang === 'tr';

  const navLinks = [
    { href: '#architecture', label: isTr ? 'Mimari' : 'Architecture' },
    { href: '#telemetry', label: isTr ? 'Telemetri' : 'Telemetry' },
    { href: '#projects', label: isTr ? 'Sistemler' : 'Systems' },
    { href: '#skills', label: isTr ? 'Yetkinlikler' : 'Stack' },
    { href: '#terminal', label: isTr ? 'CLI Konsol' : 'Terminal' },
    { href: '#consulting', label: isTr ? 'Çözümler' : 'Solutions' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#030712]/95 border-b border-slate-800/80 transition-all w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs sm:text-sm tracking-wider text-slate-100 font-mono group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                AHMET İHTİYAR
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-ping" />
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-tight">
                SYS.ARCH // IOT & CLOUD
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible on lg and above) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-mono font-medium text-slate-300 hover:text-emerald-400 transition-colors py-1.5 hover:border-b-2 hover:border-emerald-500/80 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Hub */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(isTr ? 'en' : 'tr')}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all cursor-pointer"
              title={isTr ? 'Switch to English' : 'Türkçeye Geç'}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentLang.toUpperCase()}</span>
            </button>

            {/* Quick Terminal Trigger (Visible on sm and up) */}
            <a
              href="#terminal"
              className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700/80 text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-500/50 transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">CLI</span>
            </a>

            {/* GitHub (Visible on md and up) */}
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Contact for Projects CTA (Adaptive text for responsive widths) */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 transition-all cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{isTr ? 'Projeleriniz İçin Ulaşın' : 'Contact for Projects'}</span>
              <span className="sm:hidden">{isTr ? 'İletişim' : 'Contact'}</span>
            </button>

            {/* Mobile Menu Hamburger Toggle (Visible below lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-t border-slate-800/80 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono text-slate-300 hover:text-emerald-400 py-2.5 px-3 rounded-lg hover:bg-slate-900/80 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-400 text-xs">→</span>
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2 border-t border-slate-850">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>{isTr ? 'Projeleriniz İçin Ulaşın' : 'Contact for Projects'}</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="#terminal"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 text-center font-mono text-xs flex items-center justify-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CLI Terminal</span>
              </a>
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-center font-mono text-xs flex items-center justify-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>github/ihtiyar07</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
