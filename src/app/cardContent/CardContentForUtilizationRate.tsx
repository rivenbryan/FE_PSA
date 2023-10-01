"use client"
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  percentageUsed: number;

}

export function CardContentForUtilizationRate({percentageUsed}: Props) {
  console.log(percentageUsed);
  const data = {
    labels: ['Unused Container Space', 'Used Container Space' ],
    datasets: [
      {
        label: 'Space Utilization Rate',
        data: [100-percentageUsed, percentageUsed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
