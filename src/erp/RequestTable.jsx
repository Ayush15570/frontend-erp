// src/erp/RequestsTable.jsx
import React from "react";
const RequestsTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-8 text-center">
        No service requests found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        {/* Table Head */}
        <thead className="bg-gray-50">
          <tr>
            <Th>Client Name</Th>
            <Th>Phone</Th>
            <Th>City</Th>
            <Th>Service</Th>
            <Th>Status</Th>
            <Th>Job ID</Th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((req) => (
            <tr
              key={req._id}
              className="hover:bg-gray-50 transition"
            >
              <Td>{req.name}</Td>
              <Td>{req.phoneNumber}</Td>
              <Td>{req.city}</Td>
              <Td>{req.serviceName}</Td>

              {/* Status */}
              <Td>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium
                    ${
                      req.status === "contacted"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                >
                  {req.status}
                </span>
              </Td>

              {/* Job ID */}
              <Td>
                {req.job ? (
                  <span className="font-medium text-indigo-600">
                    {req.job.jobId}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* Reusable cells */
const Th = ({ children }) => (
  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
    {children}
  </td>
);

export default RequestsTable;

