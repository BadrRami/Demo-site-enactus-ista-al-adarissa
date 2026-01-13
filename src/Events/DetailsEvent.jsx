import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../SupaBase';

const DetailsEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('Evenement')
        .select('*')
        .eq('id', id)
        .single(); // 🔥 IMPORTANT

      if (error) {
        console.error('Erreur détails event:', error);
        return;
      }

      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{event.Nom_Evenement}</h1>
      <h5>📍 {event.Lieu} · 📅 {event.Date}</h5>
      <p>{event.Description}</p>
      <Link to={'/AllEvenement'} className='btn btn-outline-secondary'>Retour vers la page des Événements</Link>
    </div>
    
  );
};

export default DetailsEvent;
