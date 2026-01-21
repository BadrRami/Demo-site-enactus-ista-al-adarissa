import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';

const Equipe = () => {
  const [membreEquipe, setMembres] = useState([]); // ✅ tableau
  const [user, setUser] = useState(null);
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

  // 📥 Récupérer les membres
  useEffect(() => {
    const fetchMembres = async () => {
      const { data, error } = await supabase
        .from('Equipe')
        .select('*')

      if (error) {
        console.error('Error fetching membres Equipe:', error);
        return;
      }

      setMembres(data);
    };

    fetchMembres();
  }, []);

  // 🗑 Supprimer membre
  const supprimerMembre = async (id) => {
    if (!window.confirm('Voulez-vous supprimer ce membre ?')) return;

    const { error } = await supabase
      .from('Equipe')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur suppression:', error);
    } else {
      setMembres(prev => prev.filter(m => m.id !== id));
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="d-flex">
      <LeftBar />
      <div className="p-3 w-100">
        <h2>Gestion des Équipes</h2>
        <p>
          Gérer les membres de l'équipe : ajout, modification et suppression.
        </p>

        <table className="table table-bordered">
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
            {membreEquipe.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Aucun membre trouvé
                </td>
              </tr>
            ) : (
              membreEquipe.map((member, index) => (
                <tr key={member.id}>
                  <td>{index + 1}</td>
                  <td>{member.Nom}</td>
                  <td>{member.Email}</td>
                  <td>{member.Role}</td>
                  <td>{member.IDEnactus}</td>
                  <td>{member.Genre}</td>
                  
                  <td>
                    <Link
                      to={`/modifierMembreEquipe/${member.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      🖊
                    </Link>

                    <button
                      className="btn btn-danger btn-sm mx-2"
                      onClick={() => supprimerMembre(member.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Equipe;
