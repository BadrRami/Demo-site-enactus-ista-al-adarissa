import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LefBar.css';

const LeftBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

  if (!connectedUser) {
    return (
      <div className="leftbar-error">
        <i className="bi bi-exclamation-circle"></i>
        <p>Utilisateur non connecté</p>
      </div>
    );
  }

  const statut = connectedUser.statut?.trim().toLowerCase();
  const role = connectedUser.role?.trim().toLowerCase();
  const isBureau = statut === 'bureau';
  const isPresident = role === 'president';
  const isVicePresident = role === 'vice president';
  const isCommunication = role === 'responsable de communication';
  const isTreasurer = role === 'treasurer';
  const isEvent = role === 'responsable des événement';

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`leftbar ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="leftbar-toggle" 
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle sidebar"
      >
        <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
      </button>

      <div className="leftbar-header">
        <div className="leftbar-logo">
          <i className="bi bi-lightning-charge-fill"></i>
        </div>
        {!isCollapsed && (
          <div className="leftbar-title">
            <h4>ENACTUS</h4>
            <span>ISTA AL ADARISSA</span>
          </div>
        )}
      </div>

      <div className="leftbar-user">
        <div className="user-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
        {!isCollapsed && (
          <div className="user-info">
            <p className="user-name">{connectedUser.Nom}</p>
            <span className="user-role">{connectedUser.role}</span>
          </div>
        )}
      </div>

      <nav className="leftbar-nav">
        <ul>
          {isBureau && (
            <>
              {(isPresident || isVicePresident) &&(
                <>
                  <li>
                    <Link to="/dashboard" className={isActive('/dashboard')} title="Tableau de Bord">
                      <i className="bi bi-speedometer2"></i>
                      {!isCollapsed && <span>Tableau de Bord</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/equipe" className={isActive('/equipe')} title="Équipe">
                      <i className="bi bi-people-fill"></i>
                      {!isCollapsed && <span>Équipe</span>}
                    </Link>
                  </li>
                </>
              )}
              {(isTreasurer || isPresident || isVicePresident) && (
                <li>
                  <Link to="/ListeTransaction" className={isActive('/ListeTransaction')} title="Transactions">
                    <i className="bi bi-receipt"></i>
                    {!isCollapsed && <span>Transactions</span>}
                  </Link>
                </li>
              )}
              {(isCommunication || isPresident || isVicePresident) && (
                <li>
                  <Link to="/annonceBureau" className={isActive('/annonceBureau')} title="Annonces">
                    <i className="bi bi-megaphone-fill"></i>
                    {!isCollapsed && <span>Annonces</span>}
                  </Link>
                </li>
              )}
              {(isPresident || isEvent || isVicePresident) && (
                <li>
                  <Link to="/evenement" className={isActive('/evenement')} title="Événements">
                    <i className="bi bi-calendar-event-fill"></i>
                    {!isCollapsed && <span>Événements</span>}
                  </Link>
                </li>
              )}
              {(isPresident  ||isTreasurer|| isVicePresident) && (
              <li>
                <Link to="/tickets"  title="Tickets">
                  <i className="bi bi-ticket-fill"></i>
                  <span>Tickets</span>
                </Link>
              </li>
              )}
              {(isPresident  || isVicePresident) && (
              <li>
                <Link to="/Membre"  title="Tickets">
                  <i className="bi bi-people-fill"></i>
                  <span>Membres</span>
                </Link>
              </li>
              )}
            </>
          )}
          
          <li className="nav-divider"></li>
          
          <li>
            <Link to="/profile" className={isActive('/profile')} title="Profile">
              <i className="bi bi-person-fill"></i>
              {!isCollapsed && <span>Profile</span>}
            </Link>
          </li>
          <li>
            <Link to="/parametre" className={isActive('/parametre')} title="Paramètres">
              <i className="bi bi-gear-fill"></i>
              {!isCollapsed && <span>Paramètres</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="leftbar-footer">
        <Link to="/" className="home-link" title="Retour à l'accueil">
          <i className="bi bi-house-fill"></i>
          {!isCollapsed && <span>Accueil</span>}
        </Link>
      </div>
    </div>
  );
};

export default LeftBar;