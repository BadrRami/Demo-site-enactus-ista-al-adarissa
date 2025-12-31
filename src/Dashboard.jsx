import React, { useEffect, useState } from 'react';
import LeftBar from './LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import ListeMembres from './Membres/ListeMembres';
import supabase from './SupaBase';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [membres, setMembres] = useState([]);
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
        .eq('statut', 'Membre'); // ✅ cohérent

      if (error) {
        console.error('Erreur récupération membres:', error);
        return;
      }

      setMembres(data || []);
    };

    fetchMembres();
  }, []);

  if (!user) return <p className="text-center mt-4">Chargement...</p>;

  const femmes = membres.filter(m => m.genre === 'Femme').length;
  const hommes = membres.filter(m => m.genre === 'Homme').length;

  return (
    <div className="d-flex">
      <LeftBar />

      <div className="p-3 w-100">
        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Bonjour {user.nom || 'Utilisateur'}</h2>
              <p>Bienvenue sur le tableau de bord</p>
            </div>

            {(user.role === 'president' || user.role === 'VICE TEAM LEADER') && (
              <div>
                <Link to="/ajouterMembre" className="btn btn-primary me-2">
                  ➕ Ajouter Membre
                </Link>
                <Link to="/ajouterMembreEquipe" className="btn btn-success">
                  ➕ Ajouter Membre à l'Équipe
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex mt-3">
          <div className="card col-md-3 me-2 p-4">
            <h5>👥 Membres Actifs : {membres.length}</h5>
            <div>🚺 {femmes} | 🚹 {hommes}</div>
          </div>

          <div className="card col-md-3 me-2 p-4">
            <h5>💰 Budget Total</h5>
            <p>24.5K DH</p>
          </div>

          <div className="card col-md-3 p-4">
            <h5>✨ Événements à venir</h5>
          </div>
        </div>

        <div className="mt-4">
          <ListeMembres />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
