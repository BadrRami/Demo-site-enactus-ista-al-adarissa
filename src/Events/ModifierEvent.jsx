import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../SupaBase';

const ModifierEvent = () => {
  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  // 🔹 Récupération de l'événement
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('Evenement')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erreur chargement event:', error);
        return;
      }

      setNom(data.Nom_Evenement);
      setDate(data.Date);
      setLieu(data.Lieu);
      setDescription(data.Description);
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom.trim() || !date || !lieu.trim() || !description.trim()) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    if (new Date(date) <= new Date()) {
      alert('La date doit être future');
      return;
    }

    const { error } = await supabase
      .from('Evenement') // ✅ correction ici
      .update({
        Nom_Evenement:nom,
        Date:date,
        Lieu:lieu,
        Description:description,
      })
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la modification ❌');
    } else {
      alert('Événement modifié avec succès ✅');
      navigate('/evenement');
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  return (
    <div className="d-flex">
      <LeftBar />
      <div className="container">
        <h2 className="mt-4">Modifier Événement</h2>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom de l'Événement</label>
            <input
              type="text"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Lieu</label>
            <input
              type="text"
              className="form-control"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Modifier Événement
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifierEvent;
