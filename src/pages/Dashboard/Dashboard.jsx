import React, { useState } from "react";
import Sidebar from "../../components/DashboardComponent/Sidebar";
import DashboardNav from "../../components/DashboardComponent/DashboardNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100 ml-20 lg:ml-0">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1">
        <DashboardNav sectionName={activeSection} />
        <div className="p-6 mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
