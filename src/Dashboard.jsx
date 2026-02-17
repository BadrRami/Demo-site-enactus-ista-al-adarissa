import React, { useEffect, useState } from 'react';
import LeftBar from './LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import supabase from './SupaBase';
import './Dashboard.css';
import CotisationPie from "./Statistiques/CotisationPie"
import BarFiliere from "./Statistiques/BarFiliere"

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [membres, setMembres] = useState([]);
  const [transactions, settransactions] = useState([]);
  const [event, setevent] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [cotisé, setCotisé]= useState(0)
  const [Noncotisé, setNonCotisé]= useState(0)
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
                  return;
              }
      
              const userObj = JSON.parse(storedUser);
              setUser(userObj);
      
              const allowedRoles = ["president", "vice president", "responsable de communication"];
              if (!allowedRoles.includes(userObj.role)) {
                  navigate('/login');
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
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('Evenement')
        .select('*')
      if (error) {
        console.error('Erreur récupération events:', error);
        return;
      }
      setevent(data || []);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchBudget = async () => {
      const { data, error } = await supabase
        .from('Transactions')
        .select('*')
      if (error) {
        console.error('Erreur récupération transactions:', error);
        return;
      }
      settransactions(data || []);
    };
    fetchBudget();
  }, []);

  // Récupérer le nombre des membres cotisés et non-cotisé
  useEffect(() => {
    const fetchCotisation = async () => {
      const { data, error } = await supabase
        .from('Membres')
        .select('cotisation')

      if (error) {
        console.error('Erreur récupération des cotisations:', error)
        return
      }

      const cotises = data.filter(m => m.cotisation === true).length
      const nonCotises = data.filter(m => m.cotisation === false).length

      setCotisé(cotises)
      setNonCotisé(nonCotises)
    }

    fetchCotisation()
  }, []) // ✅ très important

  

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
  const upCommingEvent =event.filter(e=> e.Date > Date.now()).length
  const revenu = transactions.filter(
  (transaction) => transaction.Type_Transaction === "Revenu"
);

const depense = transactions.filter(
  (transaction) => transaction.Type_Transaction === "Dépense"
);

const totalRevenu = revenu.reduce(
  (sum, t) => sum + Number(t.Montant),
  0
);

const totalDepense = depense.reduce(
  (sum, t) => sum + Number(t.Montant),
  0
);

const budget = totalRevenu - totalDepense;




  return (
    <div className="dashboard-page-container">
      <div className="grid-overlay"></div>

      <div className="dashboard-layout">
        <LeftBar />
        
        <div className="dashboard-content">
          {/* Welcome Card */}
          <div className="welcome-card">
            <div className="welcome-info">
              <h1>Bonjour {user.Nom || 'Utilisateur'} 👋</h1>
              <p>Bienvenue sur votre tableau de bord Enactus</p>
            </div>
            {(user.role === 'president' || user.role === 'vice president') && (
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
                <p className="stat-number">{budget} DH</p>
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
                <p className="stat-number">{upCommingEvent}</p>
                <div className="stat-details">
                  <span className="stat-info">
                    <i className="bi bi-clock-fill"></i>
                    Ce mois-ci
                  </span>
                </div>
              </div>
            </div>


            <div className="stat-content">
            <h3>État de cotisation</h3>
            <CotisationPie cotisé={cotisé} nonCotisé={Noncotisé} />
          </div>

         
                 
             
         
          </div>
           <BarFiliere members={membres} />

         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;