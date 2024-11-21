import React from "react";

const ManageListings = () => {
  const listings = [
    {
      id: 1,
      carName: "Toyota Camry",
      vendor: "John Doe",
      price: 25000,
      status: "Pending",
      imageUrl:
        "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      carName: "Honda Civic",
      vendor: "Jane Smith",
      price: 20000,
      status: "Approved",
      imageUrl:
        "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      carName: "Ford Mustang",
      vendor: "Mike Johnson",
      price: 45000,
      status: "Rejected",
      imageUrl:
        "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      carName: "Tesla Model 3",
      vendor: "Sarah Lee",
      price: 55000,
      status: "Pending",
      imageUrl:
        "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Manage Listings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Car</th>
              <th className="text-left px-4 py-2">Vendor</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr
                key={listing.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="flex items-center px-4 py-2">
                  <img
                    src={listing.imageUrl}
                    alt={listing.carName}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <span>{listing.carName}</span>
                </td>
                <td className="px-4 py-2">{listing.vendor}</td>
                <td className="px-4 py-2">${listing.price.toLocaleString()}</td>
                <td
                  className={`px-4 py-2 ${
                    listing.status === "Pending"
                      ? "text-yellow-500"
                      : listing.status === "Approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {listing.status}
                </td>
                <td className="px-4 py-2 text-center">
                  {listing.status === "Pending" && (
                    <div className="space-x-2">
                      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400">
                        Reject
                      </button>
                    </div>
                  )}
                  {listing.status !== "Pending" && (
                    <span className="text-gray-500">No Actions</span>
                  )}
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
