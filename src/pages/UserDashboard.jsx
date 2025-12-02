// src/pages/UserDashboard.jsx

import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserNavbar from '../components/common/UserNavbar';

const ACCENT_COLOR = '#D4AF37';
const BACKGROUND_DARK_COLOR = '#050508';
const CARD_DARK = '#0b0b10';
const TEXT_LIGHT = '#F5F5F5';

const UserDashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!user) return null;

    const firstName = user.full_name ? user.full_name.split(' ')[0] : 'User';

    return (
        <div
            className="d-flex flex-column min-vh-100"
            style={{ backgroundColor: BACKGROUND_DARK_COLOR }}
        >
            <style jsx="true">{`
                .ud-wrapper {
                    min-height: calc(100vh - 80px);
                    padding: 3.5rem 0;
                    background: radial-gradient(
                            circle at top left,
                            rgba(212, 175, 55, 0.15),
                            #050508
                        );
                    color: ${TEXT_LIGHT};
                }

                .ud-greeting-title {
                    font-size: 1.9rem;
                    font-weight: 700;
                    margin-bottom: 0.25rem;
                }

                .ud-greeting-sub {
                    font-size: 0.95rem;
                    color: #c2c2c2;
                }

                .ud-summary-card {
                    background: ${CARD_DARK};
                    border-radius: 18px;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.9);
                    padding: 1.8rem 1.6rem;
                    margin-bottom: 2rem;
                }

                .ud-avatar {
                    width: 70px;
                    height: 70px;
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(circle, ${ACCENT_COLOR}, transparent 60%);
                    color: #050508;
                    font-size: 1.6rem;
                    font-weight: 700;
                }

                .ud-role-pill {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.25rem 0.8rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    border: 1px solid rgba(212, 175, 55, 0.5);
                    color: ${ACCENT_COLOR};
                    margin-top: 0.4rem;
                }

                .ud-stat-card {
                    background: #050508;
                    border-radius: 16px;
                    border: 1px solid #20202a;
                    padding: 1rem 1.1rem;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.8);
                }

                .ud-stat-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: #b4b4b4;
                    margin-bottom: 0.25rem;
                }

                .ud-stat-value {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: ${ACCENT_COLOR};
                }

                .ud-actions-title {
                    font-size: 1.15rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .ud-action-card {
                    background: ${CARD_DARK};
                    border-radius: 16px;
                    border: 1px solid #20202a;
                    padding: 1.4rem 1.4rem;
                    height: 100%;
                    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.8);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: transform 0.2s ease, box-shadow 0.2s ease,
                        border-color 0.2s ease;
                }

                .ud-action-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 22px 46px rgba(0, 0, 0, 1);
                    border-color: rgba(212, 175, 55, 0.6);
                }

                .ud-action-title {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 0.3rem;
                }

                .ud-action-text {
                    font-size: 0.9rem;
                    color: #c4c4c4;
                    margin-bottom: 0.8rem;
                }

                .ud-btn-gold {
                    background-color: ${ACCENT_COLOR};
                    border-color: ${ACCENT_COLOR};
                    border-radius: 999px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #050508;
                }
                .ud-btn-gold:hover {
                    background-color: #c59a24;
                    border-color: #c59a24;
                    color: #050508;
                }
            `}</style>

            <div className="ud-wrapper">
                <Container>
                    {/* Greeting + Summary */}
                    <Row className="mb-4">
                        <Col lg={8} className="mx-auto">
                            <div className="ud-summary-card">
                                <Row className="align-items-center g-3">
                                    <Col xs="auto">
                                        <div className="ud-avatar">
                                            {user.full_name
                                                ? user.full_name.charAt(0).toUpperCase()
                                                : 'U'}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="ud-greeting-title">
                                            Hi {firstName}, welcome back 👋
                                        </div>
                                        <div className="ud-greeting-sub">
                                            Manage your listings, explore rentals, and keep your profile up to date.
                                        </div>
                                        <div className="ud-role-pill">
                                            {user.role === 'admin' ? 'ADMIN' : 'USER'}
                                        </div>
                                    </Col>
                                </Row>

                                {/* Quick stats (for now, simple placeholders / future real data) */}
                                <Row className="mt-4 g-3">
                                    <Col sm={4}>
                                        <div className="ud-stat-card">
                                            <div className="ud-stat-label">My Listings</div>
                                            <div className="ud-stat-value">–</div>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="ud-stat-card">
                                            <div className="ud-stat-label">Saved Homes</div>
                                            <div className="ud-stat-value">–</div>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="ud-stat-card">
                                            <div className="ud-stat-label">Messages</div>
                                            <div className="ud-stat-value">–</div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    {/* Action cards */}
                    <Row className="g-4">
                        <Col lg={8} className="mx-auto">
                            <div className="ud-actions-title">Quick Actions</div>
                            <Row className="g-3">
                                <Col md={6}>
                                    <div className="ud-action-card">
                                        <div>
                                            <div className="ud-action-title">Browse Properties</div>
                                            <div className="ud-action-text">
                                                Explore all available rentals and find homes that match your needs.
                                            </div>
                                        </div>
                                        <Button
                                            as={Link}
                                            to="/browse"
                                            className="ud-btn-gold mt-1"
                                        >
                                            View Properties
                                        </Button>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="ud-action-card">
                                        <div>
                                            <div className="ud-action-title">My Listings</div>
                                            <div className="ud-action-text">
                                                See and manage the properties you&apos;ve listed on GoHome.
                                            </div>
                                        </div>
                                        <Button
                                            as={Link}
                                            to="/my-properties"
                                            className="ud-btn-gold mt-1"
                                        >
                                            Go to My Listings
                                        </Button>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="ud-action-card">
                                        <div>
                                            <div className="ud-action-title">Add New Property</div>
                                            <div className="ud-action-text">
                                                Own a place to rent? Add it here and start receiving enquiries.
                                            </div>
                                        </div>
                                        <Button
                                            as={Link}
                                            to="/add-property"
                                            className="ud-btn-gold mt-1"
                                        >
                                            Add Property
                                        </Button>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="ud-action-card">
                                        <div>
                                            <div className="ud-action-title">Profile & Settings</div>
                                            <div className="ud-action-text">
                                                Review your account details, contact info, and role.
                                            </div>
                                        </div>
                                        <Button
                                            as={Link}
                                            to="/profile"
                                            className="ud-btn-gold mt-1"
                                        >
                                            View Profile
                                        </Button>
                                    </div>
                                </Col>

                                {user.role === 'admin' && (
                                    <Col md={6}>
                                        <div className="ud-action-card">
                                            <div>
                                                <div className="ud-action-title">Admin Dashboard</div>
                                                <div className="ud-action-text">
                                                    Access admin tools, manage users and oversee platform activity.
                                                </div>
                                            </div>
                                            <Button
                                                as={Link}
                                                to="/admin/dashboard"
                                                className="ud-btn-gold mt-1"
                                            >
                                                Go to Admin
                                            </Button>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default UserDashboard;
