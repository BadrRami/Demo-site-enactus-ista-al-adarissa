import React, { useState, useEffect } from 'react';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';
import { useNavigate } from 'react-router-dom';
import './AjouterEquipe.css';

const AjouterEquipe = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [genre, setGenre] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (String(nom).trim() === "" || String(email).trim() === "" || 
            String(password).trim() === "" || String(confirmPassword).trim() === "" || 
            String(role).trim() === "") {
            alert("Vous devez remplir tous les champs");
            return;
        }

        if (password !== confirmPassword) {
            alert("Les deux mots de passe doivent être identiques");
            return;
        }

        if (genre === null) {
            alert("Vous devez sélectionner le genre du membre");
            return;
        }

        setLoading(true);

        const newMembreEquipe = {
            id: String(Date.now()),
            Nom: nom,
            Email: email,
            Mot_de_pass: password,
            Genre: genre,
            Role: role
        };

        const { data, error } = await supabase
            .from('Equipe')
            .insert([newMembreEquipe]);

        setLoading(false);

        if (error) {
            console.error('Error inserting membre:', error);
            alert('Erreur lors de l\'ajout du membre');
        } else {
            console.log('Membre inserted successfully:', data);
            alert('Membre ajouté avec succès !');
            navigate('/equipe');
        }
    };

    return (
        <div className="ajouter-equipe-container">
            <div className="grid-overlay"></div>

            {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
            </button> */}

            <div className="ajouter-equipe-layout">
                <LeftBar />

                <div className="ajouter-equipe-content">
                    <div className="form-header">
                        <div className="header-icon">
                            <i className="bi bi-person-plus-fill"></i>
                        </div>
                        <h1>Ajouter un Membre à l'Équipe</h1>
                        <p>Remplissez le formulaire pour ajouter un nouveau membre</p>
                    </div>

                    <div className="form-card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nom">
                                        <i className="bi bi-person-fill"></i>
                                        Nom complet *
                                    </label>
                                    <input
                                        type="text"
                                        id="nom"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        placeholder="Entrez le nom complet"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="bi bi-envelope-fill"></i>
                                        Adresse email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="exemple@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="bi bi-lock-fill"></i>
                                        Mot de passe *
                                    </label>
                                    <div className="password-wrapper">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Créer un mot de passe"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">
                                        <i className="bi bi-lock-fill"></i>
                                        Confirmer le mot de passe *
                                    </label>
                                    <div className="password-wrapper">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirmez le mot de passe"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-password"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            <i className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="role">
                                    <i className="bi bi-briefcase-fill"></i>
                                    Rôle dans l'équipe *
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Ex: Responsable Communication, Trésorier..."
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label className="label-main">
                                    <i className="bi bi-gender-ambiguous"></i>
                                    Genre *
                                </label>
                                <div className="radio-group">
                                    <label className={`radio-card ${genre === 'Homme' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="genre"
                                            checked={genre === "Homme"}
                                            onChange={() => setGenre("Homme")}
                                        />
                                        <div className="radio-content">
                                            <i className="bi bi-gender-male"></i>
                                            <span>Homme</span>
                                        </div>
                                    </label>

                                    <label className={`radio-card ${genre === 'Femme' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="genre"
                                            checked={genre === "Femme"}
                                            onChange={() => setGenre("Femme")}
                                        />
                                        <div className="radio-content">
                                            <i className="bi bi-gender-female"></i>
                                            <span>Femme</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => navigate('/equipe')}
                                >
                                    <i className="bi bi-x-circle"></i>
                                    Annuler
                                </button>
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner"></span>
                                            Ajout en cours...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle-fill"></i>
                                            Ajouter le membre
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AjouterEquipe;