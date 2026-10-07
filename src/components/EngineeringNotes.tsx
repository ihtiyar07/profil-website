import React from 'react';
import { ShieldCheck, Cpu, Lock, HardDrive } from 'lucide-react';
import type { Language } from '../data/portfolioData';

interface EngineeringNotesProps {
  currentLang: Language;
}

export const EngineeringNotes: React.FC<EngineeringNotesProps> = ({ currentLang }) => {
  const isTr = currentLang === 'tr';

  const principles = [
    {
      icon: ShieldCheck,
      badge: 'Zero-Impact',
      title: isTr ? 'Sıfır Kilitlenme (Zero-Lock)' : 'Zero-Lock DB Extraction',
      rule: isTr 
        ? 'Canlı multi-terabayt veri tabanlarında SELECT COUNT(*) ve tam tablo taraması kesinlikle yasaktır.' 
        : 'Full table scans and SELECT COUNT(*) are strictly prohibited on multi-terabyte production databases.',
      decision: isTr
        ? 'Doğrudan yerel katalog istatistikleri (pg_class.reltuples, Oracle NUM_ROWS) asenkron sorgulanarak %0 canlı sistem etkisi garanti edilir.'
        : 'Asynchronously query native catalog metadata (pg_class, NUM_ROWS) to guarantee zero lock overhead.'
    },
    {
      icon: Cpu,
      badge: 'Resilient Edge',
      title: isTr ? '%0 Veri Kaybı Garantisi' : 'Zero Data Loss on Hardware Edge',
      rule: isTr 
        ? 'Ağ kesintilerinde telemetri verisi kısıtlı RAM (~320KB) içinde tutulmaz.' 
        : 'Telemetry packets are never buffered in volatile RAM during network outages.',
      decision: isTr
        ? 'SPIFFS dairesel flash ring-buffer ile veriler kalıcı flaşa yazılır; hücresel hat geldiğinde MQTT ile kademeli boşaltılır.'
        : 'On-chip SPIFFS circular ring-buffer persists telemetry to flash, flushing seamlessly via MQTT upon reconnect.'
    },
    {
      icon: Lock,
      badge: 'Idempotency',
      title: isTr ? 'Idempotent Finansal Güvence' : 'Idempotent Transaction Mesh',
      rule: isTr 
        ? 'Geçici ağ gecikmelerinde istemcilerin tekrar istekleri (retries) çift tahsilat oluşturamaz.' 
        : 'Network timeouts and client retries must never trigger duplicate transactions.',
      decision: isTr
        ? 'Benzersiz Idempotency-Key hash\'leri ve Redis Redlock dağıtık kilitleriyle tekil yürütme garanti edilir.'
        : 'Unique Idempotency-Key hashing and Redis Redlock distributed locks enforce atomic single-execution.'
    },
    {
      icon: HardDrive,
      badge: 'ZFS & PBS',
      title: isTr ? 'Sessiz Veri Bozulması Koruması' : 'Silent Bit Rot Protection',
      rule: isTr 
        ? 'Fiziksel sunucularda donanımsal sessiz disk bozulmalarına (bit rot) tolerans gösterilmez.' 
        : 'Silent storage corruption (bit rot) on physical hosts must be actively detected and repaired.',
      decision: isTr
        ? 'ZFS RAID-Z periyodik scrub blok doğrulaması ve Proxmox Backup Server (PBS) tekilleştirilmiş artımlı anlık görüntüler.'
        : 'Automated ZFS RAID-Z scrub routines paired with deduplicated incremental PBS snapshot pipelines.'
    }
  ];

  return (
    <section id="principles" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-b border-slate-200/80 dark:border-white/10">
      
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
          {isTr ? 'Mimari İlkeler & Değişmezler' : 'Architectural Invariants & Trade-offs'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans pt-1">
          {isTr 
            ? 'Kod yazmadan önce belirlenen değişmez tasarım kuralları ve üretim güvenceleri.'
            : 'Immutable architectural invariants enforced across production deployments.'}
        </p>
      </div>

      {/* 2x2 Clean Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {principles.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-xs space-y-2.5 sm:space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  {item.badge}
                </span>
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans">
                {item.title}
              </h3>

              <div className="space-y-1.5 text-xs font-sans">
                <div className="text-rose-600 dark:text-rose-400 font-medium">
                  {isTr ? 'Kural: ' : 'Invariant: '}<span className="text-slate-600 dark:text-slate-300 font-normal">{item.rule}</span>
                </div>
                <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {isTr ? 'Çözüm: ' : 'Decision: '}<span className="text-slate-600 dark:text-slate-300 font-normal">{item.decision}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
