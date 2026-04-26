import { Linkedin, Youtube, Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';
import { TooltipWrapper } from './TooltipWrapper';

export const Footer = () => {
  return (
    <footer id="contacto" className="relative pt-24 pb-12 bg-quantic-petrol border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Brand & Socials */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <img 
                src="https://res.cloudinary.com/dj73nuj5e/image/upload/v1776971314/23_menjqv.png" 
                alt="Quantic Vision" 
                className="h-12 md:h-16 w-auto mb-4" 
              />
            </div>
            <p className="text-white/40 text-[13px] font-medium leading-relaxed max-w-sm mb-8">
              Da Tradição à Inovação: A Conectar o Sector Energético ao Futuro. A agência definitiva para B2B Energy & Oil em África.
            </p>
            <div className="flex items-center gap-5 text-white/30">
              <TooltipWrapper content="LinkedIn Business">
                <a href="#" className="hover:text-quantic-teal transition-colors"><Linkedin size={18} /></a>
              </TooltipWrapper>
              <TooltipWrapper content="Canal de Transmissão">
                <a href="#" className="hover:text-white transition-colors"><Youtube size={18} /></a>
              </TooltipWrapper>
              <TooltipWrapper content="Bastidores Corporativos">
                <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
              </TooltipWrapper>
              <TooltipWrapper content="Página de Facebook">
                <a href="#" className="hover:text-white transition-colors"><Facebook size={18} /></a>
              </TooltipWrapper>
            </div>
          </div>

          {/* Offices */}
          <div className="md:col-span-3">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 underline decoration-quantic-teal decoration-2 underline-offset-8">
              ESCRITÓRIOS
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-quantic-teal shrink-0" />
                <span className="text-white/60 text-xs font-bold font-display uppercase tracking-wider">Luanda, Angola</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-quantic-teal shrink-0" />
                <span className="text-white/60 text-xs font-bold font-display uppercase tracking-wider">Parceiros em Houston & Dubai</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 underline decoration-quantic-teal decoration-2 underline-offset-8">
              CONTACTO
            </h5>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-quantic-teal shrink-0" />
                <span className="text-white/60 text-xs font-bold tracking-wider">exec@quanticvision.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-quantic-teal shrink-0" />
                <span className="text-white/60 text-xs font-bold tracking-wider">+244 900 000 000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
            © 2026 Quantic Vision. Todos os direitos reservados.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-white/20 hover:text-white uppercase tracking-[0.2em] transition-colors">Políticas de Privacidade</a>
            <a href="#" className="text-[10px] text-white/20 hover:text-white uppercase tracking-[0.2em] transition-colors">Termos de Serviço</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
