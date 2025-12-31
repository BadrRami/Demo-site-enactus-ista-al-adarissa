import React, { useState } from 'react';
import LeftBar from '../LeftBar';
import { useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';

const AjouterTransaction = () => {
  const [description, setDescription] = useState('');
  const [montant, setMontant] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [categorie, setCategorie] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ✅ Vérifications
    if (!description || !montant || !date || !type || !categorie) {
      alert('Vous devez remplir tous les champs');
      return;
    }

    if (isNaN(montant) || Number(montant) <= 0) {
      alert('Le montant doit être un nombre valide');
      return;
    }

    // 🔹 Préparation de la transaction
    const newTransaction = {
      Description:description,
      Montant: parseFloat(montant),
      Date:date,
      Type_Transaction:type,
      Catégorie:categorie,
    };

    // 🔹 Insertion dans Supabase
    const { data, error } = await supabase
      .from('Transactions') 
      .insert([newTransaction]);

    if (error) {
      console.error('Erreur insertion transaction:', error);
      alert('Erreur lors de l’ajout de la transaction');
    } else {
      alert('Transaction ajoutée avec succès ✅');
      navigate('/ListeTransaction');
    }
  };

  return (
    <div className='d-flex'>
      <LeftBar />
      <form className="container mt-4" onSubmit={handleSubmit}>
        <h2>Ajouter une Nouvelle Transaction</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Montant"
          value={montant}
          onChange={e => setMontant(e.target.value)}
        />

        <input
          type="date"
          className="form-control mb-3"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="">Sélectionnez le type</option>
          <option value="Revenu">Revenu</option>
          <option value="Dépense">Dépense</option>
        </select>

        <select
          className="form-select mb-3"
          value={categorie}
          onChange={e => setCategorie(e.target.value)}
        >
          <option value="">Sélectionnez la catégorie</option>
          <option value="donation">Donation</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="operational">Opérationnel</option>
          <option value="event">Événement</option>
        </select>

        <button type="submit" className="btn btn-primary w-100">Ajouter Transaction</button>
      </form>
    </div>
  );
};

export default AjouterTransaction;
