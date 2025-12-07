// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Shared theme (same as user panel)
  const BACKGROUND_DARK = '#050508';
  const PANEL_DARK = '#0b0b10';
  const GOLD = '#D4AF37';
  const TEXT_LIGHT = '#F5F5F5';

  const mainContentStyle = {
    marginLeft: isOpen ? '260px' : '0px',
    transition: 'margin-left 0.3s ease',
    minHeight: '100vh',
    padding: '20px',
    background:
      'radial-gradient(circle at top left, rgba(212,175,55,0.14), #050508 55%)',
    color: TEXT_LIGHT,
  };

  return (
    <div className="d-flex">
      <style jsx="true">{`
        /* Global admin dark theme overrides */

        body {
          background-color: ${BACKGROUND_DARK};
        }

        .admin-main-shell {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* Cards */
        .card-custom {
          background: ${PANEL_DARK};
          border-radius: 18px;
          border: 1px solid rgba(212, 175, 55, 0.22);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.86);
          color: ${TEXT_LIGHT};
        }

        .card-header-custom {
          background: linear-gradient(
            90deg,
            rgba(212, 175, 55, 0.16),
            rgba(5, 5, 8, 0.9)
          );
          border-bottom: 1px solid rgba(212, 175, 55, 0.35);
          color: ${TEXT_LIGHT};
          font-weight: 600;
        }

        .card-custom .text-muted {
          color: #b0b0bd !important;
        }

        /* Tables */
        .table-custom {
          background: transparent;
          color: ${TEXT_LIGHT};
        }

        .table-custom thead tr {
          background: rgba(255, 255, 255, 0.03);
        }

        .table-custom thead th {
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #c9c9d3;
        }

        .table-custom tbody tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .table-custom tbody tr:last-child {
          border-bottom: none;
        }

        .table-custom tbody td {
          border-top: none;
        }

        /* Buttons */
        .btn-primary-custom,
        .btn-primary {
          background-color: ${GOLD};
          border-color: ${GOLD};
          color: #050508;
          font-weight: 600;
        }

        .btn-primary-custom:hover,
        .btn-primary:hover {
          background-color: #e2c45a;
          border-color: #e2c45a;
        }

        /* Headings inside admin pages */
        .admin-page-title {
          color: ${GOLD};
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
      `}</style>

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div style={mainContentStyle} className="w-100">
        <div className="admin-main-shell">
          <Header toggleSidebar={toggleSidebar} user={user} />
          {/* All admin pages render here and automatically use the dark gold theme */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
