import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
import './Evenement.css';

const Evenement = () => {
    const [listEvents, setlistEvents] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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
                        const role = userObj.role?.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                        const allowedRoles = [
                        "president",
                        "vice president",
                        "responsable des evenement"
                        ];

                        if (!allowedRoles.includes(role)) {
                            navigate('/login');
                        }

        }, [navigate]);

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

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Evenement')
                .select('*')
                .order('Date', { ascending: false });
            if (error) {
                console.error('Error fetching event:', error);
            } else {
                setlistEvents(data || []);
            }
            setLoading(false);
        };
        fetchEvents();
    }, []);

    // 🗑 Supprimer Event
    const supprimerEvent = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cet événement ?')) return;
        const { error } = await supabase
            .from('Evenement')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Erreur suppression:', error);
            alert('Erreur lors de la suppression');
        } else {
            setlistEvents(prev => prev.filter(m => m.id !== id));
        }
    };

    // Filtrage
    const filteredEvents = listEvents.filter(event =>
        event.Nom_Evenement?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.Lieu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.Description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="evenement-admin-container">
            <div className="grid-overlay"></div>

            <div className="evenement-admin-layout">
                <LeftBar />

                <div className="evenement-admin-content">
                    {/* Header */}
                    <div className="evenement-header">
                        <div className="header-info">
                            <h1>Gestion des Événements</h1>
                            <p>Créer, modifier et gérer tous les événements du club</p>
                        </div>
                        <Link to="/ajouteEvent" className="add-btn">
                            <i className="bi bi-calendar-plus-fill"></i>
                            Ajouter un événement
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="evenement-stats">
                        <div className="stat-item">
                            <i className="bi bi-calendar-event-fill"></i>
                            <div>
                                <span className="stat-number">{listEvents.length}</span>
                                <span className="stat-label">Événements totaux</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <i className="bi bi-calendar-check-fill"></i>
                            <div>
                                <span className="stat-number">
                                    {listEvents.filter(e => new Date(e.Date) >= new Date()).length}
                                </span>
                                <span className="stat-label">À venir</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <i className="bi bi-calendar-x-fill"></i>
                            <div>
                                <span className="stat-number">
                                    {listEvents.filter(e => new Date(e.Date) < new Date()).length}
                                </span>
                                <span className="stat-label">Passés</span>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter */}
                    <div className="table-controls">
                        <div className="search-box">
                            <i className="bi bi-search"></i>
                            <input
                                type="text"
                                placeholder="Rechercher par titre, lieu ou description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="controls-actions">
                            <button className="control-btn">
                                <i className="bi bi-funnel-fill"></i>
                                Filtrer
                            </button>
                            <button className="control-btn">
                                <i className="bi bi-download"></i>
                                Exporter
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container">
                        {loading ? (
                            <div className="table-loading">
                                <div className="loading-spinner"></div>
                                <p>Chargement des événements...</p>
                            </div>
                        ) : filteredEvents.length === 0 ? (
                            <div className="empty-state">
                                <i className="bi bi-calendar-event"></i>
                                <h3>Aucun événement trouvé</h3>
                                <p>{searchTerm ? 'Essayez d\'ajuster votre recherche' : 'Commencez par créer votre premier événement'}</p>
                            </div>
                        ) : (
                            <table className="events-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Titre</th>
                                        <th>Description</th>
                                        <th>Lieu</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEvents.map((event, index) => (
                                        <tr key={event.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="event-name">
                                                    <div className="event-icon">
                                                        <i className="bi bi-calendar-event"></i>
                                                    </div>
                                                    <span>{event.Nom_Evenement}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="event-description">
                                                    {event.Description?.substring(0, 60)}
                                                    {event.Description?.length > 60 ? '...' : ''}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="location-badge">
                                                    <i className="bi bi-geo-alt-fill"></i>
                                                    {event.Lieu}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="date-badge">
                                                    <i className="bi bi-calendar3"></i>
                                                    {new Date(event.Date).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link
                                                        to={`/modifierEvent/${event.id}`}
                                                        className="action-btn edit"
                                                        title="Modifier"
                                                    >
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </Link>
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => supprimerEvent(event.id)}
                                                        title="Supprimer"
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Evenement;