// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import StatsCard from '../../components/common/StatsCard';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGoToBooking = () => {
    navigate('/admin/bookings');
  };

  useEffect(() => {
    const fetchStats = async () => {
      setError(null);
      try {
        const [usersResponse, propertiesResponse, bookingsResponse] =
          await Promise.all([
            api.fetchUsers(),
            api.fetchProperties(),
            api.fetchBookings(),
          ]);

        const allUsers = usersResponse.users || [];
        const allProperties = propertiesResponse.properties || [];
        const allBookings = bookingsResponse.bookings || [];

        const totalUsersCount = allUsers.length;
        const totalPropertiesCount = allProperties.filter(
          (p) => p.status === 'Available' || p.status === 'Rented'
        ).length;
        const pendingBookingsCount = allBookings.filter(
          (b) => b.status === 'pending'
        ).length;

        const totalRevenueAmount = allProperties
          .filter((p) => p.status === 'Rented')
          .reduce((sum, p) => sum + (p.price || 0), 0);

        const mockActivities = [
          {
            id: 1,
            message: `New user ${allUsers[0]?.full_name || 'John'} registered.`,
            time: '5 mins ago',
          },
          {
            id: 2,
            message: `Booking request for '${
              allProperties[1]?.title || 'Modern Studio Apartment'
            }' is pending.`,
            time: '1 hour ago',
          },
          {
            id: 3,
            message: `Property '${
              allProperties[0]?.title || 'Luxury 2BHK Apartment'
            }' status changed to Rented.`,
            time: '3 hours ago',
          },
        ];

        setStats({
          totalUsers: totalUsersCount,
          totalProperties: totalPropertiesCount,
          pendingBookings: pendingBookingsCount,
          totalRevenue: totalRevenueAmount,
          recentActivity: mockActivities,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError(
          'Failed to load dashboard data. Please check the mock API functions in api.js.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="light" />
        <p className="mt-2 text-muted">Loading Dashboard Data...</p>
      </div>
    );
  }

  // Error state
  if (error || !stats) {
    return (
      <Container fluid className="p-0">
        <h2 className="mb-3 fw-bold" style={{ color: '#D4AF37' }}>
          Admin Dashboard
        </h2>
        <Alert variant="danger">
          {error || 'Error: Data structure missing or incorrect.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mt-4" style={{ color: '#D4AF37' }}>
            Admin Dashboard
          </h2>
          <p className="mb-0">
            Quick overview of users, properties & bookings.
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <Row className="g-4 mb-5">
        <Col md={6} lg={3}>
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon="fa-users"
            color="#D4AF37" // gold
          />
        </Col>
        <Col md={6} lg={3}>
          <StatsCard
            title="Total Properties"
            value={stats.totalProperties}
            icon="fa-building"
            color="#22c55e" // soft green
          />
        </Col>
        <Col md={6} lg={3}>
          <StatsCard
            title="Pending Bookings"
            value={stats.pendingBookings}
            icon="fa-calendar-alt"
            color="#f59e0b" // amber
          />
        </Col>
        <Col md={6} lg={3}>
          <StatsCard
            title="Revenue (Mock)"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon="fa-indian-rupee-sign"
            color="#ef4444" // red
          />
        </Col>
      </Row>

      {/* RECENT ACTIVITY + WELCOME PANEL */}
      <Row>
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card className="card-custom">
            <Card.Header className="card-header-custom">
              Recent Activities
            </Card.Header>
            <ListGroup variant="flush">
              {stats.recentActivity.map((activity) => (
                <ListGroup.Item
                  key={activity.id}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#f5f5f5',
                  }}
                >
                  <div className="d-flex align-items-center">
                    <span
                      className="me-3 d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(212,175,55,0.15)',
                        color: '#D4AF37',
                      }}
                    >
                      <i className="fas fa-arrow-circle-right"></i>
                    </span>
                    <span>{activity.message}</span>
                  </div>
                  <small className="text-muted">{activity.time}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="card-custom h-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold mb-2" style={{ color: '#D4AF37' }}>
                  Welcome Back, Admin!
                </h5>
                <p className= "mb-3" style={{color: 'white'}}>
                  You have{' '}
                  <span className="fw-bold">
                    {stats.pendingBookings} pending
                  </span>{' '}
                  booking request(s) to review.
                </p>
              </div>
              <Button
                onClick={handleGoToBooking}
                className="w-100 fw-bold mt-2"
                style={{
                  backgroundColor: '#D4AF37',
                  borderColor: '#D4AF37',
                  color: '#050508',
                  borderRadius: '999px',
                }}
              >
                Go to Bookings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
