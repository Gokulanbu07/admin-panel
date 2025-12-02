// src/components/admin/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';




const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    // Styling for the sidebar container
    const sidebarStyle = {
        width: isOpen ? '260px' : '0px', 
        minHeight: '100vh',
        background: '#1e1e2f', 
        color: '#fff',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        position: 'fixed',
        zIndex: 1000,
        left: 0,
        top: 0
    };

    // Styling for links
    const linkStyle = ({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        margin: '8px 16px',
        color: isActive ? '#fff' : '#a0a0b0',
        textDecoration: 'none',
        borderRadius: '10px',
        background: isActive ? 'linear-gradient(90deg, #4338ca 0%, #6366f1 100%)' : 'transparent', // Gradient for active
        boxShadow: isActive ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
        fontWeight: isActive ? '600' : '400',
        transition: 'all 0.3s ease',
    });

    return (
        <div style={sidebarStyle}>
            {/* Logo Area */}
            <div className="d-flex align-items-center justify-content-center py-4 border-bottom border-secondary mb-3">
                <i className="fas fa-home fa-2x me-2" style={{ color: '#6366f1' }}></i>
                <h4 className="m-0 fw-bold" style={{ letterSpacing: '1px' }}>GoHome</h4>
            </div>

            {/* Navigation Links */}
            <nav className="d-flex flex-column">
                <NavLink to="/admin/dashboard" style={linkStyle}>
                    <i className="fas fa-chart-line me-3" style={{ width: '20px' }}></i> Dashboard
                </NavLink>

                <NavLink to="/admin/users" style={linkStyle}>
                    <i className="fas fa-users me-3" style={{ width: '20px' }}></i> Manage Users
                </NavLink>

                <NavLink to="/admin/properties" style={linkStyle}>
                    <i className="fas fa-building me-3" style={{ width: '20px' }}></i> Properties
                </NavLink>

                <NavLink to="/admin/my-properties" style={linkStyle}>
                    <i className="fas fa-house-user me-3" style={{ width: '20px' }}></i> My Listings
                </NavLink>

                <NavLink to="/admin/bookings" style={linkStyle}>
                    <i className="fas fa-calendar-check me-3" style={{ width: '20px' }}></i> Bookings
                </NavLink>

                <div className="border-top border-secondary my-3 mx-3"></div>

                <a href="#" onClick={handleLogout} className="nav-link text-danger d-flex align-items-center px-4 py-2 mt-auto hover-effect">
                    <i className="fas fa-sign-out-alt me-3"></i> Logout
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;