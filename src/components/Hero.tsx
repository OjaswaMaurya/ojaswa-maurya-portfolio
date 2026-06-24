import React from 'react';
import { Phone, Mail, MapPin, Github, ArrowRight, ChevronDown, Terminal, Radio } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HeroProps {
  onLogMessage: (text: string, type?: 'system' | 'action' | 'success' | 'warning') => void;
}

export default function Hero({ onLogMessage }: HeroProps) {
  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onLogMessage('Scanning local databases for complete project index...', 'action');
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onLogMessage('Relaying focus directly to Connection request terminals...', 'success');
    }
  };

  const handleGithubClick = () => {
    onLogMessage('Outbound link request: redirecting user securely to GitHub source root.', 'success');
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center px-4 md:px-8 pt-20 overflow-hidden bg-black"
    >
      {/* Cyberpunk Telemetry Overlay (Floating on desktop) */}
      <div className="absolute top-28 left-6 md:left-12 hidden lg:block z-10 animate-fade-in">
        <div className="border border-primary-orange/30 bg-black/80 backdrop-blur-md p-4 min-w-[280px] text-xs font-mono select-none">
          <div className="flex items-center gap-2 text-primary-orange font-bold mb-3 border-b border-primary-orange/20 pb-1.5 uppercase">
            <Radio className="h-3.5 w-3.5 animate-pulse text-primary-orange" />
            <span>TRANSMITTER DATA FEED</span>
          </div>
          
          <div className="space-y-2 text-gray-400">
            <div className="flex items-center gap-2.5">
              <Phone className="h-3 w-3 text-primary-orange" />
              <span>{PERSONAL_INFO.phone}</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <Mail className="h-3 w-3 text-primary-orange sm:truncate" />
              <span className="truncate max-w-[200px]">{PERSONAL_INFO.email}</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <MapPin className="h-3 w-3 text-primary-orange" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center gap-2.5 pt-1.5 border-t border-white/5">
              <Github className="h-3.5 w-3.5 text-secondary-orange" />
              <a 
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGithubClick}
                className="text-secondary-orange hover:text-primary-orange underline break-all font-semibold transition-all"
                id="hero-floating-github"
              >
                github.com/OjaswaMaurya
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Top right secondary telemetry visual block */}
      <div className="absolute top-28 right-12 hidden lg:block z-10 text-[10px] font-mono opacity-40 select-none text-right">
        <div>CORE STATE: ONLINE</div>
        <div>LATENCY: 14ms</div>
        <div>NET: ADRESSABLE</div>
        <div>GPS_LOC: [19.1601, 73.1908]</div>
      </div>

      {/* Main content centered */}
      <div className="relative text-center z-10 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-orange/10 border border-primary-orange/30 text-[10px] md:text-xs font-mono tracking-[0.2em] text-primary-orange uppercase select-none">
          <Terminal className="h-3 w-3" />
          SYSTEM INITIALIZATION COMPLETE
        </div>

        {/* Huge stylized name */}
        <div className="space-y-1 md:space-y-2 select-all">
          <h1 className="text-5xl sm:text-7xl md:text-[100px] font-black tracking-tighter leading-none text-white font-sans uppercase">
            OJASWA
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-[90px] font-black tracking-tighter leading-none text-primary-orange text-shadow-orange font-sans uppercase">
            MAURYA
          </h1>
        </div>

        {/* Sub-text Role */}
        <div className="inline-block px-5 py-2.5 border border-white/10 bg-white/5 backdrop-blur-sm select-none">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-secondary-orange font-semibold">
            &lt; {PERSONAL_INFO.role} /&gt;
          </p>
        </div>

        {/* Bio snippet */}
        <p className="max-w-md mx-auto text-gray-400 text-xs md:text-sm font-sans px-4 select-none">
          Creating highly robust digital and physical solutions for the next era. Specializing in embedded logic loops, IoT systems engineering, and performant backend development.
        </p>

        {/* Control Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center px-4 max-w-md mx-auto">
          <button
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto px-6 py-3.5 border border-primary-orange text-primary-orange font-mono text-xs uppercase tracking-widest hover:bg-primary-orange hover:text-black hover:scale-105 transition-all duration-300 neon-glow-orange-hover shadow-[0_0_15px_rgba(255,95,0,0.1)] cursor-pointer"
            id="hero-execute-btn"
          >
            EXECUTE MISSION <ArrowRight className="inline h-3.5 w-3.5 ml-1.5" />
          </button>
          
          <button
            onClick={handleScrollToContact}
            className="w-full sm:w-auto px-6 py-3.5 border border-white/25 text-white bg-black/40 hover:border-white/70 font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
            id="hero-log-btn"
          >
            PING PROTOCOL
          </button>
        </div>
      </div>

      {/* Bounce indicator */}
      <div 
        onClick={handleScrollToProjects}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary-orange transition-colors cursor-pointer select-none z-10"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">scroll to traverse</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>

      {/* Ambient glows background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
}
