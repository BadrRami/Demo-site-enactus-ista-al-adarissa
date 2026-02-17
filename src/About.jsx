import React, { useState, useEffect } from 'react';
import './about.css';

const About = () => {
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

    return (
        <div className="about-page-container">
            <div className="grid-overlay"></div>
            <header className='headerAbout'>
                <h1>QUI SOMMES-NOUS ?</h1>
                <h4>Enactus est une communauté mondiale d'étudiants, d'universitaires et de leaders d'entreprise engagés à utiliser l'action entrepreneuriale pour créer un monde meilleur et plus durable.</h4>
            </header>

            <article>
                <h2>Nos Valeurs</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">💡</div>
                        <h3>Innovation</h3>
                        <p>Nous encourageons la créativité et les solutions innovantes pour résoudre les défis sociaux et environnementaux.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">🤝</div>
                        <h3>Collaboration</h3>
                        <p>Ensemble, nous sommes plus forts. Nous croyons au pouvoir de la collaboration pour créer un impact durable.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">🌍</div>
                        <h3>Impact</h3>
                        <p>Chaque projet que nous menons vise à créer un changement positif et mesurable dans nos communautés.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">🎓</div>
                        <h3>Excellence</h3>
                        <p>Nous nous efforçons d'atteindre l'excellence dans tout ce que nous entreprenons, de la conception à l'exécution.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">💪</div>
                        <h3>Intégrité</h3>
                        <p>Nous agissons avec honnêteté, transparence et responsabilité dans toutes nos actions et décisions.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">🌟</div>
                        <h3>Passion</h3>
                        <p>Notre passion pour le changement social nous anime et nous inspire à dépasser nos limites chaque jour.</p>
                    </div>
                </div>
            </article>

            <main className="trophy-section">
                <div className="trophy-card">
                    <div className="trophy-image-wrapper">
                        <img src="public/img/trophy.jpeg" alt="Trophée remis par l'administration de ISTA Hay Al Adarissa" />
                    </div>
                    <div className="trophy-text">
                        <span className="trophy-badge">🏆 Reconnaissance</span>
                        <p>Notre club a eu l'honneur de recevoir un trophée de remerciement délivré par l'administration de ISTA Hay Al Adarissa.</p>
                    </div>
                </div>
            </main>

            <section>
                <h2 className="section-title">Notre Équipe</h2>
                <div className="team-intro">
                    <p>Une équipe passionnée et dévouée qui travaille sans relâche pour créer un impact positif dans notre communauté.</p>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-content">
                    <h2>Rejoignez l'Aventure</h2>
                    <p>Vous partagez notre vision ? Vous voulez faire partie de cette communauté dynamique et créer un impact positif ?</p>
                    <a href="#contact" className="cta-button">Nous Rejoindre</a>
                </div>
            </section>
        </div>
    );
}

export default About;
