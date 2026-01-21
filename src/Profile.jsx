import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from './LeftBar';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !darkMode);
  };

  useEffect(() => {
    const isConnected = localStorage.getItem('isConnected');
    const storedUser = localStorage.getItem('connectedUser');
    if (!isConnected || !storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="profile-page-container">
        <div className="grid-overlay"></div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="grid-overlay"></div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </button> */}

      <div className="profile-layout">
        <LeftBar />
        
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <i className="bi bi-person-circle"></i>
            </div>
            <div className="profile-title">
              <h1>{user.Nom}</h1>
              <span className="profile-role">{user.role}</span>
            </div>
          </div>

          <div className="profile-cards">
            <div className="info-card">
              <div className="card-header">
                <i className="bi bi-person-fill"></i>
                <h3>Informations Personnelles</h3>
              </div>
              <div className="info-row">
                <span className="info-label">Nom complet</span>
                <span className="info-value">{user.Nom}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <i className="bi bi-book-fill"></i>
                <h3>Formation</h3>
              </div>
              <div className="info-row">
                <span className="info-label">Filière</span>
                <span className="info-value">{user.Filiere}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Statut</span>
                <span className="info-value status-badge">
                  <i className="bi bi-check-circle-fill"></i>
                  Actif
                </span>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <i className="bi bi-shield-fill-check"></i>
                <h3>Rôle & Permissions</h3>
              </div>
              <div className="info-row">
                <span className="info-label">Rôle</span>
                <span className="info-value role-badge">{user.role}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Membre depuis</span>
                <span className="info-value">
                  {new Date().toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="action-btn primary">
              <i className="bi bi-pencil-fill"></i>
              Modifier le profil
            </button>
            <button className="action-btn secondary">
              <i className="bi bi-key-fill"></i>
              Changer le mot de passe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;