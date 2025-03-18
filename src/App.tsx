import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'; // New NavBar component
import './index.css';

const FunctionBuilder = lazy(() => import('./pages/FunctionBuilder/FunctionBuilder'));
const JsonLinter = lazy(() => import('./pages/JsonLinter/JsonLinter'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container bg-gray-900 min-h-screen h-screen overflow-hidden flex flex-col">
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
            <Routes>
              <Route path="/json-linter" element={<JsonLinter />} />
              <Route path="/" element={<FunctionBuilder />} />
              <Route path="*" element={<div className="text-white">404 - Page Not Found</div>} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;