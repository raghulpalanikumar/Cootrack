import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; // Build upon existing styles

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    return (
        <header className="app-header premium-navbar">
            <div className="logo-container">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>Support<span style={{ color: 'var(--primary)' }}>Hub</span></h1>
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/" className={isActive('/')}>Home</Link>
                <Link to="/about" className={isActive('/about')}>About</Link>
                <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                <Link to="/tickets" className={isActive('/tickets')}>Tickets</Link>
                <Link to="/new" className="nav-link btn-tickets">New Ticket</Link>
            </nav>
        </header>
    );
};

export default Navbar;
