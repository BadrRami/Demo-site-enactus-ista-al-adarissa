import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './SupaBase';

const EditMembre = () => {
  const { id } = useParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filiere, setFiliere] = useState('');
  const [role, setRole] = useState('');
  const [nom, setNom] = useState('');

  // 🔹 Charger les infos du membre
  useEffect(() => {
    const fetchMembre = async () => {
      const { data, error } = await supabase
        .from('Membres')
        .select('*')
        .eq('id', id)
        .single(); // 👈 retourne un seul objet

      if (error) {
        console.error(error);
        return;
      }

      setEmail(data.email);
      setPassword(data.mot_de_passe);
      setFiliere(data.Filiere);
      setRole(data.role);
      setNom(data.Nom);
    };

    fetchMembre();
  }, [id]);

  // 🔹 Modifier le membre
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('Membres')
      .update({
        email: email,
        mot_de_passe: password,
        Filiere: filiere,
        role: role,
        Nom: nom
      })
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } else {
      alert('Membre modifié avec succès ✅');
      setEmail('');
      setPassword('');
      setFiliere('');
      setRole('');
      setNom('');
    }
  };

  return (
    <div>
      <h1>Éditer le membre ID : {id}</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label><br />

        <label>Mot de passe:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label><br />

        <label>Filière:
          <input type="text" value={filiere} onChange={e => setFiliere(e.target.value)} />
        </label><br />

        <label>Rôle:
          <input type="text" value={role} onChange={e => setRole(e.target.value)} />
        </label><br />

        <label>Nom complet:
          <input type="text" value={nom} onChange={e => setNom(e.target.value)} />
        </label><br />

        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default EditMembre;
