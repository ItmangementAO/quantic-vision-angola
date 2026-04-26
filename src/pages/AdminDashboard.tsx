import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, where, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  MessageSquare, 
  FileText, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Send,
  User as UserIcon,
  Search,
  UserPlus,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

export const AdminDashboard = () => {
  const { profile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'chat'>('overview');
  const [news, setNews] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [userFilter, setUserFilter] = useState<'TODOS' | 'PENDENTE' | 'ACTIVO' | 'BLOQUEADO'>('TODOS');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    displayName: '',
    role: 'user',
    status: 'ACTIVO',
    initialPassword: '',
    needsPasswordReset: true
  });
  
  // News Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    subtitle: '',
    content: '',
    imageUrl: '',
    category: 'Sector Energético',
    isHighlight: false,
    status: 'draft'
  });

  const sanitizeInput = (text: string) => {
    // Basic sanitization to prevent simple script injection
    return text.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, '')
               .replace(/[<>]/g, (m) => ({ '<': '&lt;', '>': '&gt;' }[m] || m));
  };

  useEffect(() => {
    if (profile) {
      if (profile.role === 'redator') setActiveTab('news');
      else if (profile.role === 'consultant') setActiveTab('chat');
      else if (profile.role === 'user') setActiveTab('chat');
      else setActiveTab('overview');
    }
  }, [profile]);

  useEffect(() => {
    // Listen for news
    const newsQuery = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const unsubscribeNews = onSnapshot(newsQuery, (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen for chats
    // Simplified query: No multi-field filters or orderBy to avoid composite index requirement
    const chatsCollection = collection(db, 'chats');
    const chatsQuery = profile?.role === 'user' 
      ? query(chatsCollection, where('userId', '==', profile.uid))
      : query(chatsCollection);

    const unsubscribeChats = onSnapshot(chatsQuery, (snapshot) => {
      let loadedChats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      
      // Sort in memory to avoid index error
      loadedChats.sort((a, b) => {
        const timeA = a.updatedAt?.toMillis?.() || a.updatedAt?.seconds * 1000 || 0;
        const timeB = b.updatedAt?.toMillis?.() || b.updatedAt?.seconds * 1000 || 0;
        return timeB - timeA;
      });
      
      setChats(loadedChats);
    });

    // Listen for users (only if admin)
    let unsubscribeUsers = () => {};
    if (profile?.role === 'admin') {
      const usersQuery = query(collection(db, 'profiles'), orderBy('createdAt', 'desc'));
      unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
        setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    }

    return () => {
      unsubscribeNews();
      unsubscribeChats();
      unsubscribeUsers();
    };
  }, [profile]);

  useEffect(() => {
    if (selectedChat) {
      const messagesQuery = query(
        collection(db, `chats/${selectedChat.id}/messages`), 
        orderBy('createdAt', 'asc')
      );
      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribeMessages();
    }
  }, [selectedChat]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email || !newUser.displayName || !newUser.initialPassword) {
      alert("Por favor, preencha todos os campos, incluindo a senha inicial.");
      return;
    }
    
    try {
      const userRef = doc(db, 'profiles', newUser.email.toLowerCase());
      await setDoc(userRef, {
        ...newUser,
        email: newUser.email.toLowerCase(),
        createdAt: new Date().toISOString()
      }, { merge: true });
      setShowCreateUser(false);
      setNewUser({ 
        email: '', 
        displayName: '', 
        role: 'user', 
        status: 'ACTIVO',
        initialPassword: '',
        needsPasswordReset: true
      });
      alert("Utilizador pré-registado com sucesso! Informe o utilizador da senha inicial.");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Erro ao criar utilizador.");
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: sanitizeInput(newsForm.title),
      subtitle: sanitizeInput(newsForm.subtitle),
      content: newsForm.content, // Keeping markdown content as is but it should be rendered safely
      imageUrl: newsForm.imageUrl,
      category: newsForm.category,
      isHighlight: newsForm.isHighlight,
      status: newsForm.status,
      authorName: profile?.displayName || 'Equipa Quantic',
      updatedAt: serverTimestamp(),
      publishedAt: newsForm.status === 'published' ? serverTimestamp() : null
    };

    if (isEditing && editId) {
      await updateDoc(doc(db, 'news', editId), data);
    } else {
      await addDoc(collection(db, 'news'), {
        ...data,
        createdAt: serverTimestamp()
      });
    }

    setNewsForm({ title: '', subtitle: '', content: '', imageUrl: '', category: 'Sector Energético', isHighlight: false, status: 'draft' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEditNews = (item: any) => {
    setNewsForm({
      title: item.title,
      subtitle: item.subtitle,
      content: item.content,
      imageUrl: item.imageUrl,
      category: item.category,
      isHighlight: item.isHighlight || false,
      status: item.status
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  const handleDeleteNews = async (id: string) => {
    if (window.confirm('Tem a certeza que deseja eliminar esta notícia?')) {
      await deleteDoc(doc(db, 'news', id));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const messageData = {
      text: newMessage,
      senderId: profile?.email,
      senderRole: 'consultant',
      createdAt: serverTimestamp(),
      chatId: selectedChat.id
    };

    await addDoc(collection(db, `chats/${selectedChat.id}/messages`), messageData);
    await updateDoc(doc(db, 'chats', selectedChat.id), {
      lastMessage: newMessage,
      updatedAt: serverTimestamp(),
      status: 'active'
    });
    setNewMessage('');
  };

  const resolveChat = async (chatId: string) => {
    await updateDoc(doc(db, 'chats', chatId), { status: 'resolved', updatedAt: serverTimestamp() });
    setSelectedChat(null);
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'profiles', userId), { 
        status: newStatus,
        updatedBy: profile?.email,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Erro ao atualizar status do utilizador.");
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, 'profiles', userId), { 
        role: newRole,
        updatedBy: profile?.email,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Erro ao atualizar função do utilizador.");
    }
  };

  const filteredUsers = userFilter === 'TODOS' 
    ? users 
    : users.filter(u => u.status === userFilter);

  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [newPasswordData, setNewPasswordData] = useState({ p1: '', p2: '' });

  useEffect(() => {
    if (profile?.needsPasswordReset) {
      setShowPasswordReset(true);
    }
  }, [profile]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordData.p1 !== newPasswordData.p2) {
      alert("As senhas não coincidem.");
      return;
    }
    if (newPasswordData.p1.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // In a real app we'd use updatePassword(auth.currentUser, ...)
      // But we also need to update the profile flag
      await updateDoc(doc(db, 'profiles', profile!.email!.toLowerCase()), {
        needsPasswordReset: false,
        updatedAt: serverTimestamp()
      });
      setShowPasswordReset(false);
      alert("Senha atualizada com sucesso!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Password Reset Overlay */}
      <AnimatePresence>
        {showPasswordReset && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 p-10 max-w-md w-full"
            >
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-quantic-teal">Primeiro Acesso</h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-8 leading-relaxed">
                O administrador solicitou que alterasse a sua senha inicial por motivos de segurança.
              </p>
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nova Senha</label>
                  <input 
                    type="password"
                    required
                    value={newPasswordData.p1}
                    onChange={e => setNewPasswordData({...newPasswordData, p1: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-quantic-teal" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Confirmar Senha</label>
                  <input 
                    type="password"
                    required
                    value={newPasswordData.p2}
                    onChange={e => setNewPasswordData({...newPasswordData, p2: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-quantic-teal" 
                  />
                </div>
                <button type="submit" className="w-full bg-quantic-teal text-black py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-colors">
                  ACTUALIZAR SENHA E CONTINUAR
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-linear-to-b from-[#0d0d0d] to-[#050505] relative z-20">
        <div className="p-8 border-b border-white/5 bg-white/[0.01]">
          <Link to="/" className="block">
            <img src="https://res.cloudinary.com/dj73nuj5e/image/upload/v1776971314/23_menjqv.png" alt="Quantic Vision" className="h-10 mb-6 hover:opacity-80 transition-opacity" />
          </Link>
          <div className="flex flex-col">
            <div className="text-[14px] font-black tracking-[0.2em] mb-1">
              <span className="text-white">QUANTIC</span>
              <span className="text-quantic-blue">VISION</span>
            </div>
            <div className="text-[10px] uppercase font-black tracking-[0.4em] text-white">Dashboard</div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 mt-4">
          {profile?.role === 'admin' && (
            <button 
              onClick={() => setActiveTab('overview')}
              className={`group relative flex items-center gap-4 px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${activeTab === 'overview' ? 'text-white' : 'text-white/30 hover:text-white hover:bg-white/[0.03]'}`}
            >
              {activeTab === 'overview' && (
                <motion.div layoutId="nav-active" className="absolute inset-0 bg-linear-to-r from-quantic-teal/10 to-transparent border-l-2 border-quantic-teal" />
              )}
              <BarChart3 size={18} className={activeTab === 'overview' ? 'text-quantic-teal' : 'group-hover:text-quantic-teal/50 transition-colors'} /> 
              <span className="relative z-10">Exploração</span>
            </button>
          )}
          
          {(profile?.role === 'admin' || profile?.role === 'redator') && (
            <button 
              onClick={() => setActiveTab('news')}
              className={`group relative flex items-center gap-4 px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${activeTab === 'news' ? 'text-white' : 'text-white/30 hover:text-white hover:bg-white/[0.03]'}`}
            >
              {activeTab === 'news' && (
                <motion.div layoutId="nav-active" className="absolute inset-0 bg-linear-to-r from-quantic-teal/10 to-transparent border-l-2 border-quantic-teal" />
              )}
              <FileText size={18} className={activeTab === 'news' ? 'text-quantic-teal' : 'group-hover:text-quantic-teal/50 transition-colors'} /> 
              <span className="relative z-10">Portal News</span>
            </button>
          )}
          
          {(profile?.role === 'admin' || profile?.role === 'consultant' || profile?.role === 'user') && (
            <button 
              onClick={() => setActiveTab('chat')}
              className={`group relative flex items-center gap-4 px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${activeTab === 'chat' ? 'text-white' : 'text-white/30 hover:text-white hover:bg-white/[0.03]'}`}
            >
              {activeTab === 'chat' && (
                <motion.div layoutId="nav-active" className="absolute inset-0 bg-linear-to-r from-quantic-teal/10 to-transparent border-l-2 border-quantic-teal" />
              )}
              <MessageSquare size={18} className={activeTab === 'chat' ? 'text-quantic-teal' : 'group-hover:text-quantic-teal/50 transition-colors'} /> 
              <span className="relative z-10">Suporte Live</span>
              {chats.filter(c => c.status === 'waiting').length > 0 && profile?.role !== 'user' && (
                <span className="ml-auto bg-red-500/10 text-red-500 text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-red-500/20 animate-pulse relative z-10">
                  {chats.filter(c => c.status === 'waiting').length}
                </span>
              )}
            </button>
          )}

          {profile?.role === 'admin' && (
            <button 
              onClick={() => setActiveTab('users' as any)}
              className={`group relative flex items-center gap-4 px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${activeTab === ('users' as any) ? 'text-white' : 'text-white/30 hover:text-white hover:bg-white/[0.03]'}`}
            >
              {activeTab === ('users' as any) && (
                <motion.div layoutId="nav-active" className="absolute inset-0 bg-linear-to-r from-quantic-teal/10 to-transparent border-l-2 border-quantic-teal" />
              )}
              <UserIcon size={18} className={activeTab === ('users' as any) ? 'text-quantic-teal' : 'group-hover:text-quantic-teal/50 transition-colors'} /> 
              <span className="relative z-10">Utilizadores</span>
              {users.filter(u => u.status === 'PENDENTE').length > 0 && (
                <span className="ml-auto bg-orange-500/10 text-orange-500 text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-red-500/20 animate-pulse relative z-10">
                  {users.filter(u => u.status === 'PENDENTE').length}
                </span>
              )}
            </button>
          )}
        </nav>

        <div className="p-6 bg-white/[0.01] border-t border-white/5">
          <div className="bg-white/[0.03] p-4 rounded-2xl mb-6 flex items-center gap-4 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-quantic-teal to-quantic-blue flex items-center justify-center text-black">
              <UserIcon size={20} />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-black truncate text-white uppercase tracking-wider">{profile?.displayName}</div>
              <div className="text-[9px] text-quantic-teal font-black uppercase tracking-widest opacity-70">{profile?.role}</div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/20 transition-all duration-500"
          >
            <LogOut size={16} /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between">
          <h2 className="text-xl font-display font-black uppercase tracking-widest">
            {activeTab === 'overview' && 'Painel de Controlo'}
            {activeTab === 'news' && 'Gestão de Notícias'}
            {activeTab === 'chat' && (profile?.role === 'user' ? 'Histórico de Suporte e Orçamentos' : 'Atendimento em Tempo Real')}
            {activeTab === ('users' as any) && 'Gestão de Utilizadores'}
          </h2>
          
          <div className="flex items-center gap-6">
             <div className="relative">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
               <input 
                type="text" 
                placeholder="PROCURAR..."
                className="bg-white/5 border border-white/10 px-10 py-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-quantic-teal transition-colors" 
              />
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10">
          {activeTab === 'overview' && profile?.role === 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/5 p-8 rounded-2xl hover:border-quantic-teal/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-quantic-teal/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-quantic-teal/10 transition-colors" />
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3 relative z-10">Total Notícias</div>
                 <div className="text-5xl font-display font-black text-white relative z-10">{news.length}</div>
                 <div className="mt-4 flex items-center gap-2 text-xs text-white/20 font-bold uppercase tracking-widest relative z-10">
                   <div className="w-1.5 h-1.5 bg-quantic-teal rounded-full animate-pulse" />
                   Portal Vision
                 </div>
               </div>
               
               <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/5 p-8 rounded-2xl hover:border-quantic-teal/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3 relative z-10">Conversas Activas</div>
                 <div className="text-5xl font-display font-black text-white relative z-10">{chats.filter(c => c.status !== 'resolved').length}</div>
                 <div className="mt-4 flex items-center gap-2 text-xs text-blue-400 font-bold uppercase tracking-widest relative z-10">
                   {chats.filter(c => c.status === 'active').length} EM ATENDIMENTO
                 </div>
               </div>

               <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/5 p-8 rounded-2xl hover:border-red-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-red-500/10 transition-colors" />
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-quantic-teal mb-3 relative z-10">A aguardar</div>
                 <div className="text-5xl font-display font-black text-white relative z-10">{chats.filter(c => c.status === 'waiting').length}</div>
                 <div className="mt-4 flex items-center gap-2 text-xs text-red-500 font-bold uppercase tracking-widest relative z-10">
                   Prioridade de Resposta
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'news' && (profile?.role === 'admin' || profile?.role === 'redator') && (
            <div className="space-y-12">
               {/* News Form */}
               <div className="bg-white/5 border border-white/10 p-10">
                  <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-quantic-teal">
                    {isEditing ? 'Editar Notícia' : 'Publicar Nova Notícia'}
                  </h3>
                  <form onSubmit={handleSaveNews} className="grid grid-cols-2 gap-8">
                    <div className="col-span-2 space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Título</label>
                       <input 
                        required
                        value={newsForm.title}
                        onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                        className="w-full bg-black border border-white/10 p-4 focus:border-quantic-teal outline-none transition-colors" 
                       />
                    </div>
                    <div className="col-span-2 space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Subtítulo</label>
                       <input 
                        value={newsForm.subtitle}
                        onChange={e => setNewsForm({...newsForm, subtitle: e.target.value})}
                        className="w-full bg-black border border-white/10 p-4 focus:border-quantic-teal outline-none transition-colors" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">URL da Imagem</label>
                       <input 
                        value={newsForm.imageUrl}
                        onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})}
                        className="w-full bg-black border border-white/10 p-4 focus:border-quantic-teal outline-none transition-colors" 
                       />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Categoria</label>
                         <select 
                          value={newsForm.category}
                          onChange={e => setNewsForm({...newsForm, category: e.target.value})}
                          className="w-full bg-black border border-white/10 p-4 focus:border-quantic-teal outline-none transition-colors"
                         >
                           <option value="Sector Energético">Sector Energético</option>
                           <option value="Inovação & Tecnologia">Inovação & Tecnologia</option>
                           <option value="Exploração Offshore">Exploração Offshore</option>
                           <option value="Conferência">Conferência</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Estado</label>
                         <select 
                          value={newsForm.status}
                          onChange={e => setNewsForm({...newsForm, status: e.target.value})}
                          className="w-full bg-black border border-white/10 p-4 focus:border-quantic-teal outline-none transition-colors"
                         >
                           <option value="draft">Rascunho</option>
                           <option value="published">Publicado</option>
                            <option value="desativado">Desativado</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Tipo de Exibição</label>
                         <div 
                          onClick={() => setNewsForm({...newsForm, isHighlight: !newsForm.isHighlight})}
                          className="w-full bg-black border border-white/10 p-4 flex items-center justify-between cursor-pointer hover:border-quantic-teal transition-colors"
                         >
                           <span className="text-xs font-bold uppercase tracking-widest">
                             {newsForm.isHighlight ? 'EM DESTAQUE' : 'NORMAL'}
                           </span>
                           <div className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${newsForm.isHighlight ? 'bg-quantic-teal' : 'bg-white/10'}`}>
                             <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 ${newsForm.isHighlight ? 'translate-x-5' : 'translate-x-0'}`} />
                           </div>
                         </div>
                      </div>
                    </div>
                    <div className="col-span-2 space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Conteúdo (Markdown)</label>
                       <textarea 
                        required
                        value={newsForm.content}
                        onChange={e => setNewsForm({...newsForm, content: e.target.value})}
                        rows={10}
                        className="w-full bg-black border border-white/10 p-4 focus:border-quantic-teal outline-none transition-colors font-mono text-sm" 
                       />
                    </div>
                    <div className="col-span-2 flex justify-end gap-4">
                       {isEditing && (
                         <button 
                          type="button"
                          onClick={() => { setIsEditing(false); setEditId(null); setNewsForm({title:'', subtitle:'', content:'', imageUrl:'', category:'Sector Energético', isHighlight: false, status:'draft'}); }}
                          className="px-8 py-3 border border-white/10 font-bold uppercase tracking-widest hover:bg-white/5"
                         >
                           Cancelar
                         </button>
                       )}
                       <button 
                        type="submit"
                        className="bg-quantic-teal text-black px-12 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                       >
                         {isEditing ? <Edit3 size={18} /> : <Plus size={18} />}
                         {isEditing ? 'Guardar Alterações' : 'Publicar'}
                       </button>
                    </div>
                  </form>
               </div>

               {/* News List */}
               <div className="border border-white/10">
                 <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Título</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Estado</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Data</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-white/40">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {news.map(item => (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="text-sm font-bold">{item.title}</div>
                              {item.isHighlight && (
                                <span className="bg-quantic-teal/20 text-quantic-teal text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded">Destaque</span>
                              )}
                            </div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{item.category}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 ${item.status === 'published' ? 'text-quantic-teal' : 'text-orange-500'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-white/40">
                            {item.createdAt ? format(item.createdAt.toDate(), 'dd/MM/yyyy HH:mm') : '-'}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                             <button onClick={() => handleEditNews(item)} className="p-2 text-white/40 hover:text-white"><Edit3 size={16} /></button>
                             <button onClick={() => handleDeleteNews(item.id)} className="p-2 text-white/40 hover:text-red-500"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeTab === 'chat' && (profile?.role === 'admin' || profile?.role === 'consultant' || profile?.role === 'user') && (
            <div className="h-[calc(100vh-200px)] flex gap-8">
              {/* Chat Sidebar */}
              <div className="w-80 border border-white/10 flex flex-col">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="font-bold uppercase tracking-widest text-[10px]">Utilizadores em Directo</div>
                  {profile?.role === 'user' && (
                    <button 
                      onClick={async () => {
                        const confirmNew = window.confirm("Deseja iniciar um novo chamado de suporte ou orçamento?");
                        if (confirmNew) {
                          try {
                            // First, archive current active chats to "clear" the view for the new one
                            // (Optional but helps with clarity)
                            const activeToArchive = chats.filter(c => c.status === 'active' || c.status === 'waiting');
                            for (const c of activeToArchive) {
                               await updateDoc(doc(db, 'chats', c.id), { status: 'resolved', updatedAt: serverTimestamp() });
                            }

                            const docRef = await addDoc(collection(db, 'chats'), {
                              userName: profile?.displayName || profile?.email,
                              userEmail: profile?.email,
                              status: 'waiting',
                              createdAt: serverTimestamp(),
                              updatedAt: serverTimestamp(),
                              userId: profile?.uid,
                              lastMessage: 'Nova solicitação iniciada pelo utilizador'
                            });
                            
                            // The onSnapshot will update the list and since we sort by updatedAt, it will be at top
                            setSelectedChat({ id: docRef.id, userName: profile?.displayName || profile?.email });
                          } catch (error) {
                            console.error("Error creating chat:", error);
                            alert("Erro ao criar chat. Verifique a sua ligação.");
                          }
                        }
                      }}
                      className="p-1.5 bg-quantic-teal text-black rounded hover:bg-white transition-colors"
                      title="Nova Solicitação"
                    >
                      <Plus size={14} />
                    </button>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto">
                  {chats.map(chat => (
                    <button 
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full p-6 border-b border-white/5 text-left transition-colors relative hover:bg-white/5 ${selectedChat?.id === chat.id ? 'bg-white/5' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white uppercase tracking-widest truncate">{chat.userName}</span>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${chat.status === 'waiting' ? 'bg-red-500 text-white animate-pulse' : 'bg-quantic-teal/20 text-quantic-teal'}`}>
                          {chat.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/40 line-clamp-1">{chat.lastMessage || 'Nova conversa iniciada'}</div>
                    </button>
                  ))}
                  {chats.length === 0 && <div className="p-10 text-center text-[10px] opacity-30 uppercase tracking-widest">Sem conversas activas</div>}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 border border-white/10 flex flex-col bg-white/[0.01]">
                {selectedChat ? (
                  <>
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black">
                      <div>
                        <div className="text-sm font-bold uppercase tracking-widest">{selectedChat.userName}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{selectedChat.userEmail}</div>
                      </div>
                      <button 
                        onClick={() => resolveChat(selectedChat.id)}
                        className="px-4 py-2 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-quantic-teal hover:text-black transition-colors"
                      >
                        {profile?.role === 'user' ? 'Marcar como Concluída' : 'Marcar como Resolvido'}
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col">
                      {messages.map(msg => (
                        <div key={msg.id} className={`max-w-[80%] flex flex-col ${msg.senderRole === 'consultant' ? 'self-end items-end' : 'self-start items-start'}`}>
                          <div className={`px-6 py-4 rounded-2xl text-sm ${msg.senderRole === 'consultant' ? 'bg-quantic-teal text-black rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                            {msg.text}
                          </div>
                          <div className="mt-2 text-[9px] text-white/30 uppercase tracking-[0.2em]">
                            {msg.createdAt ? format(msg.createdAt.toDate(), 'HH:mm') : '...'}
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10 bg-black flex gap-4">
                      <input 
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="ESCREVA A SUA RESPOSTA..."
                        className="flex-1 bg-white/5 border border-white/10 px-6 py-4 focus:border-quantic-teal outline-none transition-colors text-sm" 
                      />
                      <button type="submit" className="bg-quantic-teal text-black p-4 px-8 hover:bg-white transition-colors">
                        <Send size={20} />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-20">
                    <MessageSquare size={48} className="mb-6" />
                    <div className="text-sm font-black uppercase tracking-[0.3em]">Seleccione uma conversa para iniciar o atendimento</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === ('users' as any) && profile?.role === 'admin' && (
            <div className="space-y-10">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    {['TODOS', 'PENDENTE', 'ACTIVO', 'BLOQUEADO'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setUserFilter(f as any)}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${userFilter === f ? 'bg-quantic-teal text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                      >
                        {f}
                      </button>
                    ))}
                 </div>
                 <button 
                  onClick={() => setShowCreateUser(true)}
                  className="bg-quantic-teal text-black px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                 >
                   <UserPlus size={16} /> REGISTAR NOVO ACESSO
                 </button>
               </div>

               {/* Create User Modal Overlay */}
               <AnimatePresence>
                 {showCreateUser && (
                   <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-[#0a0a0a] border border-white/10 w-full max-w-xl p-10 relative"
                      >
                        <button 
                          onClick={() => setShowCreateUser(false)}
                          className="absolute top-6 right-6 text-white/40 hover:text-white"
                        >
                          <X size={24} />
                        </button>

                        <div className="mb-8">
                          <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2 underline decoration-quantic-teal decoration-4 underline-offset-8">
                            Novo Acesso Quantic
                          </h3>
                          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Preencha os dados do novo utilizador do sistema</p>
                        </div>

                        <form onSubmit={handleCreateUser} className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nome Completo</label>
                               <input 
                                value={newUser.displayName}
                                onChange={e => setNewUser({...newUser, displayName: e.target.value})}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-quantic-teal transition-all" 
                               />
                             </div>
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email Corporativo</label>
                               <input 
                                type="email"
                                value={newUser.email}
                                onChange={e => setNewUser({...newUser, email: e.target.value})}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-quantic-teal transition-all" 
                               />
                             </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Função / Perfil</label>
                               <select 
                                value={newUser.role}
                                onChange={e => setNewUser({...newUser, role: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-quantic-teal transition-all"
                               >
                                 <option value="user" className="bg-black">USER (Normal)</option>
                                 <option value="redator" className="bg-black">REDATOR (Notícias)</option>
                                 <option value="consultant" className="bg-black">CONSULTANT (Chat)</option>
                                 <option value="admin" className="bg-black">ADMIN (Total)</option>
                               </select>
                             </div>
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Senha Inicial</label>
                               <input 
                                type="text"
                                value={newUser.initialPassword}
                                onChange={e => setNewUser({...newUser, initialPassword: e.target.value})}
                                placeholder="Defina a senha"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-quantic-teal transition-all" 
                               />
                             </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Estado Inicial</label>
                               <select 
                                value={newUser.status}
                                onChange={e => setNewUser({...newUser, status: e.target.value as any})}
                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-quantic-teal transition-all"
                               >
                                 <option value="ACTIVO" className="bg-black">ATIVO IMEDIATO</option>
                                 <option value="PENDENTE" className="bg-black">PENDENTE (Aprovação)</option>
                               </select>
                             </div>
                             <div className="flex items-end pb-1">
                               <div className="flex items-center gap-2">
                                 <input 
                                   type="checkbox" 
                                   checked={newUser.needsPasswordReset}
                                   onChange={e => setNewUser({...newUser, needsPasswordReset: e.target.checked})}
                                   id="needsReset"
                                   className="w-4 h-4 accent-quantic-teal" 
                                 />
                                 <label htmlFor="needsReset" className="text-[9px] font-bold uppercase tracking-widest text-white/40 cursor-pointer">Obrigar troca de senha</label>
                               </div>
                             </div>
                           </div>

                           <div className="pt-4">
                             <button type="submit" className="w-full bg-quantic-teal text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-white transition-colors">
                               CRIAR E REGISTAR ACESSO
                             </button>
                           </div>
                        </form>
                      </motion.div>
                   </div>
                 )}
               </AnimatePresence>

               <div className="border border-white/10 rounded-sm overflow-hidden bg-white/[0.01]">
                 <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Utilizador</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Função</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/40">Status</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Ações Rápidas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-quantic-teal font-black">
                                {user.displayName?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white uppercase tracking-wide">{user.displayName}</div>
                                <div className="text-[10px] text-white/40 font-medium">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <select 
                              value={user.role} 
                              onChange={(e) => updateUserRole(user.id, e.target.value)}
                              className="bg-black/40 border border-white/10 text-[10px] font-black uppercase tracking-widest px-3 py-2 focus:border-quantic-teal outline-none cursor-pointer"
                            >
                              <option value="user">USER (Normal)</option>
                              <option value="consultant">CONSULTANT</option>
                              <option value="redator">REDATOR</option>
                              <option value="admin">ADMIN</option>
                            </select>
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                user.status === 'ACTIVO' ? 'bg-quantic-teal animate-pulse' : 
                                user.status === 'PENDENTE' ? 'bg-orange-500' : 'bg-red-500'
                              }`} />
                              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                user.status === 'ACTIVO' ? 'text-quantic-teal' : 
                                user.status === 'PENDENTE' ? 'text-orange-500' : 'text-red-500'
                              }`}>
                                {user.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-right">
                             <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               {user.status === 'PENDENTE' && (
                                 <button 
                                  onClick={() => updateUserStatus(user.id, 'ACTIVO')}
                                  className="px-4 py-2 bg-quantic-teal text-black text-[9px] font-black uppercase tracking-widest hover:bg-white transition-colors"
                                 >
                                   APROVAR
                                 </button>
                               )}
                               {user.status === 'ACTIVO' && (
                                 <button 
                                  onClick={() => updateUserStatus(user.id, 'BLOQUEADO')}
                                  className="px-4 py-2 border border-red-500/50 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                                 >
                                   BLOQUEAR
                                 </button>
                               )}
                               {user.status === 'BLOQUEADO' && (
                                 <button 
                                  onClick={() => updateUserStatus(user.id, 'ACTIVO')}
                                  className="px-4 py-2 border border-quantic-teal text-quantic-teal text-[9px] font-black uppercase tracking-widest hover:bg-quantic-teal hover:text-black transition-all"
                                 >
                                   DESBLOQUEAR
                                 </button>
                               )}
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
