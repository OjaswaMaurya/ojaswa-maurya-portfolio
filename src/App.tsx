import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import AIPlayground from './components/AIPlayground';
import History from './components/History';
import Contact from './components/Contact';
import ConsoleSimulation from './components/ConsoleSimulation';
import { ConsoleMessage } from './types';
import { PERSONAL_INFO } from './data';
import { Github, Linkedin, Twitter, Terminal } from 'lucide-react';

export default function App() {
  const [logs, setLogs] = useState<ConsoleMessage[]>([]);

  // Helper to push real-time diagnostic stream traces
  const handleLogMessage = (
    text: string, 
    type: 'system' | 'action' | 'success' | 'warning' | 'error' = 'system'
  ) => {
    const time = new Date();
    const formattedTime = time.toTimeString().split(' ')[0];
    
    setLogs(prev => [
      ...prev,
      { timestamp: formattedTime, type, text }
    ]);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  // Run on mount to simulate general page loading diagnostics
  useEffect(() => {
    handleLogMessage('INITIALIZING CYBER PROTOCOL SUITE...', 'system');
    handleLogMessage('Loading core files modules indices ... OK.', 'system');
    handleLogMessage('Binding global event interception handlers ... OK.', 'system');
    handleLogMessage('Ready. Satellite telemetry links actively waiting on PORT_3000.', 'success');
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative selection:bg-primary-orange selection:text-black">
      
      {/* Background radial glowing gradients */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary-orange/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-secondary-orange/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Main Core Layout stack */}
      <div className="relative z-10">
        
        {/* Navigation Header */}
        <Header onLogMessage={handleLogMessage} />

        {/* Hero Section */}
        <Hero onLogMessage={handleLogMessage} />

        {/* Projects (Mission Logs clickdown segment) */}
        <Projects onLogMessage={handleLogMessage} />

        {/* Education Section */}
        <Education onLogMessage={handleLogMessage} />

        {/* Skills Section */}
        <Skills onLogMessage={handleLogMessage} />

        {/* AI Forge & Playground Section */}
        <AIPlayground onLogMessage={handleLogMessage} />

        {/* History Section (Bento Grid) */}
        <History onLogMessage={handleLogMessage} />

        {/* Contact Form Section */}
        <Contact onLogMessage={handleLogMessage} />

        {/* Footer info blocks */}
        <footer className="bg-black/90 border-t border-white/5 py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="space-y-1 text-center md:text-left">
              <span className="font-mono text-xs font-bold text-gray-400 select-all">
                {PERSONAL_INFO.name} | STUDENT
              </span>
              <p className="font-mono text-[10px] text-gray-500 tracking-wider select-none">
                DEVELOPING HIGH STABILITY REAL TIME HARDWARE EMULATORS
              </p>
            </div>

            <p className="font-mono text-[10px] text-primary-orange tracking-widest text-shadow-orange select-none">
              &copy; {new Date().getFullYear()} OJASWA MAURYA. BUILT FOR THE VOID.
            </p>

            {/* Redirection Links targeting Ojaswa github */}
            <div className="flex gap-6 items-center select-none">
              <a 
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLogMessage('Outbound link secure trace redirect: GitHub user profile.', 'success')}
                className="font-mono text-xs text-gray-500 hover:text-primary-orange transition-transform hover:scale-105"
                id="footer-github"
              >
                GITHUB
              </a>
              
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogMessage('Trace connection: LinkedIn pipeline is offline (no config).', 'error');
                }}
                className="font-mono text-xs text-gray-500 hover:text-primary-orange transition-transform hover:scale-105"
                id="footer-linkedin"
              >
                LINKEDIN
              </a>
              
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogMessage('Trace connection: Twitter pipeline is offline (no config).', 'error');
                }}
                className="font-mono text-xs text-gray-500 hover:text-primary-orange transition-transform hover:scale-105"
                id="footer-twitter"
              >
                TWITTER
              </a>
            </div>

          </div>
        </footer>

      </div>

      {/* Floating System CLI Simulation Widget Overlay */}
      <ConsoleSimulation 
        logs={logs} 
        onAddLog={handleLogMessage} 
        onClearLogs={handleClearLogs} 
      />

    </div>
  );
}
