import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserProfile {
  uid: string;
  email: string | null;
  role: 'user' | 'consultant' | 'redator' | 'admin';
  status: 'PENDENTE' | 'ACTIVO' | 'BLOQUEADO' | 'ELIMINADO';
  displayName: string | null;
  createdAt?: string;
  needsPasswordReset?: boolean;
  initialPassword?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, displayName?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const docRef = doc(db, 'profiles', currentUser.uid);
        
        // Listener em tempo real para o perfil
        unsubscribeProfile = onSnapshot(docRef, async (docSnap) => {
          if (docSnap.exists()) {
            const profileData = docSnap.data() as UserProfile;
            if (!profileData.uid) {
               // Vincular UID ao perfil pré-criado
               await setDoc(docRef, { uid: currentUser.uid }, { merge: true });
            }
            setProfile({ ...profileData, uid: currentUser.uid });
          } else {
            // Default profile for new users
            const newProfile: Omit<UserProfile, 'uid'> = {
              email: currentUser.email,
              role: 'user',
              status: 'ACTIVO',
              displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
              createdAt: new Date().toISOString()
            };
            await setDoc(docRef, { ...newProfile, uid: currentUser.uid });
            setProfile({ ...newProfile, uid: currentUser.uid } as UserProfile);
          }
          setLoading(false);
        }, (error) => {
          console.error("Erro ao escutar perfil:", error);
          setLoading(false);
        });
      } else {
        if (unsubscribeProfile) unsubscribeProfile();
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  // --- LÓGICA DE LOGIN ---
  // Esta função autentica o usuário via Firebase Auth.
  // Em caso de erro, a mensagem deve ser tratada no componente LoginPage.
  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  // --- LÓGICA DE REGISTO ---
  // Cria um novo utilizador no Firebase e gera automaticamente um perfil no Firestore.
  const register = async (email: string, pass: string, displayName?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (displayName) {
      await setDoc(doc(db, 'profiles', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        displayName,
        role: 'user',
        status: 'ACTIVO',
        createdAt: new Date().toISOString()
      }, { merge: true });
    }
  };

  // --- RECUPERAÇÃO DE SENHA ---
  // Envia um e-mail oficial do Firebase para o utilizador redefinir a senha.
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, register, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
