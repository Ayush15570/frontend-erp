import { useState } from "react";
import erpService from "../api/erpService";
import React from "react";
const JobSearch = () => {
  const [jobId, setJobId] = useState("");
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!jobId) return;

    setError("");
    setJob(null);
    setLoading(true);

    try {
      const res = await erpService.getJobByJobId(jobId);
      setJob(res.data.job);
    } catch {
      setError("No job found with this Job ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Search Job
        </h2>
        <p className="text-sm text-gray-500">
          Find job details using Job ID
        </p>
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter Job ID (e.g. 815350)"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className={`rounded-lg px-6 py-2 text-sm font-medium text-white
            ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Job Result */}
      {job && (
        <div className="mt-6 rounded-xl border bg-gray-50 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Job ID</p>
              <p className="font-medium">{job.jobId}</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium
                  ${
                    job.status === "closed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
              >
                {job.status}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Engineer</p>
              <p className="font-medium">{job.engineerName}</p>
            </div>

            <div>
              <p className="text-gray-500">Engineer Phone</p>
              <p className="font-medium">{job.engineerPhone}</p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Client Name</p>
              <p className="font-medium">{job.serviceRequest.name}</p>
            </div>

            <div>
              <p className="text-gray-500">Client Phone</p>
              <p className="font-medium">{job.serviceRequest.phoneNumber}</p>
            </div>

            <div>
              <p className="text-gray-500">Service</p>
              <p className="font-medium">{job.serviceRequest.serviceName}</p>
            </div>

            <div>
              <p className="text-gray-500">City</p>
              <p className="font-medium">{job.serviceRequest.city}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
