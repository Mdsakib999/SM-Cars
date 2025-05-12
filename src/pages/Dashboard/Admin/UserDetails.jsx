import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleUserQuery,
  useVerifyUserMutation,
  useBanUserMutation,
} from "@/redux/apiSlice";

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

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6">Error fetching user details.</div>;

  const user = data?.user || data;

  // Open confirmation modal
  const openConfirm = (action) => setConfirm({ open: true, action });
  const closeConfirm = () => setConfirm({ open: false, action: "" });

  // Handle confirmed actions
  const handleConfirm = async () => {
    try {
      if (confirm.action === "verify") {
        await verifyUser(userId).unwrap();
      } else if (confirm.action === "ban") {
        await banUser(userId).unwrap();
      }
    } catch (error) {
      console.error(`Error on ${confirm.action}:`, error);
    } finally {
      closeConfirm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cover / Header Area */}
        <div className="relative">
          <div
            className="h-40 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://placehold.co/100x100)`,
            }}
          />
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            {user.picture ? (
              <img
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                src={user.picture}
                alt={user.name}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-3xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-20 pb-8 px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2 text-sm text-gray-500 capitalize">
              {user.role} | {user.accountStatus}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold border-b pb-2 mb-4">
                Contact Details
              </h3>
              <p>
                <strong>Contact:</strong> {user.contact}
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
            <div>
              <h3 className="text-xl font-semibold border-b pb-2 mb-4">
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

          {/* Manage Account Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Manage Account
            </h3>
            <div className="flex items-center gap-4">
              {user.accountStatus !== "verified" && (
                <button
                  onClick={() => openConfirm("verify")}
                  disabled={verifying}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                >
                  {verifying ? "Verifying..." : "Verify User"}
                </button>
              )}
              {user.accountStatus !== "banned" && (
                <button
                  onClick={() => openConfirm("ban")}
                  disabled={banning}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  {banning ? "Banning..." : "Ban User"}
                </button>
              )}
            </div>
            {verifyError && (
              <p className="text-red-500 mt-2">Failed to verify user.</p>
            )}
            {banError && (
              <p className="text-red-500 mt-2">Failed to ban user.</p>
            )}
            {verifySuccess && (
              <p className="text-green-500 mt-2">User verified successfully!</p>
            )}
            {banSuccess && (
              <p className="text-green-500 mt-2">User banned successfully!</p>
            )}
          </div>

          {/* Account Timestamps */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
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

      {/* Custom Confirmation Modal */}
      {confirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h4 className="text-lg font-semibold mb-4 capitalize">
              {confirm.action} User?
            </h4>
            <p>Are you sure you want to {confirm.action} this user?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded text-white 
                  ${
                    confirm.action === "verify"
                      ? "bg-green-500 hover:bg-green-400"
                      : "bg-red-500 hover:bg-red-400"
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
