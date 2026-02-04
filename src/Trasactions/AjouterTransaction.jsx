import React, { useState, useEffect } from 'react';
import LeftBar from '../LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
import './AjouterTransaction.css';

const AjouterTransaction = () => {
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState('');
  const [montant, setMontant] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [categorie, setCategorie] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!description || !montant || !date || !type || !categorie) {
      alert('Vous devez remplir tous les champs');
      return;
    }

    if (isNaN(montant) || Number(montant) <= 0) {
      alert('Le montant doit être un nombre valide supérieur à 0');
      return;
    }

    setLoading(true);

    const newTransaction = {
      Description: description,
      Montant: parseFloat(montant),
      Date: date,
      Type_Transaction: type,
      Catégorie: categorie,
      Crée_par:user.id
    };

    const { data, error } = await supabase
      .from('Transactions')
      .insert([newTransaction]);

    setLoading(false);

    if (error) {
      console.error('Erreur insertion transaction:', error);
      alert('Erreur lors de l\'ajout de la transaction');
    } else {
      alert('Transaction ajoutée avec succès ✅');
      navigate('/ListeTransaction');
    }
  };

  return (
    <div className="ajouter-transaction-container">
      <div className="grid-overlay"></div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </button> */}

      <div className="ajouter-transaction-layout">
        <LeftBar />

        <div className="ajouter-transaction-content">
          <div className="form-header">
            <div className="header-icon">
              <i className="bi bi-cash-coin"></i>
            </div>
            <h1>Nouvelle Transaction</h1>
            <p>Enregistrez une nouvelle opération financière</p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group full-width">
                <label htmlFor="description">
                  <i className="bi bi-file-text-fill"></i>
                  Description *
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ex: Achat de matériel pour atelier"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="montant">
                    <i className="bi bi-currency-dollar"></i>
                    Montant (DH) *
                  </label>
                  <input
                    type="number"
                    id="montant"
                    value={montant}
                    onChange={e => setMontant(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">
                    <i className="bi bi-calendar3"></i>
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">
                    <i className="bi bi-arrow-left-right"></i>
                    Type de transaction *
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    required
                  >
                    <option value="">Sélectionnez le type</option>
                    <option value="Revenu">💰 Revenu</option>
                    <option value="Dépense">💸 Dépense</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="categorie">
                    <i className="bi bi-tag-fill"></i>
                    Catégorie *
                  </label>
                  <select
                    id="categorie"
                    value={categorie}
                    onChange={e => setCategorie(e.target.value)}
                    required
                  >
                    <option value="">Sélectionnez la catégorie</option>
                    <option value="Donation">🎁 Donation</option>
                    <option value="Sponsorship">🤝 Sponsorship</option>
                    <option value="Opérationnel">⚙️ Opérationnel</option>
                    <option value="Événement">📅 Événement</option>
                    <option value="Formation">📚 Formation</option>
                    <option value="Marketing">📢 Marketing</option>
                    <option value="Autre">📦 Autre</option>
                  </select>
                </div>
              </div>

              {montant && type && (
                <div className={`preview-box ${type === 'Revenu' ? 'revenue' : 'expense'}`}>
                  <i className={`bi ${type === 'Revenu' ? 'bi-arrow-down-circle-fill' : 'bi-arrow-up-circle-fill'}`}></i>
                  <div>
                    <span className="preview-label">{type}</span>
                    <span className="preview-amount">
                      {type === 'Revenu' ? '+' : '-'}{parseFloat(montant || 0).toFixed(2)} DH
                    </span>
                  </div>
                </div>
              )}

              <div className="form-info">
                <i className="bi bi-info-circle-fill"></i>
                <p>Cette transaction sera enregistrée dans l'historique financier du club.</p>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate('/ListeTransaction')}
                >
                  <i className="bi bi-x-circle"></i>
                  Annuler
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle-fill"></i>
                      Enregistrer la transaction
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

export default AjouterTransaction;