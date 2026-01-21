import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from './SupaBase';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await supabase
      .from('Membres')
      .select('*')
      .eq('email', email)
      .single();

    setLoading(false);

    if (error || !data) {
      setError('Email ou mot de passe incorrect');
      return;
    }

    // ✅ LOGIN OK
    localStorage.setItem('connectedUser', JSON.stringify(data));
    localStorage.setItem('isConnected', 'true');
    navigate('/profile');
  };

  return (
    <div className="login-page-container">
      <div className="grid-overlay"></div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </button> */}

      <div className="login-content">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-logo">
            <i className="bi bi-lightning-charge-fill"></i>
          </div>
          <h1>Bienvenue sur</h1>
          <h2>Enactus ISTA AL ADARISSA FES</h2>
          <p>Connectez-vous pour accéder à votre espace membre et découvrir toutes les fonctionnalités de la plateforme.</p>
          <div className="branding-features">
            <div className="feature-item">
              <i className="bi bi-check-circle-fill"></i>
              <span>Gestion des projets</span>
            </div>
            <div className="feature-item">
              <i className="bi bi-check-circle-fill"></i>
              <span>Suivi des événements</span>
            </div>
            <div className="feature-item">
              <i className="bi bi-check-circle-fill"></i>
              <span>Communication d'équipe</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-wrapper">
          <div className="login-card">
            <div className="login-header">
              <h3>Connexion</h3>
              <p>Entrez vos identifiants pour continuer</p>
            </div>

            {error && (
              <div className="error-message">
                <i className="bi bi-exclamation-circle-fill"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Adresse email</label>
                <div className="input-wrapper">
                  <i className="bi bi-envelope-fill"></i>
                  <input
                    type="email"
                    id="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="input-wrapper">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Se souvenir de moi</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Connexion...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right"></i>
                    Se connecter
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>Nouveau sur la plateforme ?</p>
              <Link to="/contact" className="signup-link">
                Contactez-nous pour rejoindre Enactus
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;