import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';
import './ModifierMembre.css'
const ModifierMembre = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [filiere, setFiliere] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const [tel, setTel] = useState('');
  const [etatCotisation, setEtatCotisation] = useState(null);
  const [genre, setGenre] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  
  // 🔐 Vérification connexion
  useEffect(() => {
                          const isConnected = localStorage.getItem('isConnected');
                          const storedUser = localStorage.getItem('connectedUser');
                  
                          if (!isConnected || !storedUser) {
                              navigate('/login');
                              return;
                          }
                  
                          const userObj = JSON.parse(storedUser);
                          const role = userObj.role?.trim().toLowerCase();
                          setUser(userObj);
                  
                          const allowedRoles = ["president", "vice president", "responsable rh"];

                            if (!allowedRoles.includes(role)) {
                                navigate('/login');
                            }
  }, [navigate]);

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
    const fetchMembre = async () => {
      const { data, error } = await supabase
        .from('Membres')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setNom(data.Nom ?? '');
      setEmail(data.email ?? '');
      setFiliere(data.Filiere ?? '');
      setTel(data.telephone ?? '');
      setEtatCotisation(data.cotisation ?? null);
      setGenre(data.genre ?? null);
      setMotDePasse(data.mot_de_passe ?? '');
      setConfirmerMotDePasse(data.mot_de_passe ?? '');
    };

    fetchMembre();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !email || !filiere || !motDePasse || !confirmerMotDePasse) {
      alert('❌ Vous devez remplir tous les champs');
      return;
    }

    if (motDePasse !== confirmerMotDePasse) {
      alert('❌ Les deux mots de passe doivent être identiques');
      return;
    }

    if (etatCotisation === null) {
      alert("❌ Vous devez cocher l'état de cotisation");
      return;
    }

    if (!genre) {
      alert('❌ Vous devez cocher le genre');
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('Membres')
      .update({
        statut: 'Membre',
        Nom: nom,
        email: email,
        Filiere: filiere,
        mot_de_passe: motDePasse,
        cotisation: etatCotisation,
        genre: genre,
        telephone: tel,
      })
      .eq('id', id);

    if (error) {
      console.error('Erreur update:', error);
      alert('❌ Erreur lors de la modification');
    } else {
      alert('✅ Membre modifié avec succès !');
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="modifier-membre-wrapper">
      <div className="modifier-membre-grid-overlay"></div>

      

      <LeftBar />

      <div className="modifier-membre-content">
        <h2 className="modifier-membre-title">Modifier un Membre</h2>

        <div className="modifier-form-card">
          <div className="modifier-info-banner">
            <i className="bi bi-info-circle-fill"></i>
            <p className="modifier-info-text">
              Modifiez les informations du membre. Tous les champs sont requis.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modifier-form-group">
              <label className="modifier-form-label label-nom">Nom Complet</label>
              <input 
                className="modifier-input" 
                value={nom} 
                onChange={e => setNom(e.target.value)} 
                placeholder="Nom complet" 
              />
            </div>

            <div className="modifier-form-row-2">
              <div className="modifier-form-group">
                <label className="modifier-form-label label-email">Email</label>
                <input 
                  className="modifier-input" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  type="email"
                  placeholder="exemple@email.com" 
                />
              </div>

              <div className="modifier-form-group">
                <label className="modifier-form-label label-tel"><i class="bi bi-telephone"></i>Téléphone</label>
                <input 
                  className="modifier-input" 
                  value={tel} 
                  onChange={e => setTel(e.target.value)} 
                  placeholder="+212 6XX XXX XXX" 
                />
              </div>
            </div>

            <div className="modifier-form-group">
              <label className="modifier-form-label label-filiere">Filière</label>
              <select 
                className="modifier-select" 
                value={filiere} 
                onChange={e => setFiliere(e.target.value)}
              >
                <option value="">-- Choisir une filière --</option>
                <option value="Développement Digital première année">Développement Digital 1ère année</option>
                <option value="Développement Digital full stack">Développement Digital - Full Stack</option>
                <option value="Gestion des entreprises commerce">Gestion des Entreprises - Commerce</option>
                <option value="Gestion des entreprises RH">Gestion des Entreprises - RH</option>
                <option value="Gestion des entreprises office manager">Gestion des Entreprises - Office Manager</option>
                <option value="Infographie">Infographie</option>
              </select>
            </div>

            <div className="modifier-form-row-2">
              <div className="modifier-form-group">
                <label className="modifier-form-label label-password">Mot de passe</label>
                <input 
                  className="modifier-input" 
                  value={motDePasse} 
                  onChange={e => setMotDePasse(e.target.value)} 
                  type="password" 
                  placeholder="••••••••" 
                />
              </div>

              <div className="modifier-form-group">
                <label className="modifier-form-label label-password">Confirmer</label>
                <input 
                  className="modifier-input" 
                  value={confirmerMotDePasse} 
                  onChange={e => setConfirmerMotDePasse(e.target.value)} 
                  type="password" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="modifier-form-row-2">
              <div className="modifier-radio-wrapper">
                <div className="modifier-radio-title">
                  <i className="bi bi-gender-ambiguous"></i>
                  Genre
                </div>
                <div className="modifier-radio-option">
                  <input 
                    type="radio" 
                    id="homme" 
                    name="genre" 
                    className="modifier-radio-input"
                    checked={genre === 'Homme'} 
                    onChange={() => setGenre('Homme')} 
                  />
                  <label htmlFor="homme" className="modifier-radio-label">👨 Homme</label>
                </div>
                <div className="modifier-radio-option">
                  <input 
                    type="radio" 
                    id="femme" 
                    name="genre" 
                    className="modifier-radio-input"
                    checked={genre === 'Femme'} 
                    onChange={() => setGenre('Femme')} 
                  />
                  <label htmlFor="femme" className="modifier-radio-label">👩 Femme</label>
                </div>
              </div>

              <div className="modifier-radio-wrapper">
                <div className="modifier-radio-title">
                  <i className="bi bi-cash-coin"></i>
                  Cotisation
                </div>
                <div className="modifier-radio-option">
                  <input 
                    type="radio" 
                    id="cotise" 
                    name="etatCotisation" 
                    className="modifier-radio-input"
                    checked={etatCotisation === true} 
                    onChange={() => setEtatCotisation(true)} 
                  />
                  <label htmlFor="cotise" className="modifier-radio-label">✅ Cotisé</label>
                </div>
                <div className="modifier-radio-option">
                  <input 
                    type="radio" 
                    id="nonCotise" 
                    name="etatCotisation" 
                    className="modifier-radio-input"
                    checked={etatCotisation === false} 
                    onChange={() => setEtatCotisation(false)} 
                  />
                  <label htmlFor="nonCotise" className="modifier-radio-label">❌ Non cotisé</label>
                </div>
              </div>
            </div>

            <div className="modifier-buttons-container">
              <button 
                type="button" 
                className="modifier-btn-cancel"
                onClick={() => navigate('/dashboard')}
              >
                Annuler
              </button>
              <button 
                className="modifier-btn-submit" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="modifier-spinner"></span>
                    Modification en cours...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle"></i>
                    Modifier le Membre
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierMembre;