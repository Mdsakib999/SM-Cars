import React from "react";
import { useGetMessagesQuery } from "@/redux/apiSlice";

const Leads = () => {
  const { data, isLoading, error } = useGetMessagesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full py-8">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full py-8">
        <p className="text-xl font-semibold text-red-500">
          Error loading messages.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Requests</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Contact
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Message
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">
                  {lead.name}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                  {lead.email || "N/A"}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                  {lead.contactNo}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                  {lead.message || "N/A"}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(lead.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {data?.data?.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-sm text-gray-600"
                >
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
