import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface ContactProps {
  onLogMessage: (text: string, type?: 'system' | 'action' | 'success' | 'warning') => void;
}

export default function Contact({ onLogMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    identity: '',
    signalAddress: '',
    missionDetails: ''
  });

  const [status, setStatus] = useState<'idle' | 'encrypting' | 'dispatching' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [transmissionCode, setTransmissionCode] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Quick validation checks
    if (!formData.identity.trim() || !formData.signalAddress.trim() || !formData.missionDetails.trim()) {
      setErrorMessage('INPUT ERROR: Identity credentials, signal address and mission details must be fully populated.');
      onLogMessage('Failed terminal stream submission: raw values invalid', 'warning');
      return;
    }

    if (!formData.signalAddress.includes('@')) {
      setErrorMessage('INPUT ERROR: Signal address format is invalid (missing schema domain).');
      onLogMessage('Signal address routing failed boundary check', 'warning');
      return;
    }

    // Begin interactive dispatch sequence
    setStatus('encrypting');
    onLogMessage('Encrypting outbound cargo socket payloads...', 'action');

    // Simulate cyber telemetry socket routing stages
    setTimeout(() => {
      setStatus('dispatching');
      onLogMessage('Connecting with server socket host on PORT 3000...', 'warning');

      setTimeout(() => {
        // Complete transmission successfully
        const randomHexCode = Array.from({ length: 16 }, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('').toUpperCase();
        
        setTransmissionCode(randomHexCode);
        setStatus('success');
        onLogMessage(`TRANSMISSION COMPLETE. Encrypted link generated: [${randomHexCode.slice(0, 8)}]`, 'success');

        // Cache message locally to simulate storage persistence
        try {
          const pastMessages = JSON.parse(localStorage.getItem('connection_sigs') || '[]');
          pastMessages.push({
            ...formData,
            timestamp: new Date().toISOString(),
            sig: randomHexCode
          });
          localStorage.setItem('connection_sigs', JSON.stringify(pastMessages));
        } catch (err) {
          // Fallback if full
        }

        // Reset values
        setFormData({ identity: '', signalAddress: '', missionDetails: '' });

      }, 1500);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Core Frame enclosing Contact Form */}
        <div className="relative border border-primary-orange/30 bg-neutral-950 p-6 md:p-14 shadow-[0_0_50px_rgba(255,95,0,0.1)]">
          
          {/* Top-left & Bottom-right decorative terminal port labels */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-primary-orange opacity-40 select-none">
            PORT_3000 // INBOUND
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[9px] text-primary-orange opacity-40 select-none">
            AES_256_ENCRYPTED_FEED
          </div>

          <h2 className="font-sans font-black text-3xl md:text-5xl text-center text-white mb-12 uppercase select-none">
            INITIATE CONNECTION
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Left side Details Block */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-gray-400 font-sans text-base leading-relaxed">
                  Open for technical collaboration on hardware routing designs, remote IoT embedded systems, custom sensor logic configurations, or robust performance-optimized software engineering projects.
                </p>

                <div className="space-y-3 pt-4 border-t border-white/5 font-mono text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary-orange" />
                    <span className="text-white hover:text-primary-orange transition-colors">{PERSONAL_INFO.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary-orange" />
                    <span className="text-white hover:text-primary-orange transition-colors">{PERSONAL_INFO.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary-orange" />
                    <span className="text-white hover:text-primary-orange transition-colors">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>

              {/* Informative terminal warning notice box block */}
              <div className="bg-primary-orange/5 border border-primary-orange/10 p-4 space-y-1.5 font-mono text-[10px] text-gray-500 rounded-sm">
                <p className="text-primary-orange font-bold">&gt;_ MEMORY SOCKET REGISTERS WRITE</p>
                <p>Data transmission leverages modern asynchronous socket encryption. Messages are cached securely in local host storage modules immediately on receipt.</p>
              </div>
            </div>

            {/* Right side contact interactive dispatch form */}
            <div className="relative">
              
              {status === 'success' ? (
                <div className="space-y-6 text-center py-10 border border-primary-orange/35 bg-black/60 p-8 select-none">
                  <div className="h-12 w-12 rounded-full border border-primary-orange/30 bg-primary-orange/10 flex items-center justify-center mx-auto text-primary-orange animate-bounce">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-mono text-sm tracking-widest text-primary-orange font-bold uppercase">
                      SIGNAL DISPATCHED
                    </h3>
                    <p className="text-gray-400 font-sans text-xs">
                      Message payloads successfully routed to server buffer on local disk storage.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-neutral-900 border border-white/10 font-mono text-xs space-y-2">
                    <p className="text-[10px] text-gray-500">DIGITAL SIGNATURE:</p>
                    <p className="text-secondary-orange font-bold select-all break-all">{transmissionCode}</p>
                  </div>

                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 border border-primary-orange text-primary-orange font-mono text-xs uppercase hover:bg-primary-orange hover:text-black transition-all cursor-pointer font-bold"
                    id="success-acknowledged-btn"
                  >
                    RESET SIGNAL TRANSMITTER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/40 p-4 font-mono text-xs text-red-400 flex items-start gap-2 text-left">
                      <ShieldAlert className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Identity box input */}
                    <div className="space-y-1 text-left">
                      <label className="font-mono text-[10px] uppercase text-primary-orange font-bold tracking-wider select-none">
                        &gt; IDENTITY (NAME)
                      </label>
                      <input
                        type="text"
                        name="identity"
                        value={formData.identity}
                        onChange={handleInput}
                        disabled={status !== 'idle'}
                        placeholder="e.g. VISITING OFFICER OR AGENCY"
                        className="w-full bg-black border border-white/15 focus:border-primary-orange text-white font-mono text-xs uppercase px-4 py-3.5 focus:outline-none transition-colors"
                        id="contact-identity-input"
                      />
                    </div>

                    {/* Signal address input */}
                    <div className="space-y-1 text-left">
                      <label className="font-mono text-[10px] uppercase text-primary-orange font-bold tracking-wider select-none">
                        &gt; SIGNAL_ADDRESS (EMAIL)
                      </label>
                      <input
                        type="email"
                        name="signalAddress"
                        value={formData.signalAddress}
                        onChange={handleInput}
                        disabled={status !== 'idle'}
                        placeholder="e.g. SECURE_ROUTE@HOST.COM"
                        className="w-full bg-black border border-white/15 focus:border-primary-orange text-white font-mono text-xs uppercase px-4 py-3.5 focus:outline-none transition-colors"
                        id="contact-address-input"
                      />
                    </div>

                    {/* Mission details textarea input */}
                    <div className="space-y-1 text-left">
                      <label className="font-mono text-[10px] uppercase text-primary-orange font-bold tracking-wider select-none">
                        &gt; MISSION_DETAILS (DESCRIPTION)
                      </label>
                      <textarea
                        name="missionDetails"
                        value={formData.missionDetails}
                        onChange={handleInput}
                        disabled={status !== 'idle'}
                        placeholder="e.g. COOPERATION PROPOSAL SPECIFICATION PROTOCOLS"
                        rows={4}
                        className="w-full bg-black border border-white/15 focus:border-primary-orange text-white font-mono text-xs uppercase px-4 py-3.5 focus:outline-none transition-colors resize-none"
                        id="contact-details-input"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status !== 'idle'}
                    className={`w-full py-4 font-mono text-xs uppercase font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      status !== 'idle'
                        ? 'bg-neutral-900 border border-gray-600 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-orange text-black hover:shadow-[0_0_35px_rgba(255,95,0,0.4)] hover:scale-[1.01]'
                    }`}
                    id="contact-submit-btn"
                  >
                    {status === 'encrypting' && (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> ENCRYPTING TELEMETRY PACKETS...
                      </>
                    )}
                    {status === 'dispatching' && (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-secondary-orange" /> DISPATCHING SATELLITE SIGNAL...
                      </>
                    )}
                    {status === 'idle' && (
                      <>
                        <Send className="h-4 w-4" /> TRANSMIT CARGO DATA
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
