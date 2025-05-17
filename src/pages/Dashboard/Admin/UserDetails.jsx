// UserDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleUserQuery,
  useVerifyUserMutation,
  useBanUserMutation,
} from "@/redux/apiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserDetails = () => {
  const { userId } = useParams();
  const { data, isLoading, isError } = useGetSingleUserQuery(userId);
  const [
    verifyUser,
    { isLoading: verifying, isError: verifyError, isSuccess: verifySuccess },
  ] = useVerifyUserMutation();
  const [
    banUser,
    { isLoading: banning, isError: banError, isSuccess: banSuccess },
  ] = useBanUserMutation();

  const [confirm, setConfirm] = useState({ open: false, action: "" });

  // Handlers
  const openConfirm = (action) => setConfirm({ open: true, action });
  const closeConfirm = () => setConfirm({ open: false, action: "" });
  const handleConfirm = async () => {
    try {
      if (confirm.action === "verify") await verifyUser(userId).unwrap();
      else if (confirm.action === "ban") await banUser(userId).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      closeConfirm();
    }
  };

  // Safe user object
  const user = data?.user || data || {};

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 ">
        <Skeleton circle height={128} width={128} />
        <div className="w-full max-w-4xl space-y-4">
          <Skeleton height={32} width="50%" />
          <Skeleton height={20} width="30%" />
          <Skeleton height={20} width="40%" />
        </div>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton height={24} width="60%" />
              <Skeleton count={4} height={18} />
            </div>
          ))}
        </div>
        <div className="w-full max-w-4xl space-y-4">
          <Skeleton height={24} width="30%" />
          <Skeleton count={3} height={20} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error fetching user details.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 ">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header / Avatar */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-40 relative ">
          <div className="absolute inset-x-0 -bottom-16 flex justify-center">
            {user.picture ? (
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-3xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-3xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-20 pb-8 px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 capitalize">
              {user.role} &middot;{" "}
              <span
                className={
                  user.accountStatus === "verified"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {user.accountStatus}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold border-b pb-2">
                Contact Details
              </h3>
              <p>
                <strong>Contact:</strong> {user.contact || "N/A"}
              </p>
              <p>
                <strong>Present Address:</strong> {user.presentAddress || "N/A"}
              </p>
              <p>
                <strong>Permanent Address:</strong>{" "}
                {user.permanentAddress || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {user.city || "N/A"}
              </p>
            </div>

            {/* Subscription & Cars */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold border-b pb-2">
                Subscription & Cars
              </h3>
              <p>
                <strong>Subscription:</strong>{" "}
                {user.subscription?.name || "None"}
              </p>
              <p>
                <strong>Renewal Date:</strong>{" "}
                {user.subscriptionRenewalDate
                  ? new Date(user.subscriptionRenewalDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Cars Listed:</strong> {user.carsListed?.length || 0}
              </p>
              <p>
                <strong>Cars Bidded:</strong> {user.carsBidded?.length || 0}
              </p>
            </div>
          </div>

          {/* Manage Account */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold border-b pb-2">
              Manage Account
            </h3>
            <div className="flex flex-wrap gap-4">
              {user.accountStatus !== "verified" && (
                <button
                  onClick={() => openConfirm("verify")}
                  disabled={verifying}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                >
                  {verifying ? "Verifying..." : "Verify User"}
                </button>
              )}
              {user.accountStatus !== "banned" && (
                <button
                  onClick={() => openConfirm("ban")}
                  disabled={banning}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                >
                  {banning ? "Banning..." : "Ban User"}
                </button>
              )}
            </div>
            {verifyError && (
              <p className="text-red-500">Failed to verify user.</p>
            )}
            {banError && <p className="text-red-500">Failed to ban user.</p>}
            {verifySuccess && (
              <p className="text-green-500">User verified successfully!</p>
            )}
            {banSuccess && (
              <p className="text-green-500">User banned successfully!</p>
            )}
          </div>

          {/* Account Timestamps */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold border-b pb-2">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
            <h4 className="text-lg font-semibold mb-4 capitalize">
              {confirm.action} User?
            </h4>
            <p className="mb-6">
              Are you sure you want to <strong>{confirm.action}</strong> this
              user?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded text-white transition ${
                  confirm.action === "verify"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                Yes, {confirm.action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
