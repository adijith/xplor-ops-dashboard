import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/auth/LoginPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import SkeletonPage from './components/skeletons/SkeletonPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [activeTab, setActiveTab] = useState('rolls-usage');

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 font-inter">
        <div className="w-64 bg-white border-r border-gray-200 animate-pulse">
          <div className="p-6">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-white border-b border-gray-200 animate-pulse">
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          <SkeletonPage />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={login} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;