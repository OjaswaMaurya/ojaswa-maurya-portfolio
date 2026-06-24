import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HeaderProps {
  onLogMessage: (text: string, type?: 'system' | 'action' | 'success' | 'warning') => void;
}

export default function Header({ onLogMessage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, name: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onLogMessage(`Redirecting camera arrays to [${name.toUpperCase()}] protocol`, 'action');
    }
  };

  const handleConnectClick = () => {
    scrollToSection('contact', 'Contact');
    onLogMessage('Initiating socket connection packet stream', 'warning');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 py-3 border-b border-primary-orange/30 backdrop-blur-md shadow-[0_0_20px_rgba(255,95,0,0.15)]' 
        : 'bg-transparent py-5 border-b border-white/5'
    }`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center" id="nav-container">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero', 'Main Core')}>
          <div className="h-6 w-2 bg-primary-orange animate-pulse"></div>
          <span className="font-mono font-bold tracking-tight text-lg text-primary-orange text-shadow-orange select-none">
            {PERSONAL_INFO.name}
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'education', label: 'Education' },
            { id: 'skills', label: 'Capabilities' },
            { id: 'aiforge', label: 'AI Forge' },
            { id: 'experience', label: 'History' },
            { id: 'contact', label: 'Contact' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id, link.label)}
              className="font-mono text-xs uppercase tracking-wider text-gray-400 hover:text-primary-orange transition-colors cursor-pointer relative py-1 group"
              id={`nav-link-${link.id}`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary-orange transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onLogMessage('Establishing satellite link to GitHub servers', 'action')}
            className="flex items-center gap-1 font-mono text-xs uppercase text-gray-400 hover:text-primary-orange transition-colors cursor-pointer"
            id="nav-link-github-out"
          >
            GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={handleConnectClick}
            className="px-4 py-2 border border-primary-orange text-primary-orange font-mono text-xs uppercase tracking-widest hover:bg-primary-orange hover:text-black transition-all duration-300 neon-glow-orange-hover cursor-pointer"
            id="nav-connect-btn"
          >
            Connect
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary-orange p-1 focus:outline-none cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          id="mobile-nav-toggle"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-primary-orange/30 px-6 py-6 pb-8 space-y-5 animate-fadeIn">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'education', label: 'Education' },
            { id: 'skills', label: 'Capabilities' },
            { id: 'aiforge', label: 'AI Forge' },
            { id: 'experience', label: 'History' },
            { id: 'contact', label: 'Contact' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id, link.label)}
              className="block w-full text-left font-mono text-sm uppercase tracking-wider text-gray-300 hover:text-primary-orange py-2 border-b border-white/5"
              id={`mobile-link-${link.id}`}
            >
              &gt; {link.label}
            </button>
          ))}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-left font-mono text-sm uppercase tracking-wider text-gray-300 hover:text-primary-orange py-2 border-b border-white/5"
            onClick={() => {
              setMobileMenuOpen(false);
              onLogMessage('Establishing links to GitHub profiles', 'action');
            }}
          >
            &gt; GITHUB REPOSITORY
          </a>

          <button
            onClick={handleConnectClick}
            className="w-full text-center py-3 bg-primary-orange/10 border border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-black font-mono text-xs uppercase tracking-widest transition-all duration-300"
            id="mobile-connect-btn"
          >
            INITIATE SOCKET CHANNEL
          </button>
        </div>
      )}
    </nav>
  );
}
