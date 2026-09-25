import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Server, 
  Database, 
  ShieldCheck, 
  ArrowDown, 
  Radio, 
  ExternalLink,
  Code2,
  HardDrive,
  Layers,
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA, type Language, type Persona } from '../data/portfolioData';

interface HeroProps {
  currentLang: Language;
  activePersona: Persona;
  onPersonaChange: (persona: Persona) => void;
  onOpenContact: () => void;
  onExploreArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  activePersona,
  onPersonaChange,
  onOpenContact,
  onExploreArchitecture
}) => {
  const isTr = currentLang === 'tr';

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#030712] via-[#070d1a] to-[#030712] w-full">
      {/* Background cyber grid & glow effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[350px] bg-emerald-500/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-4 sm:right-10 w-[200px] sm:w-[350px] h-[200px] sm:h-[300px] bg-cyan-500/10 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        
        {/* Top telemetry signal bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-slate-800/60 font-mono text-[10px] sm:text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">{PORTFOLIO_DATA.profile.statusBadge[currentLang]}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 md:gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              ESP32: <strong className="text-slate-200">ONLINE (4G/Wi-Fi)</strong>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              Microservices: <strong className="text-slate-200">READY</strong>
            </span>
            <span className="hidden lg:flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              Proxmox Cluster: <strong className="text-slate-200">HEALTHY</strong>
            </span>
          </div>
        </div>

        {/* Main Grid: Headline & Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Bio & Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Tech Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono">
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Hardware to Cloud
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                MetaDB & Lineage
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                Zero-Impact
              </span>
            </div>

            {/* Name & Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
                Ahmet <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">İhtiyar</span>
              </h1>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl font-mono text-emerald-400/90 font-medium">
                {PORTFOLIO_DATA.profile.role[currentLang]}
              </p>
            </div>

            {/* Core Bio */}
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-2xl">
              {PORTFOLIO_DATA.profile.bio[currentLang]}
            </p>

            {/* Core Metrics Quick Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 pt-1">
              <div className="p-2.5 sm:p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] sm:text-xs font-mono text-slate-400">{isTr ? 'Gömülü / IoT' : 'Embedded IoT'}</div>
                <div className="text-xs sm:text-sm md:text-base font-bold font-mono text-emerald-400 mt-0.5 truncate">ESP32 + Modbus</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono truncate">FreeRTOS & 4G</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] sm:text-xs font-mono text-slate-400">{isTr ? 'Dağıtık Servisler' : 'Distributed Core'}</div>
                <div className="text-xs sm:text-sm md:text-base font-bold font-mono text-cyan-400 mt-0.5 truncate">Java & .NET</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono truncate">Spring 3 + C# 10</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] sm:text-xs font-mono text-slate-400">{isTr ? 'Veri Soykütüğü' : 'Data Lineage'}</div>
                <div className="text-xs sm:text-sm md:text-base font-bold font-mono text-emerald-400 mt-0.5 truncate">MetaDB + Graph</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono truncate">Memgraph & PG</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] sm:text-xs font-mono text-slate-400">{isTr ? 'Altyapı & Sanallaştırma' : 'Infra & Cluster'}</div>
                <div className="text-xs sm:text-sm md:text-base font-bold font-mono text-indigo-400 mt-0.5 truncate">Proxmox + Fedora</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono truncate">KVM/LXC & ZFS</div>
              </div>
            </div>

            {/* Action Buttons (Stacked on mobile, row on tablet/desktop) */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Code2 className="w-4 h-4 shrink-0" />
                <span>{isTr ? 'Projeleriniz İçin İletişime Geçin' : 'Contact for Your Projects'}</span>
              </button>

              <div className="grid grid-cols-3 sm:flex items-center gap-2 sm:gap-3">
                <button
                  onClick={onExploreArchitecture}
                  className="px-3.5 py-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{isTr ? 'Mimari' : 'Canvas'}</span>
                  <ArrowDown className="w-3.5 h-3.5 hidden sm:inline" />
                </button>

                <a
                  href="#telemetry"
                  className="px-3.5 py-3 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 hover:bg-slate-850 hover:border-emerald-400 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                  <span className="truncate">{isTr ? 'Telemetri' : 'Telemetry'}</span>
                </a>

                <a
                  href="#terminal"
                  className="px-3.5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Terminal className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>CLI</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Portrait Frame (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px]">
              
              {/* Outer Glowing Cyber Ring */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-indigo-600 opacity-60 blur-lg animate-pulse" />
              
              {/* Card Container */}
              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-2.5 sm:p-3 shadow-2xl">
                
                {/* Top Terminal Bar */}
                <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-slate-800/80 font-mono text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-1 text-slate-300 font-semibold truncate">ahmet_ihtiyar.sys</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[9px] sm:text-[10px]">VERIFIED</span>
                </div>

                {/* User Portrait Image with scanline overlay */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-800 group">
                  <img
                    src="/profile.png"
                    alt="Ahmet İhtiyar - Systems Architecture & IoT Engineering"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover object-center filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    fetchPriority="high"
                  />
                  
                  {/* Subtle Tech Scanline & Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Holographic Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 p-2 sm:p-2.5 rounded-lg backdrop-blur-md bg-slate-950/85 border border-emerald-500/40 text-[10px] sm:text-[11px] font-mono shadow-lg">
                    <div className="flex items-center justify-between text-slate-200">
                      <span className="text-emerald-400 font-bold flex items-center gap-1 truncate">
                        <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        ESP32 / Modbus
                      </span>
                      <span className="text-cyan-400 font-bold truncate">Spring Boot 3</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                      <span className="truncate">Proxmox Cluster</span>
                      <span className="text-emerald-400 shrink-0">Zero-Lock</span>
                    </div>
                  </div>

                  {/* Corner Tech Markers */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-2 px-1.5 sm:px-2 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-slate-400">
                  <span className="truncate">UUID: 8b4e72a-core</span>
                  <a
                    href={PORTFOLIO_DATA.profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>github.com/ihtiyar07</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Responsive Focus Area Filter Box */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-2.5 sm:space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>{isTr ? 'Proje & Çözüm Odak Alanını Seçin:' : 'Select Solution Focus Area:'}</span>
            </div>
            {activePersona !== 'all' && (
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {isTr ? 'İlgili mimariler önceliklendirildi' : 'Highlighting relevant solutions'}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            {PORTFOLIO_DATA.personas.map((persona) => {
              const isActive = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => onPersonaChange(persona.id as Persona)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-[0_0_15px_-3px_rgba(16,185,129,0.35)]'
                      : 'bg-slate-950/70 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span>{persona.label[currentLang]}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
