import React from 'react';
import LeftBar from '../LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
import './AjouterMembre.css'
const AjouterMembre = () => {
    const [nom, setNom] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [filiere, setFiliere] = React.useState('');
    const [motDePasse, setMotDePasse] = React.useState('');
    const [confirmerMotDePasse, setConfirmerMotDePasse] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [etatCotisation, setEtatCotisation] = React.useState(null);
    const [genre, setGenre] = React.useState(null);
    const [darkMode, setDarkMode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
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

    async function handleSubmit(event) {
        event.preventDefault();
        
        if(String(nom).trim()==="" || String(email).trim()==="" || String(filiere).trim()==="" ||String(motDePasse).trim()==="" ||String(confirmerMotDePasse).trim()===""){
            alert("❌ Vous devez remplir tous les champs")
            return
        }
        if(motDePasse !== confirmerMotDePasse){
            alert("❌ Les deux mots de passe doivent être identiques")
            return
        }
        if(etatCotisation === null){
            alert("❌ Vous devez cocher l'état de cotisation")
            return
        }
        if(genre === null){
            alert("❌ Vous devez cocher le genre du membre")
            return
        }

        setLoading(true);

        const newMembre = {
            id: String(Date.now()), 
            statut: "Membre", 
            Nom: nom, 
            email: email, 
            Filiere: filiere, 
            mot_de_passe: motDePasse,
            genre: genre, 
            cotisation: etatCotisation,
            telephone: tel
        };

        const { data, error } = await supabase
            .from('Membres') 
            .insert([newMembre])

        if (error) {
            console.error('Error inserting membre:', error)
            alert('❌ Erreur lors de l\'ajout du membre')
        } else {
            console.log('Membre inserted successfully:', data)
            alert('✅ Membre ajouté avec succès !')
            navigate('/dashboard');
        }

        setLoading(false);
    }

    return (
        <div className='page-container-membre'>
            <div className="grid-overlay"></div>

            

            <LeftBar />
            
            <div className="membre-main-content">
                <h2>Ajouter un Nouveau Membre</h2>
                
                <div className="form-card-membre">
                    <form onSubmit={handleSubmit}>
                        {/* Informations Personnelles */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nom Complet</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={nom} 
                                onChange={(e) => setNom(e.target.value)} 
                                id="name" 
                                placeholder="Entrez le nom complet" 
                            />
                        </div>

                        <div className="form-row-2">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    id="email" 
                                    placeholder="exemple@email.com" 
                                />
                            </div>

                            <div className="mb-3">
                                
                                <label htmlFor="tel" className="form-label"><i class="bi bi-telephone"></i>Téléphone</label>
                                <input 
                                    type="tel" 
                                    className="form-control" 
                                    value={tel} 
                                    onChange={(e) => setTel(e.target.value)} 
                                    id="tel" 
                                    placeholder="+212 6XX XXX XXX" 
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Filière" className="form-label">Filière</label>
                            <select 
                                className="form-select" 
                                id="Filière" 
                                value={filiere} 
                                onChange={(e) => setFiliere(e.target.value)}
                            >
                                <option value="">-- Sélectionner une filière --</option>
                                <option value="Développement Digital premier année">Développement Digital 1ère année</option>
                                <option value="Développement Digital option full stack">Développement Digital - Full Stack</option>
                                <option value="Gestion des entreprise option commerce">Gestion des Entreprises - Commerce</option>
                                <option value="Gestion des entreprise option RH">Gestion des Entreprises - RH</option>
                                <option value="Gestion des entreprise option office manager">Gestion des Entreprises - Office Manager</option>
                                <option value="Infographie">Infographie</option>
                            </select>
                        </div>

                        {/* Sécurité */}
                        <div className="form-row-2">
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Mot de passe</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={motDePasse} 
                                    onChange={(e) => setMotDePasse(e.target.value)} 
                                    id="password" 
                                    placeholder="••••••••" 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmer_mot_de_passe" className="form-label">Confirmer</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={confirmerMotDePasse} 
                                    onChange={(e) => setConfirmerMotDePasse(e.target.value)} 
                                    id="confirmer_mot_de_passe" 
                                    placeholder="••••••••" 
                                />
                            </div>
                        </div>

                        {/* Genre & Cotisation */}
                        <div className="form-row-2">
                            <div className="mb-3 radio-group-wrapper">
                                <label className="form-label">Genre</label>
                                <div className="form-check">
                                    <input 
                                        type="radio" 
                                        className="form-check-input" 
                                        name="genre" 
                                        checked={genre === "Homme"}
                                        onChange={() => setGenre("Homme")}
                                        id="Homme"
                                    />
                                    <label className="form-check-label" htmlFor="Homme">👨 Homme</label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        type="radio" 
                                        className="form-check-input" 
                                        name="genre"
                                        checked={genre === "Femme"}
                                        onChange={() => setGenre("Femme")}
                                        id="Femme"
                                    />
                                    <label className="form-check-label" htmlFor="Femme">👩 Femme</label>
                                </div>
                            </div>

                            <div className="mb-3 radio-group-wrapper">
                                <label className="form-label">Cotisation</label>
                                <div className="form-check">
                                    <input 
                                        type="radio" 
                                        className="form-check-input" 
                                        name="etat_cotisation" 
                                        checked={etatCotisation === true}
                                        onChange={() => setEtatCotisation(true)}
                                        id="cotise"
                                    />
                                    <label className="form-check-label" htmlFor="cotise">✅ Cotisé</label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        type="radio" 
                                        className="form-check-input" 
                                        name="etat_cotisation"
                                        checked={etatCotisation === false}
                                        onChange={() => setEtatCotisation(false)}
                                        id="non_cotise"
                                    />
                                    <label className="form-check-label" htmlFor="non_cotise">❌ Non cotisé</label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Ajout en cours...' : 'Ajouter le Membre'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AjouterMembre;