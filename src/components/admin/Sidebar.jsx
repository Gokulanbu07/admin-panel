// src/components/admin/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const sidebarStyle = {
    width: isOpen ? '260px' : '0px',
    minHeight: '100vh',
    background: '#050508',
    color: '#fff',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    borderRight: '1px solid rgba(212,175,55,0.25)',
  };

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    margin: '6px 16px',
    color: isActive ? '#fff' : '#a0a0b0',
    textDecoration: 'none',
    borderRadius: '10px',
    background: isActive
      ? 'linear-gradient(120deg, rgba(212,175,55,0.9), rgba(120,90,10,0.95))'
      : 'transparent',
    boxShadow: isActive ? '0 4px 18px rgba(212,175,55,0.5)' : 'none',
    fontWeight: isActive ? '600' : '400',
    transition: 'all 0.25s ease',
    fontSize: '0.9rem',
  });

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div className="d-flex align-items-center justify-content-center py-4 border-bottom border-secondary mb-3">
        <i className="fas fa-home fa-2x me-2" style={{ color: '#D4AF37' }}></i>
        <h4 className="m-0 fw-bold" style={{ letterSpacing: '1px' }}>
          GoHome
        </h4>
      </div>

      {/* Nav Links */}
      <nav className="d-flex flex-column">
        <NavLink to="/admin/dashboard" style={linkStyle}>
          <i className="fas fa-chart-line me-3" style={{ width: '20px' }}></i>
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" style={linkStyle}>
          <i className="fas fa-users me-3" style={{ width: '20px' }}></i>
          Manage Users
        </NavLink>

        <NavLink to="/admin/properties" style={linkStyle}>
          <i className="fas fa-building me-3" style={{ width: '20px' }}></i>
          Properties
        </NavLink>

        {/* ❌ Removed Admin “My Listings” – use Properties only */}

        <NavLink to="/admin/bookings" style={linkStyle}>
          <i
            className="fas fa-calendar-check me-3"
            style={{ width: '20px' }}
          ></i>
          Bookings
        </NavLink>

        <NavLink to="/admin/chats" style={linkStyle}>
          <i className="fas fa-comments me-3" style={{ width: '20px' }}></i>
          Chats
        </NavLink>

        <NavLink to="/browse" style={linkStyle}>
          <i className="fas fa-globe me-3" style={{ width: '20px' }}></i>
          Customer Site
        </NavLink>

        <div className="border-top border-secondary my-3 mx-3"></div>

        <a
          href="#"
          onClick={handleLogout}
          className="nav-link text-danger d-flex align-items-center px-4 py-2 mt-auto hover-effect"
        >
          <i className="fas fa-sign-out-alt me-3"></i> Logout
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
