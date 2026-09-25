import React from 'react';
import { 
  Cpu, 
  Mail, 
  ArrowUp,
  Cloud
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';

interface FooterProps {
  currentLang: Language;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenContact }) => {
  const isTr = currentLang === 'tr';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 font-mono text-xs py-8 sm:py-12 relative w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-slate-850">
          
          {/* Brand Info */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm tracking-wider">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>AHMET İHTİYAR // SYSTEMS & IOT</span>
            </div>
            <p className="text-slate-400 text-xs font-sans max-w-md leading-relaxed">
              {isTr
                ? 'ESP32 donanım seviyesinden Spring Boot mikroservislerine, MetaDB soykütüğünden Proxmox sanallaştırmasına uçtan uca mühendislik.'
                : 'Full-spectrum systems engineering spanning ESP32 firmware, Spring Boot microservices, MetaDB lineage, and Proxmox infrastructure.'}
            </p>
          </div>

          {/* Cloudflare Pages Badge */}
          <div className="w-full sm:w-auto p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 sm:space-y-1.5 shrink-0">
            <div className="flex items-center gap-2 text-slate-200">
              <Cloud className="w-4 h-4 text-orange-400" />
              <span className="font-bold text-[10px] sm:text-[11px]">CLOUDFLARE PAGES READY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-auto" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 flex items-center justify-between gap-4">
              <span>Edge Global CDN: &lt;15ms</span>
              <span className="text-emerald-400 font-semibold">100% Static</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[10px] sm:text-[11px]">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} Ahmet İhtiyar. {isTr ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <button
              onClick={onOpenContact}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isTr ? 'İletişim' : 'Contact'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-md bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-all cursor-pointer flex items-center gap-1"
              title={isTr ? 'Başa Dön' : 'Scroll to top'}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
