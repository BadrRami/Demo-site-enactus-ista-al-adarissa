import React, { useEffect, useState } from 'react';
import LeftBar from './LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from './SupaBase';

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

  // 🔹 Charger les infos de l'utilisateur
  useEffect(() => {
    if (!user) return;

    const fetchMembre = async () => {
      const { data, error } = await supabase
        .from('Membres')
        .select('*')
        .eq('id', user.id)
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
      setMotDePasse(''); // Ne jamais afficher le hash
      setConfirmerMotDePasse('');
    };

    fetchMembre();
  }, [user]);

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !email || !filiere || !motDePasse || !confirmerMotDePasse) {
      alert('Vous devez remplir tous les champs');
      return;
    }

    if (motDePasse !== confirmerMotDePasse) {
      alert('Les deux mots de passe doivent être identiques');
      return;
    }

    if (etatCotisation === null) {
      alert("Vous devez cocher l'état de cotisation");
      return;
    }

    if (!genre) {
      alert('Vous devez cocher le genre');
      return;
    }


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
      .eq('id', user.id);

    if (error) {
      console.error('Erreur update:', error);
      alert('Erreur lors de la modification');
    } else {
      alert('Membre modifié avec succès ✅');

      // Mettre à jour le localStorage
      localStorage.setItem('connectedUser', JSON.stringify({
        ...user,
        Nom: nom,
        email,
        Filiere: filiere,
        cotisation: etatCotisation,
        genre,
        telephone: tel
      }));

      navigate('/profile');
    }
  };

  return (
    <div className="d-flex">
      <LeftBar />
      <div className="p-3">
        <h2>Modifier votre profile</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" />
          <input className="form-control mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          
          <select className="form-select mb-2" value={filiere} onChange={e => setFiliere(e.target.value)}>
            <option value="">-- Choisir une filière --</option>
            <option value="Développement Digital première année">Développement Digital première année</option>
            <option value="Développement Digital full stack">Développement Digital full stack</option>
            <option value="Gestion des entreprises commerce">Gestion des entreprises commerce</option>
            <option value="Gestion des entreprises RH">Gestion des entreprises RH</option>
            <option value="Gestion des entreprises office manager">Gestion des entreprises office manager</option>
            <option value="Infographie">Infographie</option>
          </select>

          <input className="form-control mb-2" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} type="password" placeholder="Mot de passe" />
          <input className="form-control mb-2" value={confirmerMotDePasse} onChange={e => setConfirmerMotDePasse(e.target.value)} type="password" placeholder="Confirmer mot de passe" />
          <input className="form-control mb-2" value={tel} onChange={e => setTel(e.target.value)} placeholder="Téléphone" />

          <div className="mb-2">
            <label>État de cotisation :</label>
            <div className="form-check">
              <input type="radio" id="cotise" name="etatCotisation" className="form-check-input"
                checked={etatCotisation === true} onChange={() => setEtatCotisation(true)} />
              <label htmlFor="cotise" className="form-check-label">Cotisé</label>
            </div>
            <div className="form-check">
              <input type="radio" id="nonCotise" name="etatCotisation" className="form-check-input"
                checked={etatCotisation === false} onChange={() => setEtatCotisation(false)} />
              <label htmlFor="nonCotise" className="form-check-label">Non cotisé</label>
            </div>
          </div>

          <div className="mb-2">
            <label>Genre :</label>
            <div className="form-check">
              <input type="radio" id="homme" name="genre" className="form-check-input"
                checked={genre === 'Homme'} onChange={() => setGenre('Homme')} />
              <label htmlFor="homme" className="form-check-label">Homme</label>
            </div>
            <div className="form-check">
              <input type="radio" id="femme" name="genre" className="form-check-input"
                checked={genre === 'Femme'} onChange={() => setGenre('Femme')} />
              <label htmlFor="femme" className="form-check-label">Femme</label>
            </div>
          </div>

          <button className="btn btn-primary mt-3" type="submit">Modifier</button>
        </form>
      </div>
    </div>
  );
};

export default Parametre;
