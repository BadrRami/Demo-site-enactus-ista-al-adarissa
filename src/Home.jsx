import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from './Footer';

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/img/slide1.png',
            title: 'Bienvenue sur Enactus',
            subtitle: 'ISTA AL ADARISSA',
            description: 'Rejoignez une communauté d\'étudiants entrepreneurs engagés pour un impact social positif'
        },
        {
            image: '/img/slide.png',
            title: 'Innovation Sociale',
            subtitle: 'CRÉER LE CHANGEMENT',
            description: 'Développez des projets entrepreneuriaux qui transforment des vies et des communautés'
        },
        {
            image: '/img/slide.png',
            title: 'Action Collective',
            subtitle: 'ENSEMBLE PLUS FORTS',
            description: 'Collaborez avec des étudiants passionnés et créez un impact durable'
        }
    ];

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
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <>
        <div className="home-container">
            <div className="grid-overlay"></div>

            {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
            </button> */}

            {/* Hero Slider */}
            <section className="hero-slider">
                <div className="slider-container">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                        >
                            <div className="slide-bg" style={{backgroundImage: `url(${slide.image})`}}></div>
                            <div className="slide-overlay"></div>
                            <div className="slide-content">
                                <span className="slide-subtitle">{slide.subtitle}</span>
                                <h1 className="slide-title">{slide.title}</h1>
                                <p className="slide-description">{slide.description}</p>
                                <div className="slide-actions">
                                    <Link to="/about" className="cta-btn primary">
                                        <i className="bi bi-info-circle"></i>
                                        Découvrir Enactus
                                    </Link>
                                    <Link to="/contact" className="cta-btn secondary">
                                        <i className="bi bi-envelope"></i>
                                        Nous Contacter
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contrôles */}
                <button className="slider-control prev" onClick={prevSlide}>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <button className="slider-control next" onClick={nextSlide}>
                    <i className="bi bi-chevron-right"></i>
                </button>

                {/* Indicateurs */}
                <div className="slider-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        ></button>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Notre Impact en Chiffres</h2>
                        <p>Des résultats concrets qui font la différence</p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="bi bi-people-fill"></i>
                            </div>
                            <div className="stat-number">150+</div>
                            <div className="stat-label">Membres Actifs</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="bi bi-rocket-takeoff"></i>
                            </div>
                            <div className="stat-number">25+</div>
                            <div className="stat-label">Projets Lancés</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="bi bi-trophy-fill"></i>
                            </div>
                            <div className="stat-number">12</div>
                            <div className="stat-label">Compétitions Gagnées</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="bi bi-heart-fill"></i>
                            </div>
                            <div className="stat-number">5000+</div>
                            <div className="stat-label">Vies Impactées</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="quick-links-section">
                <div className="section-container">
                    <div className="quick-links-grid">
                        <Link to="/evenements" className="quick-link-card">
                            <div className="quick-link-icon">
                                <i className="bi bi-calendar-event"></i>
                            </div>
                            <h3>Nos Événements</h3>
                            <p>Découvrez nos prochains événements et activités</p>
                            <span className="quick-link-arrow">
                                <i className="bi bi-arrow-right"></i>
                            </span>
                        </Link>

                        <Link to="/annonces" className="quick-link-card">
                            <div className="quick-link-icon">
                                <i className="bi bi-megaphone"></i>
                            </div>
                            <h3>Annonces</h3>
                            <p>Restez informé de toutes nos actualités</p>
                            <span className="quick-link-arrow">
                                <i className="bi bi-arrow-right"></i>
                            </span>
                        </Link>

                        <Link to="/about" className="quick-link-card">
                            <div className="quick-link-icon">
                                <i className="bi bi-info-circle"></i>
                            </div>
                            <h3>À Propos</h3>
                            <p>Apprenez-en plus sur notre mission et notre équipe</p>
                            <span className="quick-link-arrow">
                                <i className="bi bi-arrow-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section-home">
                <div className="cta-content-home">
                    <h2>Prêt à Faire la Différence ?</h2>
                    <p>Rejoignez Enactus ISTA AL ADARISSA et transformez vos idées en actions</p>
                    <Link to="/contact" className="cta-btn-large">
                        <i className="bi bi-arrow-right-circle"></i>
                        Rejoindre Maintenant
                    </Link>
                </div>
            </section>

        </div>
        <Footer />
        </>
    );
};

export default Home;