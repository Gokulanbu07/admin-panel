// src/pages/admin/ManageBookings.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner, Tabs, Tab, Badge } from 'react-bootstrap';
import { api } from '../../services/api';
import BookingTable from '../../components/admin/BookingTable';

const ManageBookings = () => {

    const GOLD = "#D4AF37";

    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [key, setKey] = useState('pending');

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await api.fetchBookings();
            if (response.success) setAllBookings(response.bookings);
        } catch {
            setMessage({ type: 'danger', text: 'Failed to load bookings.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.updateBookingStatus(id, status);

            setAllBookings(prev =>
                prev.map(b => (b.id === id ? { ...b, status } : b))
            );

            setMessage({ type: 'success', text: `Booking ${status}.` });
        } catch {
            setMessage({ type: 'danger', text: 'Action failed.' });
        }
    };

    const filtered = allBookings.filter(b => key === 'all' ? true : b.status === key);

    const tabStyle = {
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "600",
    };

    return (
        <Container fluid className="p-0">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: GOLD }}>
                        Manage Bookings & Visits
                    </h2>
                    <p className=" mb-0">
                        Approve, reject or track booking status.
                    </p>
                </div>
            </div>

            {message && (
                <Alert 
                    variant={message.type} 
                    onClose={() => setMessage(null)} 
                    dismissible
                >
                    {message.text}
                </Alert>
            )}

            <Card className="card-custom shadow-sm border-0">
                
                <Card.Body>
                    <Tabs
                        id="booking-tabs"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-4"
                        fill
                    >
                        <Tab 
                            eventKey="pending" 
                            title={
                                <span style={tabStyle}>
                                    Pending <Badge bg="warning" text="dark">{allBookings.filter(b => b.status === 'pending').length}</Badge>
                                </span>
                            }
                        />

                        <Tab 
                            eventKey="accepted" 
                            title={
                                <span style={tabStyle}>
                                    Accepted <Badge bg="success">{allBookings.filter(b => b.status === 'accepted').length}</Badge>
                                </span>
                            }
                        />

                        <Tab 
                            eventKey="rejected" 
                            title={
                                <span style={tabStyle}>
                                    Rejected <Badge bg="danger">{allBookings.filter(b => b.status === 'rejected').length}</Badge>
                                </span>
                            }
                        />

                        <Tab 
                            eventKey="all" 
                            title={
                                <span style={tabStyle}>
                                    All <Badge bg="secondary">{allBookings.length}</Badge>
                                </span>
                            }
                        />
                    </Tabs>

                    {loading ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" variant="light" />
                        </div>
                    ) : (
                        <BookingTable 
                            bookings={filtered}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ManageBookings;
