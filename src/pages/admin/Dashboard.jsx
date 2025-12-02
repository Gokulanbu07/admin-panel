import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import StatsCard from '../../components/common/StatsCard';
import { api } from '../../services/api'; 
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
    const navigate = useNavigate();
    
    // Initial state for calculated stats (null for loading check)
    const [stats, setStats] = useState(null); 
    
    // Correctly define loading state (boolean)
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); // For handling API errors

    const handleGoToBooking = () => {
        navigate('/admin/bookings');
    };

    useEffect(() => {
        const fetchStats = async () => {
            setError(null);
            try {
                // --- 1. Fetch All Necessary Mock Data using the correct API function names ---
                const [
                    usersResponse, 
                    propertiesResponse, 
                    bookingsResponse
                ] = await Promise.all([
                    api.fetchUsers(),
                    api.fetchProperties(),
                    api.fetchBookings()
                ]);

                // --- 2. Calculate Statistics ---
                const allUsers = usersResponse.users || [];
                const allProperties = propertiesResponse.properties || [];
                const allBookings = bookingsResponse.bookings || [];
                
                // Calculations
                const totalUsersCount = allUsers.length;
                const totalPropertiesCount = allProperties.filter(p => p.status === 'Available' || p.status === 'Rented').length;
                const pendingBookingsCount = allBookings.filter(b => b.status === 'pending').length;
                
                // Sum of prices of Rented properties (Mock Revenue)
                const totalRevenueAmount = allProperties
                    .filter(p => p.status === 'Rented')
                    .reduce((sum, p) => sum + p.price, 0); 

                // Mock Recent Activities (using a simplified structure)
                const mockActivities = [
                    { id: 1, message: `New user ${allUsers[0]?.full_name || 'John'} registered.`, time: '5 mins ago' },
                    { id: 2, message: `Booking request for '${allProperties[1]?.title || 'Condo'}' is pending.`, time: '1 hour ago' },
                    { id: 3, message: `Property '${allProperties[0]?.title || 'Penthouse'}' status changed to Rented.`, time: '3 hours ago' },
                ];

                // --- 3. Update State ---
                setStats({
                    totalUsers: totalUsersCount,
                    totalProperties: totalPropertiesCount,
                    pendingBookings: pendingBookingsCount,
                    totalRevenue: totalRevenueAmount,
                    recentActivity: mockActivities, 
                });

            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
                setError("Failed to load dashboard data. Please check the API functions in api.js.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // --- Loading State Render ---
    if (loading) {
        return (
            <div className="text-center p-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Loading Dashboard Data...</p>
            </div>
        );
    }
    
    // --- Error State Render ---
    if (error || !stats) {
        return (
            <Container fluid className="p-0">
                 <h2 className="mb-4 fw-bold">🏠 Admin Dashboard</h2>
                 <Alert variant="danger">
                    {error || "Error: Data structure missing or incorrect."}
                </Alert>
            </Container>
        );
    }

    // --- Main Dashboard Render ---
    return (
        <Container fluid className="p-0">
            <h2 className="mb-4 fw-bold">🏠 Admin Dashboard</h2>

            {/* --- 1. STATS CARDS --- */}
            <Row className="g-4 mb-5">
                <Col md={6} lg={3}>
                    <StatsCard 
                        title="Total Users" 
                        value={stats.totalUsers} 
                        icon="fa-users" 
                        color="#4338ca" // Primary Indigo
                    />
                </Col>
                <Col md={6} lg={3}>
                    <StatsCard 
                        title="Total Properties" 
                        value={stats.totalProperties} 
                        icon="fa-building" 
                        color="#059669" // Green
                    />
                </Col>
                <Col md={6} lg={3}>
                    <StatsCard 
                        title="Pending Bookings" 
                        value={stats.pendingBookings} 
                        icon="fa-calendar-alt" 
                        color="#f59e0b" // Amber/Yellow
                    />
                </Col>
                <Col md={6} lg={3}>
                    <StatsCard 
                        title="Revenue (Mock)" 
                        value={`₹${stats.totalRevenue.toLocaleString()}`} // Format with currency and commas
                        icon="fa-indian-rupee-sign" 
                        color="#ef4444" // Red
                    />
                </Col>
            </Row>

            {/* --- 2. RECENT ACTIVITY --- */}
            <Row>
                <Col lg={8}>
                    <Card className="card-custom">
                        <Card.Header className="card-header-custom">
                            Recent Activities
                        </Card.Header>
                        <ListGroup variant="flush">
                            {stats.recentActivity.map((activity) => (
                                <ListGroup.Item key={activity.id} className="d-flex justify-content-between align-items-center">
                                    <i className="fas fa-arrow-circle-right me-2 text-primary"></i>
                                    <span className="flex-grow-1">{activity.message}</span>
                                    <small className="text-muted">{activity.time}</small>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={4}>
                    {/* Welcome Card & Link */}
                    <Card className="card-custom h-100">
                        <Card.Body>
                            <h5 className="fw-bold">Welcome Back, Admin!</h5>
                            <p className="text-muted">You have **{stats.pendingBookings}** pending requests to review.</p>
                            <button onClick={handleGoToBooking} className="btn btn-primary w-100 mt-3 fw-bold">Go to Bookings</button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;


