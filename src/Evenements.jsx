import React, { useEffect, useState } from 'react';
import supabase from './SupaBase';
import { Link } from 'react-router-dom';
import './Evenements.css';

const Evenements = () => {
    const [AllEvents, setAllEvents] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

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
        <div className='evenements-page-container'>
            <div className="grid-overlay"></div>

            <header className='text-center'>
                <h1>Nos Événements</h1>
                <h4>Découvrez tous nos événements et activités à venir</h4>
            </header>

            <div className='events-container'>
                {AllEvents.length > 0 ? (
                    <div className='events-grid'>
                        {AllEvents.map((event, index) => (
                            <div key={event.id} className='event-card' style={{animationDelay: `${index * 0.1}s`}}>
                                <div className="image" style={{display:"flex",justifyContent:'center'}}>
                                    <img src={event.image_url} alt="" style={{width:"250px", height:"250px"}}/>
                                </div>
                                <div className="event-header">
                                    <h3>{event.Nom_Evenement}</h3>
                                </div>
                                <div className="event-info">
                                    <p className="event-location">
                                        <i className="bi bi-geo-alt-fill"></i>
                                        {event.Lieu}
                                    </p>
                                    <p className="event-date">
                                        <i className="bi bi-calendar-event-fill"></i>
                                        {event.Date}
                                    </p>
                                </div>
                                <Link to={`/DétailsEvenement/${event.id}`} className='event-btn'>
                                    Voir le programme
                                    <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-events">
                        <div className="no-events-icon">📅</div>
                        <p>Aucun événement disponible pour le moment</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Evenements;