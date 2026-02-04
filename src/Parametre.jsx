import React, { useEffect, useState } from 'react';
import LeftBar from './LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from './SupaBase';
import { User, Mail, GraduationCap, Lock, Phone, Check, X } from 'lucide-react';

const Parametre = () => {
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .layoutProfile {
          display: flex;
          min-height: 100vh;
          background: #000;
          color: white;
          position: relative;
          overflow-x: hidden;
        }

        .layoutProfile::before {
          contentProfile: '';
          position: fixed;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(253,185,19,0.15) 0%, transparent 70%);
          animation: pulse 8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        .contentProfile {
          flex: 1;
          padding-left: 260px;
          position: relative;
          z-index: 1;
        }

        .page-containerProfile {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 40px;
          margin-left: 40px;
        }

        .header-section {
          margin-bottom: 40px;
          animation: slideDown 0.6s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-title {
          font-size: 2.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #FDB913, #ffca4f, #FDB913);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .page-subtitle {
          color: #aaa;
          font-size: 1.1rem;
        }

        .form-container {
          background: rgba(26,26,26,0.8);
          border: 2px solid rgba(253,185,19,0.3);
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 60px rgba(253,185,19,0.1);
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #FDB913;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 15px 20px 15px 50px;
          background: rgba(0,0,0,0.5);
          border: 2px solid rgba(253,185,19,0.2);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #FDB913;
          background: rgba(0,0,0,0.7);
          box-shadow: 0 0 20px rgba(253,185,19,0.2);
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #FDB913;
          opacity: 0.7;
        }

        .password-strength {
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 8px;
        }

        .password-strength-bar {
          height: 100%;
          transition: all 0.3s ease;
          background: linear-gradient(90deg, #ff4444, #ffaa00, #FDB913, #00ff88);
        }

        .password-match {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          font-size: 0.85rem;
        }

        .password-match.match {
          color: #00ff88;
        }

        .password-match.nomatch {
          color: #ff4444;
        }

        .radio-group {
          display: flex;
          gap: 20px;
          margin-top: 10px;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 10px 20px;
          background: rgba(0,0,0,0.3);
          border: 2px solid rgba(253,185,19,0.2);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .radio-option:hover {
          border-color: #FDB913;
          background: rgba(253,185,19,0.1);
        }

        .radio-option input[type="radio"] {
          accent-color: #FDB913;
        }

        .button-group {
          display: flex;
          gap: 15px;
          margin-top: 40px;
        }

        .submit-button {
          flex: 1;
          padding: 18px;
          background: linear-gradient(135deg, #FDB913, #ffca4f);
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          color: #000;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-button::before {
          contentProfile: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .submit-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(253,185,19,0.4);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .cancel-button {
          flex: 1;
          padding: 18px;
          background: transparent;
          border: 2px solid rgba(253,185,19,0.3);
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
        }

        .cancel-button:hover {
          border-color: #FDB913;
          background: rgba(253,185,19,0.1);
        }

        @media (max-width: 768px) {
          .contentProfile {
            padding-left: 0;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: 2rem;
          }

          .form-container {
            padding: 25px;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="layoutProfile">
        <LeftBar />

        <div className="contentProfile">
          <div className="page-containerProfile">
            <div className="header-section">
              <h1 className="page-title">⚙️ Paramètres</h1>
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
                        <option value="">Choisir une filière</option>
                        <option value="Développement Digital">Développement Digital</option>
                        <option value="Gestion des entreprises">Gestion des entreprises</option>
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

                {/* <div className="form-group full-width">
                  <label className="form-label">État de cotisation</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input 
                        type="radio" 
                        name="cotisation" 
                        value="Payé"
                        checked={etatCotisation === 'Payé'}
                        onChange={e => setEtatCotisation(e.target.value)}
                      />
                      Payé
                    </label>
                    <label className="radio-option">
                      <input 
                        type="radio" 
                        name="cotisation" 
                        value="Non payé"
                        checked={etatCotisation === 'Non payé'}
                        onChange={e => setEtatCotisation(e.target.value)}
                      />
                      Non payé
                    </label>
                  </div>
                </div> */}

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