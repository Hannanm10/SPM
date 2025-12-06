import React from 'react';
import { Scale, FileText, Bot } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ activeTab, onTabChange }) => {
    return (
        <nav className="navbar glass-panel">
            <div className="navbar-container">
                <div className="logo-section">
                    <div className="logo-icon-box">
                        <Scale className="icon-md text-white" />
                    </div>
                    <span className="logo-text">
                        IP Law<span className="text-accent">Agent</span>
                    </span>
                </div>

                <div className="nav-links">
                    <button
                        onClick={() => onTabChange('chat')}
                        className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`}
                    >
                        <Bot className="icon-sm" />
                        Legal Assistant
                    </button>
                    <button
                        onClick={() => onTabChange('analysis')}
                        className={`nav-link ${activeTab === 'analysis' ? 'active' : ''}`}
                    >
                        <FileText className="icon-sm" />
                        Doc Analysis
                    </button>
                </div>

                <div className="nav-actions">
                    <ThemeToggle />
                    <button className="btn-signin">
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
