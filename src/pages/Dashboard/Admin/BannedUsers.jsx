import React, { useState } from "react";
import { useGetBannedUsersQuery } from "@/redux/apiSlice";
import { useNavigate } from "react-router-dom";

const BannedUsers = () => {
  const { data, isLoading, isError } = useGetBannedUsersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  if (!data) return <div>No data available</div>;

  // Ensure we're working with an array. Our controller returns { bannedUsers: [...] }
  const users = Array.isArray(data.bannedUsers) ? data.bannedUsers : [];

  // If there are no banned users, display a message.
  if (users.length === 0) {
    return <div className="mx-auto">No banned users available.</div>;
  }

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 capitalize">
                  {user.role}
                </td>
                <td
                  className={`px-4 py-3 text-sm capitalize ${
                    user.accountStatus === "verified"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {user.accountStatus}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() =>
                        navigate(`/dashboard/user-details/${user._id}`)
                      }
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-400"
                    >
                      Manage User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-1 bg-gray-200 rounded-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BannedUsers;
