import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const PendingApprovalPage = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.status === 'ACTIVO') {
      navigate('/admin');
    }
  }, [profile, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isBlocked = profile?.status === 'BLOQUEADO' || profile?.status === 'ELIMINADO';

  return (
    <div className="min-h-screen bg-quantic-petrol flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-quantic-teal/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-linear-to-r from-quantic-blue/5 to-transparent pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 p-12 rounded-2xl shadow-2xl text-center relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className={`p-6 rounded-full ${isBlocked ? 'bg-red-500/10 text-red-500' : 'bg-quantic-teal/10 text-quantic-teal'} animate-pulse`}>
            {isBlocked ? <ShieldAlert size={48} /> : <Clock size={48} />}
          </div>
        </div>

        <h1 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tight">
          {isBlocked ? 'Acesso Interrompido' : 'Conta em Aprovação'}
        </h1>
        
        <p className="text-white/60 mb-10 leading-relaxed font-medium">
          {isBlocked ? (
            'A sua conta foi suspensa ou desativada pela administração da Quantic Vision. Se acredita que isto é um erro, por favor contacte o suporte técnico.'
          ) : (
            'Obrigado por se registar na Quantic Vision. Para garantir a segurança dos dados, todas as contas de consultores e funcionários devem ser validadas manualmente pela administração.'
          )}
        </p>

        {!isBlocked && (
          <div className="bg-white/5 border border-white/5 p-6 rounded-xl mb-10 text-left">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-quantic-teal mb-2">Próximos Passos:</h3>
            <ul className="space-y-2 text-xs text-white/40 font-bold">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-quantic-teal rotate-45" /> Verificação de Identidade
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-quantic-teal rotate-45" /> Atribuição de Permissões
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-quantic-teal rotate-45" /> Notificação por E-mail
              </li>
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-quantic-teal text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors rounded-xl shadow-lg shadow-quantic-teal/20"
          >
            Verificar Status
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full py-4 border border-white/10 text-white/40 font-black uppercase tracking-[0.2em] text-xs hover:bg-white/5 transition-colors rounded-xl flex items-center justify-center gap-3"
          >
            <LogOut size={16} /> Terminar Sessão
          </button>
        </div>
      </motion.div>
    </div>
  );
};
