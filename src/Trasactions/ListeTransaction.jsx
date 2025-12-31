import React, { useEffect, useState } from 'react';
import LeftBar from '../LeftBar';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../SupaBase';
const ListeTransaction = () => {
    const [transactions, setTransactions] = useState([]); // ✅ tableau
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

  // 📥 Récupérer les membres
  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('Transactions')
        .select('*')

      if (error) {
        console.error('Error fetching membres:', error);
        return;
      }

      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  // 🗑 Supprimer membre
  const supprimerTransaction = async (id) => {
    if (!window.confirm('Voulez-vous supprimer cette transaction ?')) return;

    const { error } = await supabase
      .from('Transactions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur suppression:', error);
    } else {
      setTransactions(prev => prev.filter(m => m.id !== id));
    }
  };

  if (!user) return <p>Loading...</p>;
    return (
        <div className='d-flex'>
            <LeftBar    />
            <div>
                <h2>Liste des Transactions</h2>
                <Link className="btn btn-success" to="/ajouterTransaction">Ajouter une transaction</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">Montant</th>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                            <th scope="col">Catégorie</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                                     <tr>
                                       <td colSpan="6" className="text-center">
                                         Aucun membre trouvé
                                       </td>
                                     </tr>
                                   ) : (
                                     transactions.map((transaction, index) => (
                                       <tr key={transaction.id}>
                                         <td>{index + 1}</td>
                                         <td>{transaction.Description}</td>
                                         <td>{transaction.Montant}</td>
                                         <td>{transaction.Date}</td>
                                         <td>{transaction.Type_Transaction}</td>
                                         <td>{transaction.Catégorie}</td>
                                         <td>
                                           <Link
                                             to={`/modifierTransaction/${transaction.id}`}
                                             className="btn btn-warning btn-sm"
                                           >
                                             🖊
                                           </Link>
                       
                                           <button
                                             className="btn btn-danger btn-sm mx-2"
                                             onClick={() => supprimerTransaction(transaction.id)}
                                           >
                                             🗑
                                           </button>
                                         </td>
                                       </tr>
                                     ))
                                   )}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

export default ListeTransaction;
