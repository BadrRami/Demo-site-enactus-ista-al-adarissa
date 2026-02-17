import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
import LeftBar from '../LeftBar';
import '../Membres/ListeMembre.css'
const ListeMembres = () => {
  const [membres, setMembres] = useState([]);
  const [event, setevent] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

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
                  
        const role = userObj.role?.trim().toLowerCase();

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
        console.error('Erreur récupération membres:', error);
        return;
      }
      setevent(data || []);
    };
    fetchEvents();
  }, []);

  const supprimerMembre = async (id) => {
    if (!window.confirm('Voulez-vous supprimer ce membre ?')) return;
    const { error } = await supabase
      .from('Membres')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Erreur suppression:', error);
    } else {
      setMembres(prev => prev.filter(m => m.id !== id));
    }
  };

  const cotises = membres.filter(m => m.cotisation).length;
  const nonCotises = membres.filter(m => !m.cotisation).length;
  const upCommingEvent =event.filter(e=> e.Date > Date.now()).length

  if (!user) {
    return <p className="membres-loading">Chargement...</p>;
  }

  return (
    <div className='liste-membres-wrapper'>
      <div className="liste-membres-grid-overlay"></div>

      <LeftBar />

      <div className="liste-membres-content">
        <div className="liste-membres-header">
          <h2 className="liste-membres-title">Liste des Membres</h2>
          <p className="liste-membres-subtitle">Gérez les membres du club Enactus</p>
        </div>

        <div className="membres-stats-bar">
          <div className="membres-stat-item">
            <div className="membres-stat-number">{membres.length}</div>
            <div className="membres-stat-label">Total Membres</div>
          </div>
          <div className="membres-stat-item">
            <div className="membres-stat-number">{cotises}</div>
            <div className="membres-stat-label">Cotisés</div>
          </div>
          <div className="membres-stat-item">
            <div className="membres-stat-number">{nonCotises}</div>
            <div className="membres-stat-label">Non Cotisés</div>
          </div>
        </div>

        <div className="membres-table-container">
          {membres.length === 0 ? (
            <div className="membres-empty-state">
              <div className="membres-empty-icon">👥</div>
              <h3 className="membres-empty-title">Aucun membre trouvé</h3>
              <p className="membres-empty-text">Commencez par ajouter des membres au club</p>
              <Link to="/ajouter-membre" className="membres-btn-add">
                ➕ Ajouter un membre
              </Link>
            </div>
          ) : (
            <table className="membres-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom Complet</th>
                  <th>Email</th>
                  <th>Filière</th>
                  <th>Cotisation</th>
                  <th>Téléphone</th>
                  <th>ID Enactus</th>
                  <th>Genre</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {membres.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>{member.Nom}</td>
                    <td>{member.email}</td>
                    <td>{member.Filiere}</td>
                    <td>
                      <span className={`membres-badge-cotisation ${member.cotisation ? 'cotise' : 'non-cotise'}`}>
                        {member.cotisation ? 'Cotisé' : 'Non cotisé'}
                      </span>
                    </td>
                    <td>{member.telephone}</td>
                    <td>{member.IDENACTUS}</td>
                    <td>
                      <span className={`membres-badge-genre ${member.genre?.toLowerCase()}`}>
                        {member.genre === 'Homme' ? '👨' : '👩'} {member.genre}
                      </span>
                    </td>
                    <td>
                      <div className="membres-actions-cell">
                        <Link to={`/modifierMembre/${member.id}`} className="membres-btn-edit">
                          🖊
                        </Link>
                        <button className="membres-btn-delete" onClick={() => supprimerMembre(member.id)}>
                          🗑
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
  );
};

export default ListeMembres;