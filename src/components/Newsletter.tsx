import { Reveal } from './Reveal';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  return (
    <section id="newsletter" className="py-24 bg-quantic-petrol border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 industrial-grid opacity-[0.03]"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 p-4 bg-quantic-teal/10 text-quantic-teal rounded-full">
              <Mail size={32} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              INSIGHTS DO SECTOR ENERGÉTICO
            </h2>
            
            <p className="text-white/40 text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-12">
              Assine a nossa newsletter técnica e receba análises estratégicas sobre o mercado Oil & Gas em África diretamente no seu e-mail.
            </p>

            <form className="w-full max-w-md flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="O seu e-mail corporativo" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 text-white text-sm focus:outline-none focus:border-quantic-teal transition-colors"
                required
              />
              <button 
                type="submit"
                className="bg-quantic-teal text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-quantic-blue transition-all flex items-center justify-center gap-2"
              >
                ASSINAR <Send size={14} />
              </button>
            </form>
            
            <p className="mt-6 text-[10px] text-white/20 uppercase font-bold tracking-widest">
              Garantimos a total privacidade dos seus dados.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
