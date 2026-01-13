import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

import Login from "./login";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Profile from "./Profile";
import Dashboard from "./Dashboard";

import AjouterMembre from "./Membres/AjouterMembre";
import ModifierMembre from "./Membres/ModifierMembre";

import AjouterMembreEquipe from "./EquipeBureau/AjouterMembreEquipe";
import ModifierMembreEquipe from "./EquipeBureau/ModifierMembreEquipe";
import Equipe from "./EquipeBureau/Equipe";

import AjouterEvenement from "./Events/AjouterEvenement";
import ModifierEvent from "./Events/ModifierEvent";
import Evenement from "./Events/Evenement";
import DetailsEvent from "./Events/DetailsEvent";

import AjouterTransaction from "./Trasactions/AjouterTransaction";
import ModifierTransaction from "./Trasactions/ModifierTransaction";
import ListeTransaction from "./Trasactions/ListeTransaction";

import Parametre from "./Parametre";
import Evenements from "./Evenements";
import Annonces from "./Annonces";
import ProtectedLayout from "./ProtectedLayout";


function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route element={<ProtectedLayout />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/evenements" element={<Evenements />} />
        <Route path="/annonces" element={<Annonces />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Membres */}
        <Route path="/ajouterMembre" element={<AjouterMembre />} />
        <Route path="/modifierMembre/:id" element={<ModifierMembre />} />

        {/* Équipe */}
        <Route path="/ajouterMembreEquipe" element={<AjouterMembreEquipe />} />
        <Route path="/modifierMembreEquipe/:id" element={<ModifierMembreEquipe />} />
        <Route path="/equipe" element={<Equipe />} />

        {/* Événements */}
        <Route path="/ajouteEvent" element={<AjouterEvenement />} />
        <Route path="/modifierEvent/:id" element={<ModifierEvent />} />
        <Route path="/evenement" element={<Evenement />} />
        <Route path="/DétailsEvenement/:id" element={<DetailsEvent />} />
        <Route path="/AllEvenement" element={<Evenements />} />

        {/* Transactions */}
        <Route path="/ajouterTransaction" element={<AjouterTransaction />} />
        <Route path="/modifierTransaction/:id" element={<ModifierTransaction />} />
        <Route path="/listeTransaction" element={<ListeTransaction />} />

        {/* Paramètres */}
        <Route path="/parametre" element={<Parametre />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
