import React from "react";
import ProfileCard from "../../../components/DashboardComponent/Overview/ProfileCard";
import SubscriptionCard from "../../../components/DashboardComponent/Overview/SubscriptionCard";
import RemainingBidsOverview from "../../../components/DashboardComponent/Overview/RemainingBidsOverview";

const BuyerOverview = () => {
  return (
    <div className=" lg:p-6 bg-gray-100 min-h-screen">
      {/* Grid Container */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Full-width Profile Card */}
        <ProfileCard />
        {/* Subscription Card */}
        <SubscriptionCard />
        {/* Bids Remaining Card */}
        <RemainingBidsOverview />
      </div>
    </div>
  );
};

export default BuyerOverview;
