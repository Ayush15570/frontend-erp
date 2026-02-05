import { useEffect, useState } from "react";
import erpService from "../api/erpService";
import RequestsTable from "./RequestTable";
import JobSearch from "./JobSearch";
import React from "react";
const ErpDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    erpService.getAllRequests().then((res) => {
      setRequests(res.data.data);
    });
  }, []);

  const totalRequests = requests.length;
  const pendingCount = requests.filter(r => r.status === "pending").length;
  const contactedCount = requests.filter(r => r.status === "contacted").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          ERP Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Monitor service requests, jobs, and admin activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Requests</p>
          <p className="text-2xl font-bold text-gray-800">{totalRequests}</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-gray-500">Contacted</p>
          <p className="text-2xl font-bold text-green-600">{contactedCount}</p>
        </div>
      </div>

      {/* Job Search */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <JobSearch />
      </div>

      {/* Requests Table */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            All Service Requests
          </h2>
        </div>

        <RequestsTable data={requests} />
      </div>
    </div>
  );
};

export default ErpDashboard;
