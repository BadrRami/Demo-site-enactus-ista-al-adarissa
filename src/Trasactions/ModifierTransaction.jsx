import React from 'react';
import {
    Edit3,
    DollarSign,
    Calendar,
    Tag,
    FileText,
    Save,
    ArrowLeft
} from 'lucide-react';
import LeftBar from '../LeftBar';

const ModifierTransaction = () => {
    const [description, setDescription] = React.useState('');
    const [montant, setMontant] = React.useState('');
    const [date, setDate] = React.useState('');
    const [type, setType] = React.useState('');
    const [categorie, setCategorie] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert('Transaction modifiée avec succès ✅');
            setLoading(false);
        }, 1500);
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
                    max-width: 1400px;
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

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 25px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .full-width {
                    grid-column: 1 / -1;
                }

                .form-label {
                    display: flex;
                    gap: 8px;
                    font-weight: 600;
                }

                .form-input,
                .form-select {
                    padding: 15px 20px;
                    background: rgba(0,0,0,0.4);
                    border: 2px solid rgba(253,185,19,0.2);
                    border-radius: 12px;
                    color: white;
                }

                .type-selector {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }

                .type-option {
                    padding: 15px;
                    border-radius: 12px;
                    text-align: center;
                    cursor: pointer;
                    border: 2px solid rgba(253,185,19,0.2);
                }

                .type-option.active {
                    background: #FDB913;
                    color: #000;
                    font-weight: 700;
                }

                .button-group {
                    display: flex;
                    gap: 15px;
                    margin-top: 30px;
                }

                .submit-button {
                    flex: 1;
                    padding: 18px;
                    background: linear-gradient(135deg, #FDB913, #ffca4f);
                    border: none;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
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

                    .type-selector {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <div className="layout">
                <LeftBar />

                <main className="content">
                    <div className="page-container">
                        <a href="/dashboard" className="back-button">
                            <ArrowLeft size={20} /> Retour au Dashboard
                        </a>

                        <h1 className="page-title">
                            <Edit3 size={40} /> Modifier la Transaction
                        </h1>
                        <p className="page-subtitle">
                            Mettez à jour les informations de la transaction
                        </p>

                        <div className="form-container">
                            <div className="info-card">
                                <FileText size={24} />
                                <p>
                                    Tous les champs sont obligatoires pour modifier la transaction.
                                </p>
                            </div>

                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label className="form-label">
                                        <FileText size={18} /> Description
                                    </label>
                                    <input
                                        className="form-input"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <DollarSign size={18} /> Montant (MAD)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={montant}
                                        onChange={(e) => setMontant(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Calendar size={18} /> Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Tag size={18} /> Type
                                    </label>
                                    <div className="type-selector">
                                        <div
                                            className={`type-option ${type === 'Revenu' ? 'active' : ''}`}
                                            onClick={() => setType('Revenu')}
                                        >
                                            ⬆️ Revenu
                                        </div>
                                        <div
                                            className={`type-option ${type === 'Dépense' ? 'active' : ''}`}
                                            onClick={() => setType('Dépense')}
                                        >
                                            ⬇️ Dépense
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <Tag size={18} /> Catégorie
                                    </label>
                                    <select
                                        className="form-select"
                                        value={categorie}
                                        onChange={(e) => setCategorie(e.target.value)}
                                    >
                                        <option value="">Sélectionner</option>
                                        <option value="donation">Donation</option>
                                        <option value="sponsorship">Sponsorship</option>
                                        <option value="event">Événement</option>
                                        <option value="operation">Opérationnel</option>
                                    </select>
                                </div>
                            </div>

                            <div className="button-group">
                                <button
                                    className="cancel-button"
                                    onClick={() => window.history.back()}
                                >
                                    Annuler
                                </button>

                                <button
                                    className="submit-button"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    <Save size={18} /> Modifier
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ModifierTransaction;
