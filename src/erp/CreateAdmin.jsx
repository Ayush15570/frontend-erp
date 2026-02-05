import { useState } from "react";
import erpService from "../api/erpService";
import React from "react";
const CreateAdmin = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await erpService.createAdmin(form);
      alert("Admin created successfully");

      setForm({
        fullName: "",
        email: "",
        password: "",
        city: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create New Admin
        </h1>
        <p className="text-sm text-gray-500">
          Add a new city admin with login access
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border p-6 space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className="w-full rounded-lg border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            className="w-full rounded-lg border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temporary Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            className="w-full rounded-lg border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Bhopal"
            className="w-full rounded-lg border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2.5 text-sm font-medium text-white
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
            `}
          >
            {loading ? "Creating Admin..." : "Create Admin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
