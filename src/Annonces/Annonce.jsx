import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link } from 'react-router-dom';
import supabase from '../SupaBase';

const Annonce = () => {
    const [AllAnnonces, setAllAnnonces] = useState([]);

    async function Supprimer(id) {
        if (!window.confirm('Voulez-vous supprimer cette annonce ?')) return;

        const { error } = await supabase
            .from('Annonces')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur suppression:', error);
        } else {
            setAllAnnonces(prev => prev.filter(m => m.id !== id));
        }
    }

    useEffect(() => {
        const fetchAnnonces = async () => {
            const { data, error } = await supabase
                .from('Annonces')
                .select('*');

            if (error) {
                console.error('Erreur récupération annonces :', error);
                return;
            }

            setAllAnnonces(data);
        };

        fetchAnnonces();
    }, []);

    return (
        <div className='d-flex'>
            <LeftBar />
            <div className='p-3'>
                <h2>Gestion des annonces</h2>
                <Link to={'/ajouterAnnonce'} className="btn btn-success mb-3">Créer une annonce</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {AllAnnonces.length > 0 ? (
                        <tbody>
                            {AllAnnonces.map((annonce, index) => (
                                <tr key={annonce.id}>
                                    <td>{index + 1}</td>
                                    <td>{annonce.Titre}</td>
                                    <td>{annonce.Description}</td>
                                    <td>
                                        <Link to={`/modifierannonce/${annonce.id}`} className='btn btn-warning me-2'>🖊</Link>
                                        <button className='btn btn-danger' onClick={() => Supprimer(annonce.id)}>🗑</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center">Pas d'annonces</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Annonce;
