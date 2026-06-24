import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Utensils, 
  Cpu, 
  Terminal, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Check, 
  Code,
  Wrench,
  Activity,
  Github
} from 'lucide-react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';

interface ProjectsProps {
  onLogMessage: (text: string, type?: 'system' | 'action' | 'success' | 'warning') => void;
}

export default function Projects({ onLogMessage }: ProjectsProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(PROJECTS_DATA[0].id);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'console'>('specs');
  const [isCompiling, setIsCompiling] = useState(false);
  const [diagnosticsLogs, setDiagnosticsLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Map icon strings to Lucide components
  const getIcon = (name: string, className: string) => {
    switch (name) {
      case 'Radio':
        return <Radio className={className} />;
      case 'Utensils':
        return <Utensils className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      default:
        return <Terminal className={className} />;
    }
  };

  const handleCardClick = (id: string, title: string) => {
    onLogMessage(`Establishing data terminal connection with Project node: ${title}`, 'action');
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
    } else {
      setSelectedProjectId(id);
      setDiagnosticsLogs([]); // Reset log for newly selected project
      setActiveTab('specs'); // Default tab to specs
    }
  };

  const selectedProject = PROJECTS_DATA.find(p => p.id === selectedProjectId);

  // Trigger compiler simulator inside the clickdown console
  const runDiagnostics = () => {
    if (!selectedProject || isCompiling) return;
    
    setIsCompiling(true);
    setDiagnosticsLogs([]);
    onLogMessage(`Compiling code repositories for node ${selectedProject.title}...`, 'warning');

    const steps = [
      `[INIT] Mounting partition schema ... SUCCESS`,
      `[LOAD] Loading build toolchain (GCC embedded variant) ...`,
      `[CHECK] Validating memory layout constraints ... 1024KB limit verified`,
      `[COMPILE] Porting headers to target C/C++ architecture ...`,
      ...selectedProject.specs.map((s, idx) => `[COMPILE] Parsing logical core statement ${idx + 1} ... OK`),
      `[LINK] Packing runtime variables ...`,
      `[SUCCESS] Compilation complete. Static analysis output: 0 warnings, 0 errors.`,
      `[FLASH] Uploading binary payload to microcontroller memory ...`,
      `[FLASH] 100% written. Verifying checksum CRC16 ... OK.`,
      `[ONLINE] Node ${selectedProject.index} is now fully operational in live stream mode.`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setDiagnosticsLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
        onLogMessage(`Diagnostics complete on node [${selectedProject.title}]! Status: PERFECT.`, 'success');
      }
    }, 450);
  };

  // Scroll mock terminal to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [diagnosticsLogs]);

  return (
    <section id="projects" className="py-24 bg-black border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Heading Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-primary-orange animate-pulse"></span>
              <p className="font-mono text-xs uppercase tracking-widest text-primary-orange">DEPLOYED HARDWARE PROTOCOLS</p>
            </div>
            <h2 className="font-sans font-black text-4xl tracking-tight text-white uppercase sm:text-5xl">
              MISSION LOGS
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400 max-w-sm leading-relaxed">
            Direct telemetry streams from active IoT microcontroller arrays and low-level software optimized for robustness and speed. Use the <strong className="text-primary-orange">clickdown</strong> interface below to run diagnostics.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PROJECTS_DATA.map((project) => {
            const isSelected = selectedProjectId === project.id;
            return (
              <div 
                key={project.id}
                onClick={() => handleCardClick(project.id, project.title)}
                className={`group cursor-pointer border ${
                  isSelected 
                    ? 'border-primary-orange bg-neutral-950 shadow-[0_0_20px_rgba(255,95,0,0.15)]' 
                    : 'border-white/10 bg-neutral-950/60 hover:border-primary-orange/45 hover:bg-neutral-950 hover:shadow-[0_0_15px_rgba(255,95,0,0.05)]'
                } transition-all duration-300 relative flex flex-col justify-between p-6 h-72`}
                id={`project-card-${project.id}`}
              >
                {/* Top header stats */}
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 border ${isSelected ? 'border-primary-orange text-primary-orange' : 'border-white/10 text-gray-500 group-hover:text-primary-orange group-hover:border-primary-orange/50'} transition-all`}>
                    {getIcon(project.iconName, "h-5 w-5")}
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-gray-500">
                    {project.index} / PROTOCOL
                  </span>
                </div>

                {/* Main titles info */}
                <div className="mt-8 space-y-1">
                  <h3 className="font-sans font-bold text-lg text-white group-hover:text-primary-orange transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[10px] text-primary-orange font-semibold tracking-wider">
                    {project.tagline}
                  </p>
                </div>

                {/* Tag lines */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {project.tags.slice(0, 3).map((t, i) => (
                    <span 
                      key={i} 
                      className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Clickdown indicator badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-primary-orange opacity-70 group-hover:opacity-100 transition-opacity">
                  {isSelected ? (
                    <>
                      <span>SHRINK LOG</span>
                      <ChevronUp className="h-3 w-3 animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span>CLICKDOWN LINK</span>
                      <ChevronDown className="h-3 w-3 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CLICKDOWN Console Interface Section */}
        <AnimatePresence>
          {selectedProjectId && selectedProject && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden border border-primary-orange/30 bg-neutral-950 shadow-[0_0_30px_rgba(255,95,0,0.1)] mb-8"
              id="clickdown-panel"
            >
              {/* Header block with glowing telemetry node info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black px-4 py-3 border-b border-primary-orange/20 gap-3">
                <div className="flex items-center gap-3 font-mono text-xs text-primary-orange">
                  <Terminal className="h-4 w-4 animate-pulse text-primary-orange" />
                  <span className="font-bold select-none">[LOGS DAEMON &gt;_ NODE_{selectedProject.index}]</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">{selectedProject.title}</span>
                </div>
                
                {/* Status indicator pill */}
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-orange"></span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-primary-orange uppercase font-semibold">
                    STATUS: {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Clickdown Tabs Navigation */}
              <div className="flex border-b border-white/5 bg-black/40">
                <button
                  onClick={() => {
                    setActiveTab('specs');
                    onLogMessage(`Accessing specification guidelines for ${selectedProject.title}`, 'system');
                  }}
                  className={`px-5 py-3 font-mono text-xs uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer transition-colors ${
                    activeTab === 'specs' 
                      ? 'bg-neutral-900 text-primary-orange border-s-2 border-s-primary-orange font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-neutral-900/50'
                  }`}
                  id="tab-specs"
                >
                  <Code className="h-3.5 w-3.5 animate-pulse text-primary-orange" /> SPECIFICATIONS
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('features');
                    onLogMessage(`Loading core feature modules from compiled flash memory`, 'system');
                  }}
                  className={`px-5 py-3 font-mono text-xs uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer transition-colors ${
                    activeTab === 'features' 
                      ? 'bg-neutral-900 text-primary-orange border-s-2 border-s-primary-orange font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-neutral-900/50'
                  }`}
                  id="tab-features"
                >
                  <Wrench className="h-3.5 w-3.5" /> CORE FEATURES
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('console');
                    onLogMessage(`Opening serial console trace feed`, 'system');
                  }}
                  className={`px-5 py-3 font-mono text-xs uppercase tracking-wider flex items-center gap-2 border-r border-white/5 cursor-pointer transition-colors ${
                    activeTab === 'console' 
                      ? 'bg-neutral-900 text-primary-orange border-s-2 border-s-primary-orange font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-neutral-900/50'
                  }`}
                  id="tab-console"
                >
                  <Activity className="h-3.5 w-3.5 animate-pulse" /> COMPILER DIAGNOSTICS
                </button>
              </div>

              {/* Tab views content area */}
              <div className="p-6 md:p-8 min-h-[220px]">
                {activeTab === 'specs' && (
                  <div className="space-y-4 font-sans text-sm tracking-normal text-gray-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <p className="font-mono text-[10px] text-secondary-orange uppercase tracking-widest font-semibold border-b border-white/5 pb-1 select-none">ARCHITECTURE PROTOCOLS:</p>
                        <ul className="space-y-2.5 list-none pl-0">
                          {selectedProject.specs.map((spec, i) => (
                            <li key={i} className="flex gap-2.5 items-start">
                              <span className="text-primary-orange font-mono font-bold select-none">&gt;&gt;</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4 bg-black/60 p-4 border border-white/5 font-mono text-xs text-gray-400 flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-secondary-orange text-[11px] font-bold select-none">&gt;_ SYSTEM COMPILE PARAMETERS</p>
                          <p>&gt; TOOLCHAIN: XTENSA-ESP32-ELF-GCC</p>
                          <p>&gt; OPT_LEVEL: -Os (MIN MEMORY PRESET)</p>
                          <p>&gt; MAPPED_I/O: REGISTER_MAPPED_STABLE_V2</p>
                          <p>&gt; BAUD_STREAM: 115200bps</p>
                        </div>
                        
                        <a 
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 px-4 py-2 border border-secondary-orange/40 hover:border-primary-orange text-secondary-orange hover:text-primary-orange hover:bg-primary-orange/5 font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all self-start ml-0"
                          id="specs-github-btn"
                          onClick={() => onLogMessage('Redirection target: Ojaswa Maurya Github main profile repository url', 'success')}
                        >
                          <Github className="h-4 w-4" /> ACCESS REPOSITORY ON GITHUB <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <p className="font-mono text-[10px] text-secondary-orange uppercase tracking-widest font-semibold border-b border-white/5 pb-1 select-none">EMBEDDED REGISTERED SUB-MODULES:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 p-3 bg-black/40 border border-white/5"
                        >
                          <div className="h-6 w-6 rounded-full bg-primary-orange/10 border border-primary-orange/30 flex items-center justify-center text-primary-orange select-none">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-xs font-mono text-gray-300 tracking-wide">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-primary-orange/5 border border-primary-orange/20 text-xs font-sans text-gray-400">
                      <strong>Node Calibration Signature:</strong> Validated locally. Every sub-module operates on an asynchronous event-driven interruption paradigm, preventing dead-locks and improving telemetry streaming consistency.
                    </div>
                  </div>
                )}

                {activeTab === 'console' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center flex-wrap gap-3 border-b border-white/5 pb-3 bg-black/20 p-2">
                      <div className="text-xs font-mono text-gray-400">
                        &gt; COMPILE TERMINAL ATTACHED ON COM3: <strong className="text-primary-orange">ONLINE</strong>
                      </div>
                      
                      <button
                        onClick={runDiagnostics}
                        disabled={isCompiling}
                        className={`px-4 py-2 border font-mono text-xs uppercase flex items-center gap-2 transition-all cursor-pointer ${
                          isCompiling 
                            ? 'border-gray-500 text-gray-500 bg-neutral-900 cursor-not-allowed' 
                            : 'border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-black hover:shadow-[0_0_15px_#ff5f00]'
                        }`}
                        id="run-diagnostics-btn"
                      >
                        <Play className="h-3.5 w-3.5" /> {isCompiling ? 'COMPILING REPO...' : 'RUN FIRMWARE COMPILE'}
                      </button>
                    </div>

                    {/* Console window box */}
                    <div className="bg-black border border-white/10 p-4 h-64 overflow-y-auto font-mono text-xs space-y-2.5 text-shadow-orange text-gray-300">
                      {/* Preloaded log statements */}
                      {selectedProject.extraLogs.map((log, i) => (
                        <div key={`init-${i}`} className="text-gray-500">
                          {log}
                        </div>
                      ))}

                      {/* Fresh run log statements */}
                      {diagnosticsLogs.map((log, i) => {
                        let classColors = "text-primary-orange";
                        if (log.includes("[ERROR]")) classColors = "text-red-500";
                        if (log.includes("[INIT]") || log.includes("[SUCCESS]")) classColors = "text-secondary-orange";
                        
                        return (
                          <div key={i} className={`${classColors} animate-fadeIn`}>
                            {log}
                          </div>
                        );
                      })}

                      {isCompiling && (
                        <div className="flex items-center gap-2 text-primary-orange select-none animate-pulse">
                          <span>&gt; Writing flash sectors: Compiling file maps ...</span>
                        </div>
                      )}

                      {!isCompiling && diagnosticsLogs.length === 0 && (
                        <div className="text-gray-500 italic select-none">
                          &gt; Click [RUN FIRMWARE COMPILE] to execute mock telemetry validation and chip flashing.
                        </div>
                      )}
                      
                      <div ref={consoleEndRef} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
