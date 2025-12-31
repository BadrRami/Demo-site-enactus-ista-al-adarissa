import React from 'react';
import LeftBar from '../LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
const AjouterMembre = () => {
    const [nom, setNom] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [filiere, setFiliere] = React.useState('');
    const [motDePasse, setMotDePasse] = React.useState('');
    const [confirmerMotDePasse, setConfirmerMotDePasse] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [etatCotisation, setEtatCotisation] = React.useState(null);
    const [genre, setGenre] = React.useState(null);
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        if(String(nom).trim()==="" || String(email).trim()==="" || String(filiere).trim()==="" ||String(motDePasse).trim()==="" ||String(confirmerMotDePasse).trim()===""){
            alert("Vous devez remplire tous les champs")
            return
        }
        if(motDePasse !== confirmerMotDePasse){
            alert("Les deux mots de passe doivent etre identiques")
            return
        }
        if(etatCotisation === null){
            alert("vous devez cocher l''etat de cotisation")
            return
        }
        if(genre === null){
            alert("vous devez cocher le genre de membre")
            return
        }
        const newMmebre = {id: String(Date.now()), statut: "Membre", 
            Nom: nom, email: email, Filiere: filiere, 
            mot_de_passe: motDePasse,genre:genre, cotisation: etatCotisation,
            telephone:tel
        };
        const { data, error } = await supabase
            .from('Membres') 
            .insert([newMmebre])

        if (error) {
            console.error('Error inserting membre:', error)
        } else {
            console.log('Membre inserted successfully:', data)
        }
        navigate('/dashboard');
    }
    return (
        <div className='d-flex'>
            <LeftBar />
            <div>
                <h2>Ajouter un Nouveau Membre</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom Complet</label>
                        <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} id="name" placeholder="Entrez le nom complet" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Entrez l'email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Filière" className="form-label">Filière</label>
                        <select className="form-select" id="Filière" value={filiere} onChange={(e) => setFiliere(e.target.value)}>
                            <option>=============</option>
                            <option value="Développement Digital premier année">Développement Digital premier année</option>
                            <option value="Développement Digital option full stack">Développement Digital option full stack</option>
                            <option value="Gestion des entreprise option commerce">Gestion des entreprise option commerce</option>
                            <option value="Gestion des entreprise option RH">Gestion des entreprise option RH</option>
                            <option value="Gestion des entreprise option office manager">Gestion des entreprise option office manager</option>
                            <option value="Infographie">Infographie</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Créer un Mot de pass</label>
                        <input type="password" className="form-control" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} id="password" placeholder="Entrez le mot de passe" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmer_mot_de_passe" className="form-label">Confirmer le Mot de passe</label>
                        <input type="password" className="form-control" value={confirmerMotDePasse} onChange={(e) => setConfirmerMotDePasse(e.target.value)} id="confirmer_mot_de_passe" placeholder="Confirmez le mot de passe" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">Telephone</label>
                        <input type="tel" className="form-control" value={tel} onChange={(e) => setTel(e.target.value)} id="tel" placeholder="Telephone" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">État de cotisation</label>

                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="etat_cotisation" checked={etatCotisation === true}onChange={() => setEtatCotisation(true)}id="cotise"/>
                            <label className="form-check-label" htmlFor="cotise">Cotisé </label>
                        </div>

                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="etat_cotisation"checked={etatCotisation === false}onChange={() => setEtatCotisation(false)}id="non_cotise"/>
                            <label className="form-check-label" htmlFor="non_cotise">Non cotisé</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Genre</label>

                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="genre" checked={genre === "Homme"}onChange={() => setGenre("Homme")}id="Homme"/>
                            <label className="form-check-label" htmlFor="Homme">Homme </label>
                        </div>

                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="genre"checked={genre === "Femme"}onChange={() => setGenre("Femme")}id="Femme"/>
                            <label className="form-check-label" htmlFor="Femme">Femme</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Ajouter Membre</button>
                </form>
            </div>
            
        </div>
    );
}

export default AjouterMembre;
