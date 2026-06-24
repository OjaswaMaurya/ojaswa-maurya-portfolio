import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, List, X, Play, RefreshCw, Send, ChevronRight } from 'lucide-react';
import { ConsoleMessage } from '../types';
import { PERSONAL_INFO } from '../data';

interface ConsoleSimulationProps {
  logs: ConsoleMessage[];
  onAddLog: (text: string, type?: 'system' | 'action' | 'success' | 'warning' | 'error') => void;
  onClearLogs: () => void;
}

export default function ConsoleSimulation({ logs, onAddLog, onClearLogs }: ConsoleSimulationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    onAddLog(`&gt; ${command}`, 'action');
    setCommand('');

    // Process CLI commands
    switch (cmd) {
      case 'help':
        onAddLog('AVAILABLE PROTOCOLS:', 'system');
        onAddLog('  about      - Display Ojaswa profile metadata', 'system');
        onAddLog('  aiforge    - Open cognitive prompt weights laboratory', 'system');
        onAddLog('  contact    - Scroll focus to contact form terminal', 'system');
        onAddLog('  github     - Redirect securely to GitHub workspace', 'system');
        onAddLog('  skills     - Access system capabilities list', 'system');
        onAddLog('  clear      - Purge CLI scrollback memory', 'system');
        onAddLog('  close      - Terminate telemetry terminal interface', 'system');
        break;

      case 'about':
        onAddLog(`IDENTITY: ${PERSONAL_INFO.name}`, 'success');
        onAddLog(`ROLE: ${PERSONAL_INFO.role}`, 'success');
        onAddLog(`GPS: ${PERSONAL_INFO.location}`, 'success');
        onAddLog(`STATUS: ${PERSONAL_INFO.academicTerm}`, 'success');
        break;

      case 'contact':
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
          onAddLog('Scrolling view frames to #inbound-contact-socket', 'success');
        } else {
          onAddLog('Error loading section targets', 'error');
        }
        break;

      case 'github':
        onAddLog('Launching outbound redirect: https://github.com/OjaswaMaurya', 'warning');
        window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
        break;

      case 'skills':
        const skillsEl = document.getElementById('skills');
        if (skillsEl) {
          skillsEl.scrollIntoView({ behavior: 'smooth' });
          onAddLog('Scrolling viewport to #system-capabilities-index', 'success');
        } else {
          onAddLog('Error loading capability node targets', 'error');
        }
        break;

      case 'aiforge':
        const aiForgeEl = document.getElementById('aiforge');
        if (aiForgeEl) {
          aiForgeEl.scrollIntoView({ behavior: 'smooth' });
          onAddLog('Scrolling viewport to #cognitive-system-forge', 'success');
        } else {
          onAddLog('Error loading AI Forge workspace nodes', 'error');
        }
        break;

      case 'clear':
        onClearLogs();
        setTimeout(() => {
          onAddLog('Logs purged. Stream buffer initialized on fresh terminal socket stream.', 'system');
        }, 50);
        break;

      case 'close':
        setIsOpen(false);
        break;

      default:
        onAddLog(`COMMAND ERROR: [${cmd}] is not recognized as an internally mapped protocol. Type "help" for a list of values.`, 'error');
    }
  };

  const handleShortcutClick = (cmd: string) => {
    onAddLog(`> ${cmd}`, 'action');
    
    switch (cmd) {
      case 'about':
        onAddLog(`IDENTITY: ${PERSONAL_INFO.name}`, 'success');
        onAddLog(`ROLE: ${PERSONAL_INFO.role}`, 'success');
        onAddLog(`GPS: ${PERSONAL_INFO.location}`, 'success');
        onAddLog(`STATUS: ${PERSONAL_INFO.academicTerm}`, 'success');
        break;

      case 'contact':
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
          onAddLog('Scrolling view frames to #inbound-contact-socket', 'success');
        } else {
          onAddLog('Error loading section targets', 'error');
        }
        break;

      case 'github':
        onAddLog('Launching outbound redirect: https://github.com/OjaswaMaurya', 'warning');
        window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
        break;

      case 'skills':
        const skillsEl = document.getElementById('skills');
        if (skillsEl) {
          skillsEl.scrollIntoView({ behavior: 'smooth' });
          onAddLog('Scrolling viewport to #system-capabilities-index', 'success');
        } else {
          onAddLog('Error loading capability node targets', 'error');
        }
        break;

      case 'aiforge':
        const aiForgeEl = document.getElementById('aiforge');
        if (aiForgeEl) {
          aiForgeEl.scrollIntoView({ behavior: 'smooth' });
          onAddLog('Scrolling viewport to #cognitive-system-forge', 'success');
        } else {
          onAddLog('Error loading AI Forge workspace nodes', 'error');
        }
        break;
      
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-mono text-xs">
      
      {/* Hidden floating toggle pill */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            onAddLog('Virtual diagnostic terminal socket successfully bound.', 'system');
          }}
          className="bg-black/90 border border-primary-orange text-primary-orange px-4 py-3 shadow-[0_0_15px_rgba(255,95,0,0.3)] hover:bg-primary-orange hover:text-black hover:shadow-[0_0_30px_rgba(255,95,0,0.6)] transition-all flex items-center gap-2 cursor-pointer font-bold select-none h-11"
          id="floating-console-toggle"
        >
          <Terminal className="h-4 w-4 animate-pulse text-shadow-orange" />
          <span>ACCESS SYSTEM CLI</span>
        </button>
      )}

      {/* Expanded Interactive terminal window */}
      {isOpen && (
        <div 
          className="bg-black border border-primary-orange shadow-[0_0_40px_rgba(255,95,0,0.25)] w-80 sm:w-96 overflow-hidden flex flex-col h-[380px]"
          id="system-simulation-cli"
        >
          {/* Top header bar */}
          <div className="flex justify-between items-center bg-zinc-950 px-4 py-3 border-b border-primary-orange/20 select-none">
            <div className="flex items-center gap-2 text-primary-orange font-bold">
              <Terminal className="h-3.5 w-3.5 animate-pulse" />
              <span>DIAGNOSTICS_CONSOLE_STREAM</span>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Close console"
              id="system-cli-close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrolling output buffer area */}
          <div 
            ref={logContainerRef}
            className="flex-grow p-4 overflow-y-auto space-y-2.5 bg-black/95 text-[11px] leading-normal text-gray-300"
          >
            {logs.map((log, i) => {
              let typeColors = "text-gray-400";
              if (log.type === 'action') typeColors = "text-secondary-orange";
              if (log.type === 'success') typeColors = "text-primary-orange font-bold";
              if (log.type === 'warning') typeColors = "text-secondary-orange font-bold";
              if (log.type === 'error') typeColors = "text-red-500 font-bold";
              if (log.type === 'system') typeColors = "text-gray-500";
              
              return (
                <div key={i} className="animate-fadeIn">
                  <span className="text-gray-600 select-none mr-1.5">[{log.timestamp}]</span>
                  <span className={typeColors}>{log.text}</span>
                </div>
              );
            })}
          </div>

          {/* Quick links footer shortcuts bar */}
          <div className="px-4 py-1.5 bg-zinc-950/80 border-t border-white/5 flex gap-2 overflow-x-auto text-[9px] text-gray-400 select-none max-w-full">
            <span className="shrink-0 text-gray-600 font-bold">LINKS:</span>
            <button 
              onClick={() => handleShortcutClick('about')}
              className="hover:text-primary-orange cursor-pointer shrink-0"
              id="shortkey-about"
            >
              [about]
            </button>
            <button 
              onClick={() => handleShortcutClick('skills')}
              className="hover:text-primary-orange cursor-pointer shrink-0"
              id="shortkey-skills"
            >
              [skills]
            </button>
            <button 
              onClick={() => handleShortcutClick('aiforge')}
              className="hover:text-primary-orange cursor-pointer shrink-0"
              id="shortkey-aiforge"
            >
              [aiforge]
            </button>
            <button 
              onClick={() => handleShortcutClick('github')}
              className="hover:text-primary-orange cursor-pointer shrink-0"
              id="shortkey-github"
            >
              [github]
            </button>
            <button 
              onClick={() => handleShortcutClick('contact')}
              className="hover:text-primary-orange cursor-pointer shrink-0"
              id="shortkey-contact"
            >
              [contact]
            </button>
          </div>

          {/* Command Prompt Form Input */}
          <form 
            onSubmit={handleCommandSubmit}
            className="flex border-t border-primary-orange/20 bg-black text-xs h-11"
          >
            <div className="flex items-center pl-3 pr-1 text-primary-orange select-none font-bold">
              &gt;_
            </div>
            
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="e.g. type 'help' or click shortcuts"
              className="w-full bg-transparent focus:outline-none text-primary-orange px-2 py-2 text-xs font-mono caret-primary-orange placeholder:text-gray-700"
              id="terminal-prompt-input"
            />
            
            <button
              type="submit"
              className="px-4 bg-primary-orange/10 border-l border-primary-orange/20 text-primary-orange hover:bg-primary-orange hover:text-black transition-colors flex items-center justify-center cursor-pointer"
              id="terminal-prompt-submit"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
