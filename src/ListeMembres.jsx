import { useEffect, useState } from 'react'
import supabase from './SupaBase'
import { Link } from 'react-router-dom'

const ListeMembres = () => {
  const [membres, setMembres] = useState([])

  function handleDelete(id) {
    const deleteMembre = async () => {
      const { data, error } = await supabase
        .from('Membres')
        .delete()
        .eq('id', id)
        if (error) {
            console.error('Error deleting membre:', error)
        } else {
            console.log('Membre deleted successfully:', data)
            setMembres(membres.filter(m => m.id !== id))
        }
    }
    deleteMembre()
  }

  useEffect(() => {
    const fetchMembres = async () => {
      const { data, error } = await supabase
        .from('Membres') 
        .select('*')

      if (error) {
        console.error('Error fetching membres:', error)
        return
      }

      console.log('DATA:', data)
      setMembres(data)
    }

    fetchMembres()
  }, [])

  return (
    <>
    <Link to="/ajouter-membre">Ajouter un membre</Link>
    <table style={{ border: "1px solid #000", borderCollapse: "collapse" }}>

      <thead>
        <tr>
          <th style={{ border: "1px solid #000" }}>Email</th>
          <th style={{ border: "1px solid #000" }}>Filiere</th>
          <th style={{ border: "1px solid #000" }}>Role</th>
          <th style={{ border: "1px solid #000" }}>Nom Complet</th>
          <th style={{ border: "1px solid #000" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {membres.map((m) => (
          <tr key={m.id}>
            <td style={{ border: "1px solid #000" }}>{m.email}</td>
            <td style={{ border: "1px solid #000" }}>{m.Filiere}</td>
            <td style={{ border: "1px solid #000" }}>{m.role}</td>
            <td style={{ border: "1px solid #000" }}>{m.Nom}</td>
            <td>
              <Link to={`/edit-membre/${m.id}`}>Edit</Link>
                <button onClick={() => handleDelete(m.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default ListeMembres
