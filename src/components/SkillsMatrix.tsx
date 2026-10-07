import React from 'react';
import type { Language } from '../data/portfolioData';

interface SkillsMatrixProps {
  currentLang: Language;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ currentLang }) => {
  const isTr = currentLang === 'tr';

  const groups = [
    {
      title: isTr ? 'Backend & Dağıtık Servisler' : 'Backend & Distributed Core',
      tags: ['Java 21', 'Spring Boot 3', 'Spring WebFlux', 'C# .NET 10', 'Python (FastAPI)', 'C/C++', 'TypeScript']
    },
    {
      title: isTr ? 'Donanım & Endüstriyel IoT' : 'Hardware Edge & IoT',
      tags: ['ESP32 Firmware', 'FreeRTOS', 'Modbus RTU (RS-485)', 'Modbus TCP', 'MQTT/TLS', 'GSM 4G Cat-M1']
    },
    {
      title: isTr ? 'Veri Tabanları & Soykütüğü' : 'Databases & Graph Lineage',
      tags: ['PostgreSQL (GLB)', 'Memgraph (Bolt / Cypher)', 'TimescaleDB', 'Redis (Redlock)', 'Oracle ODI']
    },
    {
      title: isTr ? 'Altyapı & Sanallaştırma' : 'Infra & Virtualization',
      tags: ['Proxmox VE 8', 'Fedora Linux', 'Docker Compose', 'ZFS Storage', 'PBS Backups', 'Keycloak IAM', 'RabbitMQ']
    }
  ];

  return (
    <section id="stack" className="w-full max-w-5xl mx-auto px-6 py-14 border-b border-slate-200/80 dark:border-white/10">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
          {isTr ? 'Teknoloji Yığını & Araçlar' : 'Tech Stack & Production Tools'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans pt-1">
          {isTr 
            ? 'Üretimde ve sahada aktif olarak kullandığım diller, veritabanları ve altyapı araçları.'
            : 'Core technologies, platforms, and languages actively deployed in production.'}
        </p>
      </div>

      {/* 4 Clean Badge Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {groups.map((group, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-xs space-y-3"
          >
            <h3 className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {group.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-white/10 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
