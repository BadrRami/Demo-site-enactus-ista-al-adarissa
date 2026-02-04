import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
import './ListeTransaction.css';

const ListeTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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

    // 🔐 Vérification connexion
    useEffect(() => {
        const isConnected = localStorage.getItem('isConnected');
        const storedUser = localStorage.getItem('connectedUser');

        if (!isConnected || !storedUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    // 📥 Récupérer les transactions
    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Transactions')
                .select('*')
                .order('Date', { ascending: false });

            if (error) {
                console.error('Error fetching transactions:', error);
            } else {
                setTransactions(data || []);
            }
            setLoading(false);
        };

        fetchTransactions();
    }, []);

    // 🗑 Supprimer transaction
    const supprimerTransaction = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette transaction ?')) return;

        const { error } = await supabase
            .from('Transactions')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur suppression:', error);
            alert('Erreur lors de la suppression');
        } else {
            setTransactions(prev => prev.filter(m => m.id !== id));
        }
    };

    // Filtrage
    const filteredTransactions = transactions.filter(transaction =>
        transaction.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.Catégorie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.Type_Transaction?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculs
    const totalRevenu = transactions
        .filter(t => t.Type_Transaction === 'Revenu')
        .reduce((sum, t) => sum + (parseFloat(t.Montant) || 0), 0);

    const totalDepense = transactions
        .filter(t => t.Type_Transaction === 'Dépense')
        .reduce((sum, t) => sum + (parseFloat(t.Montant) || 0), 0);

    const solde = totalRevenu - totalDepense;

    if (!user) {
        return (
            <div className="transaction-container">
                <div className="grid-overlay"></div>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="transaction-container">
            <div className="grid-overlay"></div>

            {/* <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
            </button> */}

            <div className="transaction-layout">
                <LeftBar />

                <div className="transaction-content">
                    {/* Header */}
                    <div className="transaction-header">
                        <div className="header-info">
                            <h1>Gestion des Transactions</h1>
                            <p>Suivi des revenus et dépenses du club</p>
                        </div>
                        <Link to="/ajouterTransaction" className="add-btn">
                            <i className="bi bi-plus-circle-fill"></i>
                            Ajouter une transaction
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="transaction-stats">
                        <div className="stat-item revenue">
                            <i className="bi bi-arrow-down-circle-fill"></i>
                            <div>
                                <span className="stat-label">Revenus</span>
                                <span className="stat-number">{totalRevenu.toFixed(2)} DH</span>
                            </div>
                        </div>
                        <div className="stat-item expense">
                            <i className="bi bi-arrow-up-circle-fill"></i>
                            <div>
                                <span className="stat-label">Dépenses</span>
                                <span className="stat-number">{totalDepense.toFixed(2)} DH</span>
                            </div>
                        </div>
                        <div className={`stat-item balance ${solde >= 0 ? 'positive' : 'negative'}`}>
                            <i className="bi bi-wallet2"></i>
                            <div>
                                <span className="stat-label">Solde</span>
                                <span className="stat-number">{solde.toFixed(2)} DH</span>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter */}
                    <div className="table-controls">
                        <div className="search-box">
                            <i className="bi bi-search"></i>
                            <input
                                type="text"
                                placeholder="Rechercher par description, type ou catégorie..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="controls-actions">
                            <button className="control-btn">
                                <i className="bi bi-funnel-fill"></i>
                                Filtrer
                            </button>
                            <button className="control-btn">
                                <i className="bi bi-download"></i>
                                Exporter
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container">
                        {loading ? (
                            <div className="table-loading">
                                <div className="loading-spinner"></div>
                                <p>Chargement des transactions...</p>
                            </div>
                        ) : filteredTransactions.length === 0 ? (
                            <div className="empty-state">
                                <i className="bi bi-receipt"></i>
                                <h3>Aucune transaction trouvée</h3>
                                <p>{searchTerm ? 'Essayez d\'ajuster votre recherche' : 'Commencez par ajouter votre première transaction'}</p>
                            </div>
                        ) : (
                            <table className="transactions-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Description</th>
                                        <th>Montant</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Catégorie</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map((transaction, index) => (
                                        <tr key={transaction.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="transaction-description">
                                                    <i className="bi bi-file-text"></i>
                                                    {transaction.Description}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`amount-badge ${transaction.Type_Transaction === 'Revenu' ? 'revenue' : 'expense'}`}>
                                                    {transaction.Type_Transaction === 'Revenu' ? '+' : '-'}
                                                    {parseFloat(transaction.Montant).toFixed(2)} DH
                                                </span>
                                            </td>
                                            <td>
                                                <span className="date-badge">
                                                    <i className="bi bi-calendar3"></i>
                                                    {new Date(transaction.Date).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`type-badge ${transaction.Type_Transaction === 'Revenu' ? 'revenue' : 'expense'}`}>
                                                    <i className={`bi ${transaction.Type_Transaction === 'Revenu' ? 'bi-arrow-down-circle' : 'bi-arrow-up-circle'}`}></i>
                                                    {transaction.Type_Transaction}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="category-badge">
                                                    {transaction.Catégorie}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link
                                                        to={`/modifierTransaction/${transaction.id}`}
                                                        className="action-btn edit"
                                                        title="Modifier"
                                                    >
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </Link>
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => supprimerTransaction(transaction.id)}
                                                        title="Supprimer"
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListeTransaction;