import React from 'react';
import { FunctionBuilder } from './pages/FunctionBuilder/FunctionBuilder';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <main>
        <FunctionBuilder />
      </main>
    </div>
  );
};

export default App;