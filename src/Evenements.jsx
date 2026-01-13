import React, { useEffect, useState } from 'react';
import supabase from './SupaBase';
import { Link } from 'react-router-dom';

const Evenements = () => {
    const [AllEvents, setAllEvents] = useState([])
    useEffect(() => {
    const fetchMembres = async () => {
      const { data, error } = await supabase
        .from('Evenement')
        .select('*')

      if (error) {
        console.error('Erreur récupération events:', error);
        return;
      }

      setAllEvents(data || []);
    };

    fetchMembres();
  }, []);
    return (
        <div className='d-flex'>
            {
                AllEvents.length > 0 ?
                <div className='d-flex '>
                    {AllEvents.map((event,index)=>
                    <div key={event.id} className='card m-3'>
                        <h3>{event.Nom_Evenement}</h3>
                        <h5>📍 {event.Lieu} · 📅 {event.Date}</h5>
                        <Link to={`/DétailsEvenement/${event.id}`} className='btn btn-success'>Voir le programme</Link>
                    </div>
                    )}
                </div>
                : <p>pas d'Événements</p>
            }
            
        </div>
    );
}

export default Evenements;
