import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './contact.css'
const Contact = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Charger la préférence au démarrage
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        if (savedMode) {
            document.documentElement.classList.add('dark-mode');
        }
    }, []);
    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', !darkMode);
    };
    return (
        <div className="contact-page-container">
            <div className="grid-overlay"></div>
             {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                {darkMode ? (
                    <i className="bi bi-sun-fill"></i>
                ) : (
                    <i className="bi bi-moon-stars-fill"></i>
                )}
            </button> */}
            <div className='headerContact'>
                <h1>Contactez-nous</h1>
                <p>Nous sommes là pour répondre à toutes vos questions</p>
            </div>
            <div className='d-flex'>
                <div className='card '>
                <h2>Envoyez-nous un message</h2>
                <form id="contactForm">
                    <div class="form-group">
                        <label htmlFor="nom">Nom complet *</label>
                        <input type="text" id="nom" name="nom" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input type="email" id="email" name="email" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sujet">Sujet *</label>
                        <select id="sujet" name="sujet" required>
                            <option value="">Sélectionnez un sujet</option>
                            <option value="adhesion">Adhésion au club</option>
                            <option value="partenariat">Partenariat</option>
                            <option value="projet">Proposition de projet</option>
                            <option value="info">Demande d'information</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Envoyer le message</button>
                </form>
                </div>
                <div>
                    <div className="contact-info ms-2">
                <div className="card mt-1">
                    <h3>📧 Email</h3>
                    <p><a href="mailto:contact@enactus.org">contact@enactus.org</a></p>
                </div>

                <div className="card mt-1">
                    <h3>📱 Téléphone</h3>
                    <p><a href="tel:+212600000000">+212 6 00 00 00 00</a></p>
                </div>

                <div className="card mt-1">
                    <h3>📍 Adresse</h3>
                    <p>ISTA AL ADARISSA<br/>FES, Maroc</p>
                </div>

                <div className="card mt-1">
                    <h3>🌐 Réseaux sociaux</h3>
                    <p>Suivez-nous sur nos réseaux</p>
                    <div class="social-links">
                        <Link to={""}><i class="bi bi-facebook"></i></Link>
                        <Link to={"https://www.instagram.com/enactus.istafes/?hl=fr"}><i class="bi bi-instagram"></i></Link>
                        <Link to={"https://www.linkedin.com/company/enactus-ista-al-adarissa-f%C3%A8s/posts/?feedView=all"}><i class="bi bi-linkedin"></i></Link>
                        <Link to={""}><i class="bi bi-twitter-x"></i></Link>
                        <Link to={""}><i class="bi bi-tiktok"></i></Link>
                    </div>
                </div>
            </div>
            
                </div>
            </div>
        </div>
    );
}

export default Contact;
