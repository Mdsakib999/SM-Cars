import React from "react";
import RevenueChart from "../../../components/DashboardComponent/Admin/RevenueChart";
import ComparisonChart from "../../../components/DashboardComponent/Admin/ComparisonChart";
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
  ],
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

const pieChartData = {
  labels: ["Buyers", "Sellers"],
  datasets: [
    {
      data: [3000, 7000], // Revenue values from buyers and sellers
      backgroundColor: ["rgb(251, 141, 3,0.2)", "rgba(54, 162, 235, 0.2)"], // Colors for pie sections
      borderColor: ["rgb(251, 141, 3)", "rgba(54, 162, 235, 1)"],
      hoverBackgroundColor: ["rgb(251, 141, 3,0.5)", "rgba(54, 162, 235, 0.5)"],
    },
  ],
};

const Reports = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <RevenueChart data={chartData} />
      <ComparisonChart data={pieChartData} />
    </div>
  );
};

export default Reports;
