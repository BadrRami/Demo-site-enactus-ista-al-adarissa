import React from 'react';

const About = () => {
    return (
        <div>
            <header className='text-center'>
                <h1>QUI SOMMES-NOUS ?</h1>
                <h4>Enactus est une communauté mondiale d'étudiants, d'universitaires et de leaders d'entreprise engagés à utiliser l'action entrepreneuriale pour créer un monde meilleur et plus durable.</h4>
            </header>
            <article>
                <h1>Nos Valeurs</h1>
                <div class="values-grid">
                <div class="value-card">
                    <div class="value-icon">💡</div>
                    <h3>Innovation</h3>
                    <p>Nous encourageons la créativité et les solutions innovantes pour résoudre les défis sociaux et environnementaux.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">🤝</div>
                    <h3>Collaboration</h3>
                    <p>Ensemble, nous sommes plus forts. Nous croyons au pouvoir de la collaboration pour créer un impact durable.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">🌍</div>
                    <h3>Impact</h3>
                    <p>Chaque projet que nous menons vise à créer un changement positif et mesurable dans nos communautés.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">🎓</div>
                    <h3>Excellence</h3>
                    <p>Nous nous efforçons d'atteindre l'excellence dans tout ce que nous entreprenons, de la conception à l'exécution.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">💪</div>
                    <h3>Intégrité</h3>
                    <p>Nous agissons avec honnêteté, transparence et responsabilité dans toutes nos actions et décisions.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">🌟</div>
                    <h3>Passion</h3>
                    <p>Notre passion pour le changement social nous anime et nous inspire à dépasser nos limites chaque jour.</p>
                </div>
            </div>
            </article>
            <section>
                <h2 class="section-title">Notre Équipe</h2>
                <div class="team-intro">
                    <p>Une équipe passionnée et dévouée qui travaille sans relâche pour créer un impact positif dans notre communauté.</p>
                </div>
            </section>
             <section class="cta-section">
            <div class="cta-content">
                <h2>Rejoignez l'Aventure</h2>
                <p>Vous partagez notre vision ? Vous voulez faire partie de cette communauté dynamique et créer un impact positif ?</p>
                <a href="#contact" class="cta-button">Nous Rejoindre</a>
            </div>
        </section>
        </div>
    );
}

export default About;
