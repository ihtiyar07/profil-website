export interface NavArticleItem {
  title: string;
  href: string;
  children?: NavArticleItem[];
}

export interface NavSection {
  id: string;
  title: string;
  overviewHref?: string;
  items: NavArticleItem[];
}

export interface SectionColorRole {
  dot: string;
  headerBg: string;
  headerText: string;
  toggleText: string;
  treeBorder: string;
  groupBorder: string;
}

export interface FlatNavItem {
  title: string;
  href: string;
  sectionTitle: string;
  parentTitle?: string;
}

export const navSections: NavSection[] = [
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    overviewHref: '/posts/postgresql-mimarisi-ve-calisma-prensipleri',
    items: [
      {
        title: 'Mimari & Süreç Modeli',
        href: '/posts/postgresql-mimarisi-ve-calisma-prensipleri',
        children: [
          {
            title: 'Bellek & shared_buffers',
            href: '/posts/postgresql-bellek-yonetimi'
          },
          {
            title: '8KB Page & Tuple Düzeni',
            href: '/posts/postgresql-data-page-ve-tuple'
          },
          {
            title: 'MVCC, Autovacuum & WAL',
            href: '/posts/postgresql-mvcc-ve-wal'
          },
          {
            title: 'WAL & Checkpoint Düzeni',
            href: '/posts/postgresql-wal-ve-checkpoint-mimarisi'
          },
          {
            title: 'Crash Recovery & WAL',
            href: '/posts/postgresql-crash-recovery-ve-wal-yonetimi'
          },
          {
            title: 'Sorgu Yaşam Döngüsü',
            href: '/posts/postgresql-sorgu-yasam-dongusu'
          },
          {
            title: 'Cluster, OID & PGDATA',
            href: '/posts/postgresql-cluster-oid-ve-pgdata'
          },
          {
            title: 'İç Kilitler & Wait Events',
            href: '/posts/postgresql-ic-kilitler-ve-wait-events'
          },
          {
            title: 'Arka Plan Süreçleri',
            href: '/posts/postgresql-arka-plan-surecleri'
          }
        ]
      },
      {
        title: 'Kurulum & Servis Yönetimi',
        href: '/posts/postgresql-kurulum-ve-servis-yonetimi',
        children: [
          {
            title: 'PGDG, Kaynak Kod & initdb',
            href: '/posts/postgresql-kurulum-yontemleri-ve-initdb'
          },
          {
            title: 'systemd & Disk Yerleşimi',
            href: '/posts/postgresql-servis-yonetimi-ve-disk-yerlesimi'
          },
          {
            title: 'Multi-Instance & ICU',
            href: '/posts/postgresql-multi-instance-pgwrapper-ve-collation'
          }
        ]
      },
      {
        title: 'Konfigürasyon & Parametreler',
        href: '/posts/postgresql-konfigurasyon-ve-parametre-yonetimi',
        children: [
          {
            title: 'postgresql.conf & HBA',
            href: '/posts/postgresql-konfigurasyon-dosyalari-ve-hba'
          },
          {
            title: 'Bağlamlar & SIGHUP/Restart',
            href: '/posts/postgresql-parametre-baglamlari-ve-hiyerarsi'
          },
          {
            title: 'Parametre Tuning Rehberi',
            href: '/posts/postgresql-parametre-gruplari-ve-tuning'
          }
        ]
      }
    ]
  },
  {
    id: 'pg-extensions',
    title: 'Eklentiler & Ekosistem',
    overviewHref: '/posts/postgresql-extension-mimarisi-ve-c-hooks',
    items: [
      {
        title: 'Extension Mimarisi & Hooks',
        href: '/posts/postgresql-extension-mimarisi-ve-c-hooks'
      },
      {
        title: 'TimescaleDB: Genel Bakış',
        href: '/posts/timescaledb-mimarisi-ve-kullanim-rehberi',
        children: [
          {
            title: 'Hypertable & Chunk Boyutu',
            href: '/posts/timescaledb-hypertable-ve-chunk-mimarisi'
          },
          {
            title: 'Columnar Sıkıştırma & Retention',
            href: '/posts/timescaledb-columnar-sikistirma-ve-retention'
          },
          {
            title: 'Continuous Aggs & Analitik',
            href: '/posts/timescaledb-continuous-aggregates-ve-analitik'
          },
          {
            title: 'Production Tuning & Operasyon',
            href: '/posts/timescaledb-production-tuning-ve-operasyon'
          },
          {
            title: 'Parallel Copy & Bulk Ingest',
            href: '/posts/timescaledb-parallel-copy-ve-bulk-ingest'
          },
          {
            title: 'SkipScan & BRIN İndeksleme',
            href: '/posts/timescaledb-sorgu-optimizasyonu-skipscan-ve-indeksleme'
          },
          {
            title: 'Patroni HA & Katmanlı Depolama',
            href: '/posts/timescaledb-ha-replikasyon-ve-katmanli-depolama'
          },
          {
            title: 'pgvectorscale & DiskANN',
            href: '/posts/pgvectorscale-ve-timescaledb-hibrit-vektor-mimarisi'
          }
        ]
      },
      {
        title: 'Patroni: HA & Failover',
        href: '/posts/patroni-ile-postgresql-yuksek-erisebilirlik-ve-otomatik-failover'
      },
      {
        title: 'PostgREST: Otomatik API',
        href: '/posts/postgrest-ile-postgresql-uzerinden-aninda-rest-api'
      }
    ]
  },
  {
    id: 'storage',
    title: 'Depolama & Altyapı',
    overviewHref: '/posts/veritabani-depolama-ve-donanim-altyapisi-mimarisi',
    items: [
      {
        title: 'ZFS & Depolama Düzeni',
        href: '/posts/veritabani-depolama-ve-donanim-altyapisi-mimarisi'
      },
      {
        title: 'Arrow ile Zero-Copy',
        href: '/posts/arrow-ile-dbden-tarayiciya-zero-copy'
      },
      {
        title: 'Apache Arrow Vaka Dosyası',
        href: '/cases/apache-arrow'
      },
      {
        title: 'Proxmox VE: Ağ & ZFS',
        href: '/posts/dedicated-sunucuya-sifirdan-proxmox-ag-ve-firewall-notlari'
      },
      {
        title: 'JWT vs Redis O(1) Yetki',
        href: '/posts/jwtde-yetki-tasimak-neden-her-zaman-iyi-fikir-degil'
      }
    ]
  }
];

