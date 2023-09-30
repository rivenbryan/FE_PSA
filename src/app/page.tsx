"use client"
import DashboardCard from "@/components/DashboardCard";
import { CardContentForUtilizationRate } from "./cardContent/CardContentForUtilizationRate";
import CardContentForTransactionHistory from "./cardContent/CardContentForTransactionHistory";
import { CardContentForTotalRevenue } from "./cardContent/CardContentForTotalRevenue";
import { useQuery } from "react-query";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import AiModal from "@/components/AiModal";


export const lineData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Average Selling Price",
      data:  [1200, 1100, 1300, 1250, 1150, 1280, 1350],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Home() {
  const [open, setOpen] = useState(false);
  console.log(open)
  const handleClick = () => {
    setOpen(!open);
  }
  // const {data , isLoading, isError} = useQuery({
  //   queryKey: ['linedata'],
  //   refetchOnWindowFocus: false,
  //   // queryFn: async () => {
  //   //   const {data} = await axios.get('/api/todos')
  //   //   return data.res as ToDo[];
  //   // }
  // })

  // if (isLoading){
  //   return <div>Loading ...</div>
  // }

  // if (isError){
  //   return <div>Error ... try again  </div>
  // }
  
  return (
    <>
    {open && <AiModal data={lineData} setOpen={setOpen}/>}
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex gap-10">
        <DashboardCard
          cardTitle="Total Revenue"
          cardContent={<CardContentForTotalRevenue />}
        />
      </div>
      <div className="flex gap-10"></div>
      <div className="flex gap-10">
        <DashboardCard
          cardTitle="Utilization Rate"
          cardContent={<CardContentForUtilizationRate />}
        />
        <div className="flex-grow">
          <DashboardCard
            handleClick={handleClick}
            isIcon
            cardTitle="Date Price Trend"
            cardContent={<Line data={lineData} />}
          />
        </div>
      </div>
      <div>
        <DashboardCard
          cardTitle="Transaction History"
          cardContent={<CardContentForTransactionHistory />}
        />
      </div>
    </div>
    </>
  );
}
