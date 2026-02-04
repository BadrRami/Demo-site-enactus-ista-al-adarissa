import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';
import QRCode from "qrcode";
import'./CreerTickets.css';
import { useNavigate } from 'react-router-dom';
const CreerTickets = () => {
    const [AllEvenement, setAllEvenement] = useState([]);
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [qrImage, setQrImage] = useState("");

    // Générer  QR Code
    const generateTicketCode = () => {
    return "TK-" + crypto.randomUUID().slice(0, 8).toUpperCase();
    };

    const [ticketCode, setTicketCode] = useState(generateTicketCode());

    // Générer l'image de QR Code
    const generateQRCode = async (code) => {
    try {
        const qr = await QRCode.toDataURL(code);
        setQrImage(qr);
    } catch (err) {
        console.error("Erreur génération QR", err);
    }
    };
    useEffect(() => {
    if (ticketCode) {
        generateQRCode(ticketCode);
    }
    }, [ticketCode]);

    // Télécharger le QR code
    const downloadQR = () => {
    const a = document.createElement("a");
    a.href = qrImage;
    a.download = `ticket_${ticketCode}.png`;
    a.click();
    };



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
            // navigate('/login');
            alert('Vous devez être connecté');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 📥 Récupérer les événements
    useEffect(() => {
        const fetchEvenements = async () => {
            const { data, error } = await supabase
                .from('Evenement')
                .select('*')
                .order('created_at', { ascending: false }); 
            if (error) {
                console.error('Error fetching Evenements:', error);
            } else {
                setAllEvenement(data || []);
            }
            
        };
        fetchEvenements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const nouvelTicket = {
        event_id: e.target.event.value,
        prix: e.target.prix.value,
        statut: e.target.statut.value,
        type: e.target.type.value,
        code: ticketCode
        };


        // Simulation - remplacer par appel Supabase
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Code Supabase à décommenter:
        
        const { data, error } = await supabase
            .from('Tickets')
            .insert([nouvelTicket]);
        if (error) {
            console.error('Erreur lors de la création du ticket:', error);
            alert('❌ Erreur lors de la création du ticket');
        } else {
            console.log('Ticket créé avec succès:', data);
            alert('✅ Ticket créé avec succès !');
            e.target.reset();
            navigate('/tickets')
            
        }
        

        setLoading(false);
    };

    return (
        <div className="page-container">
            <div className="grid-overlay"></div>
            <LeftBar />
            <div className="main-content">
                <div className="page-header">
                    <h1>Créer des tickets pour un Événement</h1>
                    <p>Configurez et générez des tickets pour vos événements Enactus</p>
                </div>

                <div className="form-card">
                    <div className="info-box">
                        <i className="bi bi-info-circle-fill"></i>
                        <div className="info-box-content">
                            <h3>Information importante</h3>
                            <p>Les tickets créés seront immédiatement disponibles pour les participants. Assurez-vous de vérifier tous les détails avant de valider.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="event" className="form-label">
                                <i className="bi bi-calendar-event"></i>
                                Sélectionner un événement
                                <span className="required">*</span>
                            </label>
                            <select name="event" id="event" className="form-select" required>
                                <option value="">-- Choisir un événement --</option>
                                {AllEvenement.map((event) => (
                                    <option key={event.id} value={event.id}>{event.Nom_Evenement}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="statut" className="form-label">
                                <i className="bi bi-flag-fill"></i>
                                Statut du ticket
                                <span className="required">*</span>
                            </label>
                            <select name="statut" id="statut" className="form-select" required>
                                <option value="Valide">✅ Valide</option>
                                <option value="Déjà utilisé">🔄 Déjà utilisé</option>
                                <option value="Invalide">❌ Invalide</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="type" className="form-label">
                                <i className="bi bi-ticket-fill"></i>
                                Type du ticket
                                <span className="required">*</span>
                            </label>
                            <select name="type" id="type" className="form-select" required>
                                <option value="Normal">Normal</option>
                                <option value="VIP">VIP</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="prix" className="form-label">
                                <i className="bi bi-cash-coin"></i>
                                Prix du ticket (DH)
                                <span className="required">*</span>
                            </label>
                            <input 
                                type="number" 
                                name="prix" 
                                id="prix" 
                                className="form-input"
                                placeholder="Ex: 50"
                                min="0"
                                step="10"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="QR" className="form-label">
                                <i className="bi bi-qr-code-scan"></i>
                                Générer un QR code
                                <span className="required">*</span>
                            </label>
                            <input
                            type="text"
                            className="form-input"
                            value={ticketCode}
                            readOnly
                            />

                            
                        </div>
                        {qrImage && (
                        <div className="form-group">
                            <label className="form-label">
                            <i className="bi bi-qr-code"></i> QR Code du ticket
                            </label>
                            <img src={qrImage} alt="QR Ticket" style={{ width: 180 }} />
                        </div>
                        )}
                        <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={downloadQR}
                        >
                        <i className="bi bi-download"></i>
                        Télécharger le QR
                        </button>



                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => window.history.back()}
                            >
                                <i className="bi bi-x-circle"></i>
                                Annuler
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner"></div>
                                        Création en cours...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-plus-circle"></i>
                                        Créer le Ticket
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreerTickets;