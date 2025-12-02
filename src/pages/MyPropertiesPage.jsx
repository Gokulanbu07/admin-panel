// src/pages/MyPropertiesPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// --- CONFIGURATION ---
const API_BASE_URL = '/api';

// Dark luxury theme (matching homepage)
const BACKGROUND_DARK_COLOR = '#050508';
const ACCENT_COLOR = '#D4AF37';
const CARD_DARK = '#0b0b10';
const TEXT_LIGHT = '#F5F5F5';

const MyPropertiesPage = () => {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // --- 1. Security Check and Data Fetch ---
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
            return;
        }

        if (isAuthenticated) {
            fetchMyProperties();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, authLoading, navigate]);

    const fetchMyProperties = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE_URL}/get_my_properties.php`);

            if (response.data.success) {
                setProperties(response.data.properties || []);
            } else {
                setError(response.data.message || 'Failed to load your property listings.');
            }
        } catch (err) {
            console.error('Property Fetch Error:', err);
            setError('Could not connect to the server to fetch properties.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (propertyId) => {
        if (!window.confirm('Are you sure you want to delete this property listing?')) {
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/delete_property.php`, { property_id: propertyId });

            if (response.data.success) {
                setProperties((prev) => prev.filter((p) => p.id !== propertyId));
            } else {
                alert(response.data.message || 'Failed to delete property.');
            }
        } catch (err) {
            alert('An error occurred during deletion.');
        }
    };

    // --- Loading State ---
    if (authLoading || loading) {
        return (
            <div
                style={{
                    minHeight: '80vh',
                    backgroundColor: BACKGROUND_DARK_COLOR,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: TEXT_LIGHT,
                }}
            >
                <Spinner animation="border" role="status" style={{ color: ACCENT_COLOR }} />
                <p className="ms-3 h5 mb-0">Loading your listings...</p>
            </div>
        );
    }

    // --- Unauthorized Role ---
    if (user && user.role !== 'houseowner' && user.role !== 'admin') {
        return (
            <div
                style={{
                    minHeight: '80vh',
                    backgroundColor: BACKGROUND_DARK_COLOR,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                }}
            >
                <Container style={{ maxWidth: '600px' }}>
                    <Alert
                        variant="dark"
                        className="text-center"
                        style={{
                            background: CARD_DARK,
                            borderColor: 'rgba(212, 175, 55, 0.3)',
                            color: TEXT_LIGHT,
                        }}
                    >
                        <i className="fas fa-lock me-2"></i>
                        Access Denied. Only <strong>House Owners</strong> or <strong>Admins</strong> can manage
                        property listings.
                    </Alert>
                </Container>
            </div>
        );
    }

    // --- Property Card Component (Visual Focus) ---
    const PropertyCard = ({ property }) => {
        const getStatusVariant = (status) => {
            switch (status) {
                case 'Active':
                    return 'success';
                case 'Pending':
                    return 'warning';
                case 'Draft':
                    return 'secondary';
                case 'Sold/Rented':
                    return 'danger';
                default:
                    return 'info';
            }
        };

        return (
            <Col xs={12} md={6} lg={4} className="mb-4">
                <Card className="my-property-card h-100">
                    {/* Image + Status */}
                    <div className="my-property-image-wrapper">
                        <Card.Img
                            variant="top"
                            src={
                                property.image ||
                                `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(
                                    property.title?.split(' ').slice(0, 3).join(' ') || 'Property'
                                )}`
                            }
                        />
                        <Badge
                            bg={getStatusVariant(property.status)}
                            className="my-property-status-badge"
                        >
                            {property.status}
                        </Badge>
                    </div>

                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="my-property-title">
                            {property.title}
                        </Card.Title>

                        <Card.Subtitle className="my-property-location mb-2">
                            <i className="fas fa-map-marker-alt me-1"></i> {property.city || 'Location not specified'}
                        </Card.Subtitle>

                        {/* Meta info */}
                        <div className="my-property-meta">
                            <span>
                                <i className="fas fa-bed me-1"></i>
                                <strong>{property.bedrooms || '-'}</strong> Beds
                            </span>
                            <span>
                                <i className="fas fa-bath me-1"></i>
                                <strong>{property.bathrooms || '-'}</strong> Baths
                            </span>
                        </div>

                        {/* Price */}
                        <div className="my-property-price mt-2 mb-3">
                            {property.price
                                ? `$${property.price.toLocaleString('en-US')}`
                                : 'Price Varies'}
                        </div>

                        {/* Actions */}
                        <div className="my-property-actions mt-auto">
                            <Button
                                as={Link}
                                to={`/edit-property/${property.id}`}
                                variant="outline-light"
                                className="my-property-btn-outline"
                            >
                                <i className="fas fa-edit me-1"></i> Edit
                            </Button>
                            <Button
                                onClick={() => handleDelete(property.id)}
                                variant="danger"
                                className="my-property-btn-danger"
                            >
                                <i className="fas fa-trash-alt me-1"></i> Delete
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    // --- MAIN RENDER ---
    return (
        <div
            className="my-properties-page"
            style={{
                backgroundColor: BACKGROUND_DARK_COLOR,
                minHeight: '100vh',
                padding: '3.5rem 0',
            }}
        >
            <style jsx="true">{`
                .my-properties-page section {
                    scroll-margin-top: 90px;
                }

                .my-properties-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    color: ${TEXT_LIGHT};
                }

                .my-properties-eyebrow {
                    font-size: 0.8rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #b4b4b4;
                    margin-bottom: 0.75rem;
                }

                .my-properties-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .my-properties-title span {
                    color: ${ACCENT_COLOR};
                }

                .my-properties-subtitle {
                    max-width: 540px;
                    margin: 0 auto;
                    font-size: 0.98rem;
                    color: #c2c2c2;
                }

                .my-properties-actions {
                    margin-top: 1.8rem;
                }

                .btn-add-property {
                    border-radius: 999px;
                    background-color: ${ACCENT_COLOR};
                    border-color: ${ACCENT_COLOR};
                    color: #050508;
                    font-weight: 600;
                    padding: 0.7rem 1.8rem;
                    font-size: 0.95rem;
                }

                .btn-add-property:hover {
                    background-color: #c59a24;
                    border-color: #c59a24;
                    color: #050508;
                }

                /* Empty & error styling */
                .my-properties-empty,
                .my-properties-error {
                    background: ${CARD_DARK};
                    border-radius: 16px;
                    padding: 2.5rem 2rem;
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    color: ${TEXT_LIGHT};
                    text-align: center;
                }

                .my-properties-empty i,
                .my-properties-error i {
                    color: ${ACCENT_COLOR};
                    font-size: 1.4rem;
                    margin-bottom: 0.5rem;
                }

                /* Card styles */
                .my-property-card {
                    background-color: ${CARD_DARK};
                    border-radius: 18px;
                    border: 1px solid #20202a;
                    overflow: hidden;
                    color: ${TEXT_LIGHT};
                    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.5);
                    transition: transform 0.25s ease, box-shadow 0.25s ease,
                        border-color 0.25s ease, background 0.25s ease;
                }

                .my-property-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 24px 45px rgba(0, 0, 0, 0.7);
                    border-color: rgba(212, 175, 55, 0.7);
                    background: radial-gradient(
                        circle at top left,
                        rgba(212, 175, 55, 0.08),
                        #050508
                    );
                }

                .my-property-image-wrapper {
                    position: relative;
                    overflow: hidden;
                }

                .my-property-image-wrapper img {
                    height: 220px;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }

                .my-property-card:hover .my-property-image-wrapper img {
                    transform: scale(1.04);
                }

                .my-property-status-badge {
                    position: absolute;
                    top: 0.75rem;
                    right: 0.75rem;
                    font-size: 0.75rem;
                    padding: 0.35rem 0.7rem;
                    border-radius: 999px;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }

                .my-property-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                }

                .my-property-location {
                    font-size: 0.9rem;
                    color: #b4b4b4;
                }

                .my-property-meta {
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;
                    padding: 0.6rem 0;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                    border-top: 1px solid #222230;
                    border-bottom: 1px solid #222230;
                    font-size: 0.9rem;
                    color: #e0e0e0;
                }

                .my-property-meta i {
                    color: ${ACCENT_COLOR};
                }

                .my-property-price {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: ${ACCENT_COLOR};
                }

                .my-property-actions {
                    display: flex;
                    gap: 0.6rem;
                }

                .my-property-btn-outline {
                    flex: 1;
                    border-radius: 999px;
                    border-width: 1px;
                    border-color: rgba(245, 245, 245, 0.6) !important;
                    background: transparent;
                    font-size: 0.85rem;
                }

                .my-property-btn-outline:hover {
                    background: rgba(245, 245, 245, 0.08);
                    color: #ffffff;
                }

                .my-property-btn-danger {
                    flex: 1;
                    border-radius: 999px;
                    font-size: 0.85rem;
                }

                @media (max-width: 576px) {
                    .my-properties-title {
                        font-size: 1.8rem;
                    }
                }
            `}</style>

            <Container>
                {/* HEADER */}
                <div className="my-properties-header">
                    <div className="my-properties-eyebrow">MY LISTINGS</div>
                    <h1 className="my-properties-title">
                        Manage your <span>properties</span>
                    </h1>
                    <p className="my-properties-subtitle">
                        View, edit, and manage all your active, pending, and draft property listings in one place.
                    </p>
                    <div className="my-properties-actions">
                        <Button
                            as={Link}
                            to="/add-property"
                            className="btn-add-property"
                        >
                            <i className="fas fa-plus me-2"></i> Add New Property
                        </Button>
                    </div>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                    <div className="my-properties-error mb-4">
                        <i className="fas fa-exclamation-triangle d-block mb-2"></i>
                        <div>{error}</div>
                    </div>
                )}

                {/* EMPTY / LISTINGS */}
                {properties.length === 0 ? (
                    <div className="my-properties-empty">
                        <i className="fas fa-info-circle d-block"></i>
                        <h5 className="mt-2 mb-1">No listings found</h5>
                        <p className="mb-0">
                            You don&apos;t have any properties listed yet. Click{' '}
                            <strong>Add New Property</strong> to get started.
                        </p>
                    </div>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default MyPropertiesPage;
