// src/pages/UserProfile.jsx

import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserNavbar from '../components/common/UserNavbar';

const ACCENT_COLOR = '#D4AF37';
const BACKGROUND_DARK_COLOR = '#050508';
const CARD_DARK = '#0b0b10';
const TEXT_LIGHT = '#F5F5F5';

const UserProfile = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // If not logged in, send to login
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!user) {
        // brief empty state while redirect
        return null;
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div
            className="d-flex flex-column min-vh-100"
            style={{ backgroundColor: BACKGROUND_DARK_COLOR }}
        >
            <style jsx="true">{`
                .profile-wrapper {
                    min-height: calc(100vh - 80px);
                    padding: 3.5rem 0;
                    background: radial-gradient(
                            circle at top left,
                            rgba(212, 175, 55, 0.15),
                            #050508
                        );
                }
                .profile-card {
                    background: ${CARD_DARK};
                    border-radius: 20px;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.9);
                    color: ${TEXT_LIGHT};
                }
                .profile-avatar {
                    width: 70px;
                    height: 70px;
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.6rem;
                    background: radial-gradient(circle, ${ACCENT_COLOR}, transparent 60%);
                    color: #050508;
                }
                .profile-name {
                    font-size: 1.4rem;
                    font-weight: 700;
                }
                .profile-role {
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: #b4b4b4;
                }
                .profile-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #b4b4b4;
                    margin-bottom: 0.2rem;
                }
                .profile-value {
                    font-size: 0.95rem;
                    color: #e0e0e0;
                }
                .profile-actions .btn {
                    border-radius: 999px;
                    font-size: 0.9rem;
                }
                .btn-gold {
                    background-color: ${ACCENT_COLOR};
                    border-color: ${ACCENT_COLOR};
                    color: #050508;
                    font-weight: 600;
                }
                .btn-gold:hover {
                    background-color: #c59a24;
                    border-color: #c59a24;
                    color: #050508;
                }
                .btn-outline-light-profile {
                    border-color: rgba(245, 245, 245, 0.7);
                }
            `}</style>

            <div className="profile-wrapper">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={7}>
                            <Card className="profile-card p-4 p-md-5">
                                {/* Top section */}
                                <Row className="align-items-center mb-4">
                                    <Col xs="auto">
                                        <div className="profile-avatar">
                                            {user.full_name
                                                ? user.full_name.charAt(0).toUpperCase()
                                                : 'U'}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="profile-name">
                                            {user.full_name || 'User'}
                                        </div>
                                        <div className="profile-role">
                                            {user.role === 'admin' ? 'ADMIN' : 'USER'}
                                        </div>
                                    </Col>
                                </Row>

                                {/* Info rows */}
                                <Row className="g-3 mb-4">
                                    <Col md={6}>
                                        <div className="profile-label">Email</div>
                                        <div className="profile-value">
                                            {user.email || '-'}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="profile-label">Phone</div>
                                        <div className="profile-value">
                                            {user.phone_number || 'Not provided'}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="profile-label">Account Type</div>
                                        <div className="profile-value">
                                            {user.role === 'admin'
                                                ? 'Administrator'
                                                : 'Standard User'}
                                        </div>
                                    </Col>
                                </Row>

                                {/* Actions */}
                                <div className="profile-actions d-flex flex-wrap gap-2">
                                    {user.role === 'admin' && (
                                        <Button
                                            as={Link}
                                            to="/admin/dashboard"
                                            className="btn-gold"
                                        >
                                            Go to Admin Dashboard
                                        </Button>
                                    )}

                                    <Button
                                        as={Link}
                                        to="/my-properties"
                                        variant="outline-light"
                                        className="btn-outline-light-profile"
                                    >
                                        My Listings
                                    </Button>

                                    <div className="ms-auto">
                                        <Button
                                            variant="outline-light"
                                            className="btn-outline-light-profile"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default UserProfile;
