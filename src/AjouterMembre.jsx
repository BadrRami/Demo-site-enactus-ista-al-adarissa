import { useState } from 'react'
import supabase from './SupaBase'
const AjouterMembre = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [filiere, setFiliere] = useState('')
  const [role, setRole] = useState('')
  const [nomComplet, setNomComplet] = useState('')
  async function handleSubmit(e) {
  e.preventDefault()
  const membre = {
  email: email,
  mot_de_passe: password, // exactement comme dans la table
  Filiere: filiere,      // F majuscule
  role: role,
  Nom: nomComplet         // N majuscule
  }



  const { data, error } = await supabase
    .from('Membres') 
    .insert([membre])

  if (error) {
    console.error('Error inserting membre:', error)
  } else {
    console.log('Membre inserted successfully:', data)
  }

  // Reset form
  setEmail('')
  setPassword('')
  setFiliere('')
  setRole('')
  setNomComplet('')
}




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <label>Password</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <label>Filiere</label><br />
        <select
          value={filiere}
          onChange={(e) => setFiliere(e.target.value)}
          required
        >
          <option value="">================</option>
          <option value="GI">GI</option>
          <option value="GE">GE</option>
          <option value="GIM">GIM</option>
          <option value="GC">GC</option>
        </select>
        <br /><br />

        <label>Role</label><br />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">================</option>
          <option value="Membre">Membre</option>
        </select>
        <br /><br />

        <label>Nom Complet</label><br />
        <input
          type="text"
          value={nomComplet}
          onChange={(e) => setNomComplet(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default AjouterMembre
