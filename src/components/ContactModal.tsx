import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Send
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
      subject || (isTr ? 'Sistem Mimarisi / Proje Danışmanlığı' : 'Systems Architecture & Advisory Inquiry')
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium block mb-1">
            {isTr ? 'MİMARİ & PROJE İLETİŞİMİ' : 'DIRECT ENGINEERING CONTACT'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-sans">
            Ahmet İhtiyar
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            {PORTFOLIO_DATA.profile.role[currentLang]}
          </p>
        </div>

        {/* Direct Email Card with 1-Click Copy */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 space-y-2 font-mono">
          <span className="text-[10px] text-slate-400 dark:text-slate-400 block uppercase font-medium">
            {isTr ? 'DOĞRUDAN E-POSTA ADRESİ:' : 'DIRECT EMAIL ADDRESS:'}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white dark:bg-[#161a28] p-3 rounded-lg border border-slate-200 dark:border-white/5">
            <span className="text-xs sm:text-sm font-semibold select-all break-all text-slate-900 dark:text-white">
              {PORTFOLIO_DATA.profile.email}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isTr ? 'Kopyalandı' : 'Copied') : (isTr ? 'Kopyala' : 'Copy')}</span>
              </button>
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isTr ? 'Mail Gönder' : 'Mailto'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <form onSubmit={handleSendDraft} className="space-y-3">
          <span className="text-xs font-mono text-slate-600 dark:text-slate-300 block font-medium">
            {isTr ? 'Proje Konusu ve Detayları:' : 'Project Scope & Details:'}
          </span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={isTr ? 'Konu (Dağıtık Backend, Modbus IoT, MetaDB)...' : 'Subject (Distributed Backend, Modbus IoT, MetaDB)...'}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#161a28] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isTr ? 'Proje kapsamı, teknik hedefler ve zaman planı...' : 'Project scope, technical targets, and timeline...'}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#161a28] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
          />
          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTr ? 'Mesaj Gönder' : 'Send Message'}</span>
            </button>
          </div>
        </form>

        {/* Links Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
            <span>github.com/ihtiyar07</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <span className="text-slate-400 text-[11px]">
            {PORTFOLIO_DATA.profile.location}
          </span>
        </div>

      </div>
    </div>
  );
};
