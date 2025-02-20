import React from "react";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ComparisonChart = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Revenue by Subscription Type</h2>
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Buyer vs Seller Subscription Revenue",
            },
          },
        }}
      />
    </div>
  );
};

export default ComparisonChart;
