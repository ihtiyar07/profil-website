import React from 'react';
import { X, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Language, Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  currentLang: Language;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  currentLang,
}) => {
  if (!project) return null;
  const isTr = currentLang === 'tr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-8">
          <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
            {project.category[currentLang]}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight">
            {project.title[currentLang]}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans pt-1 leading-relaxed">
            {project.summary[currentLang]}
          </p>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 dark:border-white/5">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 font-mono">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
                {metric.label[currentLang]}
              </span>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block truncate mt-0.5">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        {/* Problem & Architectural Solution */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isTr ? 'Mühendislik Kararları & Tasarım Prensibi' : 'Engineering Decisions & Principles'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200/60 dark:border-white/5">
            {project.description[currentLang]}
          </p>
        </div>

        {/* Architecture Components */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isTr ? 'Bileşenler & Mimari Yığın' : 'Component Blueprint & Stack'}</span>
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 font-mono text-xs text-slate-700 dark:text-slate-200">
            {project.architecture[currentLang]}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};
