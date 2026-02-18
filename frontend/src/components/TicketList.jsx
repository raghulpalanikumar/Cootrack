import React, { useState, useEffect } from 'react';
import { getTickets, updateTicket } from '../api';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [filters, setFilters] = useState({ category: '', priority: '', status: '', search: '' });

    useEffect(() => {
        fetchTickets();
    }, [filters]);

    const fetchTickets = async () => {
        try {
            const data = await getTickets(filters);
            // Handle pagination or direct array response
            if (data && Array.isArray(data.results)) {
                setTickets(data.results);
            } else if (Array.isArray(data)) {
                setTickets(data);
            } else {
                console.error("Unexpected API response format:", data);
                setTickets([]);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setTickets([]);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateTicket(id, { status: newStatus });
            fetchTickets();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="ticket-list container">
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-main)', fontSize: '2rem' }}>Support Tickets</h2>
            <div className="filters-bar">
                <input
                    name="search"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="input-field"
                    style={{ maxWidth: '300px' }}
                />
                <select name="category" value={filters.category} onChange={handleFilterChange} className="input-field" style={{ width: 'auto' }}>
                    <option value="">All Categories</option>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical</option>
                    <option value="account">Account</option>
                    <option value="general">General</option>
                </select>
                <select name="priority" value={filters.priority} onChange={handleFilterChange} className="input-field" style={{ width: 'auto' }}>
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
                <select name="status" value={filters.status} onChange={handleFilterChange} className="input-field" style={{ width: 'auto' }}>
                    <option value="">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <div className="tickets-grid">
                {tickets.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <h3>No tickets found</h3>
                        <p>Try adjusting your filters or create a new ticket.</p>
                    </div>
                ) : (
                    tickets.map(ticket => (
                        <div key={ticket.id} className={`ticket-card priority-${ticket.priority}`}>
                            <div className="ticket-header">
                                <h4>{ticket.title || 'Untitled Ticket'}</h4>
                                <span className={`status-badge ${ticket.status}`}>
                                    {ticket.status ? ticket.status.replace('_', ' ') : 'Unknown'}
                                </span>
                            </div>
                            <p className="ticket-desc">
                                {(ticket.description || '').substring(0, 100)}
                                {(ticket.description || '').length > 100 ? '...' : ''}
                            </p>
                            <div className="ticket-meta">
                                <span>Category: {ticket.category || 'N/A'}</span>
                                <span>Priority: {ticket.priority || 'Normal'}</span>
                                <span>{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : 'Date unknown'}</span>
                            </div>
                            <div className="ticket-actions">
                                <select
                                    value={ticket.status || 'open'}
                                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                                    className="status-select"
                                >
                                    <option value="open">Open</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TicketList;
