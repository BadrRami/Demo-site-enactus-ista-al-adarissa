import React from 'react';
import LeftBar from '../LeftBar';
import supabase from '../SupaBase';
import { useNavigate } from 'react-router-dom';

const AjouterEquipe = () => {
    const [nom, setnom] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [role, setRole] = React.useState('');
    const [genre, setGenre] = React.useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(String(nom).trim() === ""  || String(email).trim()==="" || String(password).trim()==="" || String(confirmPassword).trim()=== "" || String(role).trim()===""){
            alert("Vous devez remplir tous les champs")
            return
        }
        if(password !==confirmPassword){
            alert("les deux mots de passe doivent etre identique")
            return
        }
        if(genre === null){
            alert("vous devez cocher le genre de membre")
            return
        }
        const newMembreEquipe = {id: String(Date.now()),Nom: nom, Email: email, Mot_de_pass: password,Genre:genre, Role: role};
        const { data, error } = await supabase
            .from('Equipe') 
            .insert([newMembreEquipe])

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
                <h2>Ajouter une Nouvelle Équipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom de membre l'Équipe</label>
                        <input type="text" className="form-control" value={nom} onChange={(e) => setnom(e.target.value)} id="nom" placeholder="Entrez le nom de l'équipe" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='email'>Email de membre de l'Équipe</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Entrez l'email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Créer un mot de pass de le membre</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Entrez le mot de pass" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ConfirmPassword" className="form-label">Confirmer le mot de passe</label>
                        <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="ConfirmPassword" placeholder="Confirmez le mot de passe" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Rôle dans l'Équipe</label>
                        <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} id="role" placeholder="Entrez le rôle" />
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

                    <button type="submit" className="btn btn-primary">Ajouter Équipe</button>
                </form>
            </div>
        </div>
    );
}

export default AjouterEquipe;
