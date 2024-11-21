import React from "react";
import ProfileCard from "../../../components/DashboardComponent/Overview/ProfileCard";
import SubscriptionCard from "../../../components/DashboardComponent/Overview/SubscriptionCard";
import RemainingBidsOverview from "../../../components/DashboardComponent/Overview/RemainingBidsOverview";
import RemainingListingsOverview from "../../../components/DashboardComponent/Overview/RemainingListingsOverview";
import BiddingHistoryOverview from "../../../components/DashboardComponent/Overview/BiddingHistoryOverview";
import LatestWinCard from "../../../components/DashboardComponent/Overview/LatestWinCard";

const user = {
  name: "Jane Smith",
  email: "janesmith@example.com",
  role: "buyer",
  profilePicture: "https://example.com/profile-pictures/user456.jpg",
};

const latestWin = {
  carName: "Tesla Model 3",
  carImage:
    "https://images.unsplash.com/photo-1571180690381-287c7d1959d5?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3",
  bidAmount: "45,000",
  status: "Completed",
  sellerContact: "seller@example.com",
};
const Overview = () => {
  return (
    <div className=" lg:p-6 bg-gray-100 min-h-screen">
      {/* Grid Container */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Full-width Profile Card */}
        <ProfileCard />
        <SubscriptionCard />
        {user.role === "buyer" && <RemainingBidsOverview />}
        {user.role === "buyer" && <BiddingHistoryOverview />}
        {user.role === "seller" && <RemainingListingsOverview />}
        {user.role === "buyer" && <LatestWinCard latestWin={latestWin} />}
      </div>
    </div>
  );
};

export default Overview;
