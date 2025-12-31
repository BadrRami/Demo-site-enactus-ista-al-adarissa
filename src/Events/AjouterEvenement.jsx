import React, { useState } from 'react';
import LeftBar from '../LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
const AjouterEvenement = () => {
    const [nom, setNom] = useState('')
    const [date, setDate] = useState('')
    const [lieu, setLieu] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (!nom.trim() || !date || !description.trim() || !lieu.trim()) {
            alert("Tous les champs sont obligatoires");
            return;
        }

        if (new Date(date) <= new Date()) {
            alert("La date doit être future");
            return;
        }
        const idsalma=2
        const Event = {id:String(Date.now()),Nom_Evenement:nom,Date:date, Lieu: lieu,
            Description:description,created_at: new Date().toISOString(),
            Creer_par:idsalma}
        const { data, error } = await supabase
            .from('Evenement') 
            .insert([Event])

        if (error) {
            console.error('Error inserting event:', error)
        } else {
            console.log('Event inserted successfully:', data)
        }
        navigate('/evenement')

    }
    return (
        <div className='d-flex'>
            <LeftBar />
            <div>
            <form className="container mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="eventName" className="form-label">Nom de l'Événement</label>
                    <input type="text" className="form-control" id="eventName" value={nom} onChange={(e)=> setNom(e.target.value)} placeholder="Entrez le nom de l'événement" />
                </div>
                <div className="mb-3">
                    <label htmlFor="eventDate" className="form-label">Date de l'Événement</label>
                    <input type="date" className="form-control" id="eventDate" value={date} onChange={(e)=> setDate(e.target.value)} placeholder="Entrez la date de l'événement"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lieu" className="form-label">Lieu</label>
                    <input type="text" className="form-control" id="lieu" value={lieu} onChange={(e)=> setLieu(e.target.value)} placeholder="Entrez le lieu de l'événement"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="eventDescription" className="form-label">Description de l'Événement</label>
                    <textarea className="form-control" id="eventDescription"value={description} onChange={(e)=> setDescription(e.target.value)} rows="3" placeholder="Entrez la description de l'événement"></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Ajouter Événement</button>
            </form>
            </div>
        </div>
    );
}

export default AjouterEvenement;
