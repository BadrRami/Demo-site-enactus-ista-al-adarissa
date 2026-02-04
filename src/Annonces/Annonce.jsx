import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link } from 'react-router-dom';
import supabase from '../SupaBase';
import { FileText, Plus, Edit3, Trash2 } from 'lucide-react';

const Annonce = () => {
    const [allAnnonces, setAllAnnonces] = useState([]);

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
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                * {
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }

                .layout {
                    display: flex;
                    min-height: 100vh;
                }

                .content {
                    flex: 1;
                    padding-left: 260px;
                }

                .page-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 40px 20px;
                }

                .page-title {
                    font-size: 2.4rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #FDB913, #ffca4f);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 10px;
                }

                .page-subtitle {
                    color: #aaa;
                    margin-bottom: 30px;
                }

                .top-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 25px;
                }

                .add-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 26px;
                    background: linear-gradient(135deg, #FDB913, #ffca4f);
                    color: #000;
                    font-weight: 700;
                    border-radius: 12px;
                    text-decoration: none;
                    transition: 0.3s;
                }

                .add-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 35px rgba(253,185,19,0.4);
                }

                .table-container {
                    background: rgba(26, 26, 26, 0.6);
                    border: 2px solid rgba(253,185,19,0.2);
                    border-radius: 24px;
                    overflow: hidden;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                thead {
                    background: rgba(253,185,19,0.1);
                }

                th, td {
                    padding: 18px;
                    text-align: left;
                }

                th {
                    color: #FDB913;
                    font-weight: 700;
                }

                tr {
                    border-bottom: 1px solid rgba(253,185,19,0.1);
                }

                tbody tr:hover {
                    background: rgba(253,185,19,0.05);
                }

                .actions {
                    display: flex;
                    gap: 10px;
                }

                .action-btn {
                    padding: 10px;
                    border-radius: 10px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.3s;
                }

                .edit {
                    background: rgba(253,185,19,0.15);
                    color: #FDB913;
                }

                .edit:hover {
                    background: rgba(253,185,19,0.3);
                }

                .delete {
                    background: rgba(239,68,68,0.15);
                    color: #ef4444;
                }

                .delete:hover {
                    background: rgba(239,68,68,0.3);
                }

                .empty {
                    text-align: center;
                    padding: 40px;
                    color: #aaa;
                }

                @media (max-width: 768px) {
                    .content {
                        padding-left: 0;
                    }

                    table, thead, tbody, th, td, tr {
                        display: block;
                    }

                    thead {
                        display: none;
                    }

                    tr {
                        margin-bottom: 20px;
                        border-radius: 16px;
                        background: rgba(0,0,0,0.4);
                        padding: 15px;
                    }

                    td {
                        padding: 10px 0;
                    }

                    td::before {
                        content: attr(data-label);
                        font-weight: 600;
                        color: #FDB913;
                        display: block;
                    }
                }
            `}</style>

            <div className="layout">
                <LeftBar />

                <main className="content">
                    <div className="page-container">
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

                        <div className="table-container">
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
