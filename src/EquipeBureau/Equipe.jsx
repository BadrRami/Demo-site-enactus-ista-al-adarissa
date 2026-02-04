import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
import './Equipe.css';

const Equipe = () => {
  const [membreEquipe, setMembres] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  // 📥 Récupérer les membres
  useEffect(() => {
    const fetchMembres = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Equipe')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching membres Equipe:', error);
      } else {
        setMembres(data || []);
      }
      setLoading(false);
    };
    fetchMembres();
  }, []);

  // 🗑 Supprimer membre
  const supprimerMembre = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce membre de l\'équipe ?')) return;
    const { error } = await supabase
      .from('Equipe')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    } else {
      setMembres(prev => prev.filter(m => m.id !== id));
    }
  };

  // Filtrage
  const filteredMembers = membreEquipe.filter(member =>
    member.Nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.Role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="equipe-page-container">
        <div className="grid-overlay"></div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="equipe-page-container">
      <div className="grid-overlay"></div>

      {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </button> */}

      <div className="equipe-layout">
        <LeftBar />

        <div className="equipe-content">
          {/* Header */}
          <div className="equipe-header">
            <div className="header-info">
              <h1>Gestion des Équipes</h1>
              <p>Gérer les membres de l'équipe : ajout, modification et suppression</p>
            </div>
            <Link to="/ajouterMembreEquipe" className="add-btn">
              <i className="bi bi-person-plus-fill"></i>
              Ajouter un membre
            </Link>
          </div>
          
          {/* Table */}
          <div className="table-container">
            {loading ? (
              <div className="table-loading">
                <div className="loading-spinner"></div>
                <p>Chargement des membres...</p>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-people"></i>
                <h3>Aucun membre trouvé</h3>
                <p>{searchTerm ? 'Essayez d\'ajuster votre recherche' : 'Commencez par ajouter des membres à l\'équipe'}</p>
              </div>
            ) : (
              <table className="members-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>ID Enactus</th>
                    <th>Genre</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <tr key={member.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="member-name">
                          <div className="member-avatar">
                            {member.Nom?.charAt(0).toUpperCase()}
                          </div>
                          <span>{member.Nom}</span>
                        </div>
                      </td>
                      <td>{member.Email}</td>
                      <td>
                        <span className="role-badge">{member.Role}</span>
                      </td>
                      <td>{member.IDEnactus}</td>
                      <td>
                        <span className={`genre-badge ${member.Genre?.toLowerCase()}`}>
                          <i className={`bi ${member.Genre === 'Femme' ? 'bi-gender-female' : 'bi-gender-male'}`}></i>
                          {member.Genre}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/modifierMembreEquipe/${member.id}`}
                            className="action-btn edit"
                            title="Modifier"
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </Link>
                          <button
                            className="action-btn delete"
                            onClick={() => supprimerMembre(member.id)}
                            title="Supprimer"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipe;