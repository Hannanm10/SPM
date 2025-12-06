import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import DocAnalysis from './components/DocAnalysis';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="app-container">
      <div className="background-effects">
        <div className="blob blob-blue" />
        <div className="blob blob-purple" />
      </div>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'analysis' && <DocAnalysis />}
      </main>
    </div>
  );
}

export default App;
