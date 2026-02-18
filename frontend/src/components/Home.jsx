import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Exceptional Support, <br />
                        <span className="highlight-text">Extremely Simplified.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Manage your customer inquiries, track issues, and deliver
                        world-class support with our intuitive platform.
                    </p>
                    <div className="hero-actions">
                        <Link to="/new" className="btn-primary hero-btn">Get Started</Link>
                        <Link to="/about" className="btn-secondary hero-btn">Learn More</Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card c1">
                        <span className="icon">🚀</span>
                        <div>
                            <strong>Fast Resolution</strong>
                            <p>Resolve tickets 2x faster.</p>
                        </div>
                    </div>
                    <div className="floating-card c2">
                        <span className="icon">🛡️</span>
                        <div>
                            <strong>Secure Data</strong>
                            <p>Enterprise-grade security.</p>
                        </div>
                    </div>
                    <div className="gradient-blob"></div>
                </div>
            </section>

            <section className="features-section">
                <h2 className="section-title">Why Choose SupportHub?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Real-time Analytics</h3>
                        <p>Track performance metrics and identify bottlenecks instantly with our live dashboard.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3>Smart Automation</h3>
                        <p>Automate repetitive tasks and focus on complex customer needs.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h3>Team Collaboration</h3>
                        <p>Seamlessly assign tickets, add internal notes, and collaborate with your team.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
