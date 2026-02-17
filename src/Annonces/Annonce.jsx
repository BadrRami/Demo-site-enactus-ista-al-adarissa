import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
import { FileText, Plus, Edit3, Trash2 } from 'lucide-react';
import './Annonce.css'
const Annonce = () => {
    const [allAnnonces, setAllAnnonces] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // 🔐 Vérification connexion
    useEffect(() => {
        const isConnected = localStorage.getItem('isConnected');
        const storedUser = localStorage.getItem('connectedUser');

        if (!isConnected || !storedUser) {
            navigate('/login');
            return;
        }

        const userObj = JSON.parse(storedUser);
        setUser(userObj);

        const allowedRoles = ["president", "vice president", "Responsable de communication"];
        if (!allowedRoles.includes(userObj.role)) {
            navigate('/login');
        }
    }, [navigate]);


    async function supprimer(id) {
        if (!window.confirm('Voulez-vous supprimer cette annonce ?')) return;

        const { error } = await supabase
            .from('Annonces')
            .delete()
            .eq('id', id);

        if (!error) {
            setAllAnnonces(prev => prev.filter(a => a.id !== id));
        }
    }

    useEffect(() => {
        const fetchAnnonces = async () => {
            const { data, error } = await supabase
                .from('Annonces')
                .select('*')
                .order('id', { ascending: false });

            if (!error) {
                setAllAnnonces(data);
            }
        };

        fetchAnnonces();
    }, []);

    
    return (
        <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
            <div className="layout">
                <LeftBar />

                <main className="contentAnnonce">
                    <div className="page-containerAnnonce">
                        <h1 className="page-title">
                            <FileText size={40} /> Gestion des Annonces
                        </h1>
                        <p className="page-subtitle">
                            Créez, modifiez ou supprimez les annonces du bureau
                        </p>

                        <div className="top-actions">
                            <Link to="/ajouterAnnonce" className="add-button">
                                <Plus size={20} /> Nouvelle annonce
                            </Link>
                        </div>

                        <div className="table-containerAnnonce">
                            {allAnnonces.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Titre</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allAnnonces.map((a, i) => (
                                            <tr key={a.id}>
                                                <td data-label="#"> {i + 1} </td>
                                                <td data-label="Titre">{a.Titre}</td>
                                                <td data-label="Description">{a.Description}</td>
                                                <td data-label="Actions">
                                                    <div className="actions">
                                                        <Link
                                                            to={`/modifierannonce/${a.id}`}
                                                            className="action-btn edit"
                                                        >
                                                            <Edit3 size={18} />
                                                        </Link>
                                                        <button
                                                            className="action-btn delete"
                                                            onClick={() => supprimer(a.id)}
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="empty">
                                    Aucune annonce disponible
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Annonce;
