import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/DashboardSection/Dashboard";
export default function Main() {
  return (
    <div>      
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
