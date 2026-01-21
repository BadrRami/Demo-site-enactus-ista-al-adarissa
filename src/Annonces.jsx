import React, { useEffect, useState } from 'react';
import supabase from './SupaBase';
import './Annonces.css';

const Annonces = () => {
    const [AllAnnonces, setAllAnnonces] = useState([]);
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

    useEffect(() => {
        const fetchAnnonces = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Annonces')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Erreur récupération annonces :', error);
                setLoading(false);
                return;
            }
            setAllAnnonces(data || []);
            setLoading(false);
        };
        fetchAnnonces();
    }, []);

    return (
        <div className="annonces-page-container">
            <div className="grid-overlay"></div>

            {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
            </button> */}

            <header className='text-center'>
                <h1>Annonces du Club</h1>
                <h4>Découvrez les appels à participation, projets innovants et événements organisés par Enactus ISTA AL ADARISSA</h4>
            </header>

            <section className='annonces-container'>
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Chargement des annonces...</p>
                    </div>
                ) : AllAnnonces.length > 0 ? (
                    <div className='annonces-grid'>
                        {AllAnnonces.map((annonce, index) => (
                            <div 
                                key={annonce.id} 
                                className='annonce-card'
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                <div className="annonce-header">
                                    <div className="annonce-badge">
                                        <i className="bi bi-megaphone-fill"></i>
                                        Nouvelle annonce
                                    </div>
                                </div>
                                <div className="annonce-content">
                                    <h3>{annonce.Titre}</h3>
                                    <p>{annonce.Description}</p>
                                </div>
                                <div className="annonce-footer">
                                    <span className="annonce-date">
                                        <i className="bi bi-calendar3"></i>
                                        {new Date(annonce.created_at).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-annonces">
                        <div className="no-annonces-icon">📢</div>
                        <h3>Aucune annonce disponible</h3>
                        <p>Les nouvelles annonces apparaîtront ici prochainement</p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Annonces;