import React from 'react';
import { Terminal, Shield, Cpu, Code, Layers, Wrench, ChevronRight } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';

interface SkillsProps {
  onLogMessage: (text: string, type?: 'system' | 'action' | 'success' | 'warning') => void;
}

export default function Skills({ onLogMessage }: SkillsProps) {

  const handleSkillHover = (name: string) => {
    onLogMessage(`Polling skill resource map: ${name} verified (100% stable)`, 'system');
  };

  return (
    <section id="skills" className="py-24 bg-black border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header Title */}
        <h2 className="font-sans font-black text-2xl md:text-4xl text-center text-primary-orange tracking-widest uppercase mb-20 select-all">
          SYSTEM CAPABILITIES
        </h2>

        {/* 4 Column Bento Grid of Capabilties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Progress driven Programming Languages */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 mb-6 border-b border-primary-orange/20 pb-2">
              <div className="h-6 w-1 bg-primary-orange shadow-[0_0_10px_rgba(255,95,0,0.5)]"></div>
              <h4 className="font-mono text-xs uppercase text-primary-orange tracking-widest font-bold">Programming</h4>
            </div>

            <div className="space-y-5">
              {[
                { name: 'C++ / C', level: 90 },
                { name: 'Python', level: 75 },
                { name: 'C# (Game Dev)', level: 50 },
                { name: 'JavaScript / TS', level: 65 }
              ].map((skill, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => handleSkillHover(skill.name)}
                  className="space-y-1.5 cursor-help group"
                >
                  <div className="flex justify-between font-mono text-xs text-gray-300">
                    <span className="group-hover:text-primary-orange transition-colors">{skill.name}</span>
                    <span className="text-primary-orange font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-white/10 w-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-orange shadow-[0_0_8px_rgba(255,95,0,0.5)] transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Core & Backend List */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 mb-6 border-b border-secondary-orange/20 pb-2">
              <div className="h-6 w-1 bg-secondary-orange shadow-[0_0_10px_rgba(255,170,0,0.5)]"></div>
              <h4 className="font-mono text-xs uppercase text-secondary-orange tracking-widest font-bold">Core &amp; Backend</h4>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                "Flask (Micro Services)",
                "REST API Basics",
                "Data Structs (Queues, Stacks)",
                "Algorithm Execution Optimization"
              ].map((val, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => handleSkillHover(val)}
                  className="px-3.5 py-3/5 border border-white/5 bg-neutral-950 px-3 py-2.5 hover:border-secondary-orange/40 hover:bg-black font-mono text-xs text-gray-400 group flex items-center gap-2 transition-colors cursor-help"
                >
                  <span className="text-secondary-orange select-none font-bold">&gt;&gt;</span>
                  <span className="group-hover:text-white">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Web Foundations Interactive Grid Tiles */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 mb-6 border-b border-primary-orange/20 pb-2">
              <div className="h-6 w-1 bg-primary-orange shadow-[0_0_10px_rgba(255,95,0,0.5)]"></div>
              <h4 className="font-mono text-xs uppercase text-primary-orange tracking-widest font-bold">Web Foundations</h4>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {["HTML5", "CSS3 / Sass", "Tailwind CSS", "React SDK"].map((val, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => handleSkillHover(val)}
                  className="border border-white/10 p-4 aspect-square flex flex-col items-center justify-center text-center gap-2 hover:border-primary-orange hover:bg-primary-orange/5 transition-all text-xs cursor-pointer group"
                >
                  <span className="font-mono font-bold text-gray-400 group-hover:text-white text-[10px] break-all">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Tools & Hardware lists with custom chevron markers */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 mb-6 border-b border-secondary-orange/20 pb-2">
              <div className="h-6 w-1 bg-secondary-orange shadow-[0_0_10px_rgba(255,170,0,0.5)]"></div>
              <h4 className="font-mono text-xs uppercase text-secondary-orange tracking-widest font-bold">Tools &amp; Hardware</h4>
            </div>

            <ul className="space-y-4 font-mono text-xs text-gray-400">
              {[
                "Git & GitHub version controls",
                "Arduino IDE integration models",
                "ESP32 & IoT sensor nodes development",
                "STM32 custom controller registers mapping"
              ].map((val, idx) => (
                <li 
                  key={idx}
                  onMouseEnter={() => handleSkillHover(val)}
                  className="flex items-start gap-2 group cursor-help"
                >
                  <ChevronRight className="h-4.5 w-4.5 text-secondary-orange shrink-0 mt-0.5 select-none transition-transform group-hover:translate-x-1" />
                  <span className="group-hover:text-white leading-relaxed">{val}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
