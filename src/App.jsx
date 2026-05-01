import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Lab1 from './labs/Lab1';
import Lab2 from './labs/Lab2';
import Lab3 from './labs/Lab3';
import Lab4 from './labs/Lab4';
import Lab5 from './labs/Lab5';

function App() {
  const [activeLab, setActiveLab] = useState('Lab1');

  const renderLab = () => {
    switch(activeLab) {
      case 'Lab1': return <Lab1 />;
      case 'Lab2': return <Lab2 />;
      case 'Lab3': return <Lab3 />;
      case 'Lab4': return <Lab4 />;
      case 'Lab5': return <Lab5 />;
      default: return <Lab1 />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 font-sans overflow-hidden">
      <Sidebar activeLab={activeLab} setActiveLab={setActiveLab} />
      <main className="flex-1 overflow-y-auto relative">
        {renderLab()}
      </main>
    </div>
  );
}

export default App;
