import React, { useState, useEffect } from 'react';
import { getStats } from '../api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    const fetchStats = async () => {
        try {
            const data = await getStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 5000); // Poll every 5 seconds for updates
        return () => clearInterval(interval);
    }, []);

    if (!stats) return <div>Loading Stats...</div>;

    return (
        <div className="dashboard-grid">
            <div className="stat-card">
                <h3>Total Tickets</h3>
                <p className="stat-value">{stats.total_tickets}</p>
            </div>
            <div className="stat-card">
                <h3>Open Tickets</h3>
                <p className="stat-value">{stats.open_tickets}</p>
            </div>
            <div className="stat-card">
                <h3>Avg Tickets/Day</h3>
                <p className="stat-value">{stats.avg_tickets_per_day}</p>
            </div>

            <div className="stat-card wide">
                <h3>Priority Breakdown</h3>
                <div className="breakdown-grid">
                    {Object.entries(stats.priority_breakdown).map(([key, val]) => (
                        <div key={key} className={`breakdown-item priority-${key}`}>
                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <strong>{val}</strong>
                        </div>
                    ))}
                </div>
            </div>

            <div className="stat-card wide">
                <h3>Category Breakdown</h3>
                <div className="breakdown-grid">
                    {Object.entries(stats.category_breakdown).map(([key, val]) => (
                        <div key={key} className="breakdown-item">
                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <strong>{val}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
