/**
 * Aplicação Principal Quantic Vision
 * Gerencia a estrutura global da Single Page Application (SPA).
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { LandingPage } from './pages/LandingPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { LogoutPage } from './pages/LogoutPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { PendingApprovalPage } from './pages/PendingApprovalPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Helmet } from 'react-helmet-async';

export default function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>Quantic Vision | Marketing Digital para o Setor Energético</title>
        <meta name="description" content="A Quantic Vision é uma agência de marketing digital especializada no setor de energia e petróleo, focada em autoridade B2B e conversão de alta performance." />
        <meta property="og:title" content="Quantic Vision - Marketing de Precisão para Energia" />
        <meta property="og:description" content="Transformamos tecnicismo em autoridade. Estratégias de marketing digital para C-levels e decisores globais." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://res.cloudinary.com/dj73nuj5e/image/upload/v1776971314/23_menjqv.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Router>
        <div className="min-h-screen bg-quantic-petrol text-white font-sans flex flex-col relative overflow-x-hidden selection:bg-quantic-teal/30 selection:text-quantic-teal">
          <div className="relative z-10 flex flex-col min-h-screen">
            
            <Navbar />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/noticias/:id" element={<NewsDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/pendente" element={<PendingApprovalPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>

            <Footer />
            <FloatingCTA />
            
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