export const sectionThemes: Record<string, SectionColorRole> = {
  postgresql: {
    dot: 'bg-blue-600 dark:bg-blue-400',
    headerBg: 'bg-blue-50/75 hover:bg-blue-100/80 dark:bg-blue-950/35 dark:hover:bg-blue-900/45',
    headerText: 'text-blue-950 dark:text-blue-100',
    toggleText: 'text-blue-700 group-hover:text-blue-900 dark:text-blue-300 dark:group-hover:text-blue-100',
    treeBorder: 'border-blue-300/80 dark:border-blue-700/60',
    groupBorder: 'border-blue-200/70 dark:border-blue-900/40'
  },
  'pg-extensions': {
    dot: 'bg-teal-600 dark:bg-teal-400',
    headerBg: 'bg-teal-50/75 hover:bg-teal-100/80 dark:bg-teal-950/35 dark:hover:bg-teal-900/45',
    headerText: 'text-teal-950 dark:text-teal-100',
    toggleText: 'text-teal-700 group-hover:text-teal-900 dark:text-teal-300 dark:group-hover:text-teal-100',
    treeBorder: 'border-teal-300/80 dark:border-teal-700/60',
    groupBorder: 'border-teal-200/70 dark:border-teal-900/40'
  },
  storage: {
    dot: 'bg-indigo-600 dark:bg-indigo-400',
    headerBg: 'bg-indigo-50/75 hover:bg-indigo-100/80 dark:bg-indigo-950/35 dark:hover:bg-indigo-900/45',
    headerText: 'text-indigo-950 dark:text-indigo-100',
    toggleText: 'text-indigo-700 group-hover:text-indigo-900 dark:text-indigo-300 dark:group-hover:text-indigo-100',
    treeBorder: 'border-indigo-300/80 dark:border-indigo-700/60',
    groupBorder: 'border-indigo-200/70 dark:border-indigo-900/40'
  },
  general: {
    dot: 'bg-slate-500 dark:bg-slate-400',
    headerBg: 'bg-[var(--bg-subtle)]/80 hover:bg-[var(--bg-subtle)]',
    headerText: 'text-[var(--text-muted)]',
    toggleText: 'text-[var(--text-dim)] group-hover:text-[var(--text)]',
    treeBorder: 'border-[var(--border)]',
    groupBorder: 'border-[var(--border)]/60'
  }
};

export function getSectionTheme(id: string): SectionColorRole {
  return sectionThemes[id] || sectionThemes.general;
}

export function getFlatNavigation(): FlatNavItem[] {
  const flat: FlatNavItem[] = [];
  for (const section of navSections) {
    for (const item of section.items) {
      flat.push({
        title: item.title,
        href: item.href,
        sectionTitle: section.title
      });
      if (item.children) {
        for (const child of item.children) {
          flat.push({
            title: child.title,
            href: child.href,
            sectionTitle: section.title,
            parentTitle: item.title
          });
        }
      }
    }
  }
  return flat;
}

export function getAdjacentNavItems(currentPath: string): {
  prev: FlatNavItem | null;
  next: FlatNavItem | null;
} {
  const flat = getFlatNavigation();
  const cleanPath = currentPath.replace(/\/+$/, '') || '/';
  const currentIndex = flat.findIndex(
    (item) => item.href.replace(/\/+$/, '') === cleanPath
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? flat[currentIndex - 1] : null,
    next: currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null
  };
}
