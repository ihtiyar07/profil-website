import React from 'react';
import { ArrowRight, Cpu, Radio, Server, Database, HardDrive } from 'lucide-react';
import type { Language } from '../data/portfolioData';

interface ArchitectureFlowProps {
  currentLang: Language;
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ currentLang }) => {
  const isTr = currentLang === 'tr';

  const stages = [
    {
      num: '01',
      icon: Cpu,
      title: isTr ? 'Saha Donanımı' : 'Edge Hardware',
      subtitle: 'ESP32 • Modbus RTU',
      desc: isTr ? 'RS-485 üzerinden telemetri okuma, SPIFFS ring-buffer ile %0 veri kaybı.' : 'RS-485 polling, SPIFFS ring-buffer for 0% data loss.'
    },
    {
      num: '02',
      icon: Radio,
      title: isTr ? 'Hücresel İletişim' : 'Cellular Transport',
      subtitle: 'GSM 4G • MQTT/TLS',
      desc: isTr ? 'Otomatik hücresel failover ve TLS korumalı MQTT kuyruk boru hattı.' : 'Automatic cellular failover and TLS-secured MQTT pipeline.'
    },
    {
      num: '03',
      icon: Server,
      title: isTr ? 'Dağıtık Servisler' : 'Distributed Core',
      subtitle: 'Spring Boot 3 • .NET 10',
      desc: isTr ? 'Java 21 mikroservisleri, Idempotent ödeme rotalama ve Redis Redlock.' : 'Java 21 microservices, idempotent routing, and Redis Redlock.'
    },
    {
      num: '04',
      icon: Database,
      title: isTr ? 'Veri Soykütüğü' : 'Data Lineage',
      subtitle: 'MetaDB • Memgraph Graph',
      desc: isTr ? 'Sıfır kilitlenme (Zero-Impact) ile katalog çıkarma ve Cypher grafikleri.' : 'Zero-Lock catalog extraction and Cypher lineage traversal.'
    },
    {
      num: '05',
      icon: HardDrive,
      title: isTr ? 'Sanallaştırma' : 'Infrastructure',
      subtitle: 'Proxmox VE • ZFS • PBS',
      desc: isTr ? 'KVM/LXC kümeleri, ZFS depolama havuzları ve PBS otomatik artımlı yedekler.' : 'KVM/LXC virtualization, ZFS pools, and automated PBS backups.'
    }
  ];

  return (
    <section id="architecture" className="w-full max-w-5xl mx-auto px-6 py-14 border-b border-slate-200/80 dark:border-white/10">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
          {isTr ? 'Sistem Mimarisi: Donanımdan Buluta' : 'Architecture Pipeline: Edge to Cloud'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans pt-1">
          {isTr 
            ? 'Fiziksel sensörlerden kurumsal grafik veritabanına ve hipervizöre uzanan veri akışı.'
            : 'Data flow pipeline from physical sensors to enterprise graph databases and hypervisors.'}
        </p>
      </div>

      {/* Visual Pipeline Grid (5 compact steps) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div 
              key={stage.num}
              className="p-4 rounded-xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3 relative"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {stage.num}
                  </span>
                  <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                    {stage.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 block mt-0.5">
                    {stage.subtitle}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed pt-1">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
