import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link } from 'react-router-dom';
import supabase from '../SupaBase';
import './ListeTickets.css';

const ListeTickets = () => {
    const [allTickets, setAllTickets] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        if (savedMode) {
            document.documentElement.classList.add('dark-mode');
        }
    }, []);
    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', !darkMode);
    };
    
    const supprimer = async (id) => {
        if (!window.confirm('Voulez-vous supprimer ce ticket ?')) return;
        const { error } = await supabase
            .from('Tickets')
            .delete()
            .eq('id', id);
        if (!error) {
            setAllTickets(prev => prev.filter(t => t.id !== id));
        }
    };
    
    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Tickets')
                .select('*')
                .order('id', { ascending: false });
            if (!error) {
                setAllTickets(data);
            }
            setLoading(false);
        };
        fetchTickets();
    }, []);

    const getStatutStyle = (statut) => {
        const styles = {
            'Ouvert': { bg: 'rgba(253, 185, 19, 0.2)', color: '#FDB913' },
            'En cours': { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' },
            'Résolu': { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981' },
            'Fermé': { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' }
        };
        return styles[statut] || styles['Fermé'];
    };
    
    return (
        <div className="page-container">
            <div className="grid-overlay"></div>
            <LeftBar />
            
            <div className="tickets-main-content">
                <h1>📋 Liste des Tickets</h1>
                
                <Link to="/tickets/creer" className="btn-create-ticket">
                    + Créer un nouveau ticket
                </Link>

                <Link to="/tickets/scanner" className="btn-create-ticket">
                <i className="bi bi-qr-code-scan"></i>
                    Scanner une ticket
                </Link>
                
                {loading ? (
                    <div className="tickets-table-wrapper">
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p className="loading-text">Chargement des tickets...</p>
                        </div>
                    </div>
                ) : allTickets.length > 0 ? (
                    <div className="tickets-table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Statut</th>
                                    <th>Type</th>
                                    <th>QR</th>
                                    <th>Prix</th>
                                    <th>Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTickets.map((ticket,index) => {
                                    const statutStyle = getStatutStyle(ticket.Statut);
                                    return (
                                        <tr key={ticket.id}>
                                            <td>{index +1}</td>
                                            <td>
                                                <span 
                                                    className="badge-statut"
                                                    style={{
                                                        background: statutStyle.bg,
                                                        color: statutStyle.color
                                                    }}
                                                >
                                                    {ticket.statut}
                                                </span>
                                            </td>
                                            <td>{ticket.type}</td>
                                            <td>{ticket.code}</td>
                                            <td>{ticket.prix}</td>
                                            <td>
                                                <button 
                                                    onClick={() => supprimer(ticket.id)}
                                                    className="btn-supprimer"
                                                >
                                                    🗑️ Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="tickets-table-wrapper">
                        <div className="empty-state">
                            <div className="empty-icon">📋</div>
                            <h3>Aucun ticket trouvé</h3>
                            <p>Créez votre premier ticket pour commencer</p>
                            <Link to="/tickets/creer" className="btn-create-ticket">
                                + Créer un ticket
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListeTickets;