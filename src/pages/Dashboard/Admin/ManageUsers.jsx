import { useGetAllUsersQuery } from "@/redux/apiSlice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageUsers = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  // Extract users array safely
  const users = data?.users || data || [];
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
              {["Name", "Email", "Role", "Status", "Actions"].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Render skeleton rows
              Array.from({ length: usersPerPage }).map((_, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Skeleton width={100} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={150} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={80} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={80} />
                  </td>
                  <td className="px-2 text-sm">
                    <Skeleton width={100} height={32} />
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-red-500">
                  Error loading users
                </td>
              </tr>
            ) : currentUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No data available
                </td>
              </tr>
            ) : (
              // Render actual user rows
              currentUsers.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {user.name}
                  </td>
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
                  <td className="px-2 text-sm flex gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() =>
                          navigate(`/dashboard/user-details/${user._id}`)
                        }
                        className="px-2 lg:px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:text-blue-400"
                      >
                        Manage User
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && !isError && users.length > 0 && (
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
      )}
    </div>
  );
};

export default ManageUsers;
