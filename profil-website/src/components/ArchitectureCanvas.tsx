import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Zap, 
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Layers,
  Touchpad
} from 'lucide-react';
import type { Language } from '../data/portfolioData';

interface ArchitectureCanvasProps {
  currentLang: Language;
}

interface ArchNode {
  id: string;
  name: string;
  shortName: string;
  category: string;
  tier: number; // 0 to 4
  x: number;
  y: number;
  color: string;
  description: { tr: string; en: string };
  protocols: string[];
}

interface Particle {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
  payload: string;
  isBurst?: boolean;
}

// Connections between nodes (fromIdx -> toIdx)
const CONNECTIONS: [number, number][] = [
  [0, 2], // esp32 -> mqtt
  [1, 2], // cellular -> mqtt
  [2, 3], // mqtt -> spring_core
  [2, 4], // mqtt -> dotnet_pay
  [3, 5], // spring_core -> metadb_lineage
  [4, 5], // dotnet_pay -> metadb_lineage
  [3, 6], // spring_core -> iam_keycloak
  [4, 6], // dotnet_pay -> iam_keycloak
  [5, 7], // metadb_lineage -> proxmox_infra
  [6, 7], // iam_keycloak -> proxmox_infra
];

export const ArchitectureCanvas: React.FC<ArchitectureCanvasProps> = ({ currentLang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);
  const [packetCount, setPacketCount] = useState(1284);
  const [isSimulating, setIsSimulating] = useState(true);
  const [burstActive, setBurstActive] = useState(false);

  const isSimulatingRef = useRef<boolean>(true);
  const selectedNodeRef = useRef<ArchNode | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const spawnTimerRef = useRef<number>(0);

  const isTr = currentLang === 'tr';

  // Sync refs with state
  useEffect(() => {
    isSimulatingRef.current = isSimulating;
  }, [isSimulating]);

  useEffect(() => {
    selectedNodeRef.current = selectedNode;
  }, [selectedNode]);

  const nodes: ArchNode[] = useMemo(() => [
    // Tier 0: Edge & Hardware
    {
      id: 'esp32',
      name: 'ESP32 Edge Gateway',
      shortName: 'ESP32 Edge',
      category: isTr ? 'Donanım & Firmware' : 'Hardware & Firmware',
      tier: 0,
      x: 0.12,
      y: 0.28,
      color: '#10B981',
      description: {
        tr: 'FreeRTOS ile çalışan firmware; endüstriyel soğutma ünitelerinden Modbus RTU/TCP register verisi toplar. Yerel flash ring-buffer ile veri kaybını önler.',
        en: 'FreeRTOS firmware polling Modbus RTU/TCP registers from industrial chillers. Prevents data loss via local flash ring-buffer during network drops.'
      },
      protocols: ['Modbus RTU (RS-485)', 'Modbus TCP', 'C/C++ FreeRTOS']
    },
    {
      id: 'cellular',
      name: 'GSM 4G / Cat-M1 Module',
      shortName: 'GSM 4G LTE',
      category: isTr ? 'Hücresel Haberleşme' : 'Cellular Telemetry',
      tier: 0,
      x: 0.12,
      y: 0.72,
      color: '#06B6D4',
      description: {
        tr: 'Wi-Fi veya Ethernet kesildiğinde devreye giren otomatik hücresel yedekleme (failover) modülü.',
        en: 'Automatic cellular failover module activated seamlessly whenever local Wi-Fi or Ethernet is interrupted.'
      },
      protocols: ['AT Commands', 'SIMCom/Quectel', 'MQTT over TLS']
    },

    // Tier 1: Ingestion & Messaging
    {
      id: 'mqtt_broker',
      name: 'MQTT & RabbitMQ Ingestion',
      shortName: 'MQTT / AMQP',
      category: isTr ? 'Mesaj Kuyrukları' : 'Message Brokers',
      tier: 1,
      x: 0.32,
      y: 0.50,
      color: '#3B82F6',
      description: {
        tr: 'Yüksek verimli mesaj dağıtım omurgası. IoT telemetri verilerini ve mikroservisler arası asenkron olayları yönetir.',
        en: 'High-throughput messaging backbone managing incoming IoT telemetry streams and inter-service asynchronous events.'
      },
      protocols: ['MQTT v5 / TLS', 'AMQP 0-9-1', 'RabbitMQ Clustering']
    },

    // Tier 2: Microservices & Core
    {
      id: 'spring_core',
      name: 'Spring Boot 3 Services',
      shortName: 'Spring Core',
      category: isTr ? 'Arka Uç Mikroservisleri' : 'Backend Microservices',
      tier: 2,
      x: 0.54,
      y: 0.28,
      color: '#10B981',
      description: {
        tr: 'Java 21 ile geliştirilen Ingestion (I), Transformation (T) ve Global (GLB) mikroservis kümesi. Quartz ve Spring Batch orkestrasyonu.',
        en: 'Microservice suite developed in Java 21 executing Ingestion (I), Transformation (T), and Global (GLB) stages. Quartz & Spring Batch pipelines.'
      },
      protocols: ['Java 21', 'Spring WebFlux', 'Spring Batch', 'REST / JSON']
    },
    {
      id: 'dotnet_pay',
      name: '.NET C# Transaction Engine',
      shortName: '.NET Engine',
      category: isTr ? 'Ödeme & İşlem Motoru' : 'Transaction & Payments',
      tier: 2,
      x: 0.54,
      y: 0.72,
      color: '#8B5CF6',
      description: {
        tr: 'Çoklu istemci ödeme ve işlem altyapısı. Dağıtık Redis kilitleri ve idempotent işlem güvencesiyle finansal rotalama.',
        en: 'Multi-client payment and transaction infrastructure with distributed Redis locks and strict idempotency guarantees.'
      },
      protocols: ['C# .NET 8/10', 'Redis Redlock', 'Idempotent Routing']
    },

    // Tier 3: Data Lineage & Storage
    {
      id: 'metadb_lineage',
      name: 'MetaDB & Memgraph Graph',
      shortName: 'MetaDB Graph',
      category: isTr ? 'Veri Soykütüğü & Katalog' : 'Data Lineage & Catalog',
      tier: 3,
      x: 0.75,
      y: 0.32,
      color: '#EC4899',
      description: {
        tr: 'Kurumsal veri tabanlarından sıfır yük (Zero-Impact) ile katalog çıkaran ve uçtan uca veri soykütüğünü görselleştiren grafik motoru.',
        en: 'Enterprise catalog & lineage engine extracting metadata with zero source impact and traversing graph dependencies via Bolt.'
      },
      protocols: ['Memgraph Cypher', 'Bolt Protocol', 'PostgreSQL GLB', 'TimescaleDB']
    },
    {
      id: 'iam_keycloak',
      name: 'Keycloak SSO & IAM',
      shortName: 'Keycloak IAM',
      category: isTr ? 'Merkezi Kimlik Doğrulama' : 'Central Identity & IAM',
      tier: 3,
      x: 0.75,
      y: 0.70,
      color: '#F59E0B',
      description: {
        tr: 'Tüm servisler için OAuth2 / OIDC standartlarında Single Sign-On, Multi-Realm yetkilendirme ve durumsuz JWT doğrulama.',
        en: 'Centralized OAuth2 / OIDC Single Sign-On, Multi-Realm authorization, and stateless JWT token verification for all endpoints.'
      },
      protocols: ['OAuth 2.0', 'OpenID Connect', 'JWKS / JWT', 'Spring Security']
    },

    // Tier 4: Infrastructure & Virtualization
    {
      id: 'proxmox_infra',
      name: 'Proxmox VE & Fedora Cluster',
      shortName: 'Proxmox VE',
      category: isTr ? 'Altyapı & Sanallaştırma' : 'Infra & Virtualization',
      tier: 4,
      x: 0.92,
      y: 0.50,
      color: '#06B6D4',
      description: {
        tr: 'Proxmox VE 8 üzerinde koşan KVM/LXC kümesi, ZFS depolama havuzları, PBS otomatik yedekleme ve Fedora Linux host optimizasyonu.',
        en: 'KVM/LXC virtualization cluster on Proxmox VE 8 with ZFS storage, PBS backup automation, and hardened Fedora Linux hosts.'
      },
      protocols: ['Proxmox VE (KVM/LXC)', 'Fedora Linux', 'ZFS / PBS', 'Docker']
    }
  ], [isTr]);

  // Seed initial particles
  useEffect(() => {
    if (particlesRef.current.length === 0) {
      const payloads = ['Modbus', 'MQTT', 'Telemetry', 'Cypher', 'JWT', 'GLB'];
      for (let i = 0; i < 6; i++) {
        const conn = CONNECTIONS[i % CONNECTIONS.length];
        particlesRef.current.push({
          fromNode: conn[0],
          toNode: conn[1],
          progress: (i * 0.15) % 0.8,
          speed: 0.007 + Math.random() * 0.008,
          color: nodes[conn[0]]?.color || '#10B981',
          payload: payloads[i % payloads.length]
        });
      }
    }
  }, [nodes]);

  // Canvas render & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const spawnParticle = () => {
      const connIndex = Math.floor(Math.random() * CONNECTIONS.length);
      const [from, to] = CONNECTIONS[connIndex];
      const payloads = ['Modbus', 'MQTT', 'Telemetry', 'Cypher', 'JWT', 'Ping', 'GLB'];
      particlesRef.current.push({
        fromNode: from,
        toNode: to,
        progress: 0,
        speed: 0.007 + Math.random() * 0.008,
        color: nodes[from]?.color || '#10B981',
        payload: payloads[Math.floor(Math.random() * payloads.length)]
      });
    };

    const render = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = width < 640 ? 360 : 440;
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
      }

      const width = canvas.width;
      const height = canvas.height;
      const isSmall = width < 640;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = isSmall ? 30 : 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Connection Lines
      CONNECTIONS.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        if (!from || !to) return;

        const x1 = from.x * width;
        const y1 = from.y * height;
        const x2 = to.x * width;
        const y2 = to.y * height;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `${from.color}40`);
        gradient.addColorStop(1, `${to.color}40`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isSmall ? 1.5 : 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Update & Draw Flowing Packets
      const particles = particlesRef.current;

      // Spawn periodic packet if running
      if (isSimulatingRef.current) {
        spawnTimerRef.current++;
        if (spawnTimerRef.current % 36 === 0 && particles.length < 18) {
          spawnParticle();
        }
        if (spawnTimerRef.current % 60 === 0) {
          setPacketCount(prev => prev + 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Advance progress only when simulation is unpaused
        if (isSimulatingRef.current) {
          p.progress += p.speed;
        }

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const from = nodes[p.fromNode];
        const to = nodes[p.toNode];
        if (!from || !to) continue;

        const px = (from.x + (to.x - from.x) * p.progress) * width;
        const py = (from.y + (to.y - from.y) * p.progress) * height;

        const isBurst = p.isBurst;
        const particleRadius = isSmall ? (isBurst ? 4.5 : 3) : (isBurst ? 5.5 : 4);

        ctx.save();
        ctx.shadowBlur = isBurst ? 16 : (isSmall ? 6 : 10);
        ctx.shadowColor = p.color;
        ctx.fillStyle = isBurst ? '#FFFFFF' : p.color;
        ctx.beginPath();
        ctx.arc(px, py, particleRadius, 0, Math.PI * 2);
        ctx.fill();

        // Extra outer pulse ring for burst packets
        if (isBurst) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, particleRadius + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        if (!isSmall) {
          ctx.font = isBurst ? 'bold 9px monospace' : '9px monospace';
          ctx.fillStyle = isBurst ? '#38BDF8' : 'rgba(255, 255, 255, 0.75)';
          ctx.fillText(p.payload, px + 6, py - 5);
        }
      }

      // Responsive Node dimensions
      const boxWidth = isSmall ? Math.max(70, Math.floor(width * 0.17)) : 136;
      const boxHeight = isSmall ? 32 : 42;

      // Draw Nodes
      nodes.forEach((node) => {
        const nx = node.x * width;
        const ny = node.y * height;
        const isSelected = selectedNodeRef.current?.id === node.id;

        ctx.shadowBlur = isSelected ? 18 : 8;
        ctx.shadowColor = node.color;

        const bx = nx - boxWidth / 2;
        const by = ny - boxHeight / 2;

        ctx.fillStyle = isSelected ? '#111827' : '#0B0F19';
        ctx.strokeStyle = isSelected ? '#FFFFFF' : node.color;
        ctx.lineWidth = isSelected ? 2 : 1.5;

        ctx.beginPath();
        ctx.roundRect(bx, by, boxWidth, boxHeight, isSmall ? 6 : 8);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Node Title
        ctx.font = isSmall ? 'bold 8px Inter, sans-serif' : 'bold 11px Inter, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(isSmall ? node.shortName : node.name, nx, isSmall ? ny + 3 : ny - 2);

        // Node Category
        if (!isSmall) {
          ctx.font = '9px monospace';
          ctx.fillStyle = node.color;
          ctx.fillText(node.category, nx, ny + 12);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes]);

  // Handle clicking a node on the canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const width = canvas.width;
    const height = canvas.height;
    const isSmall = width < 640;

    const boxWidth = isSmall ? Math.max(70, Math.floor(width * 0.17)) : 136;
    const boxHeight = isSmall ? 32 : 42;

    const hit = nodes.find(node => {
      const nx = node.x * width;
      const ny = node.y * height;
      return (
        clickX >= nx - boxWidth / 2 &&
        clickX <= nx + boxWidth / 2 &&
        clickY >= ny - boxHeight / 2 &&
        clickY <= ny + boxHeight / 2
      );
    });

    if (hit) {
      setSelectedNode(hit);
    } else {
      setSelectedNode(null);
    }
  };

  // Toggle Start / Pause
  const handleToggleSimulation = () => {
    setIsSimulating(prev => {
      const next = !prev;
      isSimulatingRef.current = next;
      return next;
    });
  };

  // Trigger high-velocity burst wave across all routes
  const handlePulseBurst = () => {
    // If simulation was paused, auto-resume so the user sees the wave surge
    if (!isSimulatingRef.current) {
      isSimulatingRef.current = true;
      setIsSimulating(true);
    }

    const payloads = ['BURST', 'TELEMETRY', 'MODBUS-RTU', 'SPRING-EVT', 'CYPHER-Q', 'JWT-TOKEN', 'PROXMOX-IO'];
    const burstParticles: Particle[] = [];

    // Dispatch 2 high-speed packets across EVERY connection
    CONNECTIONS.forEach(([from, to]) => {
      burstParticles.push({
        fromNode: from,
        toNode: to,
        progress: Math.random() * 0.1,
        speed: 0.016 + Math.random() * 0.008,
        color: nodes[from]?.color || '#10B981',
        payload: payloads[Math.floor(Math.random() * payloads.length)],
        isBurst: true
      });
      burstParticles.push({
        fromNode: from,
        toNode: to,
        progress: 0.15 + Math.random() * 0.2,
        speed: 0.02 + Math.random() * 0.008,
        color: '#38BDF8',
        payload: 'SYNC',
        isBurst: true
      });
    });

    particlesRef.current.push(...burstParticles);
    setPacketCount(prev => prev + burstParticles.length);

    setBurstActive(true);
    setTimeout(() => setBurstActive(false), 900);
  };

  return (
    <section id="architecture" className="py-12 sm:py-16 md:py-24 border-b border-slate-800/80 bg-[#030712] relative w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 mb-2 sm:mb-3">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isTr ? 'Donanımdan Buluta Mimari' : 'Full-Spectrum Pipeline'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {isTr ? 'İnteraktif Sistem Mimarisi Tuvali' : 'System Architecture Canvas'}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl font-sans">
              {isTr
                ? 'ESP32 ve Modbus telemetrisinden Spring Boot dağıtık servislerine, MetaDB soykütüğünden Proxmox altyapısına veri akışını canlı izleyin ve düğümlere tıklayın.'
                : 'Inspect simulated live packets flowing from ESP32 & Modbus edge to Spring Boot microservices, MetaDB lineage graphs, and Proxmox infrastructure.'}
            </p>
          </div>

          {/* Interactive Controls & Stats */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <span>Packets: <strong className="text-emerald-400">{packetCount.toLocaleString()}</strong></span>
            </div>

            {/* Start / Pause Button */}
            <button
              type="button"
              onClick={handleToggleSimulation}
              className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                isSimulating 
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600' 
                  : 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/90 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              }`}
              title={isSimulating ? (isTr ? 'Akışı Duraklat' : 'Pause Simulation') : (isTr ? 'Akışı Başlat' : 'Resume Simulation')}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isTr ? 'Durdur' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400 animate-pulse fill-emerald-400" />
                  <span>{isTr ? 'Başlat' : 'Resume'}</span>
                </>
              )}
            </button>

            {/* Packet Wave Burst Button */}
            <button
              type="button"
              onClick={handlePulseBurst}
              className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                burstActive 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.8)]' 
                  : 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 shadow-[0_0_10px_-2px_rgba(16,185,129,0.3)]'
              }`}
              title={isTr ? 'Tüm düğümler arasında anlık paket dalgası fırlatır' : 'Fires an instant packet surge across all nodes'}
            >
              <Zap className={`w-3.5 h-3.5 ${burstActive ? 'text-slate-950 fill-current animate-bounce' : 'text-emerald-400'}`} />
              <span>{burstActive ? (isTr ? 'Dalga Gönderildi!' : 'Wave Fired!') : (isTr ? 'Paket Dalgası' : 'Pulse Packets')}</span>
            </button>
          </div>
        </div>

        {/* Tier Legend Bar - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] text-slate-400">
          <button 
            type="button"
            onClick={() => setSelectedNode(nodes[0])}
            className="px-2 py-1 rounded bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 text-center transition-all cursor-pointer"
          >
            <span className="text-emerald-400 font-bold block truncate">1. Edge & IoT</span>
          </button>
          <button 
            type="button"
            onClick={() => setSelectedNode(nodes[2])}
            className="px-2 py-1 rounded bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 text-center transition-all cursor-pointer"
          >
            <span className="text-blue-400 font-bold block truncate">2. Message Broker</span>
          </button>
          <button 
            type="button"
            onClick={() => setSelectedNode(nodes[3])}
            className="px-2 py-1 rounded bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 text-center transition-all cursor-pointer"
          >
            <span className="text-purple-400 font-bold block truncate">3. Microservices</span>
          </button>
          <button 
            type="button"
            onClick={() => setSelectedNode(nodes[5])}
            className="px-2 py-1 rounded bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 text-center transition-all cursor-pointer"
          >
            <span className="text-pink-400 font-bold block truncate">4. MetaDB Graph</span>
          </button>
          <button 
            type="button"
            onClick={() => setSelectedNode(nodes[7])}
            className="px-2 py-1 rounded bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 text-center transition-all cursor-pointer col-span-2 sm:col-span-1"
          >
            <span className="text-cyan-400 font-bold block truncate">5. Proxmox Infra</span>
          </button>
        </div>

        {/* Canvas Workspace Container */}
        <div 
          ref={containerRef}
          className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl w-full"
        >
          {/* Top Status Strip */}
          <div className="px-3 sm:px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-slate-300 font-semibold truncate">{isTr ? 'CANLI MİMARİ AĞI' : 'LIVE ARCHITECTURE MESH'}</span>
              <span className="text-slate-400 hidden md:inline">| {isTr ? 'Düğümlere tıklayarak teknik detayları inceleyin' : 'Click nodes to inspect specs'}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className={`flex items-center gap-1.5 ${isSimulating ? 'text-emerald-400' : 'text-amber-400 font-semibold'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                {isSimulating ? 'Zero-Lock (Canlı)' : 'DURDURULDU (PAUSED)'}
              </span>
              <span className="text-slate-400 hidden sm:inline">60 FPS Canvas</span>
            </div>
          </div>

          {/* Interactive Canvas */}
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full cursor-pointer block touch-none"
          />

          {/* Mobile Tap Hint */}
          <div className="sm:hidden px-3 py-1.5 bg-slate-900/70 border-t border-slate-850 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>💡 Düğümlere dokunarak teknik detayları açabilirsiniz</span>
            <span className="text-emerald-400 font-bold">{selectedNode ? selectedNode.shortName : 'Seçilmedi'}</span>
          </div>

          {/* Node Detail Drawer / Overlay if selected */}
          {selectedNode && (
            <div className="p-4 sm:p-5 bg-slate-900/98 backdrop-blur-xl border-t border-slate-800 text-slate-100 z-20 animate-in fade-in duration-200">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {selectedNode.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-sans mt-0.5 flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0" 
                      style={{ backgroundColor: selectedNode.color }} 
                    />
                    {selectedNode.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-400 hover:text-white p-1 text-xs font-mono bg-slate-800 rounded px-2 cursor-pointer"
                >
                  ✕ {isTr ? 'Kapat' : 'Close'}
                </button>
              </div>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {selectedNode.description[currentLang]}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1.5 font-semibold">
                  {isTr ? 'Desteklenen Protokoller & Standartlar:' : 'Supported Protocols & Standards:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.protocols.map((proto) => (
                    <span
                      key={proto}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-300"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
