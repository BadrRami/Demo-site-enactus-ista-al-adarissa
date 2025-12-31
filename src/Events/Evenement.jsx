import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link } from 'react-router-dom';
import supabase from '../SupaBase';

const Evenement = () => {
    const [listEvents, setlistEvents]=useState('')
    useEffect(() => {
    const fetchEvents = async () => {
       const { data, error } = await supabase
         .from('Evenement') 
         .select('*')

      if (error) {
         console.error('Error fetching event:', error)
       return
       }

       console.log('DATA:', data)
       setlistEvents(data)
     }

     fetchEvents()
   }, [])

   // 🗑 Supprimer Event
  const supprimerEvent = async (id) => {
    if (!window.confirm('Voulez-vous supprimer cette Evenement ?')) return;

    const { error } = await supabase
      .from('Evenement')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur suppression:', error);
    } else {
      setlistEvents(prev => prev.filter(m => m.id !== id));
    }
  };

    return (
        <div className='d-flex'>
            <LeftBar />
            <div className="flex-grow-1 p-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2> Événements</h2>
                    
                        <Link to="/ajouteEvent" className='btn btn-success'>Ajouter un événement</Link>
                    
                </div>

                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Description</th>
                            <th scope="col">Lieu</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                          
                        </tr>
                    </thead>
                   <tbody>
                   {listEvents.length === 0 ? (
                                 <tr>
                                   <td colSpan="6" className="text-center">
                                     Aucun membre trouvé
                                   </td>
                                 </tr>
                               ) : (
                                 listEvents.map((event, index) => (
                                   <tr key={event.id}>
                                     <td>{index + 1}</td>
                                     <td>{event.Nom_Evenement}</td>
                                     <td>{event.Description}</td>
                                     <td>{event.Lieu}</td>
                                     <td>{event.Date}</td>
                                     <td>
                                       <Link
                                         to={`/modifierEvent/${event.id}`}
                                         className="btn btn-warning btn-sm"
                                       >
                                         🖊
                                       </Link>
                   
                                       <button
                                         className="btn btn-danger btn-sm mx-2"
                                         onClick={() => supprimerEvent(event.id)}
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
}

export default Evenement;
