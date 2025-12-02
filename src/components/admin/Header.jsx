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

    return (
        <Navbar bg="white" expand="lg" className="mb-4 p-3 shadow-sm rounded-3">
            <Nav className="me-auto">
                {/* Hamburger Icon to toggle sidebar */}
                <button 
                    className="btn btn-outline-secondary border-0 me-3" 
                    onClick={toggleSidebar}
                    style={{ fontSize: '1.2rem' }}
                >
                    <i className="fas fa-bars"></i>
                </button>
                
                <Navbar.Brand className="d-flex align-items-center fw-bold text-dark">
                    <i className="fas fa-home me-2 text-primary"></i> GoHome
                </Navbar.Brand>
            </Nav>

            <Nav>
                <Nav.Link href="#" className="text-muted me-3">
                    <i className="fas fa-bell"></i> 
                    <span className="badge bg-danger rounded-pill position-absolute translate-middle-y ms-1">3</span>
                </Nav.Link>

                <Dropdown align="end">
                    <Dropdown.Toggle variant="white" id="profile-dropdown" className="d-flex align-items-center border-0 p-0">
                        <div className="d-flex flex-column text-end me-2 d-none d-sm-block">
                            <span className="fw-bold text-dark" style={{fontSize: '0.9rem'}}>{user?.full_name || 'Admin'}</span>
                            <span className="text-muted" style={{fontSize: '0.75rem'}}>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1) || 'Administrator'}</span>
                        </div>
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                            <i className="fas fa-user-shield"></i>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="shadow-lg border-0 mt-2">
                        <Dropdown.Item href="#/admin/profile"><i className="fas fa-user-circle me-2 text-primary"></i> Profile</Dropdown.Item>
                        <Dropdown.Item href="#/admin/settings"><i className="fas fa-cog me-2 text-secondary"></i> Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout} className="text-danger"><i className="fas fa-sign-out-alt me-2"></i> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar>
    );
};

export default Header;






