import React, { useState } from 'react';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';
import { useNavigate } from 'react-router-dom';

const CreerAnnonce = () => {
    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate('')
    async function handleSubmit(e) {
        e.preventDefault();
        if(!titre==="" || !description=== ""){
            alert('vous devez remplir tous les champs')
            return
        }
        const annonce = {Titre:titre,Description:description}
        const {data, error} = await supabase
        .from("Annonces")
        .insert([annonce])
        if(error){
            alert("Erreur: ", error)
        }
        setDescription('')
        setTitre('')
        navigate('/annonceBureau')
        
    }
    return (
        <div className='d-flex'>
            <LeftBar />
            <div>
                <h1>Créer une nouvelle annonce</h1>
                <form method='post' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="titre" className="form-label">Titre</label>
                        <input type="text" name="titre" id="titre" value={titre} onChange={(e)=> setTitre(e.target.value)} className="form-control" placeholder='Titre'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <textarea  name="description" id="Description" value={description} onChange={(e)=> setDescription(e.target.value)} className="form-control" placeholder='Description'/>
                    </div>
                    <input type="submit" value="Créer annonce" className='btn btn-primary'/>
                </form>
            </div>
        </div>
    );
}

export default CreerAnnonce;
