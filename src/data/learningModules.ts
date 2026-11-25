import type { CollectionEntry } from 'astro:content';
import { getPostSlug } from './slugUtils';

export interface LearningStageDefinition {
  id: string;
  step: string;
  title: string;
  description: string;
  entryHref: string;
  entryLabel: string;
  slugs: string[];
}

export const LEARNING_STAGES: LearningStageDefinition[] = [
  {
    id: 'architecture',
    step: '01',
    title: 'Mimari & Süreç Modeli',
    description: 'Postmaster ve process-per-connection modeli, shared_buffers, 8KB data page anatomisi, sorgu işleme hattı ve iç kilit hiyerarşisi.',
    entryHref: '/posts/postgresql-mimarisi-ve-calisma-prensipleri',
    entryLabel: 'Mimari Genel Bakış',
    slugs: [
      'postgresql-mimarisi-ve-calisma-prensipleri',
      'postgresql-arka-plan-surecleri',
      'postgresql-bellek-yonetimi',
      'postgresql-sorgu-yasam-dongusu',
      'postgresql-cluster-oid-ve-pgdata',
      'postgresql-data-page-ve-tuple',
      'postgresql-ic-kilitler-ve-wait-events',
    ],
  },
  {
    id: 'setup-config',
    step: '02',
    title: 'Kurulum & Konfigürasyon',
    description: 'PGDG, initdb, data checksums, systemd/disk yerleşimi, pg_hba.conf, parametre bağlamları (SIGHUP vs restart) ve tuning metodolojisi.',
    entryHref: '/posts/postgresql-kurulum-ve-servis-yonetimi',
    entryLabel: 'Kurulum & Konfigürasyon',
    slugs: [
      'postgresql-kurulum-ve-servis-yonetimi',
      'postgresql-kurulum-yontemleri-ve-initdb',
      'postgresql-servis-yonetimi-ve-disk-yerlesimi',
      'postgresql-multi-instance-pgwrapper-ve-collation',
      'postgresql-konfigurasyon-ve-parametre-yonetimi',
      'postgresql-konfigurasyon-dosyalari-ve-hba',
      'postgresql-parametre-baglamlari-ve-hiyerarsi',
      'postgresql-parametre-gruplari-ve-tuning',
    ],
  },
  {
    id: 'wal-recovery',
    step: '03',
    title: 'WAL & Crash Recovery',
    description: 'LSN kavramı, checkpoint döngüsü, fsync ve full_page_writes veri güvenliği, REDO fazı, WAL birikmesi teşhisi ve pg_waldump.',
    entryHref: '/posts/postgresql-wal-ve-checkpoint-mimarisi',
    entryLabel: 'WAL & Checkpoint',
    slugs: [
      'postgresql-wal-ve-checkpoint-mimarisi',
      'postgresql-crash-recovery-ve-wal-yonetimi',
      'postgresql-mvcc-ve-wal',
    ],
  },
  {
    id: 'mvcc-vacuum',
    step: '04',
    title: 'MVCC & Vacuum Mimarisi',
    description: 'xmin/xmax tuple görünürlüğü, izolasyon seviyeleri ve SSI, autovacuum tuning, pgstattuple bloat analizi ve XID wraparound kurtarma.',
    entryHref: '/posts/postgresql-mvcc-transaction-ve-vacuum',
    entryLabel: 'MVCC & Vacuum Serisi',
    slugs: [
      'postgresql-mvcc-transaction-ve-vacuum',
      'postgresql-mvcc-ve-tuple-gorunurlugu',
      'postgresql-transaction-izolasyon-seviyeleri-ve-ssi',
      'postgresql-autovacuum-tuning-ve-bloat-yonetimi',
      'postgresql-transaction-wraparound-ve-freeze',
      'postgresql-autovacuum-engelleyicileri-ve-multixact',
    ],
  },
  {
    id: 'locks-concurrency',
    step: '05',
    title: 'Kilitler & Eşzamanlılık',
    description: 'Table ve row-level lock modları, pg_blocking_pids teşhisi, deadlock ve timeout yönetimi, advisory kilitler ve zero-downtime DDL.',
    entryHref: '/posts/postgresql-kilit-mekanizmalari-ve-eszamanlilik',
    entryLabel: 'Kilitler Serisi',
    slugs: [
      'postgresql-kilit-mekanizmalari-ve-eszamanlilik',
      'postgresql-table-ve-row-lock-modlari',
      'postgresql-lock-ve-blocking-analizi',
      'postgresql-deadlock-ve-timeout-yonetimi',
      'postgresql-advisory-kilitler-ve-lab',
      'postgresql-zero-downtime-ddl-rehberi',
    ],
  },
  {
    id: 'extensions-ha',
    step: '06',
    title: 'Eklentiler, TimescaleDB & HA',
    description: 'C hook mimarisi, teşhis eklentileri, TimescaleDB hypertable/columnar sıkıştırma, Patroni yüksek erişebilirlik ve PostgREST.',
    entryHref: '/posts/postgresql-extension-mimarisi-ve-c-hooks',
    entryLabel: 'Eklentiler & Ekosistem',
    slugs: [
      'postgresql-extension-mimarisi-ve-c-hooks',
      'postgresql-teshis-ve-dba-eklentileri',
      'timescaledb-mimarisi-ve-kullanim-rehberi',
      'timescaledb-hypertable-ve-chunk-mimarisi',
      'timescaledb-columnar-sikistirma-ve-retention',
      'timescaledb-continuous-aggregates-ve-analitik',
      'timescaledb-production-tuning-ve-operasyon',
      'timescaledb-parallel-copy-ve-bulk-ingest',
      'timescaledb-sorgu-optimizasyonu-skipscan-ve-indeksleme',
      'timescaledb-ha-replikasyon-ve-katmanli-depolama',
      'pgvectorscale-ve-timescaledb-hibrit-vektor-mimarisi',
      'patroni-ile-postgresql-yuksek-erisebilirlik-ve-otomatik-failover',
      'postgrest-ile-postgresql-uzerinden-aninda-rest-api',
    ],
  },
];

export function resolveLearningStages(allPosts: CollectionEntry<'posts'>[]) {
  const postMap = new Map<string, CollectionEntry<'posts'>>();
  for (const post of allPosts) {
    postMap.set(getPostSlug(post), post);
  }

  return LEARNING_STAGES.map((stage) => {
    const resolvedPosts = stage.slugs
      .map((slug) => postMap.get(slug))
      .filter((p): p is CollectionEntry<'posts'> => Boolean(p));

    return {
      ...stage,
      posts: resolvedPosts,
      postCount: resolvedPosts.length,
    };
  });
}
