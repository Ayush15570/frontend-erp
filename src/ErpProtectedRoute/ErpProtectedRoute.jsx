import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import erpService from "../api/erpService";
import React from "react";
const ErpProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await erpService.checkSession();
        setAuthorized(true);
      } catch {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return <p className="p-4">Checking session...</p>;
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ErpProtectedRoute;
