import React, { useEffect } from 'react';
import LeftBar from '../LeftBar';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../SupaBase';
const ModifierTransaction = () => {
    const {id} = useParams();
    const [description, setDescription] = React.useState('');
    const [montant, setMontant] = React.useState('');
    const [date, setDate] = React.useState('');
    const [type, setType] = React.useState('');
    const [categorie, setCategorie] = React.useState('');
    const navigate = useNavigate();
    // 🔄 Charger la transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      const { data, error } = await supabase
        .from('Transactions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setDescription(data.Description);
      setMontant(data.Montant);
      setDate(data.Date);
      setType(data.Type_Transaction);
      setCategorie(data.Catégorie);
    };

    fetchTransaction();
  }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
        .from('Transactions')
        .update({
            Description:description,
            Montant:montant,
            Date:date,
            Date:date,
            Type_Transaction:type,
            Catégorie:categorie
        })
        .eq('id', id);

        if (error) {
        console.error('Erreur update:', error);
        alert('Erreur lors de la modification');
        } else {
        alert('Membre modifié avec succès ✅');
        navigate('/dashboard');
        }
    }
        
    
    return (
        <div className='d-flex'>
            <LeftBar    />
            <div>
                <h2>Modifier la Transaction</h2>
                 <form className="container mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Entrez la description de la transaction" />
                </div>
                <div className="mb-3">
                    <label htmlFor="montant" className="form-label">Montant</label>
                    <input type="number" className="form-control" id="montant" value={montant} onChange={(e) => setMontant(e.target.value)} placeholder="Entrez le montant de la transaction" />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type de Transaction</label>
                    <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Sélectionnez le type</option>
                        <option value="Revenu">Revenu</option>
                        <option value="Dépense">Dépense</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="categorie" className="form-label" >Catégorie</label>
                    <select className="form-select" id="categorie" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                        <option value="">Sélectionnez la catégorie</option>
                        <option value="donation">Donation</option>
                        <option value="sponsorship">Sponsorship</option>
                        <option value="operational">Opérationnel</option>
                        <option value="event">Événement</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Modifier Transaction</button>
            </form>
            </div>
        </div>
    );
}

export default ModifierTransaction;
