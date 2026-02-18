import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import Dashboard from './components/Dashboard';
import './App.css';

const AppContent = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/new" element={<TicketForm onTicketCreated={() => navigate('/tickets')} />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
};

export default App;
