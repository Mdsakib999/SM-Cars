import React from "react";

const ManageUsers = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "buyer",
      status: "verified",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "seller",
      status: "not verified",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "verified",
    },
  ];

  const handleRoleChange = (userId) => {
    console.log(`Change role for user with ID: ${userId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Manage Users</h1>
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
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 capitalize">
                  {user.role}
                </td>
                <td
                  className={`px-4 py-3 text-sm capitalize ${
                    user.status === "verified"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {user.status}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(user.id)}
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
    </div>
  );
};

export default ManageUsers;
