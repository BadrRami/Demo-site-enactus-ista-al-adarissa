import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function BarFiliere({ members }) {

  // Comptage des membres par filière
  const filieres = {}
  members.forEach(m => {
    filieres[m.Filiere] = (filieres[m.Filiere] || 0) + 1
  })

  const data = {
    labels: Object.keys(filieres),       // Nom des filières
    datasets: [
      {
        label: "Nombre de membres",
        data: Object.values(filieres),   // Nombre par filière
        backgroundColor: "#FDB913"       // Bleu (tu peux changer)
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return <Bar data={data} options={options} />
}
