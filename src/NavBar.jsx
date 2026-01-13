import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const isConnected = localStorage.getItem('isConnected') === 'true';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Enactus</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/evenements">Évènements</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/annonces">Annonces</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">À propos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="d-flex gap-2">
          {isConnected ? (
            <>
              <Link to="/profile" className="btn btn-outline-success">Profil</Link>
              <button
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem('connectedUser');
                  localStorage.setItem('isConnected', 'false');
                  window.location.href = '/login'; // redirige vers login
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-success">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
