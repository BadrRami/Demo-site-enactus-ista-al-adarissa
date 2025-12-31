import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftBar from './LeftBar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isConnected = localStorage.getItem('isConnected');
    const storedUser = localStorage.getItem('connectedUser');

    if (!isConnected || !storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="d-flex">
      <LeftBar />
      <div className="p-4">
        <h2>Profil</h2>
        <p><b>Nom :</b> {user.Nom}</p>
        <p><b>Email :</b> {user.email}</p>
        <p><b>Filière :</b> {user.Filiere}</p>
        <p><b>Rôle :</b> {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
