import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Database, 
  HardDrive, 
  ShieldCheck, 
  Search, 
  Sparkles 
} from 'lucide-react';
import { PORTFOLIO_DATA, type Language } from '../data/portfolioData';

interface SkillsMatrixProps {
  currentLang: Language;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ currentLang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const isTr = currentLang === 'tr';

  const getIcon = (name: string) => {
    switch (name) {
      case 'Server': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Database': return <Database className="w-4 h-4 text-pink-400" />;
      case 'HardDrive': return <HardDrive className="w-4 h-4 text-indigo-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      default: return <Server className="w-4 h-4 text-emerald-400" />;
    }
  };

  const filteredGroups = PORTFOLIO_DATA.skillGroups
    .filter(group => selectedGroup === 'all' || group.id === selectedGroup)
    .map(group => {
      const items = group.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.detail[currentLang].toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...group, items };
    })
    .filter(group => group.items.length > 0);

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-24 border-b border-slate-800/80 bg-gradient-to-b from-[#030712] via-[#050b16] to-[#030712] w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isTr ? 'Teknik Yetkinlikler & Standartlar' : 'Technical Competencies'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {isTr ? 'Yetkinlik Radarı & Teknoloji Yığını' : 'Skills Radar & Tech Stack Matrix'}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl font-sans">
              {isTr
                ? 'Sadece teorik bilgi değil; üretim ve saha koşullarında doğrulanmış derinlemesine uzmanlık alanları.'
                : 'Validated in live production and industrial deployments across edge firmware, high-scale microservices, and infrastructure.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTr ? 'Teknoloji ara (Modbus, Java, ZFS)...' : 'Search tech (Modbus, Java, ZFS)...'}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
          </div>
        </div>

        {/* Group Selector Filter */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={() => setSelectedGroup('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedGroup === 'all'
                ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {isTr ? 'Tüm Katmanlar' : 'All Layers'}
          </button>
          {PORTFOLIO_DATA.skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedGroup === group.id
                  ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {getIcon(group.iconName)}
              <span>{group.name[currentLang]}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-xl space-y-4 sm:space-y-5"
            >
              {/* Group Title */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getIcon(group.iconName)}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                    {group.name[currentLang]}
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400">
                  {group.items.length} {isTr ? 'teknoloji' : 'items'}
                </span>
              </div>

              {/* Items in this group */}
              <div className="space-y-3.5 sm:space-y-4">
                {group.items.map((item) => (
                  <div key={item.name} className="space-y-1 sm:space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className={`font-semibold ${item.highlight ? 'text-emerald-300' : 'text-slate-200'}`}>
                          {item.name}
                        </span>
                        {item.highlight && (
                          <span className="px-1 sm:px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                            CORE
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 text-[10px] sm:text-[11px] shrink-0">
                        {item.experience} ({item.level}%)
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.highlight
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-slate-500 to-slate-400'
                        }`}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>

                    {/* Detail subtitle */}
                    <p className="text-[10px] sm:text-[11px] text-slate-400 font-sans leading-tight">
                      {item.detail[currentLang]}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
