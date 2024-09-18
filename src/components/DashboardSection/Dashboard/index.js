import React from 'react';
import { useAuth } from '../../ComponentsCss/Authentication/authentication';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaUsers, FaTachometerAlt, FaCalendarAlt, FaChartBar, FaFileAlt, FaEnvelope } from 'react-icons/fa';
import '../../ComponentsCss/Dashboard/Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const sidebarItems = [
    { icon: <FaHome />, label: 'Overview', path: '/dashboard' },
    { icon: <FaUsers />, label: 'Users', path: '/dashboard/users' },
    { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaCalendarAlt />, label: 'Attendance', path: '/dashboard/attendance' },
    { icon: <FaChartBar />, label: 'Reports', path: '/dashboard/reports' },
    { icon: <FaFileAlt />, label: 'Templates', path: '/dashboard/templates' },
    { icon: <FaEnvelope />, label: 'Request', path: '/dashboard/request' },
  ];

  return (
    <div className="dashboard">
      <div className="sidebar">
        {sidebarItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="main-content">
        <h1>Welcome to the Dashboard, {user?.email}</h1>
        <button onClick={handleLogout}>Logout</button>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

