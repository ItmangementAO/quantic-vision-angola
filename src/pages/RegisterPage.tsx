import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const RegisterPage = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // --- REGISTO DE NOVO CONSULTOR ---
  // Esta função cria o utilizador no Firebase Authentication.
  // Certifique-se de configurar as regras de escrita do Firestore no console do Firebase.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 1. Create the auth user and profile with display name
      await register(email, password, displayName);
      
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-8 md:p-12 shadow-2xl">
          <div className="mb-10 text-center">
            <Link to="/">
              <img 
                src="https://res.cloudinary.com/dj73nuj5e/image/upload/v1776971314/23_menjqv.png" 
                alt="Quantic Vision" 
                className="h-16 mx-auto mb-8"
              />
            </Link>
            <h1 className="text-2xl font-display font-black uppercase tracking-tighter text-black">
              Criar <span className="text-quantic-teal">Conta</span>
            </h1>
            <p className="text-black/40 text-[11px] font-bold uppercase tracking-widest mt-2">
              Registo de Acesso à Plataforma
            </p>
          </div>

          <div className="bg-quantic-teal/10 border-l-4 border-quantic-teal p-4 mb-8">
            <p className="text-[10px] leading-relaxed text-black/70 font-bold uppercase tracking-wider">
              Crie a sua conta para iniciar pedidos de suporte, solicitar orçamentos e aceder ao Portal de Notícias Quantic.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3"
              >
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-800 text-xs font-medium">{error}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50 ml-1">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                <input 
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-black/5 border border-black/10 px-12 py-4 text-sm text-black focus:outline-none focus:border-quantic-teal transition-colors placeholder:text-black/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full bg-black/5 border border-black/10 px-12 py-4 text-sm text-black focus:outline-none focus:border-quantic-teal transition-colors placeholder:text-black/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50 ml-1">Senha de Acesso</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-black/5 border border-black/10 px-12 py-4 text-sm text-black focus:outline-none focus:border-quantic-teal transition-colors placeholder:text-black/30"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-quantic-teal hover:text-black transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><UserPlus size={18} /> Registar conta</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-black/5 pt-6">
            <p className="text-xs text-black/40">
              Já tem conta? {' '}
              <Link to="/login" className="text-quantic-teal font-bold hover:underline">
                Entrar agora
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
