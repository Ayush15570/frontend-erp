
import React from "react";
import { useEffect, useState } from "react";
import erpService from "../api/erpService";

const ViewAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await erpService.getAdmins({ email, city });
      setAdmins(res.data.admins);
    } catch {
      alert("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to deactivate this admin?"))
      return;

    try {
      await erpService.deleteAdmin(adminId);
      fetchAdmins();
    } catch {
      alert("Failed to deactivate admin");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Management
        </h1>
        <p className="text-sm text-gray-500">
          View and manage city admins
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Filter by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Filter by city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={fetchAdmins}
            className="rounded-lg bg-indigo-600 text-white text-sm font-medium
                       hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <p className="py-8 text-center text-sm text-gray-500">
            Loading admins...
          </p>
        ) : admins.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No admins found
          </p>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>City</Th>
                <Th className="text-center">Action</Th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {admins.map((admin) => (
                <tr
                  key={admin._id}
                  className="hover:bg-gray-50 transition"
                >
                  <Td>{admin.fullName}</Td>
                  <Td>{admin.email}</Td>
                  <Td>{admin.city}</Td>
                  <Td className="text-center">
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="text-sm font-medium text-red-600
                                 hover:text-red-700"
                    >
                      Deactivate
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* Reusable table helpers */
const Th = ({ children, className = "" }) => (
  <th
    className={`px-4 py-3 text-left text-xs font-semibold
                text-gray-600 uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

const Td = ({ children, className = "" }) => (
  <td
    className={`px-4 py-3 text-sm text-gray-700 whitespace-nowrap ${className}`}
  >
    {children}
  </td>
);

export default ViewAdmins;
