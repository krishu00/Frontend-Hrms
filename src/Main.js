import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/DashboardSection/Dashboard";
import Attendance from "./components/DashboardSection/Attendance/index";
import PrivateRoute from "./components/Utils/PrivateRoute/Privateroute";
import { useAuth } from "./components/ComponentsCss/Authentication/authentication";

export default function Main() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/dashboard/*" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<h2>Dashboard Overview</h2>} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="users" element={<h2>Users Page</h2>} />
        <Route path="reports" element={<h2>Reports Page</h2>} />
        <Route path="templates" element={<h2>Templates Page</h2>} />
        <Route path="request" element={<h2>Request Page</h2>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}














