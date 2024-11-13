import React, { useState } from "react";
import Sidebar from "../../components/DashboardComponent/Sidebar";
import DashboardNav from "../../components/DashboardComponent/DashboardNav";
import { Outlet } from "react-router-dom";

const user = {
  name: "Jane Smith",
  email: "janesmith@example.com",
  role: "buyer",
  profilePicture: "https://example.com/profile-pictures/user456.jpg",
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100 ml-20 lg:ml-0">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} userRole={user.role} />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Dashboard Navbar with dynamic user information */}
        <DashboardNav sectionName={activeSection} userName={user.name} />

        {/* Dynamic Content based on selected section */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
