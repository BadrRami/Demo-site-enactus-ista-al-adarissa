import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './SupaBase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('Membres')
      .select('*')
      .eq('email', email)
      .eq('mot_de_passe', password)
      .single();

    if (error || !data) {
      setError('Email ou mot de passe incorrect');
      return;
    }

    // ✅ LOGIN OK
    localStorage.setItem('connectedUser', JSON.stringify(data));
    localStorage.setItem('isConnected', 'true');

    navigate('/profile');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form onSubmit={handleSubmit} className="border p-4 rounded" style={{ width: '350px' }}>
        <h4 className="text-center mb-3">Connexion</h4>

        {error && <p className="text-danger">{error}</p>}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
