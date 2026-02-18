import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import Dashboard from './components/Dashboard';
import './App.css';

const Navigation = () => {
  return (
    <header className="app-header">
      <h1>Support Ticket System</h1>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/tickets" className="nav-link">Tickets</Link>
        <Link to="/new" className="nav-link btn-tickets">New Ticket</Link>
      </nav>
    </header>
  );
};

const AppContent = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Navigation />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/new" element={<TicketForm onTicketCreated={() => navigate('/tickets')} />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
