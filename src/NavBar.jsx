import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const isConnected = localStorage.getItem('isConnected') === 'true';
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Fonction pour appliquer le dark mode au DOM
  const applyDarkMode = (isDark) => {
    const html = document.documentElement;
    const body = document.body;
    
    if (isDark) {
      html.classList.add('dark-mode');
      body.classList.add('dark-mode');
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
      html.setAttribute('data-theme', 'light');
    }
  };

  // Chargement initial
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    console.log('Initial load - darkMode:', savedMode);
    setDarkMode(savedMode);
    applyDarkMode(savedMode);
  }, []);

  // Toggle avec force update
  const toggleDarkMode = () => {
    console.log('🔘 Toggle clicked! Current state:', darkMode);
    
    const newMode = !darkMode;
    console.log('New mode:', newMode);
    
    // 1. Update state
    setDarkMode(newMode);
    
    // 2. Update localStorage
    localStorage.setItem('darkMode', String(newMode));
    
    // 3. Force update DOM immédiatement (ne pas attendre le re-render)
    applyDarkMode(newMode);
    
    // 4. Dispatch event pour les autres composants
    window.dispatchEvent(new CustomEvent('darkModeChanged', { 
      detail: { darkMode: newMode } 
    }));
    
    console.log('✅ Toggle complete. HTML class:', document.documentElement.className);
  };

  const handleLogout = () => {
    localStorage.removeItem('connectedUser');
    localStorage.setItem('isConnected', 'false');
    window.location.href = '/login';
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <Link className="navbar-logo" to="/">
          <img src="/img/logo.png" alt="Enactus Logo" />
          <span>Enactus </span>
        </Link>

        <button 
          className={`navbar-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/')}`} 
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/evenements')}`} 
                to="/evenements"
                onClick={() => setIsOpen(false)}
              >
                Évènements
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/annonces')}`} 
                to="/annonces"
                onClick={() => setIsOpen(false)}
              >
                Annonces
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/about')}`} 
                to="/about"
                onClick={() => setIsOpen(false)}
              >
                À propos
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/contact')}`} 
                to="/contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              type="button"
            >
              {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
            </button>

            {isConnected ? (
              <>
                <Link 
                  to="/profile" 
                  className="nav-btn profile-btn"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-person-circle"></i>
                  Profil
                </Link>
                <button
                  className="nav-btn logout-btn"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Déconnexion
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="nav-btn login-btn"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;