import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LeftBar = () => {
    

    return (
        
        <div>
            <div style={{
                width:"250px", 
                background:"#2d2c2cff", 
                height:"100vh", 
                borderRadius:"0% 2% 2% 0%", 
                display:"block", 
                justifyContent:"center", 
                fontSize:"24px", 
                marginRight:"20px"
            }}>
                <h4 style={{color: "white"}}>ENACTUS ISTA AL ADARISSA</h4>
                <div>
                    <ul style={{listStyleType:"none", paddingLeft:"10px"}}>
                        <li><Link to={"/dashboard"}>📅Tableau de Bord</Link></li>
                        <li><Link to={"/equipe"}>👥Équipe</Link></li>
                        
                            <li><Link to={"/ListeTransaction"}>📋Liste des Transactions</Link></li>

                        <li><Link to={"/evenement"}>📅Événements</Link></li>
                        <li><Link to={"/parametre"}>⚙Paramètres</Link></li>
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default LeftBar;
