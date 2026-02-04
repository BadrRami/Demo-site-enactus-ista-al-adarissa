import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../SupaBase';
import './ModifierEvent.css';

const ModifierEvent = () => {
  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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

  // 🔹 Récupération de l'événement
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Evenement')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erreur chargement event:', error);
        alert('Erreur lors du chargement de l\'événement');
        navigate('/evenement');
        return;
      }

      setNom(data.Nom_Evenement || '');
      setDate(data.Date || '');
      setLieu(data.Lieu || '');
      setDescription(data.Description || '');
      setLoading(false);
    };
    fetchEvent();
  }, [id, navigate]);

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom.trim() || !date || !lieu.trim() || !description.trim()) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    if (new Date(date) <= new Date()) {
      alert('La date doit être future');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from('Evenement')
      .update({
        Nom_Evenement: nom,
        Date: date,
        Lieu: lieu,
        Description: description,
      })
      .eq('id', id);

    setSubmitting(false);

    if (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la modification ❌');
    } else {
      alert('Événement modifié avec succès ✅');
      navigate('/evenement');
    }
  };

  if (loading) {
    return (
      <div className="modifier-event-container">
        <div className="grid-overlay"></div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement de l'événement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modifier-event-container">
      <div className="grid-overlay"></div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </button> */}

      <div className="modifier-event-layout">
        <LeftBar />

        <div className="modifier-event-content">
          <div className="form-header">
            <div className="header-icon">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h1>Modifier l'Événement</h1>
            <p>Mettez à jour les informations de l'événement</p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="eventName">
                    <i className="bi bi-calendar-event"></i>
                    Nom de l'événement *
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Ex: Atelier Entrepreneuriat Social"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventDate">
                    <i className="bi bi-calendar3"></i>
                    Date de l'événement *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="lieu">
                  <i className="bi bi-geo-alt-fill"></i>
                  Lieu de l'événement *
                </label>
                <input
                  type="text"
                  id="lieu"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                  placeholder="Ex: ISTA AL ADARISSA - Salle de conférence"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="eventDescription">
                  <i className="bi bi-file-text-fill"></i>
                  Description de l'événement *
                </label>
                <textarea
                  id="eventDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="6"
                  placeholder="Décrivez l'événement, ses objectifs, le programme prévu..."
                  required
                ></textarea>
                <div className="char-count">
                  {description.length} caractères
                </div>
              </div>

              <div className="form-info">
                <i className="bi bi-info-circle-fill"></i>
                <p>Les modifications seront immédiatement visibles par tous les membres.</p>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate('/evenement')}
                >
                  <i className="bi bi-x-circle"></i>
                  Annuler
                </button>
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner"></span>
                      Modification en cours...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle-fill"></i>
                      Enregistrer les modifications
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierEvent;