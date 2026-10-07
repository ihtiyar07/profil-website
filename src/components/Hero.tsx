import React from 'react';
import { 
  Mail, 
  MapPin, 
  ArrowDown,
  ArrowUpRight
} from 'lucide-react';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';
import { LinkedinIcon } from './LinkedinIcon';

interface HeroProps {
  currentLang: Language;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenContact
}) => {
  const isTr = currentLang === 'tr';

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-16 sm:pb-20">
      
      {/* Top Split: Narrative + Photo Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pb-8 sm:pb-10 border-b border-slate-200/80 dark:border-white/10">
        
        {/* Left: Punchy Headline & Intro (8 cols) */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-5">
          
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isTr ? 'Aktif: Yeni Projeler & Mimari Danışmanlık' : 'Available for Systems & Architecture Advisory'}</span>
          </div>

          {/* Big Headline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans leading-[1.2] sm:leading-[1.15]">
              {isTr 
                ? 'Donanım ucundan bulut ölçeğindeki dağıtık sistemlere.' 
                : 'From hardware edge to cloud-scale distributed systems.'}
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-2xl pt-1">
              {isTr
                ? 'ESP32 ve Modbus telemetrisinden (4G LTE), multi-terabayt kurumsal veri soykütüğüne (MetaDB, Memgraph) ve dağıtık mikroservislere (Spring Boot, .NET) uzanan uçtan uca mühendislik.'
                : 'Full-spectrum systems engineering bridging edge telemetry (ESP32, Modbus, 4G LTE) to multi-terabyte data lineage (MetaDB, Memgraph) and distributed microservices.'}
            </p>
          </div>

          {/* 3 Quick Technical Highlights */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 font-mono text-[11px] sm:text-xs">
            <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
              ⚡ {isTr ? '%0 Veri Kaybı (Flash Buffer)' : '0% Data Loss (Flash Buffer)'}
            </span>
            <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
              🛡️ {isTr ? 'Zero-Lock DB Lineage (MetaDB)' : 'Zero-Lock DB Lineage'}
            </span>
            <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
              🔒 {isTr ? 'Idempotent Ödeme Motoru' : 'Idempotent Payment Mesh'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
            <a
              href="#projects"
              className="px-3.5 sm:px-4 py-2 rounded-lg bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>{isTr ? 'Projeleri İncele' : 'Explore Projects'}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenContact}
              className="px-3.5 sm:px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-white/10"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isTr ? 'İletişime Geç' : 'Contact Me'}</span>
            </button>

            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 sm:px-3 py-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {PORTFOLIO_DATA.profile.linkedin && (
              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 sm:px-3 py-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

        {/* Right: Modern Portrait Card (4 cols) */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-lg max-w-[220px] sm:max-w-[260px] w-full space-y-2.5 sm:space-y-3">
            <div className="rounded-xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5">
              <img
                src="/profile.png"
                alt="Ahmet İhtiyar"
                width={260}
                height={260}
                className="w-full h-full object-cover object-center filter contrast-[1.02]"
                loading="eager"
              />
            </div>
            <div className="px-1 text-xs space-y-0.5">
              <div className="font-semibold text-slate-900 dark:text-white">Ahmet İhtiyar</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] font-mono flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">İstanbul, TR • Remote</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Live Industrial & Systems Telemetry Strip */}
      <div className="mt-6 sm:mt-8 p-3 sm:p-3.5 rounded-xl bg-white/60 dark:bg-[#121520]/70 backdrop-blur-xs border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono">
        <div className="flex items-center flex-wrap gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-900 dark:text-slate-200 font-semibold tracking-wider text-[11px]">
            {isTr ? 'SİSTEM DURUMU: AKTİF' : 'STATUS: OPERATIONAL'}
          </span>
          <span className="text-slate-300 dark:text-white/15">•</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">NODE: PVE-01</span>
        </div>

        <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-[11px] text-slate-600 dark:text-slate-400">
          <span><span className="text-slate-400 dark:text-slate-500">HA:</span> 99.98%</span>
          <span className="text-slate-300 dark:text-white/15">•</span>
          <span><span className="text-slate-400 dark:text-slate-500">INVARIANT:</span> ZERO-LOCK</span>
          <span className="hidden sm:inline text-slate-300 dark:text-white/15">•</span>
          <span className="hidden sm:inline"><span className="text-slate-400 dark:text-slate-500">BUS:</span> MODBUS RS-485</span>
        </div>
      </div>

    </section>
  );
};
