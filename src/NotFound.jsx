import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
// import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-grid-overlay"></div>
      
      {/* Floating animated elements */}
      <div className="notfound-float-element notfound-float-1"></div>
      <div className="notfound-float-element notfound-float-2"></div>
      <div className="notfound-float-element notfound-float-3"></div>

      <div className="notfound-content">
        {/* 404 Giant Text */}
        <div className="notfound-404">
          <span className="notfound-404-text">4</span>
          <span className="notfound-404-text notfound-middle">0</span>
          <span className="notfound-404-text">4</span>
        </div>

        {/* Glitch effect overlay */}
        <div className="notfound-glitch" aria-hidden="true">
          <span>404</span>
          <span>404</span>
        </div>

        {/* Main message */}
        <div className="notfound-message">
          <h1 className="notfound-title">Page Introuvable</h1>
          <p className="notfound-subtitle">
            Oups ! La page que vous recherchez semble avoir disparu dans le vide numérique.
          </p>
          <p className="notfound-description">
            Peut-être que cette page n'existe pas, ou qu'elle a été déplacée vers un nouvel emplacement.
          </p>
        </div>

        {/* Action buttons */}
        <div className="notfound-actions">
          <button 
            className="notfound-btn notfound-btn-primary"
            onClick={() => navigate('/')}
          >
            <Home size={20} />
            Retour à l'accueil
          </button>
          
          <button 
            className="notfound-btn notfound-btn-secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Page précédente
          </button>
        </div>

        {/* Helper links */}
        <div className="notfound-helper">
          <p className="notfound-helper-text">Liens utiles :</p>
          <div className="notfound-links">
            <button onClick={() => navigate('/')} className="notfound-link">
              Accueil
            </button>
            <span className="notfound-separator">•</span>
            <button onClick={() => navigate('/about')} className="notfound-link">
              À propos
            </button>
            <span className="notfound-separator">•</span>
            <button onClick={() => navigate('/contact')} className="notfound-link">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="notfound-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="notfound-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
