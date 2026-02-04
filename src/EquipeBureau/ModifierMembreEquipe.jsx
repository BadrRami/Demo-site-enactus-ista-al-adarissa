import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';
import './ModifierMembreEquipe.css';

const ModifierMembreEquipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [genre, setGenre] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // 🔄 Charger le membre
  useEffect(() => {
    const fetchMembre = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Equipe')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        alert('Erreur lors du chargement des données');
        navigate('/equipe');
        return;
      }

      setNom(data.Nom || '');
      setEmail(data.Email || '');
      setPassword(data.Mot_de_pass || '');
      setConfirmPassword(data.Mot_de_pass || '');
      setRole(data.Role || '');
      setGenre(data.Genre || null);
      setLoading(false);
    };
    fetchMembre();
  }, [id, navigate]);

  // ✅ Modifier membre
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !email || !password || !confirmPassword || !role) {
      alert('Vous devez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      alert('Les deux mots de passe doivent être identiques');
      return;
    }

    if (!genre) {
      alert('Vous devez sélectionner le genre');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from('Equipe')
      .update({
        Nom: nom,
        Email: email,
        Mot_de_pass: password,
        Role: role,
        Genre: genre,
      })
      .eq('id', id);

    setSubmitting(false);

    if (error) {
      console.error(error);
      alert('Erreur lors de la modification');
    } else {
      alert('Membre modifié avec succès ✅');
      navigate('/equipe');
    }
  };

  if (loading) {
    return (
      <div className="modifier-equipe-container">
        <div className="grid-overlay"></div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modifier-equipe-container">
      <div className="grid-overlay"></div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </button> */}

      <div className="modifier-equipe-layout">
        <LeftBar />

        <div className="modifier-equipe-content">
          <div className="form-header">
            <div className="header-icon">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h1>Modifier le Membre</h1>
            <p>Mettez à jour les informations du membre de l'équipe</p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nom">
                    <i className="bi bi-person-fill"></i>
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Entrez le nom complet"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="bi bi-envelope-fill"></i>
                    Adresse email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="bi bi-lock-fill"></i>
                    Mot de passe *
                  </label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mot de passe"
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <i className="bi bi-lock-fill"></i>
                    Confirmer le mot de passe *
                  </label>
                  <div className="password-wrapper">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmez le mot de passe"
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="role">
                  <i className="bi bi-briefcase-fill"></i>
                  Rôle dans l'équipe *
                </label>
                <input
                  type="text"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Responsable Communication, Trésorier..."
                  required
                />
              </div>

              <div className="form-group full-width">
                <label className="label-main">
                  <i className="bi bi-gender-ambiguous"></i>
                  Genre *
                </label>
                <div className="radio-group">
                  <label className={`radio-card ${genre === 'Homme' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="genre"
                      checked={genre === "Homme"}
                      onChange={() => setGenre("Homme")}
                    />
                    <div className="radio-content">
                      <i className="bi bi-gender-male"></i>
                      <span>Homme</span>
                    </div>
                  </label>

                  <label className={`radio-card ${genre === 'Femme' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="genre"
                      checked={genre === "Femme"}
                      onChange={() => setGenre("Femme")}
                    />
                    <div className="radio-content">
                      <i className="bi bi-gender-female"></i>
                      <span>Femme</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate('/equipe')}
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

export default ModifierMembreEquipe;