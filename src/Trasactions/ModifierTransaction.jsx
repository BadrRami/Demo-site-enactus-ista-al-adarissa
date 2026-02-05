import React, { useEffect } from 'react';
import {Edit3,DollarSign,Calendar,Tag,FileText,Save,ArrowLeft} from 'lucide-react';
import LeftBar from '../LeftBar';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../SupaBase';

const ModifierTransaction = () => {
    const [description, setDescription] = React.useState('');
    const [montant, setMontant] = React.useState('');
    const [date, setDate] = React.useState('');
    const [type, setType] = React.useState('');
    const [categorie, setCategorie] = React.useState('');
    const [loading, setLoading] = React.useState(true); // ✅ Changé à true
    const {id} = useParams()
    const navigate = useNavigate();
    
    useEffect(() => {
    console.log('ID reçu:', id); // ✅ Vérifier l'ID
    
    const fetchTransaction = async () => {
        console.log('Début du chargement...'); // ✅ Début
        setLoading(true);
        
        try {
            const { data, error } = await supabase
                .from('Transactions')
                .select('*')
                .eq('id', id)
                .single();

            console.log('Données reçues:', data); // ✅ Voir les données
            console.log('Erreur:', error); // ✅ Voir l'erreur

            if (error) {
                console.error('Erreur chargement transaction:', error);
                alert('Erreur lors du chargement de la transaction');
                navigate('/listeTransaction');
                return;
            }

            if (data) {
    console.log('Mise à jour des états avec:', data);
    setCategorie(data.Catégorie || ''); // ✅ Majuscule
    setDate(data.Date || ''); // ✅ Majuscule
    setDescription(data.Description || ''); // ✅ Majuscule
    setMontant(data.Montant || ''); // ✅ Majuscule
    setType(data.Type_Transaction || ''); // ✅ Type_Transaction au lieu de type
}
        } catch (err) {
            console.error('Erreur catch:', err);
        } finally {
            console.log('Fin du chargement'); // ✅ Fin
            setLoading(false);
        }
    }
    
    if (id) {
        fetchTransaction();
    } else {
        console.log('Pas d\'ID trouvé!'); // ✅ Problème d'ID
        setLoading(false);
    }
}, [id, navigate]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !montant || !date || !type || !categorie) {
        alert('Vous devez remplir tous les champs');
        return;
    }
    if (isNaN(montant) || Number(montant) <= 0) {
        alert('Le montant doit être un nombre valide supérieur à 0');
        return;
    }

    setLoading(true);
    
    // ✅ Utiliser les bons noms de colonnes
    const updatedTransaction = { 
        Description: description, 
        Montant: montant, 
        Date: date, 
        Type_Transaction: type, 
        Catégorie: categorie 
    };

    const { error } = await supabase
        .from('Transactions')
        .update(updatedTransaction)
        .eq('id', id);

    if (error) {
        console.error('Erreur modification transaction:', error);
        alert('❌ Erreur lors de la modification de la transaction');
        setLoading(false);
    } else {
        alert('Transaction modifiée avec succès ✅');
        navigate('/listeTransaction');
    }
};

    // ✅ Afficher un loader pendant le chargement
    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
                    <p style={{ color: '#FDB913', fontSize: '1.5rem' }}>Chargement...</p>
                </div>
            </div>
        );
    }

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

                .page-containerTransaction {
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
                    transition: 0.3s;
                }

                .type-option:hover {
                    background: rgba(253, 185, 19, 0.1);
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
                    color: #000;
                    transition: 0.3s;
                }

                .submit-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(253, 185, 19, 0.4);
                }

                .submit-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .cancel-button {
                    padding: 18px 30px;
                    border: 2px solid rgba(253,185,19,0.3);
                    background: transparent;
                    color: #FDB913;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: 0.3s;
                }

                .cancel-button:hover {
                    background: rgba(253, 185, 19, 0.1);
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
                    <div className="page-containerTransaction">
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
                            
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label className="form-label">
                                            <FileText size={18} /> Description
                                        </label>
                                        <input
                                            className="form-input"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Description de la transaction"
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
                                            placeholder="0.00"
                                            step="0.01"
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
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => navigate('/listeTransaction')}
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        type="submit"
                                        className="submit-button"
                                        disabled={loading}
                                    >
                                        <Save size={18} /> Modifier
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

export default ModifierTransaction;