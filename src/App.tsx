import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { EngineeringNotes } from './components/EngineeringNotes';
import { SkillsMatrix } from './components/SkillsMatrix';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import type { Language, Project } from './data/portfolioData';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.lang = currentLang;
    if (currentLang === 'tr') {
      document.title = 'Ahmet İhtiyar — Kıdemli Sistem & Arka Uç Mühendisi | Dağıtık Mimari & IoT';
    } else {
      document.title = 'Ahmet İhtiyar — Senior Systems & Backend Engineer | Distributed Architecture & IoT';
    }
  }, [currentLang]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0d13] bg-grid-blueprint text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-100 dark:selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-300 w-full overflow-x-hidden transition-colors duration-200">
      
      {/* Floating Navbar with Theme Toggle */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenContact={() => setContactModalOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 w-full">
        {/* Compact, Visual Hero */}
        <Hero
          currentLang={currentLang}
          onOpenContact={() => setContactModalOpen(true)}
        />

        {/* 2x2 Bento Grid: Flagship Systems (Click opens deep dive) */}
        <Projects
          currentLang={currentLang}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 5-Step Visual Architecture Pipeline */}
        <ArchitectureFlow
          currentLang={currentLang}
        />

        {/* 4 Crisp Architectural Invariants (No essays) */}
        <EngineeringNotes
          currentLang={currentLang}
        />

        {/* Categorized Tech Badges */}
        <SkillsMatrix
          currentLang={currentLang}
        />
      </main>

      {/* Clean Footer */}
      <Footer
        currentLang={currentLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        currentLang={currentLang}
      />

      {/* Project Deep-Dive Modal (Preserves all deep technical context on click) */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        currentLang={currentLang}
      />

    </div>
  );
}

export default App;
