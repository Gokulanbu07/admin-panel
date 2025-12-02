// src/components/common/UserNavbar.jsx
// src/components/common/UserNavbar.jsx
import React from 'react';
import { Container, Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';



const UserNavbar = ({ primaryColor = '#D4AF37', lightBg = false }) => {
    const { isAuthenticated, logout, user } = useAuth();
    const location = useLocation();

    // THEME
    const NAV_BG_DARK = '#050508';
    const NAV_BG_LIGHT = '#F5F5F5';
    const TEXT_LIGHT = '#F5F5F5';
    const TEXT_DARK = '#111118';

    const bgColor = lightBg ? NAV_BG_LIGHT : NAV_BG_DARK;
    const textColor = lightBg ? TEXT_DARK : TEXT_LIGHT;
    const accentColor = primaryColor;

    const baseNavLinkStyle = {
        fontWeight: 600,
        marginRight: '1rem',
        fontSize: '0.9rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        transition: 'color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease',
        paddingBottom: '0.2rem',
        borderBottom: '2px solid transparent',
        color: textColor,
        opacity: 0.8,
    };

    const isActive = (path) => location.pathname === path;

    const getNavLinkStyle = (path) => ({
        ...baseNavLinkStyle,
        color: isActive(path) ? accentColor : textColor,
        borderBottomColor: isActive(path) ? accentColor : 'transparent',
        opacity: isActive(path) ? 1 : 0.8,
    });

    return (
        <Navbar
            expand="lg"
            className="shadow-sm"
            style={{
                backgroundColor: bgColor,
                backgroundImage: lightBg
                    ? 'none'
                    : 'linear-gradient(135deg, rgba(5,5,8,0.98), rgba(10,10,18,0.96))',
                padding: '0.9rem 0',
                position: 'sticky',
                top: 0,
                zIndex: 1020,
                borderBottom: lightBg
                    ? '1px solid rgba(0,0,0,0.08)'
                    : '1px solid rgba(212, 175, 55, 0.25)',
                backdropFilter: 'blur(14px)',
            }}
            variant={lightBg ? 'light' : 'dark'}
        >
            <Container>
                {/* Logo */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold fs-4 d-flex align-items-center"
                    style={{ color: textColor }}
                >
                    <span
                        className="me-2 d-inline-flex align-items-center justify-content-center"
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: '999px',
                            background: `radial-gradient(circle, ${accentColor}, transparent 60%)`,
                        }}
                    >
                        <i className="fas fa-home" style={{ color: '#050508' }}></i>
                    </span>
                    <span>
                        Go
                        <span style={{ color: accentColor }}>Home</span>
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="user-navbar-nav" />

                <Navbar.Collapse id="user-navbar-nav">
                    <Nav className="ms-auto align-items-center">

                        {/* Show "Home" link only when not already on "/" */}
                        {location.pathname !== '/' && (
                            <Nav.Link
                                as={Link}
                                to="/"
                                style={getNavLinkStyle('/')}
                            >
                                Home
                            </Nav.Link>
                        )}

                        <Nav.Link 
                        as={Link} 
                        to="/browse" 
                        style={getNavLinkStyle('/browse')}
                        
                        >
                            View Properties
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/about"
                            style={getNavLinkStyle('/about')}
                        >
                            About Us
                        </Nav.Link>



                        <Nav.Link
                            as={Link}
                            to="/contact"
                            style={getNavLinkStyle('/contact')}
                        >
                            Contact Us
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/wishlist"
                            style={getNavLinkStyle('/wishlist')}                            >
                            Wishlist
                        </Nav.Link>

                        {/* AUTH SECTION */}
                        {/* AUTH SECTION */}
{isAuthenticated ? (
    <>
        <Dropdown align="end">
            <Dropdown.Toggle
                id="user-dropdown"
                variant="link"
                className="d-flex align-items-center text-decoration-none"
                style={{
                    color: textColor,
                    padding: 0,
                    marginLeft: '1rem',
                }}
            >
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-2"
                    style={{
                        width: '30px',
                        height: '30px',
                        fontSize: '0.8rem',
                        background: `linear-gradient(135deg, ${accentColor}, #ffffff)`,
                        color: '#050508',
                    }}
                >
                    <i className="fas fa-user"></i>
                </div>
                <span
                    style={{
                        textTransform: 'none',
                        letterSpacing: 0,
                        fontSize: '0.9rem',
                        fontWeight: 600,
                    }}
                >
                    {user?.full_name || 'Profile'}
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow">
                <Dropdown.Item as={Link} to="/profile">
                    My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/my-visits">
                    My Visits
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/wishlist">
                    Wishlist
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/chats">
                    Chats
                </Dropdown.Item>
                {user?.role === 'admin' && (
                    <Dropdown.Item as={Link} to="/admin/dashboard">
                        Admin Dashboard
                    </Dropdown.Item>
                )}
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </>
) : (
    <>
        <Button
            as={Link}
            to="/login"
            variant={lightBg ? 'outline-dark' : 'outline-light'}
            className="ms-2 me-2 fw-bold btn-sm px-4"
            style={{
                borderRadius: '999px',
                border: lightBg
                    ? '1px solid rgba(0,0,0,0.25)'
                    : '1px solid rgba(245,245,245,0.3)',
                fontSize: '0.85rem',
            }}
        >
            Login
        </Button>
        <Button
            as={Link}
            to="/register"
            className="fw-bold btn-sm px-4"
            style={{
                borderRadius: '999px',
                backgroundColor: accentColor,
                borderColor: accentColor,
                color: '#050508',
                fontSize: '0.85rem',
            }}
        >
            Register
        </Button>
    </>
)}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default UserNavbar;
