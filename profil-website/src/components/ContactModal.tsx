import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  MessageSquare
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const isTr = currentLang === 'tr';

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(
      subject || (isTr ? 'Sistem Mimarisi / Proje Görüşmesi' : 'Systems Architecture & Project Inquiry')
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Title & Status */}
        <div>
          <span className="text-[10px] sm:text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {isTr ? 'PROJELERİNİZ İÇİN İLETİŞİM' : 'COLLABORATE ON PROJECTS'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Ahmet İhtiyar
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5 sm:mt-1">
            {PORTFOLIO_DATA.profile.role[currentLang]}
          </p>
        </div>

        {/* Direct Email Card with 1-Click Copy */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 sm:space-y-3 font-mono">
          <span className="text-[10px] sm:text-[11px] text-slate-400 block uppercase">
            {isTr ? 'DOĞRUDAN E-POSTA ADRESİ:' : 'DIRECT EMAIL ADDRESS:'}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-950 p-2.5 sm:p-3 rounded-lg border border-slate-850">
            <span className="text-xs sm:text-sm font-bold text-emerald-400 select-all break-all">
              {PORTFOLIO_DATA.profile.email}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 sm:px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isTr ? 'Kopyalandı' : 'Copied') : (isTr ? 'Kopyala' : 'Copy')}</span>
              </button>
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="px-2.5 sm:px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isTr ? 'Mail At' : 'Mailto'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <form onSubmit={handleSendDraft} className="space-y-3">
          <span className="text-xs font-mono text-slate-400 block font-semibold flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            {isTr ? 'Projeniz İçin Hızlı Mesaj Gönderin:' : 'Quick Project Message:'}
          </span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={isTr ? 'Proje Konusu (IoT Ağ Geçidi, Dağıtık Backend, PostgreSQL)...' : 'Project Topic (IoT Gateway, Backend, PostgreSQL)...'}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-emerald-500/60"
          />
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isTr ? 'Proje detaylarınız, teknik ihtiyaçlarınız ve zaman planınız...' : 'Your project scope, technical requirements, and target timeline...'}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-emerald-500/60 resize-none"
          />
          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTr ? 'Projeyi Görüşelim' : 'Discuss Project'}</span>
            </button>
          </div>
        </form>

        {/* Links Footer */}
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400">
          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span>github.com/ihtiyar07</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <span className="text-slate-400 text-[10px] sm:text-xs">
            {PORTFOLIO_DATA.profile.location}
          </span>
        </div>

      </div>
    </div>
  );
};
