import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../SupaBase';
import '../DetailsEvent.css';

const DetailsEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('Evenement')
        .select('*')
        .eq('id', id)
        .single(); 
      if (error) {
        console.error('Erreur détails event:', error);
        return;
      }
      setEvent(data);
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <div className="details-page-container">
        <div className="grid-overlay"></div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement de l'événement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page-container">
      <div className="grid-overlay"></div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </button> */}

      <div className="details-content">
        <Link to={'/AllEvenement'} className="back-button">
          <i className="bi bi-arrow-left"></i>
          Retour aux événements
        </Link>

        <div className="event-details-card">
          <div className="event-badge">
            <i className="bi bi-calendar-check"></i>
            Événement
          </div>

          <h1>{event.Nom_Evenement}</h1>

          <div className="event-meta">
            <div className="meta-item">
              <i className="bi bi-geo-alt-fill"></i>
              <span>{event.Lieu}</span>
            </div>
            <div className="meta-item">
              <i className="bi bi-calendar-event-fill"></i>
              <span>{event.Date}</span>
            </div>
          </div>

          <div className="event-description">
            <h3>À propos de cet événement</h3>
            <p>{event.Description}</p>
          </div>

          <div className="event-actions">
            <button className="action-btnv primary">
              <i className="bi bi-person-plus"></i>
              S'inscrire à l'événement
            </button>
            <button className="action-btnv secondary">
              <i className="bi bi-share"></i>
              Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsEvent;