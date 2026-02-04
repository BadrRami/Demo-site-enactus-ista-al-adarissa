import React, { useState } from 'react';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';
import { useNavigate } from 'react-router-dom';
import { FileText, Edit3, Save, ArrowLeft } from 'lucide-react';

const CreerAnnonce = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titre || !description) {
            alert('Veuillez remplir tous les champs ❌');
            return;
        }

        setLoading(true);

        const annonce = {
            Titre: titre,
            Description: description
        };

        const { error } = await supabase
            .from('Annonces')
            .insert([annonce]);

        setLoading(false);

        if (error) {
            alert('Erreur lors de la création ❌');
            return;
        }

        setTitre('');
        setDescription('');
        navigate('/annonceBureau');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                * {
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }

                .layout {
                    display: flex;
                    min-height: 100vh;
                }

                .content {
                    flex: 1;
                    padding-left: 260px;
                }

                .page-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px;
                }

                .back-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: rgba(253, 185, 19, 0.1);
                    border: 2px solid rgba(253, 185, 19, 0.3);
                    border-radius: 12px;
                    color: #FDB913;
                    font-weight: 600;
                    text-decoration: none;
                    margin-bottom: 30px;
                    transition: 0.3s;
                }

                .back-button:hover {
                    background: rgba(253, 185, 19, 0.2);
                    transform: translateX(-5px);
                }

                .page-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #FDB913, #ffca4f);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 10px;
                }

                .page-subtitle {
                    color: #aaa;
                    margin-bottom: 30px;
                }

                .form-container {
                    background: rgba(26, 26, 26, 0.6);
                    border: 2px solid rgba(253, 185, 19, 0.2);
                    border-radius: 24px;
                    padding: 40px;
                }

                .info-card {
                    background: rgba(253, 185, 19, 0.1);
                    border: 2px solid rgba(253, 185, 19, 0.3);
                    border-radius: 16px;
                    padding: 20px;
                    display: flex;
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 25px;
                }

                .form-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                }

                .form-input,
                .form-textarea {
                    padding: 15px 20px;
                    background: rgba(0,0,0,0.4);
                    border: 2px solid rgba(253,185,19,0.2);
                    border-radius: 12px;
                    color: white;
                    resize: none;
                }

                .form-textarea {
                    min-height: 150px;
                }

                .button-group {
                    display: flex;
                    gap: 15px;
                    margin-top: 20px;
                }

                .submit-button {
                    flex: 1;
                    padding: 18px;
                    background: linear-gradient(135deg, #FDB913, #ffca4f);
                    border: none;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .submit-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .cancel-button {
                    padding: 18px;
                    border: 2px solid rgba(253,185,19,0.3);
                    background: transparent;
                    color: #FDB913;
                    border-radius: 12px;
                    cursor: pointer;
                }

                @media (max-width: 768px) {
                    .content {
                        padding-left: 0;
                    }

                    .page-title {
                        font-size: 2rem;
                    }

                    .button-group {
                        flex-direction: column;
                    }
                }
            `}</style>

            <div className="layout">
                <LeftBar />

                <main className="content">
                    <div className="page-container">
                        <a href="/annonceBureau" className="back-button">
                            <ArrowLeft size={20} /> Retour
                        </a>

                        <h1 className="page-title">
                            <Edit3 size={40} /> Créer une Annonce
                        </h1>
                        <p className="page-subtitle">
                            Publiez une nouvelle annonce pour le bureau
                        </p>

                        <div className="form-container">
                            <div className="info-card">
                                <FileText size={24} />
                                <p>
                                    Veuillez renseigner le titre et la description de l’annonce.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">
                                        <Edit3 size={18} /> Titre
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={titre}
                                        onChange={(e) => setTitre(e.target.value)}
                                        placeholder="Titre de l'annonce"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <FileText size={18} /> Description
                                    </label>
                                    <textarea
                                        className="form-textarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Description de l'annonce"
                                    />
                                </div>

                                <div className="button-group">
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => navigate('/annonceBureau')}
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        type="submit"
                                        className="submit-button"
                                        disabled={loading}
                                    >
                                        <Save size={18} />
                                        {loading ? 'Création...' : 'Créer l’annonce'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreerAnnonce;
