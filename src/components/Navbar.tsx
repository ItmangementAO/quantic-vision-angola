import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Youtube, Instagram, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TooltipWrapper } from './TooltipWrapper';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Metodologia', href: '/#metodologia' },
    { name: 'Serviços', href: '/#servicos' },
    { name: 'Portal Quantic Vision', href: '/noticias' },
    { name: 'Redes Sociais', href: '/#social' },
    { name: 'Contacto', href: '/#contacto' },
    { name: 'Backoffice', href: '/admin' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-md' : 'py-5 bg-white border-b border-black/10'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Bloco do Logotipo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://res.cloudinary.com/dj73nuj5e/image/upload/v1776971314/23_menjqv.png" 
              alt="Quantic Vision" 
              className="h-8 md:h-12 w-auto" 
            />
          </Link>
        </div>

        {/* Desktop Menu - Links de Navegação */}
        <div className="hidden xl:flex items-center gap-6 lg:gap-8 text-[11px] lg:text-[12px] font-bold uppercase tracking-widest text-black/80">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-quantic-teal transition-colors duration-200 whitespace-nowrap"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className="hover:text-quantic-teal transition-colors duration-200 whitespace-nowrap"
              >
                {link.name}
              </Link>
            )
          ))}
          
          {user ? (
            <Link 
              to="/logout"
              className="flex items-center gap-2 hover:text-red-500 transition-colors duration-200 whitespace-nowrap"
            >
              <LogOut size={14} /> Sair
            </Link>
          ) : (
            <Link 
              to="/login"
              className="flex items-center gap-2 hover:text-quantic-teal transition-colors duration-200 whitespace-nowrap"
            >
              <LogIn size={14} /> Entrar
            </Link>
          )}
        </div>

        {/* Bloco de Redes Sociais e CTA */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden 2xl:flex items-center gap-4 text-black/30">
             <TooltipWrapper content="LinkedIn Profissional" position="bottom">
              <a href="#" className="hover:text-quantic-teal transition-colors"><Linkedin size={16} /></a>
             </TooltipWrapper>
             <TooltipWrapper content="Youtube Institutional" position="bottom">
              <a href="#" className="hover:text-quantic-teal transition-colors"><Youtube size={16} /></a>
             </TooltipWrapper>
             <TooltipWrapper content="Instagram Quantic" position="bottom">
              <a href="#" className="hover:text-quantic-teal transition-colors"><Instagram size={16} /></a>
             </TooltipWrapper>
          </div>

          {/* Botão de Contacto Reduzido */}
          <div className="hidden lg:block">
            <TooltipWrapper content="Agende uma Consultoria" position="bottom">
              <Link 
                to="/register"
                className="bg-quantic-teal text-black px-4 lg:px-6 py-2 lg:py-2.5 font-display font-bold text-[10px] lg:text-[11px] uppercase tracking-tight hover:bg-quantic-blue hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                Falar com um Consultor
              </Link>
            </TooltipWrapper>
          </div>

          {/* Alternador de Menu Mobile */}
          <button 
            className="xl:hidden text-black p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-black border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-white/70 hover:text-quantic-teal"
                >
                  {link.name}
                </a>
              ))}
              
              {user ? (
                <Link 
                  to="/logout"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-red-500 hover:text-red-400 flex items-center gap-2"
                >
                  <LogOut size={18} /> Sair
                </Link>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-white/70 hover:text-quantic-teal flex items-center gap-2"
                >
                  <LogIn size={18} /> Entrar
                </Link>
              )}

              <div className="flex gap-6 pt-6 border-t border-white/5">
                <Linkedin size={22} className="text-white/40 hover:text-quantic-teal transition-colors" />
                <Youtube size={22} className="text-white/40 hover:text-quantic-teal transition-colors" />
                <Instagram size={22} className="text-white/40 hover:text-quantic-teal transition-colors" />
              </div>
              <Link 
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-quantic-teal text-black w-full py-4 font-bold uppercase text-xs tracking-[0.2em] mt-2 shadow-md text-center"
              >
                Falar com um Consultor
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
