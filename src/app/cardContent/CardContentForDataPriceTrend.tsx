"use client";
import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Pricing Trends - Average selling price over time for container",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Selling Price ($)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// Example average selling prices for each month (can be replaced with real data)
const averageSellingPrices = [1200, 1100, 1300, 1250, 1150, 1280, 1350];

export const data = {
  labels,
  datasets: [
    {
      label: "Average Selling Price",
      data: averageSellingPrices,
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

export function CardContentForDatePriceTrend() {
  return (
    <div className="">
      <Line  data={data} />
    </div>
  );
}
