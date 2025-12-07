// src/components/admin/Header.jsx
import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = ({ toggleSidebar, user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    // Just use the existing user profile page on the user side
    navigate('/profile');
  };

  return (
    <Navbar
      bg="dark"
      expand="lg"
      className="mb-4 p-3 shadow-sm rounded-3"
      style={{
        background:
          'linear-gradient(135deg, rgba(5,5,8,0.98), rgba(10,10,18,0.96))',
        border: '1px solid rgba(212,175,55,0.3)',
      }}
    >
      <Nav className="me-auto">
        {/* Sidebar toggle */}
        <button
          className="btn btn-outline-secondary border-0 me-3 text-light"
          onClick={toggleSidebar}
          style={{ fontSize: '1.2rem' }}
        >
          <i className="fas fa-bars"></i>
        </button>

        <Navbar.Brand className="d-flex align-items-center fw-bold text-light">
          <span
            className="me-2 d-inline-flex align-items-center justify-content-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: '999px',
              background:
                'radial-gradient(circle, #D4AF37, rgba(212,175,55,0.15))',
            }}
          >
            <i className="fas fa-home" style={{ color: '#050508' }}></i>
          </span>
          GoHome Admin
        </Navbar.Brand>
      </Nav>

      <Nav>
        {/* (dummy icon, keep or remove as you like) */}
        {/* <Nav.Link className="text-muted me-3 position-relative">
          <i className="fas fa-bell text-light"></i>
          <span className="badge bg-danger rounded-pill position-absolute translate-middle-y ms-1">
            3
          </span>
        </Nav.Link> */}

        <Dropdown align="end">
          <Dropdown.Toggle
            variant="dark"
            id="profile-dropdown"
            className="d-flex align-items-center border-0 p-0 bg-transparent"
          >
            <div className="d-flex flex-column text-end me-2 d-none d-sm-block">
              <span
                className="fw-bold text-light"
                style={{ fontSize: '0.9rem' }}
              >
                {user?.full_name || 'Admin'}
              </span>
              <span
                className="text-muted"
                style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}
              >
                {user?.role || 'admin'}
              </span>
            </div>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                background:
                  'radial-gradient(circle, #D4AF37, rgba(212,175,55,0.15))',
                color: '#050508',
              }}
            >
              <i className="fas fa-user-shield"></i>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-lg border-0 mt-2">
            <Dropdown.Item onClick={handleProfile}>
              <i className="fas fa-user-circle me-2 text-primary"></i> View
              Profile
            </Dropdown.Item>

            {/* removed Settings since there is no page for it */}

            <Dropdown.Divider />
            <Dropdown.Item
              onClick={handleLogout}
              className="text-danger fw-semibold"
            >
              <i className="fas fa-sign-out-alt me-2"></i> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
