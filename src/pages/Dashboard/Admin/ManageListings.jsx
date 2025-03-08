import React from "react";
import { useGetAllCarsQuery } from "../../../redux/apiSlice";
import { Link } from "react-router-dom";
const ManageListings = () => {
  const { data, isLoading, isError, refetch } = useGetAllCarsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading listings</div>;
  if (!data) return <div>No data available</div>;

  const listings = data.cars || data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Car</th>
              <th className="text-left px-4 py-2">Vendor</th>
              <th className="text-left px-4 py-2">Starting Price</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr
                key={listing._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="flex items-center px-4 py-2">
                  <img
                    src={
                      listing.images?.[0]?.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={listing.carName}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <span>{listing.carName}</span>
                </td>
                <td className="px-4 py-2">
                  {listing.sellerId
                    ? `${listing.sellerId.name} (${listing.sellerId.email})`
                    : "No Vendor"}
                </td>
                <td className="px-4 py-2">${listing.price.toLocaleString()}</td>
                <td
                  className={`px-4 py-2 ${
                    listing.status === "pending"
                      ? "text-yellow-500"
                      : listing.status === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {listing.status}
                </td>
                <td className="px-4 py-2 text-center">
                  <Link
                    className="border py-2 px-4 rounded-md bg-blue-400 text-white"
                    to={`/dashboard/admin-car-details/${listing._id}`}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageListings;
