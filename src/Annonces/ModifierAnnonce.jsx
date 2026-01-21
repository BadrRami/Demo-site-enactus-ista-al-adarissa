import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';

const ModifierAnnonce = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchAnnonce = async () => {
      const { data, error } = await supabase
        .from('Annonces')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setTitre(data.Titre);
      setDescription(data.Description);
    };

    fetchAnnonce();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (titre === "" || description === "") {
      alert('Vous devez remplir tous les champs');
      return;
    }

    const { error } = await supabase
      .from('Annonces')
      .update({ Titre: titre, Description: description })
      .eq('id', id);

    if (error) {
      console.error(error);
      alert('Erreur lors de la modification');
    } else {
      alert('Annonce modifiée avec succès ✅');
      navigate('/annonceBureau'); // remplace par ta route réelle
    }
  }

  return (
    <div className="d-flex">
      <LeftBar />
      <div className="p-3">
        <h2>✏️ Modifier annonce</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="titre" className="form-label">Titre</label>
            <input
              type="text"
              id="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="form-control"
              placeholder='Titre'
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <textarea
              id="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              placeholder='Description'
            />
          </div>
          <button type="submit" className='btn btn-primary'>Modifier annonce</button>
        </form>
      </div>
    </div>
  );
}

export default ModifierAnnonce;
