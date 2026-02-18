import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <header className="about-header">
                <h1 className="about-title">Empowering Support Teams</h1>
                <p className="about-subtitle">
                    Our mission is to make customer support seamless, efficient, and
                    delightful for everyone involved.
                </p>
            </header>

            <div className="about-content">
                <section className="about-section image-left">
                    <div className="about-text">
                        <h2>Who We Are</h2>
                        <p>
                            We are a team of passionate developers, designers, and support specialists
                            dedicated to redefining how businesses interact with their customers.
                            Frustrated by clunky, outdated ticket systems, we built SupportHub to be
                            the tool we always wished we had.
                        </p>
                    </div>
                    <div className="about-image">
                        <div className="placeholder-image p1"><span>Our Team</span></div>
                    </div>
                </section>

                <section className="about-section image-right">
                    <div className="about-image">
                        <div className="placeholder-image p2"><span>Our Values</span></div>
                    </div>
                    <div className="about-text">
                        <h2>Our Values</h2>
                        <ul className="values-list">
                            <li><strong>Empathy First:</strong> Understanding the customer is key.</li>
                            <li><strong>Simplicity:</strong> Complexity is the enemy of execution.</li>
                            <li><strong>Speed:</strong> Fast responses build trust.</li>
                            <li><strong>Transparency:</strong> Open communication, always.</li>
                        </ul>
                    </div>
                </section>

                <section className="stats-section">
                    <div className="stat-item">
                        <span className="stat-number">10k+</span>
                        <span className="stat-label">Tickets Solved</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Happy Clients</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label">Support</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
