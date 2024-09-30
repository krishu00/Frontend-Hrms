import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../ComponentsCss/Authentication/authentication';
import { useNavigate, NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaTachometerAlt, FaCalendarAlt, FaChartBar, FaFileAlt, FaEnvelope, FaBars, FaTimes, FaUserCircle, FaCog, FaSignOutAlt, FaUser, FaDollarSign } from 'react-icons/fa';
import '../../ComponentsCss/Dashboard/Dashboard.css';
import Request from '../../DashboardSection/Request/index';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();      
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getCurrentSectionTitle = () => {
    const currentItem = sidebarItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <NavLink 
              key={index} 
              to={item.path} 
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="main-content">
        <div className="top-bar">
          <h2>{getCurrentSectionTitle()}</h2>
          <div className="user-profile" ref={dropdownRef}>
            <div className="profile-icon-wrapper" onClick={toggleDropdown}>
              <FaUserCircle className="profile-icon" />
              <span className="user-name">Anonymous</span>
            </div>
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-item">
                  <FaUser />
                  <span>Profile</span>
                </div>
                <div className="dropdown-item">
                  <FaDollarSign />
                  <span>Salary</span>
                </div>
                <div className="dropdown-item">
                  <FaCog />
                  <span>Settings</span>
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="content-area">
          <Routes>
            <Route path="request" element={<Request />} />
            {/* Add other routes for different dashboard sections */}
            <Route path="*" element={<h1>Welcome to the Dashboard, Anonymous</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
