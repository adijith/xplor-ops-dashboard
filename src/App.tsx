import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';

function App() {
  const [activeTab, setActiveTab] = useState('purchase-order');

  return (
    <div className="flex h-screen bg-gray-50 font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;