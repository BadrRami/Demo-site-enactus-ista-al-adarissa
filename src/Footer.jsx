import React, { useState } from 'react';
import './Footer.css';
const Footer = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <div className="footer-wrapper">
        

        <footer className="footer">
          <div className="grid-pattern1"></div>
          
          <div className="container">
            <div className="footer-grid1">
              {/* Brand */}
              <div className="brand-section1">
                <div className="logo-container1">
                  <img 
                    src="/img/logo.png" 
                    alt="Enactus ISTA AL ADARISSA" 
                    className="logo"
                  />
                  <h2 className="brand-name">Enactus ISTA<br/>AL ADARISSA</h2>
                </div>
                <p className="brand-description">
                  Ensemble, nous créons un impact positif et durable dans notre communauté à travers l'entrepreneuriat social et l'innovation.
                </p>
              </div>

              {/* Navigation */}
              <div className="links-section2">
                <h3 className="section-title">Navigation</h3>
                <ul className="links-list">
                  <li><a href="/">Accueil</a></li>
                  <li><a href="/events">Évènements</a></li>
                  <li><a href="/annonces">Annonces</a></li>
                  <li><a href="/about">À propos</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="social-section2">
                <h3 className="section-title">Suivez-nous</h3>
                <div className="social-grid">
                  <a href="https://www.facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com/enactus.istafes/?hl=fr" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/enactus-ista-al-adarissa-f%C3%A8s/posts/?feedView=all" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="https://www.tiktok.com" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bottom-bar3">
              <p className="copyright">
                © 2026 <strong>Enactus ISTA AL ADARISSA</strong>. Tous droits réservés.
              </p>
              
              <ul className="bottom-links">
                <li><a href="/privacy">Confidentialité</a></li>
                <li><a href="/terms">Conditions</a></li>
                <li><a href="/sitemap">Plan du site</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;