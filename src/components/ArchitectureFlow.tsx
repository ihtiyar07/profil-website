import React, { useState } from 'react';
import { Cpu, Radio, Server, Database, HardDrive, Terminal } from 'lucide-react';
import type { Language } from '../data/portfolioData';

interface ArchitectureFlowProps {
  currentLang: Language;
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ currentLang }) => {
  const isTr = currentLang === 'tr';
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: '01',
      icon: Cpu,
      title: isTr ? 'Saha Donanımı' : 'Edge Hardware',
      subtitle: 'ESP32 • Modbus RTU',
      desc: isTr ? 'RS-485 üzerinden telemetri okuma, SPIFFS ring-buffer ile %0 veri kaybı.' : 'RS-485 polling, SPIFFS ring-buffer for 0% data loss.',
      inspector: {
        label: isTr ? 'Donanım Veri Çerçevesi (RS-485 Modbus RTU)' : 'Hardware Telemetry Frame (RS-485 Modbus RTU)',
        spec: 'Baud: 115200 bps • Parity: None • Data Bits: 8 • Stop Bits: 1 • Timeout: 150ms',
        code: `// ESP32 FreeRTOS - Modbus RTU Polling Task
uint8_t request[] = { 0x01, 0x03, 0x9C, 0x40, 0x00, 0x0A, 0xC5, 0xCD }; // Read Holding Regs
esp_err_t err = uart_write_bytes(UART_NUM_2, (const char*)request, sizeof(request));
// Response buffered to local SPIFFS ring-buffer if cellular network is offline`
      }
    },
    {
      num: '02',
      icon: Radio,
      title: isTr ? 'Hücresel İletişim' : 'Cellular Transport',
      subtitle: 'GSM 4G • MQTT/TLS',
      desc: isTr ? 'Otomatik hücresel failover ve TLS korumalı MQTT kuyruk boru hattı.' : 'Automatic cellular failover and TLS-secured MQTT pipeline.',
      inspector: {
        label: isTr ? 'Hücresel Telemetri Paketi (MQTT over TLS)' : 'Cellular Telemetry Packet (MQTT over TLS)',
        spec: 'Broker: emqx-cluster • Protocol: MQTT v3.1.1 / TLS 1.3 • QoS: 1 (At least once)',
        code: `TOPIC: telemetry/industrial/chiller-04/metrics
PAYLOAD: {
  "timestamp": 1791398400,
  "device_id": "esp32-chiller-04",
  "temperature_c": -19.45,
  "evap_pressure_bar": 3.82,
  "discharge_pressure_bar": 16.20,
  "compressor_hz": 52.0,
  "failover_link": "4G_LTE_CAT_M1"
}`
      }
    },
    {
      num: '03',
      icon: Server,
      title: isTr ? 'Dağıtık Servisler' : 'Distributed Core',
      subtitle: 'Spring Boot 3 • .NET 10',
      desc: isTr ? 'Java 21 mikroservisleri, Idempotent ödeme rotalama ve Redis Redlock.' : 'Java 21 microservices, idempotent routing, and Redis Redlock.',
      inspector: {
        label: isTr ? 'Idempotent Dağıtık Kilit & İşlem (Java Spring Boot 3)' : 'Idempotent Distributed Locking (Spring Boot 3)',
        spec: 'Runtime: OpenJDK 21 • Lock: Redis Redlock (TTL: 5000ms) • Message: RabbitMQ AMQP',
        code: `@Transactional
public PaymentResponse processTransaction(PaymentRequest request) {
    RLock lock = redissonClient.getLock("payment:idempotency:" + request.getIdempotencyKey());
    if (!lock.tryLock(500, 5000, TimeUnit.MILLISECONDS)) {
        throw new DuplicateTransactionException("Concurrent execution blocked");
    }
    return transactionRouter.dispatch(request);
}`
      }
    },
    {
      num: '04',
      icon: Database,
      title: isTr ? 'Veri Soykütüğü' : 'Data Lineage',
      subtitle: 'MetaDB • Memgraph Graph',
      desc: isTr ? 'Sıfır kilitlenme (Zero-Impact) ile katalog çıkarma ve Cypher grafikleri.' : 'Zero-Lock catalog extraction and Cypher lineage traversal.',
      inspector: {
        label: isTr ? 'Zero-Lock Katalog Sorgusu & Soykütüğü (PostgreSQL / Cypher)' : 'Zero-Lock Catalog Query & Lineage (PostgreSQL / Cypher)',
        spec: 'Target DB Impact: 0% (pg_class statistics only) • Graph Protocol: Bolt v4.4 • DB: Memgraph',
        code: `-- Zero-Impact Extraction: Never issue SELECT COUNT(*) on 100M+ row production tables
SELECT reltuples::bigint AS estimated_rows FROM pg_class WHERE relname = 'orders';

// Memgraph Cypher Lineage Projection:
MATCH (src:SourceTable {name: "orders"})-[r:TRANSFORMS_TO]->(target:DataMart {name: "dm_finance"})
RETURN src, r, target;`
      }
    },
    {
      num: '05',
      icon: HardDrive,
      title: isTr ? 'Sanallaştırma' : 'Infrastructure',
      subtitle: 'Proxmox VE • ZFS • PBS',
      desc: isTr ? 'KVM/LXC kümeleri, ZFS depolama havuzları ve PBS otomatik artımlı yedekler.' : 'KVM/LXC virtualization, ZFS pools, and automated PBS backups.',
      inspector: {
        label: isTr ? 'ZFS Havuzu & Proxmox Backup Server (PBS) Snapshot' : 'ZFS Storage Pool & PBS Automated Incremental Backup',
        spec: 'Hypervisor: Proxmox VE 8.2 • Pool: ZFS RAID-Z1 • Dedup Ratio: 3.48x • Backup: PBS QEMU Dirty-Bitmap',
        code: `# Proxmox Host Storage & Backup Routine
zpool status rpool -v
proxmox-backup-client backup root.pxar:/ --repository backup-user@pbs:storage-zfs
# Automated scrub: Bi-weekly checksum self-healing on physical SAS/NVMe drives`
      }
    }
  ];

  return (
    <section id="architecture" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-b border-slate-200/80 dark:border-white/10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            {isTr ? 'Sistem Mimarisi: Donanımdan Buluta' : 'Architecture Pipeline: Edge to Cloud'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans pt-1">
            {isTr 
              ? 'Fiziksel sensörlerden kurumsal grafik veritabanına ve hipervizöre uzanan 5 adımlı veri hattı.'
              : 'End-to-end data pipeline from physical sensors to enterprise graph databases and hypervisors.'}
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
          {isTr ? 'İncelemek için adıma tıklayın' : 'Click stage to inspect protocol'}
        </span>
      </div>

      {/* Visual Pipeline Grid (5 interactive steps) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStage === idx;

          return (
            <button
              type="button" 
              key={stage.num}
              onClick={() => setActiveStage(idx)}
              className={`p-3.5 sm:p-4 rounded-xl text-left transition-all relative flex flex-col justify-between space-y-2.5 sm:space-y-3 cursor-pointer ${
                isSelected 
                  ? 'bg-white dark:bg-[#141824] border-2 border-emerald-500 shadow-md ring-1 ring-emerald-500/20' 
                  : 'bg-white/80 dark:bg-[#121520] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="space-y-1.5 sm:space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-semibold ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {stage.num}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400'}`}>
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

              {isSelected && (
                <div className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                  ● {isTr ? 'SEÇİLİ ADIM' : 'ACTIVE INSPECTOR'}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Protocol & Payload Inspector Drawer */}
      <div className="mt-4 sm:mt-5 rounded-2xl bg-[#0e111a] border border-slate-800 text-slate-200 p-3.5 sm:p-5 font-mono text-xs shadow-xl space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 pb-2.5 sm:pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold text-white tracking-wide">
              {stages[activeStage].inspector.label}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 break-words">
            {stages[activeStage].inspector.spec}
          </span>
        </div>

        <pre className="overflow-x-auto text-emerald-300/90 text-[10px] sm:text-xs leading-relaxed p-2 sm:p-3 rounded bg-black/40">
          <code>{stages[activeStage].inspector.code}</code>
        </pre>
      </div>

    </section>
  );
};
