import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArchitectureCanvas } from './components/ArchitectureCanvas';
import { TelemetrySimulator } from './components/TelemetrySimulator';
import { Projects } from './components/Projects';
import { SkillsMatrix } from './components/SkillsMatrix';
import { TerminalConsole } from './components/TerminalConsole';
import { RoleFitGuide } from './components/RoleFitGuide';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import type { Language, Persona } from './data/portfolioData';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [activePersona, setActivePersona] = useState<Persona>('all');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = currentLang;
    if (currentLang === 'tr') {
      document.title = 'Ahmet İhtiyar | Sistem & IoT Mühendisi | Dağıtık Sistem Mimarisi';
    } else {
      document.title = 'Ahmet İhtiyar | Systems & IoT Engineer | Distributed Systems Architect';
    }
  }, [currentLang]);

  const handleExploreArchitecture = () => {
    const el = document.getElementById('architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300 w-full overflow-x-hidden">
      
      {/* Sleek Single-Row Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <main className="flex-1 w-full pt-16">
        {/* Hero Section with Portrait, Live Metrics & Responsive Focus Area Selector */}
        <Hero
          currentLang={currentLang}
          activePersona={activePersona}
          onPersonaChange={setActivePersona}
          onOpenContact={() => setContactModalOpen(true)}
          onExploreArchitecture={handleExploreArchitecture}
        />

        {/* Interactive Architecture Canvas */}
        <ArchitectureCanvas currentLang={currentLang} />

        {/* Live ESP32 & Industrial Modbus Chiller Telemetry Simulator */}
        <TelemetrySimulator currentLang={currentLang} />

        {/* Systems & Case Studies (MetaDB, IoT, Payment, Proxmox, Keycloak, AI) */}
        <Projects
          currentLang={currentLang}
          activePersona={activePersona}
          onSelectPersona={setActivePersona}
        />

        {/* Skills Radar & Technology Matrix */}
        <SkillsMatrix currentLang={currentLang} />

        {/* Interactive Developer CLI Terminal */}
        <TerminalConsole currentLang={currentLang} />

        {/* Architectural Consulting & Project Solutions Guide */}
        <RoleFitGuide
          currentLang={currentLang}
          onOpenContact={() => setContactModalOpen(true)}
        />
      </main>

      {/* Footer with Cloudflare Pages Edge Status */}
      <Footer
        currentLang={currentLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Interactive Contact & Project Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        currentLang={currentLang}
      />

    </div>
  );
}

export default App;
