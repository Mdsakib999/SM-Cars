import React from "react";
import RevenueChart from "../../../components/DashboardComponent/RevenueChart";
const chartData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ], // Corresponding months
  datasets: [
    {
      label: "Monthly Revenue",
      data: [150.0, 200.0, 250.0], // Total revenue for each month
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Bar color
      borderColor: "rgba(54, 162, 235, 1)", // Border color
      borderWidth: 1,
    },
  ],
};

const Reports = () => {
  return (
    <div>
      <RevenueChart data={chartData} />
    </div>
  );
};

export default Reports;
