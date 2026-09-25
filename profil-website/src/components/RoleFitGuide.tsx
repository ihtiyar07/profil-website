import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Layers, 
  MessageSquare 
} from 'lucide-react';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';

interface RoleFitGuideProps {
  currentLang: Language;
  onOpenContact: () => void;
}

export const RoleFitGuide: React.FC<RoleFitGuideProps> = ({ currentLang, onOpenContact }) => {
  const [selectedAreaIndex, setSelectedAreaIndex] = useState(0);
  const isTr = currentLang === 'tr';

  const areas = PORTFOLIO_DATA.projectConsultingAreas;
  const currentArea = areas[selectedAreaIndex];

  return (
    <section id="consulting" className="py-12 sm:py-16 md:py-24 border-b border-slate-800/80 bg-gradient-to-b from-[#030712] via-[#060d1b] to-[#030712] w-full">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 mb-2 sm:mb-3">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isTr ? 'Mühendislik & Mimari Çözümler' : 'Engineering & Architecture Solutions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {isTr ? 'Projeleriniz İçin Mimari Çözümler' : 'Architectural Solutions for Your Projects'}
          </h2>
          <p className="mt-1.5 sm:mt-2 text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-sans">
            {isTr
              ? 'Yüksek ölçekli dağıtık servisler, endüstriyel IoT donanımları veya kurumsal veri soykütüğü projeleriniz için uçtan uca mimari yaklaşımlar.'
              : 'Explore battle-tested architectural approaches for your high-scale distributed backends, industrial IoT edge integrations, and enterprise data platforms.'}
          </p>
        </div>

        {/* Project Area Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {areas.map((item, idx) => {
            const isSelected = selectedAreaIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedAreaIndex(idx)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/60'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.area[currentLang]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Project Solution Card */}
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 sm:p-7 lg:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Narrative (8 Cols) */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <span className="text-[10px] sm:text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {isTr ? 'ÇÖZÜM VE MİMARİ YAKLAŞIM' : 'SOLUTION & ARCHITECTURAL APPROACH'}
              </span>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-sans">
                {currentArea.area[currentLang]}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans bg-slate-900/50 p-3.5 sm:p-5 rounded-xl border border-slate-800/80">
                {currentArea.summary[currentLang]}
              </p>

              {/* Deliverables Chips */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] sm:text-xs font-mono text-slate-400 block font-semibold">
                  {isTr ? 'PROJE KAPSAMINDAKİ MİMARİ ÇIKTILAR:' : 'KEY PROJECT DELIVERABLES:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentArea.deliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-lg text-xs font-mono bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{del[currentLang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Call-To-Action Box (4 Cols) */}
            <div className="lg:col-span-4 rounded-xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-white font-sans">
                  {isTr ? 'Projenizi Konuşalım' : 'Discuss Your Project'}
                </h4>
                <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                  {isTr
                    ? 'Yeni bir sistem geliştirme, IoT donanım entegrasyonu veya altyapı ölçeklendirme projeleriniz için doğrudan iletişime geçebilirsiniz.'
                    : 'Get in touch directly to collaborate on building reliable distributed backends, IoT firmware, or optimizing infrastructure.'}
                </p>
              </div>

              <button
                onClick={onOpenContact}
                className="w-full py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isTr ? 'Projeleriniz İçin Ulaşın' : 'Contact for Projects'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
