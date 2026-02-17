import React, { useEffect, useState } from 'react';
import LeftBar from './LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from './SupaBase';
import { User, Mail, GraduationCap, Lock, Phone, Check, X } from 'lucide-react';
 import './Parametre.css'

const Parametre = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [filiere, setFiliere] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const [tel, setTel] = useState('');
  const [etatCotisation, setEtatCotisation] = useState(null);
  const [genre, setGenre] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const isConnected = localStorage.getItem('isConnected');
    const storedUser = localStorage.getItem('connectedUser');
    if (!isConnected || !storedUser) navigate('/login');
    else setUser(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    supabase
      .from('Membres')
      .select('*')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setNom(data.Nom ?? '');
          setEmail(data.email ?? '');
          setFiliere(data.Filiere ?? '');
          setTel(data.telephone ?? '');
          setEtatCotisation(data.cotisation ?? null);
          setGenre(data.genre ?? null);
        }
      });
  }, [user]);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !darkMode);
  };

  useEffect(() => {
    if (!motDePasse) {
      setPasswordStrength(0);
      return;
    }
    let strength = 0;
    if (motDePasse.length >= 8) strength += 25;
    if (/[A-Z]/.test(motDePasse)) strength += 25;
    if (/[0-9]/.test(motDePasse)) strength += 25;
    if (/[^A-Za-z0-9]/.test(motDePasse)) strength += 25;
    setPasswordStrength(strength);
  }, [motDePasse]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !email || !filiere || !motDePasse || !confirmerMotDePasse) {
      alert('Vous devez remplir tous les champs');
      return;
    }

    if (motDePasse !== confirmerMotDePasse) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const { error } = await supabase
      .from('Membres')
      .update({
        Nom: nom,
        email,
        Filiere: filiere,
        mot_de_passe: motDePasse,
        cotisation: etatCotisation,
        genre,
        telephone: tel,
      })
      .eq('id', user.id);

    if (!error) {
      alert('Profil mis à jour ✅');
      navigate('/profile');
    }
  };

  return (
    <>
      <div className="layoutProfile">
        <LeftBar />

       

        <div className="contentProfile">
          <div className="page-containerProfile">
            <div className="header-section">
              <h1 className="page-title">🔒 Paramètres</h1>
              <p className="page-subtitle">Modifiez vos informations personnelles</p>
            </div>

            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Nom complet
                    </label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input 
                        className="form-input" 
                        value={nom} 
                        onChange={e => setNom(e.target.value)}
                        placeholder="Votre nom complet"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={16} />
                      Email
                    </label>
                    <div className="input-wrapper">
                      <Mail size={20} className="input-icon" />
                      <input 
                        className="form-input" 
                        type="email"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <GraduationCap size={16} />
                      Filière
                    </label>
                    <div className="input-wrapper">
                      <GraduationCap size={20} className="input-icon" />
                      <select 
                        className="form-input" 
                        value={filiere} 
                        onChange={e => setFiliere(e.target.value)}
                      >
                        <option value="">-- Sélectionner une filière --</option>
                        <option value="Développement Digital premier année">Développement Digital 1ère année</option>
                        <option value="Développement Digital option full stack">Développement Digital - Full Stack</option>
                        <option value="Infrastructure Digitale">Infrastructure Digitale</option>
                        <option value="Gestion des entreprises première année">Gestion des Entreprises première année</option>
                        <option value="Assistant Administratif">Assistant Administratif</option>
                        <option value="Gestion des entreprises option commerce">Gestion des Entreprises - Commerce</option>
                        <option value="Gestion des entreprises option comptabilité et finance">Gestion des entreprises option comptabilité et finance</option>
                        <option value="Gestion des entreprises option RH">Gestion des Entreprises - RH</option>
                        <option value="Gestion des entreprises option office manager">Gestion des Entreprises - Office Manager</option>
                        <option value="Infographie">Infographie</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={16} />
                      Téléphone
                    </label>
                    <div className="input-wrapper">
                      <Phone size={20} className="input-icon" />
                      <input 
                        className="form-input" 
                        type="tel"
                        value={tel} 
                        onChange={e => setTel(e.target.value)}
                        placeholder="+212 6XX XX XX XX"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Lock size={16} />
                      Nouveau mot de passe
                    </label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input 
                        type="password" 
                        className="form-input" 
                        value={motDePasse} 
                        onChange={e => setMotDePasse(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                    {motDePasse && (
                      <div className="password-strength">
                        <div 
                          className="password-strength-bar" 
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Lock size={16} />
                      Confirmer le mot de passe
                    </label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input 
                        type="password" 
                        className="form-input" 
                        value={confirmerMotDePasse} 
                        onChange={e => setConfirmerMotDePasse(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                    {confirmerMotDePasse && (
                      <div className={`password-match ${motDePasse === confirmerMotDePasse ? 'match' : 'nomatch'}`}>
                        {motDePasse === confirmerMotDePasse ? (
                          <>
                            <Check size={16} />
                            Les mots de passe correspondent
                          </>
                        ) : (
                          <>
                            <X size={16} />
                            Les mots de passe ne correspondent pas
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Genre</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input 
                        type="radio" 
                        name="genre" 
                        value="Homme"
                        checked={genre === 'Homme'}
                        onChange={e => setGenre(e.target.value)}
                      />
                      Homme
                    </label>
                    <label className="radio-option">
                      <input 
                        type="radio" 
                        name="genre" 
                        value="Femme"
                        checked={genre === 'Femme'}
                        onChange={e => setGenre(e.target.value)}
                      />
                      Femme
                    </label>
                  </div>
                </div>

                <div className="button-group">
                  <button 
                    className="cancel-button" 
                    type="button"
                    onClick={() => navigate('/profile')}
                  >
                    Annuler
                  </button>
                  <button className="submit-button" type="submit">
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Parametre;