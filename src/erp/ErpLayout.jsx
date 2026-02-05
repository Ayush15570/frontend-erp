import { Outlet, NavLink } from "react-router-dom";
import React from "react";
const ErpLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-gray-800">
          <h2 className="text-lg font-semibold tracking-wide">
            Kunchika ERP
          </h2>
          <p className="text-xs text-gray-400">Operations Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem to="/app" end>
            Dashboard
          </NavItem>

          <NavItem to="/app/admins">
            View Admins
          </NavItem>

          <NavItem to="/app/create-admin">
            Create Admin
          </NavItem>
        </nav>

        {/* Footer / Logout placeholder */}
        <div className="px-4 py-4 border-t border-gray-800 text-sm text-gray-400">
          Logged in as ERP
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

/* Reusable Nav Item */
const NavItem = ({ to, end, children }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `block rounded-lg px-4 py-2 text-sm font-medium transition
        ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default ErpLayout;
