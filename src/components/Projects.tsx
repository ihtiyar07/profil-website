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
    <section id="projects" className="w-full max-w-5xl mx-auto px-6 py-14 border-b border-slate-200/80 dark:border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            {isTr ? 'Öne Çıkan Sistemler' : 'Flagship Production Systems'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans pt-1">
            {isTr 
              ? 'Bizzat tasarladığım ve sahada/üretimde çalışan uçtan uca mimariler.'
              : 'End-to-end production systems engineered from hardware edge to enterprise scale.'}
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 hidden sm:block">
          4 {isTr ? 'Temel Sistem' : 'Core Architectures'}
        </span>
      </div>

      {/* Bento Grid: 2x2 Clean Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.slice(0, 4).map((project) => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group p-6 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer space-y-4"
          >
            {/* Top Category & Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  {project.category[currentLang]}
                </span>
                <span className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                {project.title[currentLang]}
              </h3>

              {/* Punchy 2-line summary - NO wall of text */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3">
                {project.summary[currentLang]}
              </p>
            </div>

            {/* Bottom Key Tech Tags & Trigger */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-emerald-600 dark:text-emerald-400 pt-0.5">
                <span>{isTr ? 'Mimari Detayları İncele →' : 'Inspect Architecture →'}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
