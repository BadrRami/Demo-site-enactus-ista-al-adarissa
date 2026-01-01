import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';

const ListeMembres = () => {
  const [membres, setMembres] = useState([]);
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

  // 📥 Récupération des membres
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

  // 🗑 Suppression membre
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

  // ⏳ Sécurité rendering
  if (!user) {
    return <p className="text-center mt-4">Chargement...</p>;
  }

  return (
    <>
      <h2>Liste des membres de club</h2>

      <table className="table table-bordered table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nom Complet</th>
            <th>Email</th>
            <th>Filière</th>
            <th>Cotisation</th>
            <th>Téléphone</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {membres.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                Aucun membre trouvé
              </td>
            </tr>
          ) : (
            membres.map((member, index) => (
              <tr key={member.id}>
                <td>{index + 1}</td>
                <td>{member.Nom}</td>
                <td>{member.email}</td>
                <td>{member.Filiere}</td>
                <td>{member.cotisation ? 'Cotisé' : 'Non cotisé'}</td>
                <td>{member.telephone}</td>
                <td>{member.genre}</td>
                <td>
                  <Link
                    to={`/modifierMembre/${member.id}`}
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
    </>
  );
};

export default ListeMembres;
