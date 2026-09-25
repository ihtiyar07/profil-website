import React, { useState } from 'react';
import { 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  CheckCircle2,
  GitBranch
} from 'lucide-react';
import { PORTFOLIO_DATA, type Language, type Persona, type Project } from '../data/portfolioData';

interface ProjectsProps {
  currentLang: Language;
  activePersona: Persona;
  onSelectPersona: (persona: Persona) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  currentLang,
  activePersona,
  onSelectPersona,
}) => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('metadb');
  const isTr = currentLang === 'tr';

  const filteredProjects: Project[] = (PORTFOLIO_DATA.projects as Project[]).filter((project: Project) => {
    if (activePersona === 'all') return true;
    return project.personas.includes(activePersona);
  });

  const toggleExpand = (id: string) => {
    setExpandedProjectId(prev => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 border-b border-slate-800/80 bg-[#030712] relative w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 mb-2 sm:mb-3">
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isTr ? 'Üretim Düzeyinde Sistemler' : 'Production-Grade Systems'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {isTr ? 'Öne Çıkan Sistem Mimarileri' : 'Architectural Systems & Case Studies'}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl font-sans">
              {isTr
                ? 'Donanım telemetrisinden dağıtık mikroservislere, kurumsal soykütüğü motorundan hipervizör altyapısına kadar uçtan uca tasarlanan projeler.'
                : 'Deep-dive into production systems spanning edge hardware firmware, distributed microservices, enterprise lineage graph databases, and virtualization.'}
            </p>
          </div>

          {/* Persona Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs">
            {PORTFOLIO_DATA.personas.map((persona) => {
              const isActive = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => onSelectPersona(persona.id as Persona)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_-2px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {persona.label[currentLang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-4 sm:space-y-6">
          {filteredProjects.map((project: Project) => {
            const isExpanded = expandedProjectId === project.id;

            return (
              <div
                key={project.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  project.featured
                    ? 'bg-slate-900/60 border-slate-700/80 shadow-2xl hover:border-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Main Card Header */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        <span className="text-emerald-400 font-semibold tracking-wide text-[11px] sm:text-xs">
                          {project.category[currentLang]}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            FEATURED
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight font-sans leading-snug">
                        {project.title[currentLang]}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans pt-1">
                        {project.summary[currentLang]}
                      </p>
                    </div>

                    {/* Expand Toggle Button */}
                    <div className="shrink-0 pt-1 lg:pt-0">
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="w-full sm:w-auto px-3.5 sm:px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500/50 font-mono text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <span>{isExpanded ? (isTr ? 'Gizle' : 'Collapse') : (isTr ? 'Mimariyi İncele' : 'Inspect Specs')}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>
                    </div>

                  </div>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-800/80">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="p-2.5 sm:p-3 rounded-lg bg-slate-950/80 border border-slate-850 font-mono">
                        <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                          {metric.label[currentLang]}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-100 mt-0.5 truncate text-emerald-400">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-mono bg-slate-800/80 border border-slate-700/60 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Architectural Deep-Dive Drawer */}
                {isExpanded && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 pt-2 sm:pt-4 bg-slate-950/90 border-t border-slate-800/80 space-y-4 sm:space-y-5 animate-in fade-in duration-200">
                    
                    {/* Deep-Dive Narrative */}
                    <div>
                      <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isTr ? 'Mühendislik Kararları & Tasarım Prensibi' : 'Engineering Decisions & Principles'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-3.5 sm:p-4 rounded-xl border border-slate-800">
                        {project.description[currentLang]}
                      </p>
                    </div>

                    {/* Architecture & Tech Blueprint */}
                    <div>
                      <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        {isTr ? 'Bileşenler ve Mimari Yapı' : 'Component Blueprint & Protocols'}
                      </h4>
                      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] sm:text-xs text-slate-200 space-y-1">
                        <span className="text-slate-400 text-[10px] block mb-1">COMPONENTS:</span>
                        {project.architecture[currentLang]}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
