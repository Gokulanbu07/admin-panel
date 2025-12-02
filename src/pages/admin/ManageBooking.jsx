// src/pages/admin/ManageBookings.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { api } from '../../services/api';
import BookingTable from '../../components/admin/BookingTable';

const ManageBookings = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [key, setKey] = useState('pending'); // State for active tab

    const fetchBookingsData = async () => {
        setLoading(true);
        try {
            const response = await api.fetchBookings();
            if (response.success) {
                setAllBookings(response.bookings);
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'Error fetching booking requests.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookingsData();
    }, []);

    // --- Action Handler ---

    const handleUpdateStatus = async (bookingId, newStatus) => {
        try {
            // Mock API logic for status update
            // In the real app, this would call update_booking_status.php
            await api.updateBookingStatus(bookingId, newStatus); 
            
            setMessage({ type: 'success', text: `Booking ID ${bookingId} successfully ${newStatus}.` });
            
            // Update the local state
            setAllBookings(allBookings.map(b => 
                b.id === bookingId ? { ...b, status: newStatus } : b
            ));

        } catch (error) {
            setMessage({ type: 'danger', text: 'An error occurred while updating the status.' });
        }
    };

    // Filter bookings based on the active tab
    const filteredBookings = allBookings.filter(b => 
        key === 'all' ? true : b.status === key
    );


    return (
        <Container fluid className="p-0">
            <h2 className="mb-4 fw-bold">📅 Manage Bookings & Visits</h2>
            
            {message && <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>{message.text}</Alert>}

            <Card className="card-custom">
                <Card.Body>
                    <Tabs
                        id="booking-tabs"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="pending" title={`Pending (${allBookings.filter(b => b.status === 'pending').length})`} />
                        <Tab eventKey="accepted" title={`Accepted (${allBookings.filter(b => b.status === 'accepted').length})`} />
                        <Tab eventKey="rejected" title={`Rejected (${allBookings.filter(b => b.status === 'rejected').length})`} />
                        <Tab eventKey="all" title={`All (${allBookings.length})`} />
                    </Tabs>
                    
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2 text-muted">Loading booking data...</p>
                        </div>
                    ) : (
                        <BookingTable 
                            bookings={filteredBookings} 
                            onUpdateStatus={handleUpdateStatus}
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ManageBookings;