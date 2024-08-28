import React, { useState, useEffect } from "react";
import "../../ComponentsCss/Navbar/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faUsers,
  faTachometerAlt,
  faCalendarCheck,
  faChartBar,
  faFileAlt,
  faInbox,
  faUserCircle,
  faArrowLeft,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      setIsSidebarExpanded(!isMobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const sidebarItems = [
    { icon: faUsers, text: "Users", href: "#users" },
    { icon: faTachometerAlt, text: "Dashboard", href: "#dashboard" },
    { icon: faCalendarCheck, text: "Attendance", href: "#attendance" },
    { icon: faChartBar, text: "Reports", href: "#reports" },
    { icon: faFileAlt, text: "Templates", href: "#templates" },
    { icon: faInbox, text: "Requests", href: "#requests" },
    { icon: faUserCircle, text: "Profile", href: "#profile" },
  ];

  return (
    <div className={`app-container ${isMobileView ? "mobile" : ""}`}>
      <nav className="navbar">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        {!isMobileView && (
          <ul>
            <li>
              <a href="#dashboard">Dashboard</a>
            </li>
          </ul>
        )}
        <div className="nav-right">
          <div className="search-wrapper">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <button className="notification-button">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button
            className={`auth-button ${
              isLoggedIn ? "logout-button" : "login-button"
            }`}
            onClick={isLoggedIn ? handleLogout : handleLogin}
            title={isLoggedIn ? "Logout" : "Login"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              {isLoggedIn ? (
                // Logout icon
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
              ) : (
                // Login icon
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
              )}
            </svg>{" "}
            <span className="Buttons">{isLoggedIn ? "Logout" : "Login"}</span>
          </button>
        </div>
      </nav>
      <div
        className={`sidebar ${isSidebarExpanded ? "expanded" : ""} ${
          isMobileView ? "mobile" : ""
        }`}
      >
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} title={item.text}>
                <FontAwesomeIcon icon={item.icon} />
                <span className="sidebar-text">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {isMobileView && isSidebarExpanded && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
}