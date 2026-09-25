import { PORTFOLIO_DATA } from './portfolioData';

export interface CommandOutput {
  type: 'text' | 'table' | 'json' | 'error' | 'success';
  content: string | string[];
}

export const executeTerminalCommand = (
  rawInput: string,
  lang: 'tr' | 'en'
): CommandOutput => {
  const input = rawInput.trim();
  const [cmd] = input.split(' ');
  const command = cmd.toLowerCase();

  switch (command) {
    case 'help':
      return {
        type: 'text',
        content: [
          lang === 'tr' ? '=== AHMET İHTİYAR // SİSTEM KONSOLU KOMUTLARI ===' : '=== AHMET İHTİYAR // SYSTEMS CONSOLE COMMANDS ===',
          '  help            - ' + (lang === 'tr' ? 'Kullanılabilir komutların listesi' : 'List available commands'),
          '  bio / about     - ' + (lang === 'tr' ? 'Mühendislik felsefesi ve profil özeti' : 'Engineering philosophy & summary'),
          '  skills          - ' + (lang === 'tr' ? 'Tüm teknik yetkinlikler ve seviyeler' : 'Technical competencies & proficiencies'),
          '  projects        - ' + (lang === 'tr' ? 'MetaDB, IoT, Ödeme ve Altyapı projeleri' : 'MetaDB, IoT, Payment and Infra projects'),
          '  telemetry       - ' + (lang === 'tr' ? 'ESP32 / Modbus canlı telemetri çıktısı' : 'ESP32 / Modbus live telemetry snapshot'),
          '  infra / status  - ' + (lang === 'tr' ? 'Proxmox kümesi ve servis durumları' : 'Proxmox cluster & service health status'),
          '  contact         - ' + (lang === 'tr' ? 'E-posta ve sosyal iletişim kanalları' : 'Email and social contact channels'),
          '  whoami          - ' + (lang === 'tr' ? 'Mevcut oturum kimliği' : 'Current terminal session identity'),
          '  clear           - ' + (lang === 'tr' ? 'Ekranı temizle' : 'Clear terminal output')
        ]
      };

    case 'bio':
    case 'about':
      return {
        type: 'text',
        content: [
          `[USER]: ${PORTFOLIO_DATA.profile.name}`,
          `[TITLE]: ${PORTFOLIO_DATA.profile.role[lang]}`,
          `[LOCATION]: ${PORTFOLIO_DATA.profile.location}`,
          `[PHILOSOPHY]:`,
          `  ${PORTFOLIO_DATA.profile.bio[lang]}`,
          '',
          lang === 'tr' 
            ? '  "Donanım sinyalinden bulut soykütüğüne (lineage) kadar uzanan sistemlerin her katmanını bilmek, sorunları kaynağında çözmeyi sağlar."'
            : '  "Mastering every tier from raw hardware signals to enterprise data lineage empowers root-cause solutions without guesswork."'
        ]
      };

    case 'skills':
      return {
        type: 'text',
        content: PORTFOLIO_DATA.skillGroups.flatMap(group => [
          `\n--- [ ${group.name[lang].toUpperCase()} ] ---`,
          ...group.items.map(item => `  • ${item.name.padEnd(38, ' ')} [${'#'.repeat(Math.round(item.level / 10)).padEnd(10, '-')}] ${item.level}% (${item.experience})`)
        ])
      };

    case 'projects':
      return {
        type: 'text',
        content: [
          lang === 'tr' ? '=== ÖNE ÇIKAN SİSTEM VE MİMARİ PROJELERİ ===' : '=== FEATURED ARCHITECTURAL SYSTEMS ===',
          ...PORTFOLIO_DATA.projects.map((p, idx) => 
            `\n[${idx + 1}] ${p.title[lang]}\n    Kategori: ${p.category[lang]}\n    Özet: ${p.summary[lang]}\n    Teknolojiler: ${p.tags.join(', ')}`
          )
        ]
      };

    case 'telemetry':
      return {
        type: 'text',
        content: [
          '=== [ESP32 INDUSTRIAL TELEMETRY STREAM] ===',
          `NODE: ESP32-WROOM-32U | MAC: 24:6F:28:B4:72:0A | IP: 192.168.10.45`,
          `UPTIME: 148 days, 12h 44m | RTOS: FreeRTOS v10.4.3 | HEAP: 184.2 KB free`,
          `MODBUS BUS: RS-485 (9600-8-N-1) | ACTIVE COILS: 16 | SLAVE_ID: 0x01`,
          `----------------------------------------------------------------------`,
          `REGISTER 30001 (Chiller Evaporator Temp):  +3.8 °C [STABLE]`,
          `REGISTER 30002 (Compressor Disch. Temp):  +68.4 °C [NORMAL]`,
          `REGISTER 30003 (Suction Pressure):        4.24 bar [OPTIMAL]`,
          `REGISTER 30004 (Discharge Pressure):      15.12 bar [OPTIMAL]`,
          `REGISTER 30005 (Inverter Frequency):      48.5 Hz`,
          `GSM MODEM: Quectel EC25-E (4G LTE) | CSQ: 28 (-61 dBm) [EXCELLENT]`,
          `MQTT STATUS: CONNECTED (tls://broker.systems:8883) | QoS: 1 | BUFFER: 0 dropped`,
          `LAST DISPATCH: 140ms ago -> topic: telemetry/coldchain/node-01`
        ]
      };

    case 'infra':
    case 'status':
      return {
        type: 'text',
        content: [
          '=== [PROXMOX VE HYPERVISOR & SYSTEM METRICS] ===',
          'NODE: pve-node-01 (Fedora / Debian Kernel 6.8+)',
          'CPU USAGE: 18.4% [16 Cores AMD Ryzen] | LOAD: 1.42, 1.28, 1.15',
          'RAM ALLOCATION: 42.8 GB / 64.0 GB (ZFS ARC cache: 16 GB)',
          'STORAGE: zfs-pool01 (RAID-Z2) - 8.4 TB / 14 TB (Health: ONLINE)',
          '----------------------------------------------------------------------',
          'VIRTUAL GUESTS:',
          '  [VM 101] fedora-systems-core  : RUNNING (4 vCPU, 8GB RAM, Docker daemon)',
          '  [VM 102] metadb-cluster-prod  : RUNNING (6 vCPU, 16GB RAM, Memgraph+PG)',
          '  [LXC 201] rabbitmq-broker     : RUNNING (2 vCPU, 4GB RAM, AMQP 5672)',
          '  [LXC 202] keycloak-iam-sso    : RUNNING (2 vCPU, 4GB RAM, Port 8080)',
          '  [LXC 203] pbs-backup-server   : RUNNING (Daily Snapshot Automation)',
          'DATABASE GUARDRAIL: Zero-Lock Active (Source DB scan throttle enabled)'
        ]
      };

    case 'contact':
      return {
        type: 'text',
        content: [
          '=== İLETİŞİM / CONTACT CHANNELS ===',
          `  Email   : ${PORTFOLIO_DATA.profile.email}`,
          `  GitHub  : ${PORTFOLIO_DATA.profile.github}`,
          `  LinkedIn: https://linkedin.com/in/ahmet-ihtiyar`,
          `  Status  : ${PORTFOLIO_DATA.profile.statusBadge[lang]}`,
          '',
          lang === 'tr' 
            ? '  Teknik mülakatlar, sistem mimarisi danışmanlığı veya rol teklifleri için iletişime geçebilirsiniz.' 
            : '  Available for technical interviews, systems architecture consults, and senior roles.'
        ]
      };

    case 'whoami':
      return {
        type: 'text',
        content: [
          'guest@systems-guest-terminal',
          lang === 'tr' 
            ? 'Kimlik: Ziyaretçi / Teknik Lider / İşe Alım Yöneticisi' 
            : 'Role: Technical Leader / Engineering Manager / Tech Recruiter',
          'Yetki Düzeyi: Okuma / Etkileşimli Simülasyon (Read-Only Guest Session)'
        ]
      };

    case 'sudo':
      return {
        type: 'error',
        content: [
          lang === 'tr' 
            ? 'Hata: "ihtiyar" kullanıcısı sudoers dosyasında değildir. Bu olay Keycloak denetim günlüğüne kaydedildi 🛡️'
            : 'Error: User "guest" is not in the sudoers file. This incident has been reported to Keycloak IAM audit stream 🛡️'
        ]
      };

    case '':
      return { type: 'text', content: '' };

    default:
      return {
        type: 'error',
        content: [
          lang === 'tr'
            ? `Bilinmeyen komut: "${command}". Kullanılabilir komutları görmek için "help" yazın.`
            : `Command not recognized: "${command}". Type "help" for list of valid commands.`
        ]
      };
  }
};
