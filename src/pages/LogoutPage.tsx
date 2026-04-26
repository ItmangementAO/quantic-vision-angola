import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-quantic-teal/10 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-quantic-teal" />
          </div>
        </div>
        
        <h1 className="text-2xl font-display font-black uppercase tracking-tighter mb-4">
          Sessão <span className="text-quantic-teal">Encerrada</span>
        </h1>
        
        <p className="text-black/60 mb-10 text-sm leading-relaxed">
          Você saiu com sucesso da sua conta na Quantic Vision. 
          Seus dados estão protegidos.
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="w-full bg-black text-white py-4 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-quantic-teal hover:text-black transition-all"
          >
            <ArrowLeft size={16} /> Voltar para o Início
          </Link>
          
          <Link 
            to="/login"
            className="text-xs font-bold uppercase tracking-widest text-black/40 hover:text-quantic-teal transition-colors"
          >
            Entrar Novamente
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
