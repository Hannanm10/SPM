import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import '../index.css';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon className="icon-sm text-secondary" />
            ) : (
                <Sun className="icon-sm text-warning" />
            )}
        </button>
    );
};

export default ThemeToggle;
