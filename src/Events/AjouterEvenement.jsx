import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
import './AjouterEvenement.css';

const AjouterEvenement = () => {
    const [user, setUser] = useState(null);
    const [nom, setNom] = useState('');
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState('');
    const [description, setDescription] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('')
    const navigate = useNavigate();

    // 🔐 Vérification connexion
    useEffect(() => {
                            const isConnected = localStorage.getItem('isConnected');
                            const storedUser = localStorage.getItem('connectedUser');
                    
                            if (!isConnected || !storedUser) {
                                navigate('/login');
                                return;
                            }
                    
                            const userObj = JSON.parse(storedUser);
                            setUser(userObj);
                    
                            const role = userObj.role?.trim().toLowerCase();

                            const allowedRoles = [
                            "president",
                            "vice president",
                            "responsable des evenement" // sans accent
                            ];

                            if (!allowedRoles.includes(role)) {
                                navigate('/login');
                            }

    }, [navigate]);

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


    // Upload l’image vers Storage

    const uploadImage = async (file) => {
        if (!file) return null;

        const cleanName = file.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9._-]/g, "");

        const filePath = `${Date.now()}-${cleanName}`;

        const { error } = await supabase.storage
            .from("images")
            .upload(filePath, file, { upsert: true });

        if (error) {
            console.log(error);
            return null;
        }

        const { data } = supabase.storage
            .from("images")
            .getPublicUrl(filePath);

        return data.publicUrl;
    };



    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageFile = e.target.image.files[0];

        const imageUrl = await uploadImage(imageFile);

        if (!nom.trim() || !date || !description.trim() || !lieu.trim()) {
            alert("Tous les champs sont obligatoires");
            return;
        }

        if (new Date(date) <= new Date()) {
            alert("La date doit être future");
            return;
        }
        // if (!imageUrl) {
        //     alert("Erreur image");
        //     return;
        // }
        

        setLoading(true);

        const Event = {
            id: String(Date.now()),
            Nom_Evenement: nom,
            Date: date,
            Lieu: lieu,
            Description: description,
            created_at: new Date().toISOString(),
            image_url: imageUrl,
            Creer_par: user.id
        };

        const { data, error } = await supabase
            .from('Evenement')
            .insert([Event])
            .select();

        setLoading(false);

        if (error) {
            console.error('Error inserting event:', error);
            alert('Erreur lors de l\'ajout de l\'événement');
        } else {
            console.log('Event inserted successfully:', data);
            alert('Événement ajouté avec succès !');
            navigate('/evenement');
        }
    };

    if (!user) {
        return (
            <div className="ajouter-evenement-container">
                <div className="grid-overlay"></div>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="ajouter-evenement-container">
            <div className="grid-overlay"></div>
            <div className="ajouter-evenement-layout">
                <LeftBar />

                <div className="ajouter-evenement-content">
                    <div className="form-header">
                        <div className="header-icon">
                            <i className="bi bi-calendar-plus-fill"></i>
                        </div>
                        <h1>Créer un Nouvel Événement</h1>
                        <p>Remplissez les informations pour organiser un événement</p>
                    </div>

                    <div className="form-card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="eventName">
                                        <i className="bi bi-calendar-event"></i>
                                        Nom de l'événement *
                                    </label>
                                    <input
                                        type="text"
                                        id="eventName"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        placeholder="Ex: Atelier Entrepreneuriat Social"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="eventDate">
                                        <i className="bi bi-calendar3"></i>
                                        Date de l'événement *
                                    </label>
                                    <input
                                        type="date"
                                        id="eventDate"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="lieu">
                                    <i className="bi bi-geo-alt-fill"></i>
                                    Lieu de l'événement *
                                </label>
                                <input
                                    type="text"
                                    id="lieu"
                                    value={lieu}
                                    onChange={(e) => setLieu(e.target.value)}
                                    placeholder="Ex: ISTA AL ADARISSA - Salle de conférence"
                                    required
                                />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="img">
                                    <i className="bi bi-image-fill"></i>
                                    Image de l'événement *
                                </label>
                                <input
                                    type="file"
                                    id="img"
                                    name='image'
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                    accept="image/*"
                                    // required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="eventDescription">
                                    <i className="bi bi-file-text-fill"></i>
                                    Description de l'événement *
                                </label>
                                <textarea
                                    id="eventDescription"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="6"
                                    placeholder="Décrivez l'événement, ses objectifs, le programme prévu..."
                                    required
                                ></textarea>
                                <div className="char-count">
                                    {description.length} caractères
                                </div>
                            </div>

                            <div className="form-info">
                                <i className="bi bi-info-circle-fill"></i>
                                <p>L'événement sera visible par tous les membres du club après création.</p>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => navigate('/evenement')}
                                >
                                    <i className="bi bi-x-circle"></i>
                                    Annuler
                                </button>
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner"></span>
                                            Création en cours...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle-fill"></i>
                                            Créer l'événement
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

export default AjouterEvenement;