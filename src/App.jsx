import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './contexts/ProjectContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Validators from './pages/Validators.jsx';
import ValidatorDetail from './pages/ValidatorDetail.jsx';
import Blocks from './pages/Blocks';
import Transactions from './pages/Transactions';
import TransactionDetail from './pages/TransactionDetail.jsx';
import Staking from './pages/Staking';
import Governance from './pages/Governance';
import ProposalDetail from './pages/ProposalDetail.jsx';
import Assets from './pages/Assets';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/validators" element={<Validators />} />
              <Route path="/validators/:id" element={<ValidatorDetail />} />
              <Route path="/blocks" element={<Blocks />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/:hash" element={<TransactionDetail />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/governance/proposals/:id" element={<ProposalDetail />} />
              <Route path="/assets" element={<Assets />} />
            </Routes>
          </Layout>
        </Router>
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;


