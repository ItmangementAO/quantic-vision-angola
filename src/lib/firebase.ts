import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import firebaseConfig from '../../firebase-applet-config.json';

/**
 * CONFIGURAÇÃO DO FIREBASE
 * As chaves são importadas de um arquivo JSON centralizado para facilitar
 * a troca entre ambientes (local, dev, produção).
 */
const app = initializeApp(firebaseConfig);

// Instância de Autenticação - Gerencia Login/Logout e Sessões
export const auth = getAuth(app);

// Instância do Banco de Dados - Firestore (NoSQL)
export const db = getFirestore(app);

// Inicialização do Analytics apenas se suportado pelo browser
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export default app;
