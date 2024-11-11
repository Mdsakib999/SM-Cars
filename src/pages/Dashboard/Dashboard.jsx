import React from "react";
import Sidebar from "../../components/DashboardComponent/Sidebar";
import DashboardNav from "../../components/DashboardComponent/DashboardNav";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const user = "buyer"; // user type --> "admin", "buyer", or "seller"

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  return (
    <div className="flex min-h-screen bg-gray-100 ml-20 lg:ml-0">
      <Sidebar setActiveSection={setActiveSection} userRole={user} />

      <div className="flex-1 ">
        {/* Navbar */}
        <DashboardNav sectionName={activeSection} userName="Sadika Rahman" />

        {/* Main Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
