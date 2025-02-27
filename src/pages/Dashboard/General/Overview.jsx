import React from "react";
import ProfileCard from "../../../components/DashboardComponent/Overview/ProfileCard";
import SubscriptionCard from "../../../components/DashboardComponent/Overview/SubscriptionCard";
import RemainingBidsOverview from "../../../components/DashboardComponent/Overview/RemainingBidsOverview";
import RemainingListingsOverview from "../../../components/DashboardComponent/Overview/RemainingListingsOverview";
import BiddingHistoryOverview from "../../../components/DashboardComponent/Overview/BiddingHistoryOverview";
import LatestWinCard from "../../../components/DashboardComponent/Overview/LatestWinCard";
import VerifyAccountCard from "../../../components/DashboardComponent/Overview/VerifyAccountCard";
import { useSelector } from "react-redux";

const latestWin = {
  carName: "Tesla Model 3",
  carImage:
    "https://images.unsplash.com/photo-1571180690381-287c7d1959d5?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3",
  bidAmount: "45,000",
  status: "Completed",
  sellerContact: "seller@example.com",
};

const Overview = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="lg:p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Profile and Subscription Cards */}
        <ProfileCard />
        <SubscriptionCard />

        {/* Role-Specific Cards */}
        {user.role === "buyer" && (
          <>
            <RemainingBidsOverview />
          </>
        )}
        {user.role === "seller" && (
          <>
            <RemainingListingsOverview />
            <VerifyAccountCard isVerified={user.isVerified} />
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
