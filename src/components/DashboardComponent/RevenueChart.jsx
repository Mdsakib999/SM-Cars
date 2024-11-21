import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded-md border ">
      <h2 className="text-lg font-bold mb-4">Monthly Revenue</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Monthly Revenue Generated" },
          },
        }}
      />
    </div>
  );
};

export default RevenueChart;
