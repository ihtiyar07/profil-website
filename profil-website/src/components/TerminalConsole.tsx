import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Trash2
} from 'lucide-react';
import type { Language } from '../data/portfolioData';
import { executeTerminalCommand, type CommandOutput } from '../data/terminalCommands';

interface TerminalConsoleProps {
  currentLang: Language;
}

interface HistoryItem {
  id: string;
  command: string;
  output: CommandOutput;
  timestamp: string;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ currentLang }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      command: 'welcome',
      timestamp: '15:40:00',
      output: {
        type: 'text',
        content: [
          currentLang === 'tr'
            ? '🚀 AHMET İHTİYAR // İNTERAKTİF SİSTEM TERMİNALİ v2.4 (Fedora/Linux)'
            : '🚀 AHMET İHTİYAR // INTERACTIVE SYSTEMS TERMINAL v2.4 (Fedora/Linux)',
          currentLang === 'tr'
            ? 'Komutları incelemek için "help" yazın veya aşağıdaki butonlara tıklayın.'
            : 'Type "help" or click any shortcut button below to query systems, telemetry & architecture.'
        ]
      }
    }
  ]);

  const terminalScreenRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isTr = currentLang === 'tr';

  const quickCommands = [
    'help',
    'bio',
    'skills',
    'projects',
    'telemetry',
    'infra',
    'contact'
  ];

  const handleRunCommand = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const result = executeTerminalCommand(trimmed, currentLang);

    setHistory(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output: result,
        timestamp: timeStr
      }
    ]);

    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunCommand(inputVal);
  };

  // Scroll ONLY the internal terminal screen container without jumping the whole webpage!
  useEffect(() => {
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="terminal" className="py-12 sm:py-16 md:py-24 border-b border-slate-800/80 bg-[#030712] relative w-full">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 mb-2 sm:mb-3">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isTr ? 'Geliştirici & Sistem Konsolu' : 'Developer & Systems CLI Shell'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {isTr ? 'İnteraktif CLI Terminal' : 'Interactive CLI Terminal'}
          </h2>
          <p className="mt-1.5 sm:mt-2 text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-sans">
            {isTr
              ? 'Klavyeden komut yazabilir veya hazır komut haplarına basarak donanım ve projeleri sorgulayabilirsiniz.'
              : 'Type commands or click shortcut chips to inspect real-time telemetry, skills, architecture, and contact info.'}
          </p>
        </div>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs">
          <span className="text-slate-400 text-[10px] sm:text-[11px] mr-1 hidden xs:inline">{isTr ? 'Komutlar:' : 'Shortcuts:'}</span>
          {quickCommands.map(cmd => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleRunCommand(cmd)}
              className="px-2 sm:px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-500/60 transition-all cursor-pointer shadow-sm"
            >
              ${cmd}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleRunCommand('clear')}
            className="px-2 sm:px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-rose-400 hover:bg-rose-950/40 hover:border-rose-500/60 transition-all cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            clear
          </button>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono w-full">
          
          {/* Window Top Bar */}
          <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90 inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/90 inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/90 inline-block" />
              <span className="ml-1 sm:ml-2 text-slate-300 font-semibold text-[11px] sm:text-xs truncate">
                ihtiyar@fedora:~ (ssh)
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
              <span className="text-emerald-400">ACTIVE</span>
              <span className="text-slate-400 hidden xs:inline">BASH 5.2</span>
            </div>
          </div>

          {/* Terminal Screen (Internal scroll container) */}
          <div 
            ref={terminalScreenRef}
            className="p-3 sm:p-5 md:p-6 min-h-[280px] max-h-[420px] overflow-y-auto space-y-3 sm:space-y-4 text-xs sm:text-sm scrollbar-thin"
          >
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                {item.command !== 'welcome' && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 text-[11px] sm:text-xs">
                    <span className="text-emerald-400 font-bold shrink-0">
                      <span className="hidden xs:inline">ihtiyar@systems:</span>~$
                    </span>
                    <span className="text-slate-100 font-semibold truncate">{item.command}</span>
                    <span className="text-slate-400 text-[9px] sm:text-[10px] ml-auto shrink-0">{item.timestamp}</span>
                  </div>
                )}

                <div className={`p-2.5 sm:p-3 rounded-lg leading-relaxed whitespace-pre-wrap break-words text-[11px] sm:text-xs md:text-sm ${
                  item.output.type === 'error'
                    ? 'bg-rose-950/30 text-rose-300 border border-rose-900/60'
                    : item.output.type === 'success'
                    ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-900/60'
                    : 'bg-slate-900/40 text-slate-300'
                }`}>
                  {Array.isArray(item.output.content)
                    ? item.output.content.join('\n')
                    : item.output.content}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Input Form */}
          <form 
            onSubmit={handleSubmit}
            className="p-2 sm:p-3 bg-slate-900/70 border-t border-slate-800 flex items-center gap-1.5 sm:gap-2"
          >
            <span className="text-emerald-400 font-bold text-xs sm:text-sm pl-1 sm:pl-2 shrink-0">
              <span className="hidden xs:inline">ihtiyar@systems:</span>~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isTr ? 'Komut yazın (telemetry, skills, help)...' : 'Type command (telemetry, skills, help)...'}
              className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-0 font-mono"
            />
            <button
              type="submit"
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <span className="hidden xs:inline">{isTr ? 'Çalıştır' : 'Exec'}</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
