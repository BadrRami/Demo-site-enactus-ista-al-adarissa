import React, { useEffect, useState } from 'react';
import LeftBar from './LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import ListeMembres from './Membres/ListeMembres';
import supabase from './SupaBase';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [membres, setMembres] = useState([]);
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

  // 🔐 Vérification connexion
  useEffect(() => {
    const isConnected = localStorage.getItem('isConnected');
    const storedUser = localStorage.getItem('connectedUser');
    if (!isConnected || !storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // 📥 Récupération des membres
  useEffect(() => {
    const fetchMembres = async () => {
      const { data, error } = await supabase
        .from('Membres')
        .select('*')
        .eq('statut', 'Membre');
      if (error) {
        console.error('Erreur récupération membres:', error);
        return;
      }
      setMembres(data || []);
    };
    fetchMembres();
  }, []);

  if (!user) {
    return (
      <div className="dashboard-page-container">
        <div className="grid-overlay"></div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  const femmes = membres.filter(m => m.genre === 'Femme').length;
  const hommes = membres.filter(m => m.genre === 'Homme').length;

  return (
    <div className="dashboard-page-container">
      <div className="grid-overlay"></div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </button> */}

      <div className="dashboard-layout">
        <LeftBar />
        
        <div className="dashboard-content">
          {/* Welcome Card */}
          <div className="welcome-card">
            <div className="welcome-info">
              <h1>Bonjour {user.Nom || 'Utilisateur'} 👋</h1>
              <p>Bienvenue sur votre tableau de bord Enactus</p>
            </div>
            {(user.role === 'president' || user.role === 'VICE TEAM LEADER') && (
              <div className="welcome-actions">
                <Link to="/ajouterMembre" className="action-btnn primary">
                  <i className="bi bi-person-plus-fill"></i>
                  Ajouter Membre
                </Link>
                <Link to="/ajouterMembreEquipe" className="action-btnn secondary">
                  <i className="bi bi-people-fill"></i>
                  Ajouter à l'Équipe
                </Link>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon members">
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="stat-content">
                <h3>Membres Actifs</h3>
                <p className="stat-number">{membres.length}</p>
                <div className="stat-details">
                  <span className="stat-badge female">
                    <i className="bi bi-gender-female"></i>
                    {femmes} Femmes
                  </span>
                  <span className="stat-badge male">
                    <i className="bi bi-gender-male"></i>
                    {hommes} Hommes
                  </span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon budget">
                <i className="bi bi-cash-stack"></i>
              </div>
              <div className="stat-content">
                <h3>Budget Total</h3>
                <p className="stat-number">24.5K DH</p>
                <div className="stat-details">
                  <span className="stat-trend positive">
                    <i className="bi bi-arrow-up"></i>
                    +12% ce mois
                  </span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon events">
                <i className="bi bi-calendar-event-fill"></i>
              </div>
              <div className="stat-content">
                <h3>Événements à venir</h3>
                <p className="stat-number">3</p>
                <div className="stat-details">
                  <span className="stat-info">
                    <i className="bi bi-clock-fill"></i>
                    Ce mois-ci
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Members List Section */}
          <div className="members-section">
            <div className="section-header">
              <h2>Liste des Membres</h2>
              <div className="section-actions">
                <button className="filter-btn">
                  <i className="bi bi-funnel-fill"></i>
                  Filtrer
                </button>
                <button className="export-btn">
                  <i className="bi bi-download"></i>
                  Exporter
                </button>
              </div>
            </div>
            <div className="members-list-container">
              <ListeMembres />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;