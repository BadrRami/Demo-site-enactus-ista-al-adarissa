import { Link } from 'react-router-dom'

const LeftBar = () => {
  // Récupérer l'utilisateur stocké au login
  const connectedUser = JSON.parse(localStorage.getItem('connectedUser'))

  if (!connectedUser) return <div>Utilisateur non connecté</div>

  // Vérifier le rôle
  const isBureau = connectedUser.statut?.trim().toLowerCase() === 'bureau'

  return (
    <div style={{ width: 250, background: '#2d2c2cff', height: '100vh' }}>
      <h4 style={{ color: 'white' }}>ENACTUS ISTA AL ADARISSA</h4>

      <ul style={{ listStyle: 'none', padding: '0 10px' }}>
        {isBureau && (
          <>
            <li><Link to="/dashboard">📊 Tableau de Bord</Link></li>
            <li><Link to="/equipe">👥 Équipe</Link></li>
            <li><Link to="/ListeTransaction">📋 Liste des Transactions</Link></li>
            <li><Link to="/evenement">📅 Événements</Link></li>
          </>
        )}
        <li><Link to="/profile">👤 Profile</Link></li>
        <li><Link to="/parametre">⚙ Paramètres</Link></li>
      </ul>
    </div>
  )
}

export default LeftBar
