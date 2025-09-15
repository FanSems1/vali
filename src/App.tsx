import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './contexts/ProjectContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Validators from './pages/Validators';
import Blocks from './pages/Blocks';
import Transactions from './pages/Transactions';
import Staking from './pages/Staking';
import Governance from './pages/Governance';
import Assets from './pages/Assets';
import './App.css';

function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/validators" element={<Validators />} />
              <Route path="/blocks" element={<Blocks />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/assets" element={<Assets />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;