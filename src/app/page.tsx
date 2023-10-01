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
import { redirect } from "next/navigation";
import CardContentForEnv from "./cardContent/CardContentForEnv";




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

  const handleClick = () => {
    setOpen(!open);
  }

  const {data: revenueData} = useQuery({
    queryKey: ['revenue'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {data} = await axios.get('http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/get/totalRevenue')
      return data;
    }
  })

  const {data: utilizationData} = useQuery({
    queryKey: ['utilizationData'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {data} = await axios.get('http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/get/utilization')
      return data;
    }
  })

  const {data: priceData} = useQuery({
    queryKey: ['priceData'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {data} = await axios.get('http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/get/dataPriceTrend')
      return data;
    }
  })


  const {data: transactionData} = useQuery({
    queryKey: ['transactionData'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {data} = await axios.get('http://ec2-54-169-206-36.ap-southeast-1.compute.amazonaws.com:3000/api/v1/get/transactionHistory')
      return data;
    }
  })

  console.log(transactionData);
  
  const xAxis = [
    "2023 2Q",
    "2023 1Q",
    "2022 4Q",
    "2022 3Q",
    "2022 2Q",
    "2022 1Q",
    "2021 4Q",
    "2021 3Q",
    "2021 2Q",
    "2021 1Q",
    "2020 4Q",
    "2020 3Q",
    "2020 2Q",
    "2020 1Q",
    "2019 4Q",
    "2019 3Q",
    "2019 2Q",
    "2019 1Q",
    "2018 4Q",
    "2018 3Q",
    "2018 2Q",
    "2018 1Q",
    "2017 4Q",
    "2017 3Q",
    "2017 2Q",
    "2017 1Q",
    "2016 4Q",
    "2016 3Q",
    "2016 2Q",
    "2016 1Q",
    "2015 4Q",
    "2015 3Q",
    "2015 2Q",
    "2015 1Q"
  ];
  let yAxis = []
  if (priceData){
    yAxis = priceData[0].trend 
    console.log(yAxis)
    
  }

  const lineData = {
    labels: xAxis,
    datasets: [
      {
        label: "Average Selling Price",
        data: yAxis,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <>
    {open && <AiModal data={lineData} setOpen={setOpen}/>}
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex gap-10">
        <DashboardCard
          cardTitle="Total Revenue"
          cardContent={<CardContentForTotalRevenue revenue={revenueData?.revenue} percentage={revenueData?.percentage} />}
        />
         <DashboardCard
          cardTitle="Environmental Savings"
          cardContent={<CardContentForEnv/>}
        />
      </div>
      <div className="flex gap-10"></div>
      <div className="flex gap-10">
        <DashboardCard
          cardTitle="Utilization Rate"
          cardContent={<CardContentForUtilizationRate percentageUsed={utilizationData?.percentage} />}
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
          cardContent={<CardContentForTransactionHistory data={transactionData } />}
        />
      </div>
    </div>
    </>
  );
}
