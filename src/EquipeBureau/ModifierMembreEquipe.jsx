import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';

const ModifierMembreEquipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [genre, setGenre] = useState(null);

  // 🔄 Charger le membre
  useEffect(() => {
    const fetchMembre = async () => {
      const { data, error } = await supabase
        .from('Equipe')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setNom(data.Nom);
      setEmail(data.Email);
      setPassword(data.Mot_de_pass);
      setConfirmPassword(data.Mot_de_pass);
      setRole(data.Role);
      setGenre(data.Genre);
    };

    fetchMembre();
  }, [id]);

  // ✅ Modifier membre
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !email || !password || !confirmPassword || !role) {
      alert('Vous devez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      alert('Les deux mots de passe doivent être identiques');
      return;
    }

    if (!genre) {
      alert('Vous devez choisir le genre');
      return;
    }

    const { error } = await supabase
      .from('Equipe')
      .update({
        Nom:nom,
        Email:email,
        Mot_de_pass:password,
        Role:role,
        Genre:genre,
      })
      .eq('id', id);

    if (error) {
      console.error(error);
      alert('Erreur lors de la modification');
    } else {
      alert('Membre modifié avec succès ✅');
      navigate('/equipe');
    }
  };

  return (
    <div className="d-flex">
      <LeftBar />
      <div className="p-3">
        <h2>✏️ Modifier un membre de bureau</h2>

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" />
          <input className="form-control mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input className="form-control mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
          <input className="form-control mb-2" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmer mot de passe" />
          <input className="form-control mb-2" value={role} onChange={e => setRole(e.target.value)} placeholder="Rôle" />

          <div className="mb-3">
            <label>Genre</label>
            <div>
              <input type="radio" checked={genre === 'Homme'} onChange={() => setGenre('Homme')} /> Homme
              <input type="radio" className="ms-3" checked={genre === 'Femme'} onChange={() => setGenre('Femme')} /> Femme
            </div>
          </div>

          <button className="btn btn-primary">Modifier</button>
        </form>
      </div>
    </div>
  );
};

export default ModifierMembreEquipe;
