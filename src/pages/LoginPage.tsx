import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const { user, login, resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  // --- LÓGICA DE SUBMISSÃO ---
  // Trata tanto o Login quanto a Recuperação de Senha.
  // Para testar localmente, certifique-se de que o e-mail/senha estão ativos no Firebase.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (resetMode) {
        await resetPassword(email);
        setSuccess('E-mail de recuperação enviado! Verifique a sua caixa de entrada.');
        setResetMode(false);
      } else {
        await login(email, password);
        navigate('/admin');
      }
    } catch (err: any) {
      console.error(err);
      if (resetMode) {
        setError('Não foi possível enviar o e-mail. Verifique se o endereço está correto.');
      } else {
        setError('Credenciais inválidas ou erro de conexão. Verifique os seus dados.');
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
              {resetMode ? 'Recuperar' : 'Portal do'} <span className="text-quantic-teal">{resetMode ? 'Acesso' : 'Consultor'}</span>
            </h1>
            <p className="text-black/40 text-[11px] font-bold uppercase tracking-widest mt-2 transition-all">
              {resetMode ? 'Enviaremos instruções para o seu e-mail' : 'Gestão Estratégica e Backoffice'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {(error || success) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`border-l-4 p-4 flex items-start gap-3 ${error ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}
              >
                {error ? (
                  <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                ) : (
                  <Mail size={18} className="text-green-500 shrink-0 mt-0.5" />
                )}
                <p className={`text-xs font-medium ${error ? 'text-red-800' : 'text-green-800'}`}>
                  {error || success}
                </p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@quantic.com"
                  className="w-full bg-black/5 border border-black/10 px-12 py-4 text-sm text-black focus:outline-none focus:border-quantic-teal transition-colors placeholder:text-black/30"
                />
              </div>
            </div>

            {!resetMode && (
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50">Senha</label>
                  <button 
                    type="button"
                    onClick={() => {
                      setResetMode(true);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-[9px] font-bold uppercase tracking-widest text-quantic-teal hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/5 border border-black/10 px-12 py-4 text-sm text-black focus:outline-none focus:border-quantic-teal transition-colors placeholder:text-black/30"
                  />
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-quantic-teal hover:text-black transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>{resetMode ? <Mail size={18} /> : <LogIn size={18} />} {resetMode ? 'Enviar instruções' : 'Entrar no sistema'}</>
              )}
            </button>

            {resetMode && (
              <button 
                type="button"
                onClick={() => {
                  setResetMode(false);
                  setError(null);
                  setSuccess(null);
                }}
                className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
              >
                Voltar para o Login
              </button>
            )}
          </form>

          {!resetMode && (
            <div className="mt-8 text-center border-t border-black/5 pt-6">
              <p className="text-[11px] text-black/50 font-medium">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-quantic-teal font-black uppercase tracking-widest hover:underline ml-1">
                  Crie aqui
                </Link>
              </p>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-black/5 text-center">
            <p className="text-[10px] text-black/30 font-bold uppercase tracking-widest leading-relaxed">
              Sistema de segurança Quantic Vision.<br />
              IP detectado e acesso monitorizado.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            ← Voltar para o Site
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
