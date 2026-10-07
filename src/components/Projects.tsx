import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA, type Language, type Project } from '../data/portfolioData';

interface ProjectsProps {
  currentLang: Language;
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ currentLang, onSelectProject }) => {
  const isTr = currentLang === 'tr';

  const projects = PORTFOLIO_DATA.projects as Project[];

  return (
    <section id="projects" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-b border-slate-200/80 dark:border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            {isTr ? 'Üretim ve Saha Sistemleri' : 'Production & Field Systems'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans pt-1">
            {isTr 
              ? 'Bizzat tasarladığım, donanım ucundan kurumsal altyapıya uzanan 5 temel mimari.'
              : '5 core architectures engineered from hardware edge to enterprise scale.'}
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 hidden sm:block">
          {projects.length} {isTr ? 'Temel Sistem Mimarisi' : 'Production Architectures'}
        </span>
      </div>

      {/* Asymmetric Bento Grid: Top 2 Flagships + Bottom 3 Core Pillars */}
      <div className="space-y-4 sm:space-y-5">
        {/* Top Row: 2 Flagships (MetaDB & Industrial IoT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {projects.slice(0, 2).map((project) => (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer space-y-4 relative overflow-hidden"
            >
              {/* Subtle accent border indicator */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    {project.category[currentLang]}
                  </span>
                  <span className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {project.title[currentLang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {project.summary[currentLang]}
                </p>
              </div>

              {/* Bottom Key Tech Tags & Trigger */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400 pt-0.5">
                  <span>{isTr ? 'Mimari Şemayı İncele →' : 'Inspect Architecture →'}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Row: 3 Core Pillars (Payment Gateway, Proxmox Homelab, Keycloak IAM) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {projects.slice(2, 5).map((project) => (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer space-y-4 relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 truncate max-w-[200px]">
                    {project.category[currentLang]}
                  </span>
                  <span className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {project.title[currentLang]}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {project.summary[currentLang]}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2.5">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span>{isTr ? 'Detayları İncele →' : 'Details →'}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
