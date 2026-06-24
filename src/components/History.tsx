import React from 'react';
import { Briefcase, Settings, Cpu, GraduationCap, Compass } from 'lucide-react';

interface HistoryProps {
  onLogMessage: (text: string, type?: 'system' | 'action' | 'success' | 'warning') => void;
}

export default function History({ onLogMessage }: HistoryProps) {

  const handleBentoHover = (boxName: string) => {
    onLogMessage(`Reading operational log blocks of section: [${boxName.toUpperCase()}]`, 'system');
  };

  return (
    <section id="experience" className="py-24 bg-neutral-950 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase mb-16 select-all">
          OPERATIONAL HISTORY
        </h2>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          
          {/* Box 1 (Large Feature column: 2 width, 2 height) */}
          <div 
            onMouseEnter={() => handleBentoHover('Lead Developer')}
            className="md:col-span-2 md:row-span-2 bg-neutral-900/40 p-10 border border-white/5 relative overflow-hidden group hover:border-primary-orange/45 hover:bg-neutral-900/60 transition-all duration-300"
          >
            {/* Massive watermark absolute icon in background */}
            <div className="absolute top-4 right-4 text-white opacity-5 text-[150px] rotate-12 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Compass className="h-44 w-44 animate-pulse text-primary-orange" />
            </div>

            <p className="font-mono text-xs text-primary-orange mb-6 uppercase tracking-wider font-semibold">
              2022 - PRESENT
            </p>
            <h3 className="font-sans font-black text-2xl md:text-3xl text-white mb-4 group-hover:text-primary-orange transition-colors">
              Lead Developer / Researcher
            </h3>
            <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-md font-medium">
              Pioneering real-time environmental monitoring systems using localized mesh networks. Specializing in high-reliability sensor data transmission across remote geographic positions and testing environmental triggers.
            </p>
          </div>

          {/* Box 2 (Medium layout column: 2 width, 1 height) */}
          <div 
            onMouseEnter={() => handleBentoHover('Systems Integration')}
            className="md:col-span-2 bg-primary-orange/5 p-8 border border-primary-orange/20 hover:border-primary-orange transition-colors duration-300 group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-mono text-sm text-primary-orange uppercase tracking-wider font-bold">
                SYSTEMS INTEGRATION
              </h4>
              <Settings className="h-5 w-5 text-primary-orange animate-spin-slow" />
            </div>
            <p className="text-gray-400 font-sans text-xs leading-relaxed font-medium">
              Development of custom firmware modules for ESP32 and STM32 microcontrollers, optimizing core logic paths for low power usage and highly reliable long-range connection profiles.
            </p>
          </div>

          {/* Box 3 (Medium layout column: 2 width, 1 height) */}
          <div 
            onMouseEnter={() => handleBentoHover('Academic Research')}
            className="md:col-span-2 bg-secondary-orange/5 p-8 border border-secondary-orange/20 hover:border-secondary-orange transition-colors duration-300 group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-mono text-sm text-secondary-orange uppercase tracking-wider font-bold">
                ACADEMIC RESEARCH
              </h4>
              <Cpu className="h-5 w-5 text-secondary-orange" />
            </div>
            <p className="text-gray-400 font-sans text-xs leading-relaxed font-medium">
              Contributing code segments to open-source hardware communities and documented structured research focusing on automated disaster hazard warning loops.
            </p>
          </div>

        </div>

        {/* Lower row block: Areas of Interest */}
        <div className="py-8 border-y border-white/5 bg-neutral-900/20 text-center">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
              AREAS OF INTEREST:
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Backend Development", 
                "Game Development", 
                "AI/ML Engineering", 
                "Cloud Computing", 
                "IoT Systems Design"
              ].map((val, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-1 text-xs border border-white/10 text-gray-300 hover:border-primary-orange/45 hover:text-primary-orange transition-colors font-mono cursor-pointer"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
