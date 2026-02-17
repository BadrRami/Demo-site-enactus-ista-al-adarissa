import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function CotisationPie({ cotisé, nonCotisé }) {

  const data = {
    labels: ["Cotisé", "Non cotisé"],
    datasets: [
      {
        data: [cotisé, nonCotisé],
        backgroundColor: ["#FDB913", "#ef4444"],
        borderWidth: 1
      }
    ]
  }

  return <Pie data={data} />
}
