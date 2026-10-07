import React from 'react';
import { Mail } from 'lucide-react';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';

interface FooterProps {
  currentLang: Language;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenContact }) => {
  const isTr = currentLang === 'tr';

  return (
    <footer id="contact" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6 sm:space-y-8">
      
      {/* Contact Note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-slate-200/80 dark:border-white/10">
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            {isTr ? 'Birlikte Çalışalım' : 'Let\'s Build Together'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-lg">
            {isTr
              ? 'Dağıtık mikroservisler, endüstriyel IoT donanımları veya veri soykütüğü projeleriniz için doğrudan ulaşabilirsiniz.'
              : 'Feel free to reach out for distributed backend architectures, industrial IoT firmware, or data lineage platforms.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="px-3.5 sm:px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{isTr ? 'İletişime Geç' : 'Contact Me'}</span>
          </button>
          
          <a
            href={`mailto:${PORTFOLIO_DATA.profile.email}`}
            className="px-2.5 sm:px-3 py-2 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors break-all"
          >
            {PORTFOLIO_DATA.profile.email}
          </a>
        </div>
      </div>

      {/* Bottom Minimal Signature */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
        <div className="flex items-center flex-wrap gap-3">
          <span>© {new Date().getFullYear()} Ahmet İhtiyar.</span>
          <span className="text-slate-300 dark:text-white/10">•</span>
          <a 
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          {PORTFOLIO_DATA.profile.linkedin && (
            <>
              <span className="text-slate-300 dark:text-white/10">•</span>
              <a 
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </>
          )}
        </div>
        <div>
          İstanbul, TR • Systems & Distributed Architecture
        </div>
      </div>

    </footer>
  );
};
