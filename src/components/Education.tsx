import React from 'react';
import { GraduationCap, BookOpen, Award, CheckCircle } from 'lucide-react';
import { EDUCATION_DATA } from '../data';

interface EducationProps {
  onLogMessage: (text: string, type?: 'system' | 'action' | 'success' | 'warning') => void;
}

export default function Education({ onLogMessage }: EducationProps) {
  const getIcon = (name: string, className: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Award':
        return <Award className={className} />;
      default:
        return <GraduationCap className={className} />;
    }
  };

  const handleBlockHover = (degree: string) => {
    onLogMessage(`Reading academic certifications index metadata for: ${degree}`, 'system');
  };

  return (
    <section id="education" className="py-24 bg-neutral-950 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Title Block */}
        <div className="flex items-center gap-4 mb-16 justify-center">
          <h2 className="font-sans font-black text-3xl md:text-4xl text-center text-primary-orange tracking-tight uppercase">
            ACADEMIC PROTOCOLS
          </h2>
        </div>

        {/* Academic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATION_DATA.map((item) => {
            const isBTech = item.id === 'btech';
            return (
              <div 
                key={item.id}
                onMouseEnter={() => handleBlockHover(item.degree)}
                className={`p-8 border ${
                  isBTech 
                    ? 'border-primary-orange bg-black/60 shadow-[0_0_20px_rgba(255,95,0,0.1)]' 
                    : 'border-white/10 bg-black/30 hover:border-secondary-orange/50'
                } transition-all duration-300 relative group`}
                id={`edu-card-${item.id}`}
              >
                {/* Accent top corner code look */}
                <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-gray-500 opacity-60">
                  {isBTech ? 'ACTIVE_TERM' : 'ARCHIVE_VERIFIED'}
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 border ${
                    isBTech ? 'border-primary-orange text-primary-orange' : 'border-white/10 text-secondary-orange'
                  }`}>
                    {getIcon(item.iconName, "h-6 w-6")}
                  </div>
                  <span className="font-mono text-xs text-gray-400 group-hover:text-primary-orange transition-colors">
                    {item.period}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-xl text-white group-hover:text-primary-orange transition-colors">
                    {item.degree}
                  </h3>
                  <p className="font-mono text-xs text-secondary-orange">
                    {item.institution}
                  </p>
                </div>

                {item.statusText && (
                  <div className="mt-6 pt-4 border-t border-white/5 flex gap-2 items-start font-mono text-xs text-gray-400">
                    <CheckCircle className="h-4 w-4 text-primary-orange shrink-0 mt-0.5" />
                    <span>{item.statusText}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Terminal footnote */}
        <div className="mt-12 text-center select-none opacity-40">
          <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
            &gt;&gt; SECURE ENCRYPTED ACADEMIC HISTORY INDEX VERDICT: SUCCESS
          </p>
        </div>
      </div>
    </section>
  );
}
